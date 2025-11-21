require('dotenv').config();
const axios = require('axios');

async function testConnection() {
  console.log("1. Checking Environment Variables...");
  const key = process.env.HF_API_KEY;
  const model = process.env.HF_MODEL_URL || "https://api-inference.huggingface.co/models/keremberke/yolov8n-food-detection";

  if (!key) {
    console.error("❌ ERROR: HF_API_KEY is missing from .env file.");
    return;
  }
  console.log(`✅ API Key found: ${key.substring(0, 4)}...`);
  console.log(`✅ Using Model: ${model}`);

  console.log("\n2. Sending Test Request to HuggingFace...");
  
  // Tiny 1x1 pixel white image base64
  const dummyImage = Buffer.from("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", "base64");

  try {
    const response = await axios.post(
      model,
      dummyImage,
      {
        headers: {
          "Authorization": `Bearer ${key}`,
          "Content-Type": "application/octet-stream"
        }
      }
    );

    console.log("✅ SUCCESS! HuggingFace API responded.");
    console.log("Response Preview:", JSON.stringify(response.data).substring(0, 100));

  } catch (err) {
    console.error("\n❌ CONNECTION FAILED");
    
    if (err.response) {
      console.error(`Status Code: ${err.response.status}`);
      console.error("Error Details:", JSON.stringify(err.response.data, null, 2));
      
      if (err.response.data.error && err.response.data.error.includes("currently loading")) {
        console.log("\n⚠️  NOTE: The model is currently loading. This is normal for the free tier.");
        console.log("   Wait 30 seconds and try again.");
      }
    } else {
      console.error("Error Message:", err.message);
    }
  }
}

testConnection();