import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema(
  {
    participantId: { type: mongoose.Schema.Types.ObjectId, ref: "Participant", required: true },
    sessionId: { type: mongoose.Schema.Types.ObjectId, ref: "Session" },
    role: { type: String, enum: ["system", "user", "assistant"], required: true },
    content: { type: String, required: true },
    meta: {
      turnIndex: Number,
      aiPersona: String,
      timestampMs: Number,
    },
  },
  { timestamps: true },
);

export default mongoose.model("ChatMessage", chatMessageSchema);

