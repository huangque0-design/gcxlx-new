import mongoose from "mongoose";

const participantSchema = new mongoose.Schema(
  {
    participantCode: { type: String, required: true, unique: true },
    condition: {
      aiAgreeableness: {
        type: String,
        enum: ["high", "low"],
        default: "high",
      },
      neuroticismGroup: {
        type: String,
        enum: ["unknown", "high", "low"],
        default: "unknown",
      },
    },
    demographics: {
      age: Number,
      gender: String,
      education: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Participant", participantSchema);

