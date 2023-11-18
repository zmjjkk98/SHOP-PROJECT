const express = require("express");
const db = require("../models");
const User = db.User;
const { Op } = require("sequelize");
const Cryptr = require("cryptr");
const crypt = new Cryptr("myTotallySecretKey");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const authMiddleWare = require("../middlewares/need-signin.middleware");

const router = express.Router();

//회원가입
router.post("/sign", async (req, res) => {
  try {
    const { email, password } = req.body;

    const exsistsUser = await User.findOne({
      where: { email }
    });

    if (exsistsUser) {
      return res.status(405).json({
        message: "이미 사용중인 이메일 입니다."
      });
    }

    const encryptPwd = crypt.encrypt(password);

    const user = await User.create({ email, password: encryptPwd });

    res.status(201).json({
      success: true,
      message: "회원가입에 성공했습니다",
      data: user
    });
  } catch (error) {
    console.log(error);
  }
});

//로그인
router.get("/sign", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const decryptPwd = crypt.decrypt(user.password);
    console.log(decryptPwd);

    if (!user || password !== decryptPwd) {
      res.status(400).json({
        errorMessage: "사용자가 존재하지 않거나, 사용자의 password와 입력받은 password가 일치하지 않습니다."
      });
      return;
    }

    const token = jwt.sign({ email: user.email }, `${SECRET_KEY}`, {
      expiresIn: "12h"
    });

    res.cookie("authorization", `Bearer ${token}`);
    return res.status(201).json({ message: "성공적으로 로그인 되었습니다." }).end();
  } catch (error) {
    console.log(error);
  }
});

//수정

router.put("/sign", async (req, res) => {
  try {
    const { email, password, newPassword } = req.body;
    if (!email || !password || !newPassword) {
      return res.status(401).json({
        message: "데이터형식이 올바르지 않습니다."
      });
    }
    const user = await User.findOne({ email });
    const decryptPwd = crypt.decrypt(user.password);

    if (decryptPwd === password) {
      const newUser = new User({
        email,
        password: newPassword
      });

      await newUser.save();

      return res.status(200).json({
        massage: "회원정보를 수정 하였습니다."
      });
    } else {
      res.status(402).json({
        massage: "비밀번호가 맞지 않습니다."
      });
    }
  } catch {
    res.status(400).json({
      massage: "회원정보를 수정 할 수 없습니다."
    });
  }
});

//삭제

router.delete("/sign", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        message: "데이터형식이 올바르지 않습니다."
      });
    }

    const user = await User.findOne({ email });
    const decryptPwd = crypt.decrypt(user.password);

    if (decryptPwd === password) {
      await user.destroy();
      return res.status(200).json({
        massage: "회원 탈퇴 완료"
      });
    } else {
      res.status(402).json({
        massage: "비밀번호가 맞지 않습니다."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      massage: "회원정보를 수정 할 수 없습니다."
    });
  }
});

module.exports = router;
