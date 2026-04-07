import { successResponse } from "../utils/response.js";
import { buildExperimentProfile } from "../services/experimentService.js";

export function createSession(req, res) {
  res.status(201).json(
    successResponse(
      {
        sessionId: "mock-session-id",
        participantId: req.body?.participantId || null,
        profile: buildExperimentProfile(),
      },
      "实验会话创建成功",
    ),
  );
}

export function getSessionOverview(_req, res) {
  res.json(
    successResponse({
      status: "created",
      modules: ["questionnaire", "chat", "tasks", "summary"],
    }),
  );
}

