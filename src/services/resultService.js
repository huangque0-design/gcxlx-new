export function buildAnalysisRow(payload) {
  return {
    factorNeuroticism: payload.experimentCondition.neuroticismLevel,
    factorAiAgreeableness: payload.experimentCondition.aiAgreeableness,
    dependentAccuracy: payload.task.isCorrect ? 1 : 0,
    dependentResponseTimeMs: payload.task.responseTimeMs,
  };
}

export function normalizeChatHistory(history = []) {
  return history.map((entry, index) => ({
    role: entry.role,
    content: entry.content,
    turnIndex: entry.turnIndex ?? index,
    timestamp: entry.timestamp || new Date(),
  }));
}
