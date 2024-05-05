const express = require("express");

const {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../handlers/user.handler.js");
const { authenticateToken } = require("../tools/jwt.js");
const { checkRedisCache } = require("../tools/redis.js");

const userRouter = express.Router();

userRouter.get("/:id?", authenticateToken, checkRedisCache, getUser);

userRouter.put("/", authenticateToken, updateUser);

userRouter.post("/", authenticateToken, createUser);

userRouter.delete("/:id", authenticateToken, deleteUser);

module.exports = { userRouter };
