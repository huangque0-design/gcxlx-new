import { normalizePersonalityType } from "../prompts/chatPrompts.js";

export function validateChatRequest(req, _res, next) {
  const { personality_type: personalityType, messages } = req.body || {};

  if (!Array.isArray(messages) || messages.length === 0) {
    const error = new Error("messages 必须是非空数组");
    error.statusCode = 400;
    return next(error);
  }

  const invalidMessage = messages.find(
    (message) =>
      !message ||
      !["user", "assistant", "system"].includes(message.role) ||
      typeof message.content !== "string" ||
      !message.content.trim(),
  );

  if (invalidMessage) {
    const error = new Error("messages 中存在无效消息");
    error.statusCode = 400;
    return next(error);
  }

  req.body.personality_type = normalizePersonalityType(personalityType);
  return next();
}
