import cors from "cors";
import express from "express";
import morgan from "morgan";
import env from "./config/env.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFound } from "./middleware/notFound.js";
import apiRoutes from "./routes/index.js";

const app = express();

app.use(
  cors({
    origin: "https://gcxlx-frontend.vercel.app"
  }),
  //cors({ origin: "*" })
);
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", apiRoutes);
app.use(notFound);
app.use(errorHandler);

export default app;

