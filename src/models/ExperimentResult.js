import mongoose from "mongoose";

const chatEntrySchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["system", "user", "assistant"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    turnIndex: Number,
    timestamp: Date,
  },
  { _id: false },
);

const experimentResultSchema = new mongoose.Schema(
  {
    participantId: {
      type: String,
      required: true,
      index: true,
    },
    sessionId: {
      type: String,
      default: null,
      index: true,
    },
    experimentCondition: {
      neuroticismLevel: {
        type: String,
        enum: ["high", "low"],
        required: true,
        index: true,
      },
      aiAgreeableness: {
        type: String,
        enum: ["high", "low"],
        required: true,
        index: true,
      },
    },
    questionnaire: {
      scaleName: {
        type: String,
        default: "neuroticism",
      },
      score: Number,
      classification: {
        type: String,
        enum: ["high", "low"],
      },
    },
    task: {
      taskId: {
        type: String,
        required: true,
        index: true,
      },
      taskType: {
        type: String,
        default: "logic_puzzle",
      },
      answer: mongoose.Schema.Types.Mixed,
      isCorrect: {
        type: Boolean,
        required: true,
      },
      startedAt: Date,
      endedAt: Date,
      responseTimeMs: {
        type: Number,
        required: true,
        min: 0,
      },
    },
    chat: {
      history: {
        type: [chatEntrySchema],
        default: [],
      },
      messageCount: {
        type: Number,
        default: 0,
      },
    },
    analysisRow: {
      factorNeuroticism: {
        type: String,
        enum: ["high", "low"],
        required: true,
      },
      factorAiAgreeableness: {
        type: String,
        enum: ["high", "low"],
        required: true,
      },
      dependentAccuracy: {
        type: Number,
        enum: [0, 1],
        required: true,
      },
      dependentResponseTimeMs: {
        type: Number,
        required: true,
        min: 0,
      },
    },
  },
  { timestamps: true },
);

experimentResultSchema.index({ participantId: 1, "task.taskId": 1, createdAt: -1 });
experimentResultSchema.index({
  "experimentCondition.neuroticismLevel": 1,
  "experimentCondition.aiAgreeableness": 1,
  "task.taskId": 1,
});

export default mongoose.model("ExperimentResult", experimentResultSchema);
