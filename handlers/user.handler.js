const { v4 } = require("uuid");
const {
  createUserService,
  getUserByIdService,
  getUserByAccountNumberService,
  getUserByIdentityNumberService,
  getUserService,
  updateUserService,
  deleteUserService,
} = require("../services/user.service.js");
const { redisClient } = require("../tools/redis.js");

async function createUser(req, res) {
  try {
    const user = {
      Id: v4(),
      userName: req.body.userName,
      accountNumber: req.body.accountNumber,
      emailAddress: req.body.emailAddress,
      identityNumber: req.body.identityNumber,
    };

    const data = await createUserService(user);
    await redisClient.flushAll();
    res.json({ data });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
}

async function send(req, res, data) {
  await redisClient.set(req.originalUrl.split("?")[0], JSON.stringify(data));
  return res.json({ data });
}

async function getUser(req, res) {
  try {
    if (req.params.id) {
      const data = await getUserByIdService(req.params.id);
      return send(req, res, data);
    }

    if (req.query.accountNumber) {
      console.log("MASUK========0");
      const data = await getUserByAccountNumberService(req.query.accountNumber);
      return send(req, res, data);
    }

    console.log("req.query===>", req.query);
    if (req.query.identityNumber) {
      console.log("MASUK========1");
      const data = await getUserByIdentityNumberService(
        req.query.identityNumber
      );
      return send(req, res, data);
    }
    console.log("MASUK========2");

    const data = await getUserService();
    return send(req, res, data);
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
}

async function updateUser(req, res) {
  try {
    const user = {
      Id: req.body.Id,
      userName: req.body.userName,
      accountNumber: req.body.accountNumber,
      emailAddress: req.body.emailAddress,
      identityNumber: req.body.identityNumber,
    };

    const data = await updateUserService(user.Id, user);
    await redisClient.flushAll();
    return res.send({ data });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
}

async function deleteUser(req, res) {
  try {
    const data = await deleteUserService(req.params.id);
    await redisClient.flushAll();
    res.send({ data });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
}

module.exports = { deleteUser, updateUser, getUser, createUser };
