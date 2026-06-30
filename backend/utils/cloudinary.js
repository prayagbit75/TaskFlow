import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { ApiError } from "./ApiError.js";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {

        if (!localFilePath) {
            throw new ApiError(
                400,
                "Local file path does not exist"
            );
        }

        const response =
            await cloudinary.uploader.upload(
                localFilePath,
                {
                    resource_type: "auto"
                }
            );

        // Upload successful
        fs.unlinkSync(localFilePath);
    
        return response;

    } catch (err) {

        if (
            localFilePath &&
            fs.existsSync(localFilePath)
        ) {
            fs.unlinkSync(localFilePath);
        }

        throw err;
    }
};

export { uploadOnCloudinary };