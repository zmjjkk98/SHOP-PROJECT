const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.User;

module.exports = async (req, res, next) => {
  const { authorization } = req.cookies;
  console.log(authorization);
  const [authType, authToken] = authorization.split(" ");
  console.log(authType);
  console.log("-----------------");
  console.log(authToken);

  if (authType !== "Bearer" || !authToken) {
    res.status(400).json({
      errorMessage: "로그인 후 사용이 가능한 API 입니다.",
    });
    return;
  }

  try {
    console.log(jwt.verify(authToken, "sparta-secret-key"));
    const authorization = jwt.verify(authToken, "sparta-secret-key");
    console.log(authorization.userId);
    if (!authorization) {
      return res.status(401).json({ message: "로그인 필요" });
    }

    const findUser = await User.findOne({
      where: { userId: authorization.userId },
    });

    console.log(typeof findUser.userId);

    if (!findUser) {
      return res.status(401).json({ message: "로그인 해" });
    }

    res.locals.user = findUser.userId;
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "로그인 해줘" });
  }

  next();

  // try {
  //   // 복호화 및 검증
  //   const { userId } = jwt.verify(authToken, "sparta-secret-key");
  //   const user = await User.findById(userId);
  //   res.locals.user = user;
  //   console.log(user);
  //   next();
  // } catch (error) {
  //   console.log("뭐가문제야 say something");
  //   console.log(error);
  //   res.status(400).json({
  //     errorMessage: "로그인 후 사용이 가능한 API 입니다.",
  //   });
  //   return;
  // }
};
