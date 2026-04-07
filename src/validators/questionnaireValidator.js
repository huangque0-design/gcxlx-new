import { getQuestionnaireDefinitionByScale } from "../constants/questionnaires.js";

export function validateQuestionnaireSubmission(req, _res, next) {
  const { scaleName } = req.params;
  const definition = getQuestionnaireDefinitionByScale(scaleName);

  if (!definition) {
    const error = new Error("未找到对应问卷");
    error.statusCode = 404;
    return next(error);
  }

  const { answers, participantId, durationMs } = req.body || {};

  if (!participantId || typeof participantId !== "string") {
    const error = new Error("participantId 为必填字段");
    error.statusCode = 400;
    return next(error);
  }

  if (!Array.isArray(answers) || answers.length !== definition.items.length) {
    const error = new Error("answers 数量与问卷题目数量不一致");
    error.statusCode = 400;
    return next(error);
  }

  const validIds = new Set(definition.items.map((item) => item.id));
  const hasInvalidAnswer = answers.some(
    (answer) =>
      !answer ||
      !validIds.has(answer.itemId) ||
      !Number.isInteger(answer.value) ||
      answer.value < 1 ||
      answer.value > 5,
  );

  if (hasInvalidAnswer) {
    const error = new Error("answers 中存在无效题目或分值");
    error.statusCode = 400;
    return next(error);
  }

  if (durationMs !== undefined && (!Number.isFinite(durationMs) || durationMs < 0)) {
    const error = new Error("durationMs 必须为非负数");
    error.statusCode = 400;
    return next(error);
  }

  return next();
}
