const cloudinary = require("cloudinary").v2;
require("dotenv").config();

exports.cloudinaryConnect = () => {

    if (!process.env.CLOUD_NAME || !process.env.CLOUD_API_KEY || !process.env.CLOUD_API_SECRET) {
        console.error("❌ Cloudinary credentials are missing in .env!");
        return;
    }

    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET,
    });
    console.log("✅ Cloudinary connected");
};

exports.UploadImageToCloudinary = async (file, options = {}) => {
    console.log("Cloud Name:", process.env.CLOUD_NAME);
console.log("API Key:", process.env.CLOUD_API_KEY ? "Loaded" : "Missing");
console.log("API Secret:", process.env.CLOUD_API_SECRET ? "Loaded" : "Missing");
    try {
        console.log("file : " , file)
        console.log("folder : " , options)
        if (!file){
            throw new Error("❌ No file provided for upload");
        }

        options.resource_type = "auto";

        return await cloudinary.uploader.upload(file.tempFilePath, {
            folder : "TechZone",
            resource_type : "auto"
        });
    } catch (error) {
        console.error("❌ Cloudinary upload failed:", error);
        return null;
    }
};
