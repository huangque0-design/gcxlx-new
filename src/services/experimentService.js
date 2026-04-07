export function buildExperimentProfile(participant = null) {
  return {
    participantCode: participant?.participantCode || null,
    aiPersonaVariants: ["high_agreeableness", "low_agreeableness"],
    questionnaires: ["neuroticism"],
    taskBatches: ["logic_puzzles"],
  };
}

