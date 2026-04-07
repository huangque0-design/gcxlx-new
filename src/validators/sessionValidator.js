export function validateCreateSession(req, _res, next) {
  if (!req.body || typeof req.body !== "object") {
    const error = new Error("请求体不能为空");
    error.statusCode = 400;
    return next(error);
  }

  return next();
}

