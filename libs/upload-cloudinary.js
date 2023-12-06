const fs = require('fs');

const cloudinary = require('cloudinary').v2;

require('dotenv').config();
//const CLOUDINARY_CLOUD_NAME = 'dbgmovl5g';
//const CLOUDINARY_API_KEY = '297236666458235';
//const CLOUDINARY_API_SECRET = 'jhmlweyjbf30yeNEVVOTv975c1M';

          
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadCloudinary = async (filePath) => {
    let result;
    try {
        result = await cloudinary.uploader.upload(filePath, {
            use_filename: true
        });

        fs.unlinkSync(filePath);
        return result;
    } catch (error) {
        console.log(error);
        fs.unlinkSync(filePath);
        return null;
    }
}

module.exports = uploadCloudinary;