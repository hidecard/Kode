import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Home: React.FC = () => {
  const [userName, setUserName] = useState('');

  const categories = [
    { key: 'html', title: 'HTML Basics', icon: 'bi bi-code-square', desc: 'Structure the web with semantic HTML.' },
    { key: 'css', title: 'CSS Styling', icon: 'bi bi-palette', desc: 'Create beautiful, responsive layouts.' },
    { key: 'bootstrap', title: 'Bootstrap', icon: 'bi bi-bootstrap', desc: 'Fast prototypes with Bootstrap components.' },
    { key: 'javascript', title: 'JavaScript', icon: 'bi bi-braces', desc: 'Add interactivity and dynamic behavior.' },
  ];




  const quizResults: { [key: string]: { score: number; total: number; completed: boolean } } = JSON.parse(localStorage.getItem('quizResults') || '{}');
  const completedQuizzes = Object.values(quizResults).filter(result => result.completed).length;
  const totalScore = Object.values(quizResults).reduce((sum, result) => sum + (result.score / result.total), 0);
  const averageScore = completedQuizzes > 0 ? (totalScore / completedQuizzes) * 100 : 0;

  return (
    <div className="container-fluid mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card-premium">
            <div className="card-body">
              {/* User Name Input Section */}
              <div className="text-center mb-4 fade-in-up">
                <div className="d-inline-flex align-items-center gap-3 p-3 rounded-pill" style={{
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1))',
                  border: '1px solid rgba(99,102,241,0.2)',
                  boxShadow: '0 4px 12px rgba(99,102,241,0.15)'
                }}>
                  <i className="bi bi-person-circle text-primary" style={{ fontSize: '1.5rem' }}></i>
                  <input
                    type="text"
                    className="form-control border-0 bg-transparent text-center fw-bold"
                    placeholder="Enter your name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    style={{ fontSize: '1.1rem', color: '#1e293b' }}
                  />
                </div>
              </div>

              {/* Welcome Message */}
              {userName && (
                <div className="text-center mb-5">
                  <h2 className="display-6 fw-bold text-dark mb-3">Welcome, {userName}!</h2>
                  <p className="lead text-muted">Ready to start your web development journey?</p>
                </div>
              )}

              {/* Categories Section */}
              <div className="row g-4">
                {categories.map(cat => (
                  <div key={cat.key} className="col-md-4">
                    <div className="card h-100 border-0 shadow-sm hover-lift" style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(248,250,252,0.9))',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '16px',
                      transition: 'all 0.3s ease'
                    }}>
                      <div className="card-body text-center p-4">
                        <div className="mb-3">
                          <i className={cat.icon} style={{ fontSize: '3rem', color: '#6366f1' }}></i>
                        </div>
                        <h5 className="card-title fw-bold text-dark mb-3">{cat.title}</h5>
                        <p className="card-text text-muted mb-4">{cat.desc}</p>
                        <div className="d-grid gap-2">
                          <Link
                            to={`/${cat.key}/1`}
                            className="btn btn-premium btn-lg"
                          >
                            <i className="bi bi-book me-2"></i>Start Learning
                          </Link>
                          <Link
                            to={`/quiz/${cat.key}`}
                            className="btn btn-outline-primary btn-lg"
                          >
                            <i className="bi bi-question-circle me-2"></i>Take Quiz
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress Section */}
              {completedQuizzes > 0 && (
                <div className="mt-5 pt-4 border-top">
                  <div className="text-center mb-4">
                    <h4 className="fw-bold text-dark">Your Progress</h4>
                    <p className="text-muted">Keep going! You're doing great.</p>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-md-6">
                      <div className="card border-0 shadow-sm" style={{
                        background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(5,150,105,0.1))',
                        borderRadius: '16px'
                      }}>
                        <div className="card-body text-center p-4">
                          <div className="mb-3">
                            <i className="bi bi-trophy-fill text-success" style={{ fontSize: '2.5rem' }}></i>
                          </div>
                          <h3 className="fw-bold text-dark mb-2">{completedQuizzes}/3</h3>
                          <p className="text-muted mb-2">Quizzes Completed</p>
                          <div className="progress mb-3" style={{ height: '8px' }}>
                            <div
                              className="progress-bar bg-success"
                              style={{ width: `${(completedQuizzes / 3) * 100}%` }}
                            ></div>
                          </div>
                          <p className="text-muted small mb-0">Average Score: {averageScore.toFixed(1)}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {completedQuizzes === 3 && (
                    <div className="text-center mt-4">
                      <Link to="/certificate" className="btn btn-premium btn-lg">
                        <i className="bi bi-award me-2"></i>Get Your Certificate!
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Footer */}
              <div className="text-center mt-5 pt-4 border-top">
                <p className="text-muted small">
                  Learn HTML, CSS, and Bootstrap through interactive lessons and quizzes.
                  <br />
                  Build your web development skills one step at a time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
