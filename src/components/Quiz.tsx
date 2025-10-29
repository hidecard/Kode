import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface Question {
  question: string;
  options: string[];
  correct: number;
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
      if (answer === quizData.questions[index].correct) {
        score++;
      }
    });
    return score;
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="quiz-results">
        <h4>Quiz Results</h4>
        <p>You scored {score} out of {quizData.questions.length}</p>
        <button className="btn btn-primary" onClick={() => {
          setCurrentQuestion(0);
          setSelectedAnswers([]);
          setShowResults(false);
        }}>
          <i className="bi bi-arrow-repeat me-1"></i>Retake Quiz
        </button>
      </div>
    );
  }

  const question = quizData.questions[currentQuestion];

  return (
    <div className="quiz">
      <h4>{quizData.quizTitle}</h4>
      <div className="question">
        <p><strong>Question {currentQuestion + 1}:</strong> {question.question}</p>
        <div className="options">
          {question.options.map((option, index) => (
            <div key={index} className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="quiz-option"
                id={`option-${index}`}
                checked={selectedAnswers[currentQuestion] === index}
                onChange={() => handleAnswerSelect(index)}
              />
              <label className="form-check-label" htmlFor={`option-${index}`}>
                {option}
              </label>
            </div>
          ))}
        </div>
        <button
          className="btn btn-primary mt-3"
          onClick={nextQuestion}
          disabled={selectedAnswers[currentQuestion] === undefined}
        >
          {currentQuestion < quizData.questions.length - 1 ? (
            <>
              <i className="bi bi-chevron-right me-1"></i>Next
            </>
          ) : (
            <>
              <i className="bi bi-check-circle me-1"></i>Finish
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
