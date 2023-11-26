const {User} = require('../models')

class PhotoService{
    async savePhoto(payload){
        const {user_image,id} = payload
        try {
            const response = await User.update(
                {user_image},{where:{id}}
            )
        } catch (error) {
            throw error
        }
    }
}

module.exports = PhotoService;