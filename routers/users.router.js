const express = require("express");
const db = require("../models");
const User = db.User;
const { Op } = require("sequelize");

const jwt = require("jsonwebtoken");

const router = express.Router();
const authMiddleWare = require("../middlewares/need-signin.middleware");

//회원가입
router.post("/signup", async (req, res) => {
  try {
    const { userId, password } = req.body;
    const user = await User.create({ userId: userId, password: password });

    res.status(201).json({
      success: true,
      message: "회원가입에 성공했습니다",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
});

//로그인
router.post("/login", async (req, res) => {
  const { userId, password } = req.body;

  const user = await User.findOne({ userId });

  if (!user || password !== user.password) {
    res.status(400).json({
      errorMessage:
        "사용자가 존재하지 않거나, 사용자의 password와 입력받은 password가 일치하지 않습니다.",
    });
    return;
  }

  const token = jwt.sign({ userId: user.userId }, "sparta-secret-key", {
    expiresIn: "12h",
  });

  res.cookie("authorization", `Bearer ${token}`);
  return res.status(201).end();
});

router.get("/login", authMiddleWare, async (req, res) => {
  res.json({ message: "로그인 성공" });
});

module.exports = router;
