import { Router } from "express";
import {
  getQuestionnaireDefinition,
  submitQuestionnaire,
} from "../controllers/questionnaireController.js";
import { validateQuestionnaireSubmission } from "../validators/questionnaireValidator.js";

const router = Router();

router.get("/:scaleName", getQuestionnaireDefinition);
router.post("/:scaleName/submit", validateQuestionnaireSubmission, submitQuestionnaire);

export default router;
