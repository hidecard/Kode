import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface QuizResult {
  score: number;
  total: number;
  completed: boolean;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  // Mock data - in real app, this would come from context/state management
  const userName = localStorage.getItem('userName') || 'Student';
  const quizResults: { [key: string]: QuizResult } = JSON.parse(localStorage.getItem('quizResults') || '{}');

  const completedQuizzes = Object.values(quizResults).filter(result => result.completed).length;
  const totalScore = Object.values(quizResults).reduce((sum, result) => sum + (result.score / result.total), 0);
  const averageScore = completedQuizzes > 0 ? (totalScore / completedQuizzes) * 100 : 0;

  const categories = [
    { key: 'html', title: 'HTML Basics', icon: 'bi bi-code-square', color: '#e34c26' },
    { key: 'css', title: 'CSS Styling', icon: 'bi bi-palette', color: '#264de4' },
    { key: 'bootstrap', title: 'Bootstrap', icon: 'bi bi-bootstrap', color: '#563d7c' },
    { key: 'javascript', title: 'JavaScript', icon: 'bi bi-braces', color: '#f7df1e' },
  ];

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return '#10b981';
    if (percentage >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const getScoreIcon = (percentage: number) => {
    if (percentage >= 80) return 'bi-trophy-fill';
    if (percentage >= 60) return 'bi-star-fill';
    return 'bi-arrow-repeat';
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card-premium">
            <div className="card-body">
              {/* Header */}
              <div className="text-center mb-5">
                <div className="mb-3">
                  <i className="bi bi-bar-chart-fill text-primary" style={{ fontSize: '3rem' }}></i>
                </div>
                <h1 className="display-5 fw-bold mb-3 text-dark">Quiz Dashboard</h1>
                <p className="lead text-muted">Track your progress and performance across all quizzes</p>
                <div className="d-inline-flex align-items-center gap-2 p-3 rounded-pill" style={{
                  background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(5,150,105,0.1))',
                  border: '1px solid rgba(16,185,129,0.2)'
                }}>
                  <i className="bi bi-person-circle text-success"></i>
                  <span className="fw-bold text-success">{userName}</span>
                </div>
              </div>

              {/* Overall Stats */}
              <div className="row g-4 mb-5">
                <div className="col-md-4">
                  <div className="card-premium text-center h-100">
                    <div className="card-body">
                      <div className="mb-3">
                        <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '2.5rem' }}></i>
                      </div>
                      <h3 className="fw-bold text-success">{completedQuizzes}/3</h3>
                      <p className="text-muted mb-0">Quizzes Completed</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card-premium text-center h-100">
                    <div className="card-body">
                      <div className="mb-3">
                        <i className="bi bi-graph-up text-primary" style={{ fontSize: '2.5rem' }}></i>
                      </div>
                      <h3 className="fw-bold text-primary">{averageScore.toFixed(1)}%</h3>
                      <p className="text-muted mb-0">Average Score</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card-premium text-center h-100">
                    <div className="card-body">
                      <div className="mb-3">
                        <i className={`bi ${getScoreIcon(averageScore)}`} style={{
                          fontSize: '2.5rem',
                          color: getScoreColor(averageScore)
                        }}></i>
                      </div>
                      <h3 className="fw-bold" style={{ color: getScoreColor(averageScore) }}>
                        {averageScore >= 80 ? 'Excellent' : averageScore >= 60 ? 'Good' : 'Keep Trying'}
                      </h3>
                      <p className="text-muted mb-0">Performance Level</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Individual Quiz Results */}
              <div className="mb-5">
                <h2 className="h4 fw-bold mb-4 text-dark">Individual Quiz Results</h2>
                <div className="row g-4">
                  {categories.map((cat) => {
                    const result = quizResults[cat.key];
                    const isCompleted = result?.completed;
                    const scorePercentage = result ? (result.score / result.total) * 100 : 0;

                    return (
                      <div key={cat.key} className="col-md-4">
                        <div className="card-premium h-100">
                          <div className="card-body text-center">
                            <div className="mb-3">
                              <div style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '50%',
                                background: isCompleted
                                  ? `linear-gradient(135deg, ${getScoreColor(scorePercentage)}, ${getScoreColor(scorePercentage)}dd)`
                                  : 'linear-gradient(135deg, #e5e7eb, #d1d5db)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto',
                                color: 'white',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                              }}>
                                {isCompleted ? (
                                  <i className={`bi ${getScoreIcon(scorePercentage)}`} style={{ fontSize: '1.5rem' }}></i>
                                ) : (
                                  <i className={cat.icon} style={{ fontSize: '1.5rem' }}></i>
                                )}
                              </div>
                            </div>

                            <h5 className="card-title fw-bold text-dark">{cat.title}</h5>

                            {isCompleted ? (
                              <div className="mb-3">
                                <div className="display-6 fw-bold mb-2" style={{ color: getScoreColor(scorePercentage) }}>
                                  {scorePercentage.toFixed(0)}%
                                </div>
                                <small className="text-muted">
                                  {result.score}/{result.total} correct answers
                                </small>
                              </div>
                            ) : (
                              <div className="mb-3">
                                <div className="text-muted mb-2">Not attempted yet</div>
                                <small className="text-muted">Complete the quiz to see results</small>
                              </div>
                            )}

                            <button
                              className={`btn w-100 ${isCompleted ? 'btn-outline-primary' : 'btn-premium'}`}
                              onClick={() => navigate(`/quiz/${cat.key}`)}
                            >
                              {isCompleted ? 'Retake Quiz' : 'Start Quiz'}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Progress Visualization */}
              {completedQuizzes > 0 && (
                <div className="mb-5">
                  <h2 className="h4 fw-bold mb-4 text-dark">Score Distribution</h2>
                  <div className="card-premium">
                    <div className="card-body">
                      <div className="row g-3">
                        {Object.entries(quizResults).map(([key, result]: [string, QuizResult]) => {
                          if (!result.completed) return null;
                          const percentage = (result.score / result.total) * 100;

                          return (
                            <div key={key} className="col-12">
                              <div className="d-flex align-items-center gap-3">
                                <div className="flex-grow-1">
                                  <div className="d-flex justify-content-between align-items-center mb-1">
                                    <span className="fw-medium text-capitalize">{key}</span>
                                    <span className="text-muted small">{percentage.toFixed(0)}%</span>
                                  </div>
                                  <div className="progress" style={{ height: '8px' }}>
                                    <div
                                      className="progress-bar"
                                      style={{
                                        width: `${percentage}%`,
                                        background: `linear-gradient(90deg, ${getScoreColor(percentage)}, ${getScoreColor(percentage)}dd)`
                                      }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="text-center">
                <div className="d-flex justify-content-center gap-3 flex-wrap">
                  {completedQuizzes === 3 && (
                    <button
                      className="btn btn-premium btn-lg"
                      onClick={() => navigate('/certificate')}
                    >
                      <i className="bi bi-award me-2"></i>Get Certificate
                    </button>
                  )}
                  <button
                    className="btn btn-ghost btn-lg"
                    onClick={() => navigate('/')}
                  >
                    <i className="bi bi-house me-2"></i>Back to Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
