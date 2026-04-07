import {
  classifyNeuroticism,
  getQuestionnaireDefinitionByScale,
} from "../constants/questionnaires.js";
import QuestionnaireResponse from "../models/QuestionnaireResponse.js";
import { successResponse } from "../utils/response.js";

export function getQuestionnaireDefinition(req, res, next) {
  const definition = getQuestionnaireDefinitionByScale(req.params.scaleName);

  if (!definition) {
    const error = new Error("未找到对应问卷");
    error.statusCode = 404;
    return next(error);
  }

  res.json(
    successResponse(definition),
  );
}

export async function submitQuestionnaire(req, res, next) {
  try {
    const definition = getQuestionnaireDefinitionByScale(req.params.scaleName);
    const { participantId, answers, durationMs } = req.body;

    const score = answers.reduce((sum, answer) => sum + answer.value, 0);
    const classification = classifyNeuroticism(score, definition.medianSplitScore);

    const record = await QuestionnaireResponse.create({
      participantId,
      scaleName: definition.scaleName,
      answers,
      score,
      classification,
      durationMs,
    });

    res.status(201).json(
      successResponse(
        {
          responseId: record._id,
          scaleName: definition.scaleName,
          score,
          classification,
          medianSplitScore: definition.medianSplitScore,
        },
        "问卷答案已接收",
      ),
    );
  } catch (error) {
    next(error);
  }
}
