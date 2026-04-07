import { Router } from "express";
import { getExperimentResults, saveExperimentResult } from "../controllers/resultController.js";
import { validateSaveResult } from "../validators/resultValidator.js";

const router = Router();

router.get("/", getExperimentResults);
router.post("/", validateSaveResult, saveExperimentResult);

export default router;
