import { successResponse } from "../utils/response.js";
import TaskRecord from "../models/TaskRecord.js";

export function getTaskSet(_req, res) {
  res.json(
    successResponse({
      batchName: "logic_puzzles",
      tasks: [],
    }),
  );
}

export async function submitTaskResult(req, res, next) {
  try {
    const { participantId, sessionId, taskId, taskType, answer, isCorrect, hintsUsed, timing } = req.body || {};

    const record = await TaskRecord.create({
      participantId,
      sessionId: sessionId || undefined,
      taskId,
      taskType,
      answer,
      isCorrect,
      hintsUsed: hintsUsed || 0,
      startedAt: timing?.startedAt || null,
      endedAt: timing?.endedAt || null,
      durationMs: timing?.durationMs ?? null,
      timing: timing
        ? {
            startedAt: timing.startedAt || null,
            endedAt: timing.endedAt || null,
            durationMs: timing.durationMs ?? null,
            chatTimestamps: Array.isArray(timing.chatTimestamps)
              ? timing.chatTimestamps.map((entry) => ({
                  type: entry.type,
                  timestamp: entry.timestamp,
                  elapsedMs: entry.elapsedMs,
                  meta: entry.meta || {},
                }))
              : [],
          }
        : undefined,
    });

    res.status(201).json(
      successResponse(
        {
          taskRecordId: record._id,
          timing: record.timing,
        },
        "任务结果已接收",
      ),
    );
  } catch (error) {
    next(error);
  }
}
