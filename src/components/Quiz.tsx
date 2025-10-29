import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation?: string;
}

interface QuizData {
  quizTitle: string;
  questions: Question[];
}

interface QuizProps {
  quizData: QuizData;
}

const Quiz: React.FC<QuizProps> = ({ quizData }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let score = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === quizData.questions[index].correct) score++;
    });
    return score;
  };

  const total = quizData.questions.length;
  const progress = Math.round(((currentQuestion) / total) * 100);

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="quiz-results text-center">
        <div className="card shadow-sm">
          <div className="card-body">
            <h4 className="mb-3">{quizData.quizTitle}</h4>
            <div className="display-6 text-success mb-3">{score} / {total}</div>
            <p className="text-muted mb-3">You scored {Math.round((score / total) * 100)}%</p>
            <button className="btn btn-outline-primary me-2" onClick={() => { setCurrentQuestion(0); setSelectedAnswers([]); setShowResults(false); }}>
              <i className="bi bi-arrow-repeat me-1"></i>Retake
            </button>
            <button className="btn btn-primary" onClick={() => window.location.reload()}>
              <i className="bi bi-house-door me-1"></i>Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = quizData.questions[currentQuestion];

  return (
    <div className="quiz">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h4 className="mb-0">{quizData.quizTitle}</h4>
        <small className="text-muted">Question {currentQuestion + 1} of {total}</small>
      </div>

      <div className="progress mb-3" style={{ height: 8 }}>
        <div className="progress-bar bg-success" role="progressbar" style={{ width: `${progress}%` }} />
      </div>

      <div className="card shadow-sm mb-3">
        <div className="card-body">
          <p className="mb-3"><strong>{question.question}</strong></p>
          <div className="options">
            {question.options.map((option, index) => (
              <div key={index} className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name={`quiz-option-${currentQuestion}`}
                  id={`option-${currentQuestion}-${index}`}
                  checked={selectedAnswers[currentQuestion] === index}
                  onChange={() => handleAnswerSelect(index)}
                />
                <label className="form-check-label" htmlFor={`option-${currentQuestion}-${index}`}>
                  {option}
                </label>
              </div>
            ))}
          </div>
          <div className="mt-3">
            <button
              className="btn btn-primary"
              onClick={nextQuestion}
              disabled={selectedAnswers[currentQuestion] === undefined}
            >
              {currentQuestion < total - 1 ? (<><i className="bi bi-chevron-right me-1"></i>Next</>) : (<><i className="bi bi-check-circle me-1"></i>Finish</>)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
