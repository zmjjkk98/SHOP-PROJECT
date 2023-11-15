const express = require("express");
const db = require("../models");
const User = db.User;
const { Op } = require("sequelize");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { userId, password } = req.body;

  const user = await User.create({ userId, password: password });

  res.status(201).json({ data: user });
});

module.exports = router;
