import { errorResponse } from "../utils/response.js";

export function errorHandler(err, _req, res, _next) {
  console.error(err);
  res.status(err.statusCode || 500).json(errorResponse(err.message || "服务器内部错误"));
}

