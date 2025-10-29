import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Quiz from '../components/Quiz';

interface QuizData {
  quizTitle: string;
  questions: {
    question: string;
    options: string[];
    correct: number;
  }[];
}

const QuizPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [quizData, setQuizData] = useState<QuizData | null>(null);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const response = await fetch(`/src/data/quizzes/${category}-quiz.json`);
        const quiz: QuizData = await response.json();
        setQuizData(quiz);
      } catch (error) {
        console.error('Error loading quiz:', error);
      }
    };

    if (category) {
      loadQuiz();
    }
  }, [category]);

  if (!quizData) {
    return <div className="container mt-4">Loading quiz...</div>;
  }

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-12">
          <Quiz quizData={quizData} />
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
