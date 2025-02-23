import { policyActions, economicVariables, policyEffects, diagramData, economicEvents } from '../data/economicData';

// 获取所有有明确影响关系的政策问题
export const getRandomPolicyQuestion = () => {
  // 只从 policyEffects 中随机选择一个已定义的影响关系
  if (policyEffects.length === 0) return null;
  
  const randomEffect = policyEffects[Math.floor(Math.random() * policyEffects.length)];
  
  // 获取对应的政策和变量详细信息
  const policy = policyActions.find(p => p.id === randomEffect.policyId);
  const variable = economicVariables.find(v => v.id === randomEffect.variableId);
  
  return {
    questionType: 'policy',
    policy: policy.action,
    variable: variable.name,
    correctAnswer: randomEffect.effect,
    explanation: randomEffect.explanation
  };
};

// 获取所有有明确影响关系的事件问题
export const getRandomEventQuestion = () => {
  // 只从 economicEvents 中随机选择一个已定义的影响关系
  if (economicEvents.length === 0) return null;
  
  const randomEvent = economicEvents[Math.floor(Math.random() * economicEvents.length)];
  
  return {
    questionType: 'event',
    event: randomEvent.event,
    diagram: randomEvent.affectedDiagram,
    curve: randomEvent.affectedCurve,
    correctAnswer: randomEvent.effect,
    explanation: randomEvent.explanation
  };
};

// 获取随机问题（包括政策和事件）
export const getRandomQuestion = () => {
  // 随机选择问题类型
  const questionTypes = ['policy', 'event'];
  const randomType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
  
  if (randomType === 'policy') {
    return getRandomPolicyQuestion();
  } else {
    return getRandomEventQuestion();
  }
};

// 获取问题统计信息
export const getQuestionStats = () => {
  return {
    totalPolicyQuestions: policyEffects.length,
    totalEventQuestions: economicEvents.length,
    totalQuestions: policyEffects.length + economicEvents.length
  };
};