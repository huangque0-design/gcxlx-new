export const NEUROTICISM_SCALE = {
  scaleName: "neuroticism",
  title: "神经质量表",
  description: "请根据你最近一段时间的一般感受进行作答，1 表示非常不同意，5 表示非常同意。",
  likertOptions: [
    { value: 1, label: "非常不同意" },
    { value: 2, label: "不同意" },
    { value: 3, label: "一般" },
    { value: 4, label: "同意" },
    { value: 5, label: "非常同意" },
  ],
  medianSplitScore: 30,
  items: [
    { id: "n1", text: "我经常感到焦虑不安。" },
    { id: "n2", text: "我会反复担心很多事情。" },
    { id: "n3", text: "面对压力时，我很容易紧张。" },
    { id: "n4", text: "我常常会因为小事感到烦躁。" },
    { id: "n5", text: "我容易感到情绪低落。" },
    { id: "n6", text: "我经常怀疑事情会朝不好的方向发展。" },
    { id: "n7", text: "当事情出错时，我会想很久。" },
    { id: "n8", text: "我很难让自己放松下来。" },
    { id: "n9", text: "我容易因为不确定性而担忧。" },
    { id: "n10", text: "我比大多数人更容易受到负面情绪影响。" },
  ],
};

export function getQuestionnaireDefinitionByScale(scaleName) {
  if (scaleName === NEUROTICISM_SCALE.scaleName) {
    return NEUROTICISM_SCALE;
  }

  return null;
}

export function classifyNeuroticism(score, medianSplitScore = NEUROTICISM_SCALE.medianSplitScore) {
  return score > medianSplitScore ? "high" : "low";
}
