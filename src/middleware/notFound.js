import { errorResponse } from "../utils/response.js";

export function notFound(_req, res) {
  res.status(404).json(errorResponse("接口不存在"));
}

