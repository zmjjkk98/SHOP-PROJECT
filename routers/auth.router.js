const express = require("express");
require("dotenv").config();
const db = require("../models");
const User = db.User;
const Cryptr = require("cryptr");
const crypt = new Cryptr("myTotallySecretKey");

const jwt = require("jsonwebtoken");

const router = express.Router();
const { SECRET_KEY } = process.env;

//로그인
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    const decryptPwd = crypt.decrypt(user.password);
    console.log(decryptPwd);

    if (!user || password !== decryptPwd) {
      return res.status(400).json({
        errorMessage: "사용자가 존재하지 않거나, 사용자의 password와 입력받은 password가 일치하지 않습니다."
      });
    }

    const token = jwt.sign({ email: user.email }, `${SECRET_KEY}`, {
      expiresIn: "12h"
    });

    res.cookie("authorization", `Bearer ${token}`);
    return res.status(201).json({ message: "성공적으로 로그인 되었습니다." });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
