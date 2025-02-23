import React, { useState, useEffect } from 'react';

const QuestionManager = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    type: 'policy',
    action: '',
    target: '',
    correctEffect: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // API call to add new question
  };

  return (
    <div className="question-manager">
      <h2>题目管理</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={newQuestion.type}
          onChange={(e) => setNewQuestion({...newQuestion, type: e.target.value})}
        >
          <option value="policy">Policy Action</option>
          <option value="diagram">Diagram Change</option>
        </select>
        {/* 其他输入字段 */}
      </form>
      
      <div className="questions-list">
        {/* 显示现有题目列表 */}
      </div>
    </div>
  );
};

export default QuestionManager;