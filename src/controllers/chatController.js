import { successResponse } from "../utils/response.js";
import {
  PERSONALITY_LABELS,
  PERSONALITY_TYPES,
  SYSTEM_PROMPT_TEMPLATES,
} from "../prompts/chatPrompts.js";
import { generateChatReply } from "../services/openaiChatService.js";

export function getChatConfig(_req, res) {
  res.json(
    successResponse({
      defaultPersonalityType: PERSONALITY_TYPES.HIGH,
      supportedPersonalities: [
        {
          value: PERSONALITY_TYPES.HIGH,
          label: PERSONALITY_LABELS[PERSONALITY_TYPES.HIGH],
        },
        {
          value: PERSONALITY_TYPES.LOW,
          label: PERSONALITY_LABELS[PERSONALITY_TYPES.LOW],
        },
      ],
      messageLimit: 10,
      promptTemplates: SYSTEM_PROMPT_TEMPLATES,
    }),
  );
}

export async function submitChatMessage(req, res, next) {
  try {
    const result = await generateChatReply({
      personalityType: req.body?.personality_type,
      messages: req.body?.messages || [],
    });

    res.status(201).json(
      successResponse(
        {
          personality_type: result.personalityType,
          personality_label: result.personalityLabel,
          system_prompt: result.systemPrompt,
          provider: result.provider,
          openai_request: result.openaiRequest,
          assistant_message: {
            role: "assistant",
            content: result.reply,
          },
        },
        "聊天消息已处理",
      ),
    );
  } catch (error) {
    next(error);
  }
}
