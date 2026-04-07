import dotenv from "dotenv";

dotenv.config();

const env = {
  port: process.env.PORT || 5001,
  mongodbUri: process.env.MONGODB_URI || "mongodb+srv://admin:aN9OdDijt0a5Xk2Y@cluster0.ndekypb.mongodb.net/",
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  openaiApiKey: process.env.OPENAI_API_KEY || "sk-njOBQ8d4sXQURg1BErjaxYLlOmMI2o0h4cMhjWKcReBWw13P",
  openaiModel: process.env.OPENAI_MODEL || "gpt-4o-mini",
};

export default env;
