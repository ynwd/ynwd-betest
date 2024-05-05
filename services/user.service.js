const User = require("../models/user.model.js");

async function createUserService(user) {
  try {
    const newUser = new User(user);
    return await newUser.save();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getUserService() {
  try {
    const res = await User.find();
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getUserByIdService(userId) {
  try {
    const res = await User.findOne({
      Id: userId,
    });
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getUserByAccountNumberService(accountNumber) {
  try {
    const res = await User.findOne({
      accountNumber,
    });
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getUserByIdentityNumberService(identityNumber) {
  try {
    const res = await User.findOne({
      identityNumber,
    });
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function updateUserService(userId, user) {
  try {
    const res = await User.findOne(
      {
        Id: userId,
      },
      user
    );

    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function deleteUserService(userId) {
  try {
    const res = await User.findOneAndDelete({
      Id: userId,
    });
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  deleteUserService,
  updateUserService,
  getUserByIdentityNumberService,
  getUserByAccountNumberService,
  getUserByIdService,
  getUserService,
  createUserService,
};
