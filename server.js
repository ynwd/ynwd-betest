const express = require("express");
const bodyParser = require("body-parser");
const { userRouter } = require("./routes/user.route.js");
const { jwtRouter } = require("./routes/jwt.route.js");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(userRouter);
app.use(jwtRouter);
app.closeServer = () => {
  server.close();
};

module.exports = { app };
