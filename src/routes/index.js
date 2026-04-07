import { Router } from "express";
import chatRoutes from "./chatRoutes.js";
import questionnaireRoutes from "./questionnaireRoutes.js";
import resultRoutes from "./resultRoutes.js";
import sessionRoutes from "./sessionRoutes.js";
import taskRoutes from "./taskRoutes.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ success: true, message: "server is running" });
});

router.use("/sessions", sessionRoutes);
router.use("/questionnaires", questionnaireRoutes);
router.use("/chat", chatRoutes);
router.use("/tasks", taskRoutes);
router.use("/results", resultRoutes);

export default router;
