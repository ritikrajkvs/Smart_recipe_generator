const axios = require("axios");

exports.classifyImage = async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        error: "Image is required",
      });
    }

    const API_KEY = process.env.GOOGLE_VISION_KEY;

    if (!API_KEY) {
      return res.status(500).json({
        success: false,
        error: "Google Vision API key missing",
      });
    }

    const base64 = image.replace(/^data:image\/\w+;base64,/, "");

    const requestBody = {
      requests: [
        {
          image: { content: base64 },
          features: [
            { type: "LABEL_DETECTION", maxResults: 10 },
            { type: "OBJECT_LOCALIZATION", maxResults: 10 }
          ],
        },
      ],
    };

    const response = await axios.post(
      `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`,
      requestBody
    );

    const data = response.data.responses[0] || {};

    const labels = data.labelAnnotations || [];
    const objects = data.localizedObjectAnnotations || [];

    const results = [
      ...labels.map((l) => ({
        name: l.description.toLowerCase(),
        confidence: l.score,
      })),
      ...objects.map((o) => ({
        name: o.name.toLowerCase(),
        confidence: o.score,
      }))
    ];

    return res.json({
      success: true,
      ingredients: results,
    });

  } catch (error) {
    console.error("VISION ERROR:", error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      error: "AI classification failed",
      details: error.message,
    });
  }
};
