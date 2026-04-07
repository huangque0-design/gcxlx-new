import { Router } from "express";
import { getChatConfig, submitChatMessage } from "../controllers/chatController.js";
import { validateChatRequest } from "../validators/chatValidator.js";

const router = Router();

router.get("/config", getChatConfig);
router.post("/message", validateChatRequest, submitChatMessage);

export default router;
