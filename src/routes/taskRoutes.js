import { Router } from "express";
import { getTaskSet, submitTaskResult } from "../controllers/taskController.js";
import { validateTaskSubmission } from "../validators/taskValidator.js";

const router = Router();

router.get("/", getTaskSet);
router.post("/submit", validateTaskSubmission, submitTaskResult);

export default router;
