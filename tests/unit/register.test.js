const RegisService = require("../../services/regis.service");
const { userMock, registedUserMock } = require("../mocks/dataMock");
const bcrypt = require("bcrypt");
const { User } = require("../../models");
const regisService = new RegisService(User);
const userData = userMock;
const registedUser = registedUserMock;

describe("Unit Testing : regis.service.js", () => {
  it("[+] Registration to DB", async () => {
    jest.setTimeout(10000);
    const userNew = await regisService.regisNewUser(userData);
    expect(userNew.name).toBe(userData.name);
    expect(userNew.email).toBe(userData.email);

    const passwordDB = await bcrypt.compare(
      userData.password,
      userNew.password
    );
    expect(passwordDB).toBe(true);

    await regisService.delete(userData.email);
  });

  it("[-] Registration with incomplete data should throw an error", async () => {
    jest.setTimeout(10000);
    const incompleteUserData = {
      name: "John Doe",
      email: "john@example.com",
      // Missing password and role
    };

    await expect(regisService.regisNewUser(incompleteUserData)).rejects.toThrow(
      "Data tidak lengkap"
    );
  });

  it("[-] Registration with an existing user should throw an error", async () => {
    jest.setTimeout(10000);
    // Mocking findOne to simulate an existing user
    regisService.User.findOne = jest.fn().mockResolvedValue(registedUser);

    await expect(regisService.regisNewUser(registedUser)).rejects.toThrow(
      "Email sudah terdaftar"
    );
  });
});