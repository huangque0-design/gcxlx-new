import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    participantId: { type: mongoose.Schema.Types.ObjectId, ref: "Participant", required: true },
    status: {
      type: String,
      enum: ["created", "questionnaire", "chat", "tasks", "completed"],
      default: "created",
    },
    startedAt: Date,
    completedAt: Date,
    totalDurationMs: Number,
    logs: [
      {
        eventType: String,
        payload: mongoose.Schema.Types.Mixed,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("Session", sessionSchema);

