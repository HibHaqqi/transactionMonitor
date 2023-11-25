const { User } = require("../models");

class UserService {
    async getOne(payload) {
        const { id } = payload;
        try {
            const response = await User.findOne({ where:{id} });
            if (!response) {
                throw new Error ("Cannot find user")
            } else if (response){
                return response
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserService;
