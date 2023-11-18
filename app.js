const express = require("express");
const path = require("path");
const morgan = require("morgan");

//라우터 가져오기
const userRouter = require("./routers/users.router");
const productsRouter = require("./routers/products.router");
const authRouter = require("./routers/auth.router");

// index.js에 있는 db.sequelize 객체 모듈을 구조분해로 불러온다.
const { sequelize } = require("./models");
const cookieParser = require("cookie-parser");
const app = express();

app.set("port", process.env.PORT || 3000);

sequelize
  .sync({ force: false }) //model을 이용해 데이터베이스에 테이블을 삭제 후 생성.
  .then(() => {
    console.log("데이터베이스 연결됨.");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan("dev")); // 로그
app.use(express.static(path.join(__dirname, "public"))); // 요청시 기본 경로 설정
app.use(express.json()); // json 파싱
app.use(express.urlencoded({ extended: false })); // uri 파싱
app.use(cookieParser());
app.use("/auth", [userRouter, authRouter]);
app.use("/api", [productsRouter]);

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
  // 템플릿 변수 설정
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {}; // 배포용이 아니라면 err설정 아니면 빈 객체

  res.status(err.status || 500);
  res.render("error"); // 템플릿 엔진을 렌더링 하여 응답
});

// 서버 실행
app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
