import mongoose from "mongoose";

const taskRecordSchema = new mongoose.Schema(
  {
    participantId: { type: String, required: true },
    sessionId: { type: mongoose.Schema.Types.ObjectId, ref: "Session" },
    taskId: { type: String, required: true },
    taskType: { type: String, required: true },
    answer: mongoose.Schema.Types.Mixed,
    isCorrect: Boolean,
    startedAt: Date,
    endedAt: Date,
    durationMs: Number,
    timing: {
      startedAt: Date,
      endedAt: Date,
      durationMs: Number,
      chatTimestamps: [
        {
          type: String,
          timestamp: Date,
          elapsedMs: Number,
          meta: mongoose.Schema.Types.Mixed,
        },
      ],
    },
    hintsUsed: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.model("TaskRecord", taskRecordSchema);
