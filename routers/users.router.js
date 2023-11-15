const express = require("express");
const db = require("../models");
const User = db.User;
const { Op } = require("sequelize");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { userId, userPassword } = req.body;

  const user = await User.create({ userId, password: userPassword });

  res.status(201).json({ data: user });
});

module.exports = router;
