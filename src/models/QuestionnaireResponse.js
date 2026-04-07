import mongoose from "mongoose";

const questionnaireResponseSchema = new mongoose.Schema(
  {
    participantId: { type: String, required: true },
    scaleName: { type: String, required: true, default: "neuroticism" },
    answers: [
      {
        itemId: { type: String, required: true },
        value: { type: Number, required: true },
      },
    ],
    score: Number,
    classification: {
      type: String,
      enum: ["high", "low"],
    },
    durationMs: Number,
  },
  { timestamps: true },
);

export default mongoose.model("QuestionnaireResponse", questionnaireResponseSchema);
