import ExperimentResult from "../models/ExperimentResult.js";
import QuestionnaireResponse from "../models/QuestionnaireResponse.js";
import { buildAnalysisRow, normalizeChatHistory } from "../services/resultService.js";
import { successResponse } from "../utils/response.js";

export async function saveExperimentResult(req, res, next) {
  try {
    const payload = req.body;
    const questionnaireResponse = await QuestionnaireResponse.findOne({
      participantId: payload.participantId,
      scaleName: "neuroticism",
    })
      .sort({ createdAt: -1 })
      .lean();

    if (!questionnaireResponse) {
      const error = new Error("请先完成问卷，再提交实验任务。");
      error.statusCode = 400;
      throw error;
    }

    const neuroticismLevel = questionnaireResponse.classification;
    const chatHistory = normalizeChatHistory(payload.chat?.history || []);
    const experimentCondition = {
      neuroticismLevel,
      aiAgreeableness: payload.experimentCondition.aiAgreeableness,
    };

    const result = await ExperimentResult.create({
      participantId: payload.participantId,
      sessionId: payload.sessionId || null,
      experimentCondition,
      questionnaire: {
        scaleName: questionnaireResponse.scaleName || "neuroticism",
        score: questionnaireResponse.score,
        classification: questionnaireResponse.classification,
      },
      task: {
        taskId: payload.task.taskId,
        taskType: payload.task.taskType || "logic_puzzle",
        answer: payload.task.answer,
        isCorrect: payload.task.isCorrect,
        startedAt: payload.task.startedAt || null,
        endedAt: payload.task.endedAt || null,
        responseTimeMs: payload.task.responseTimeMs,
      },
      chat: {
        history: chatHistory,
        messageCount: chatHistory.length,
      },
      analysisRow: buildAnalysisRow({
        experimentCondition,
        task: payload.task,
      }),
    });

    res.status(201).json(
      successResponse(
        {
          resultId: result._id,
          analysisRow: result.analysisRow,
        },
        "实验结果已保存",
      ),
    );
  } catch (error) {
    next(error);
  }
}

export async function getExperimentResults(req, res, next) {
  try {
    const query = {};
    const { participantId, neuroticismLevel, aiAgreeableness, taskId, limit = "100" } = req.query;

    if (participantId) {
      query.participantId = participantId;
    }

    if (neuroticismLevel) {
      query["experimentCondition.neuroticismLevel"] = neuroticismLevel;
    }

    if (aiAgreeableness) {
      query["experimentCondition.aiAgreeableness"] = aiAgreeableness;
    }

    if (taskId) {
      query["task.taskId"] = taskId;
    }

    const safeLimit = Math.min(Number(limit) || 100, 500);

    const results = await ExperimentResult.find(query).sort({ createdAt: -1 }).limit(safeLimit).lean();

    res.json(
      successResponse({
        count: results.length,
        results,
      }),
    );
  } catch (error) {
    next(error);
  }
}
