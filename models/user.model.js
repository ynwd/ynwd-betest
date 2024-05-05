const m = require("mongoose");
const { mongoose } = require("../database/mongo.js");

const userSchema = new m.Schema({
  Id: {
    type: String,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
    unique: true,
  },
  emailAddress: {
    type: String,
    required: true,
    unique: true,
  },
  identityNumber: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("User", userSchema);
