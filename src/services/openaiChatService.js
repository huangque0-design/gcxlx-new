import fetch from "node-fetch";   // ⭐ 新加
import { HttpsProxyAgent } from "https-proxy-agent"; // ⭐ 如果还没加
import env from "../config/env.js";

import {
  getSystemPrompt,
  normalizePersonalityType,
  PERSONALITY_LABELS,
  PERSONALITY_TYPES,
} from "../prompts/chatPrompts.js";

// ⭐ 放在 import 之后
// console.log("OPENAI KEY:", env.openaiApiKey);

// ⭐ 创建代理
//const agent = new HttpsProxyAgent("http://127.0.0.1:63338");

function buildMockReply({ personalityType, latestUserMessage }) {
  const trimmedMessage = latestUserMessage?.trim() || "请继续描述你的思路。";

  if (personalityType === PERSONALITY_TYPES.LOW) {
    return [
      "这一步推理有问题。",
      `你刚才提到“${trimmedMessage}”，但这还不能充分支持你的结论。`,
      "你应该重新考虑这一步，先明确你的前提，再说明它如何导向当前判断。",
    ].join("");
  }

  return [
    "这是个很好的想法。",
    `你提到“${trimmedMessage}”，说明你已经抓住了当前推理中的一个关键点。`,
    "我们一起想一想这一步的前提是否充分，以及还有没有别的解释路径。",
  ].join("");
}

function toOpenAIMessages(messages, personalityType) {
  return [
    {
      role: "system",
      content: getSystemPrompt(personalityType),
    },
    ...messages.map((message) => ({
      role: message.role,
      content: message.content,
    })),
  ];
}

async function requestOpenAIChatCompletion(messages) {
  const response = await fetch("https://sg.uiuiapi.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.openaiApiKey}`,
    },
    body: JSON.stringify({
      model: env.openaiModel,
      messages,
      temperature: 0.7,
    }),
    //agent, // ⭐关键：让请求走代理
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API request failed: ${errorText}`);
  }

  return response.json();
}

export async function generateChatReply({ personalityType, messages }) {
  const normalizedType = normalizePersonalityType(personalityType);
  const openaiMessages = toOpenAIMessages(messages, normalizedType);
  const latestUserMessage = [...messages].reverse().find((message) => message.role === "user")?.content || "";

  if (!env.openaiApiKey) {
    return {
      provider: "mock",
      personalityType: normalizedType,
      personalityLabel: PERSONALITY_LABELS[normalizedType],
      systemPrompt: getSystemPrompt(normalizedType),
      reply: buildMockReply({
        personalityType: normalizedType,
        latestUserMessage,
      }),
      openaiRequest: {
        model: env.openaiModel,
        messages: openaiMessages,
      },
    };
  }

  const completion = await requestOpenAIChatCompletion(openaiMessages);
  const reply = completion.choices?.[0]?.message?.content || "";

  return {
    provider: "openai",
    personalityType: normalizedType,
    personalityLabel: PERSONALITY_LABELS[normalizedType],
    systemPrompt: getSystemPrompt(normalizedType),
    reply,
    openaiRequest: {
      model: env.openaiModel,
      messages: openaiMessages,
    },
    raw: completion,
  };
}
