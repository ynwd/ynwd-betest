const request = require("supertest");
const { app } = require("../server.js");

describe("user service test", () => {
  let server;
  let token;
  let userId;

  beforeAll(async () => {
    server = app.listen(3000);
    const res = await request(app).post("/createNewUser").send({
      userName: "paul",
    });
    token = JSON.parse(res.text).token;
  });

  const prefix = Date.now();
  const user = {
    userName: `john-${prefix}`,
    accountNumber: `0073-${prefix}`,
    emailAddress: `john${prefix}@email.com`,
    identityNumber: `54321-1240${prefix}`,
  };

  it("create user", async () => {
    const res = await request(app)
      .post("/")
      .set("Authorization", "bearer " + token)
      .send(user);

    const r = JSON.parse(res.text).data;
    userId = r.Id;
    expect(res.statusCode).toBe(200);
  });

  it("get all users", async () => {
    const res = await request(app)
      .get("/")
      .set("Authorization", "bearer " + token);
    expect(res.statusCode).toBe(200);
  });

  it("getUserByIdService", async () => {
    const res = await request(app)
      .get(`/${userId}`)
      .set("Authorization", "bearer " + token);
    const u = JSON.parse(res.text);
    console.log("getUserByIdentityNumberService", u.data);
    expect(u.data.Id).toBeDefined();
  });

  // it("getUserByAccountNumberService", async () => {
  //   const res = await getUserByAccountNumberService(user.accountNumber);
  //   expect(res.accountNumber).toEqual(user.accountNumber);
  // });

  // it("getUserByIdentityNumberService", async () => {
  //   const res = await request(app)
  //     .get("/")
  //     .query({ val: "Oke" })
  //     .set("Authorization", "bearer " + token);
  //   const u = JSON.parse(res.text);
  //   // console.log("getUserByIdentityNumberService", u);
  //   expect(200).toBe(200);
  // });

  it("update user", async () => {
    user.Id = userId;
    const res = await request(app)
      .put("/")
      .set("Authorization", "bearer " + token)
      .send(user);
    expect(res.statusCode).toBe(200);
  });

  it("delete user", async () => {
    const res = await request(app)
      .delete(`/${userId}`)
      .set("Authorization", "bearer " + token);
    expect(res.statusCode).toBe(200);
  });

  afterAll(async () => {
    await server.close();
  });
});
