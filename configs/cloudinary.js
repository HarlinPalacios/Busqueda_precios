import { v2 as cloudinary } from "cloudinary";

export default function handler(req, res) {
  const config = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  };

  cloudinary.config(config);

  res.status(200).json({
    CLOUD_NAME: config.cloud_name || "❌ No detectado",
    API_KEY: config.api_key || "❌ No detectado",
    API_SECRET: config.api_secret ? "✅ OK" : "❌ No detectado",
  });
}
