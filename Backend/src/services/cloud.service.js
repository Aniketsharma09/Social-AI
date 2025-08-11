const ImageKit = require("imagekit");

// ✅ Initialize with env variables
const imagekit = new ImageKit({
    publicKey: process.env.IMGKIT_PUBLIC_KEY,
    privateKey: process.env.IMGKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMGKIT_URL,
});

// ✅ Upload function
const uploadImg = async (file, fileName) => {
    try {
        const response = await imagekit.upload({
            file: file,                  
            fileName: fileName,          
            folder: "social-ai-caption", 
        });
        return response;
    } catch (error) {
        console.error("Image upload failed:", error);
        throw error;
    }
};

module.exports = uploadImg;
