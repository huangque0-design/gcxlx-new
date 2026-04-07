export function validateTaskSubmission(req, _res, next) {
  const { participantId, taskId, taskType, timing } = req.body || {};

  if (!participantId || typeof participantId !== "string") {
    const error = new Error("participantId 为必填字段");
    error.statusCode = 400;
    return next(error);
  }

  if (!taskId || typeof taskId !== "string") {
    const error = new Error("taskId 为必填字段");
    error.statusCode = 400;
    return next(error);
  }

  if (!taskType || typeof taskType !== "string") {
    const error = new Error("taskType 为必填字段");
    error.statusCode = 400;
    return next(error);
  }

  if (!timing || typeof timing !== "object") {
    const error = new Error("timing 为必填字段");
    error.statusCode = 400;
    return next(error);
  }

  if (!Number.isFinite(timing.durationMs) || timing.durationMs < 0) {
    const error = new Error("timing.durationMs 必须为非负毫秒数");
    error.statusCode = 400;
    return next(error);
  }

  return next();
}
