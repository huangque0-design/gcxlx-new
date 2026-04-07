import { Router } from "express";
import { createSession, getSessionOverview } from "../controllers/sessionController.js";
import { validateCreateSession } from "../validators/sessionValidator.js";

const router = Router();

router.get("/:sessionId", getSessionOverview);
router.post("/", validateCreateSession, createSession);

export default router;

