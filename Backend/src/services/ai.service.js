const dotenv = require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

async function generateCaption(base64ImageFile) {
  const contents = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64ImageFile,
      },
    },
    { text: "Caption this image." },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config: {
      systemInstruction: "You are a professional social media content writer Generate a single, short, high-quality Instagram caption (1–2 lines max) based on the provided image or topic. The caption should, Include relevant emojis, Include 3–5 trendy SEO-friendly hashtags, Be engaging and scroll-stopping, Avoid generic phrases and avoid giving multiple options, Do not use markdown formatting or mention roles like Option 1, Only return the caption text — no introductions or explanations ",
    },
  });
  return response.text;
}
module.exports = generateCaption;
