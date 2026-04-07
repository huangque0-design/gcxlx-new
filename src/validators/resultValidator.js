function isValidCondition(value) {
  return value === "high" || value === "low";
}

export function validateSaveResult(req, _res, next) {
  const { participantId, experimentCondition, task } = req.body || {};

  if (!participantId || typeof participantId !== "string") {
    const error = new Error("participantId 为必填字符串");
    error.statusCode = 400;
    return next(error);
  }

  if (!experimentCondition || typeof experimentCondition !== "object") {
    const error = new Error("experimentCondition 为必填对象");
    error.statusCode = 400;
    return next(error);
  }

  if (!isValidCondition(experimentCondition.aiAgreeableness)) {
    const error = new Error("experimentCondition.aiAgreeableness 必须为 high 或 low");
    error.statusCode = 400;
    return next(error);
  }

  if (!task || typeof task !== "object") {
    const error = new Error("task 为必填对象");
    error.statusCode = 400;
    return next(error);
  }

  if (!task.taskId || typeof task.taskId !== "string") {
    const error = new Error("task.taskId 为必填字符串");
    error.statusCode = 400;
    return next(error);
  }

  if (typeof task.isCorrect !== "boolean") {
    const error = new Error("task.isCorrect 必须为布尔值");
    error.statusCode = 400;
    return next(error);
  }

  if (!Number.isFinite(task.responseTimeMs) || task.responseTimeMs < 0) {
    const error = new Error("task.responseTimeMs 必须为非负毫秒数");
    error.statusCode = 400;
    return next(error);
  }

  if (task.startedAt && Number.isNaN(new Date(task.startedAt).getTime())) {
    const error = new Error("task.startedAt 时间格式无效");
    error.statusCode = 400;
    return next(error);
  }

  if (task.endedAt && Number.isNaN(new Date(task.endedAt).getTime())) {
    const error = new Error("task.endedAt 时间格式无效");
    error.statusCode = 400;
    return next(error);
  }

  return next();
}
