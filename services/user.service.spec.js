const {
  createUserService,
  updateUserService,
  deleteUserService,
  getUserService,
  getUserByAccountNumberService,
  getUserByIdentityNumberService,
  getUserByIdService,
} = require("./user.service");
const { mongoose } = require("../database/mongo.js");
const { v4 } = require("uuid");

describe("user service test", () => {
  beforeAll(async () => {});

  const prefix = Date.now();
  const user = {
    Id: v4(),
    userName: `john-${prefix}`,
    accountNumber: `0073-${prefix}`,
    emailAddress: `john${prefix}@email.com`,
    identityNumber: `54321-1240${prefix}`,
  };

  it("create user", async () => {
    const res = await createUserService(user);
    expect(res.userName).toEqual(user.userName);
  });

  it("get all users", async () => {
    const res = await getUserService();
    expect(res.length).toBeGreaterThan(0);
  });

  it("getUserByIdService", async () => {
    const res = await getUserByIdService(user.Id);
    expect(res.Id).toEqual(user.Id);
  });

  it("getUserByAccountNumberService", async () => {
    const res = await getUserByAccountNumberService(user.accountNumber);
    expect(res.accountNumber).toEqual(user.accountNumber);
  });

  it("getUserByIdentityNumberService", async () => {
    const res = await getUserByIdentityNumberService(user.identityNumber);
    expect(res.identityNumber).toEqual(user.identityNumber);
  });

  it("update user", async () => {
    const newUser = user;
    newUser.userName = `doe-${prefix}`;
    const res = await updateUserService(user.Id, user);
    expect(res.userName).toEqual(newUser.userName);
  });

  it("delete user", async () => {
    const res = await deleteUserService(user.Id);
    expect(res.Id).toEqual(user.Id);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
