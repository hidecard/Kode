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
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const total = quizData.questions.length;
  const q = quizData.questions[current];

  const selectOption = (idx: number) => {
    if (showAnswer) return; // lock once answered
    setSelected(idx);
  };

  const submitAnswer = () => {
    if (selected === null) return;
    const newAnswers = [...answers];
    newAnswers[current] = selected;
    setAnswers(newAnswers);
    setShowAnswer(true);
  };

  const next = () => {
    setShowAnswer(false);
    setSelected(null);
    if (current < total - 1) setCurrent(c => c + 1);
    else setShowResults(true);
  };

  const retake = () => {
    setCurrent(0); setSelected(null); setAnswers([]); setShowAnswer(false); setShowResults(false);
  };

  const score = answers.reduce((s, a, i) => (a === quizData.questions[i].correct ? s + 1 : s), 0);

  if (showResults) {
    return (
      <div className="text-center">
        <h3 className="mb-3">{quizData.quizTitle}</h3>
        <div className="display-5 text-primary mb-2" style={{ fontWeight: 700 }}>{score} / {total}</div>
        <p className="text-muted mb-3">You scored {Math.round((score / total) * 100)}%</p>
        <div className="d-flex justify-content-center gap-2">
          <button className="btn btn-outline-primary" onClick={retake}><i className="bi bi-arrow-repeat me-1"></i>Retake</button>
          <button className="btn btn-primary" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to Top</button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">{quizData.quizTitle}</h4>
        <small className="text-muted">Question {current + 1} of {total}</small>
      </div>

      <div className="progress mb-3" style={{ height: 12, background: '#e9ecef' }}>
        <div className="progress-bar bg-primary" role="progressbar" style={{ width: `${Math.round(((current) / total) * 100)}%`, transition: 'width .4s ease' }} />
      </div>

      <div className="card mb-3" style={{ borderRadius: 12 }}>
        <div className="card-body">
          <p className="mb-4 lead"><strong>{q.question}</strong></p>

          <div className="row g-3">
            {q.options.map((opt, i) => {
              const isSelected = selected === i;
              const isCorrect = q.correct === i;
              const showCorrect = showAnswer && isCorrect;
              const wrongSelected = showAnswer && isSelected && !isCorrect;

              const cls = [
                'quiz-option',
                isSelected ? 'selected' : '',
                showCorrect ? 'correct' : '',
                wrongSelected ? 'wrong' : ''
              ].join(' ').trim();

              return (
                <div key={i} className="col-12 col-md-6">
                  <div onClick={() => selectOption(i)} className={cls} aria-pressed={isSelected}>
                    <div className="d-flex align-items-center" style={{ width: '100%' }}>
                      <div className="badge-letter">{String.fromCharCode(65 + i)}</div>
                      <div style={{ flex: 1 }}>{opt}</div>
                      {showCorrect && <i className="bi bi-check-circle-fill ms-2" style={{ fontSize: 20 }} />}
                      {wrongSelected && <i className="bi bi-x-circle-fill ms-2" style={{ fontSize: 20 }} />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {showAnswer && (
            <div className="explanation">
              <strong>Explanation:</strong>
              <div className="text-muted mt-1">{q.explanation || 'No explanation available for this question.'}</div>
            </div>
          )}

          <div className="mt-4 d-flex">
            {!showAnswer ? (
              <button className="btn btn-primary" onClick={submitAnswer} disabled={selected === null}><i className="bi bi-check-lg me-1"></i>Check</button>
            ) : (
              <button className="btn btn-outline-secondary" onClick={next}><i className="bi bi-chevron-right me-1"></i>{current < total - 1 ? 'Next' : 'Finish'}</button>
            )}
            <div className="ms-auto text-muted align-self-center small">Progress: {current + 1}/{total}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
