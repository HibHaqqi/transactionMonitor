const LoginService = require("../../services/login.service");
const { loginMock } = require("../mocks/dataMock");
const bcrypt = require("bcrypt");
const userData = loginMock

const loginService = new LoginService;

describe("Unit Testing login.service.js",()=>{
    it("[+]Valid login should return the user", async()=>{
        const result = await loginService.loginCheck(userData);

        expect(result).toBeDefined();
        expect(result.id).toBe(1);
        expect(result.email).toBe(userData.email);
        const passwordDB = await bcrypt.compare(
            userData.password,
            result.password
          );
          expect(passwordDB).toBe(true);
    })
    it("Login with incorrect email should throw an error",async()=>{
        const invalidEmailData = {
            email: "john@example.com",
            password: "olioli",
            
          };
        await expect(loginService.loginCheck(invalidEmailData)).rejects.toThrow("email tidak terdaftar")
    })

    it("[-] Login with incorrect password should throw an error",async()=>{
        const incorrectPassword = {
            email :"haqqi10@gmail.com",
            password :"jarwokua"
            
          };
          await expect(loginService.loginCheck(incorrectPassword)).rejects.toThrow("password tidak sesuai")
          
    })
})