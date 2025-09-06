const cloudinary = require("cloudinary").v2;

exports.cloudinaryConnect = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET,
    });
    console.log("✅ Cloudinary connected");
};

exports.UploadImageToCloudinary = async (file, options = {}) => {
    try {
        if (!file) {
            throw new Error("❌ No file provided for upload");
        }

        options.resource_type = "auto";

        return await cloudinary.uploader.upload(file.tempFilePath, options);
    } catch (error) {
        console.error("❌ Cloudinary upload failed:", error);
        return null;
    }
};
