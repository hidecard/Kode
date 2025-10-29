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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadQuiz = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!category) throw new Error('Category missing');
        // dynamic import from src/data/quizzes
        const mod = await import(`../data/quizzes/${category.toLowerCase()}-quiz.json`);
        const quiz: QuizData = mod.default || mod;
        setQuizData(quiz);
      } catch (err) {
        console.error('Error loading quiz:', err);
        setError('Quiz not available for this category.');
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [category]);

  if (loading) {
    return <div className="container mt-4 text-center"><div className="spinner-border text-primary" role="status" /></div>;
  }

  if (error || !quizData) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger shadow-sm">
          <h5 className="mb-1">Unable to load quiz</h5>
          <p className="mb-0">{error || 'No quiz found.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-sm">
            <div className="card-body">
              <Quiz quizData={quizData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
