const express = require("express");
const { generateAccessToken } = require("../tools/jwt.js");

const jwtRouter = express.Router();
jwtRouter.post("/createNewUser", (req, res) => {
  const token = generateAccessToken({ username: req.body.username });
  return res.json({ token });
});

module.exports = { jwtRouter };
