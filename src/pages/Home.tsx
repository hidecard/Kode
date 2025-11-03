import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Home: React.FC = () => {
  const categories = [
    { key: 'html', title: 'HTML Basics', icon: 'bi bi-code-square', desc: 'Structure the web with semantic HTML.' },
    { key: 'css', title: 'CSS Styling', icon: 'bi bi-palette', desc: 'Create beautiful, responsive layouts.' },
    { key: 'bootstrap', title: 'Bootstrap', icon: 'bi bi-bootstrap', desc: 'Fast prototypes with Bootstrap components.' },
  ];

  return (
    <div className="container-fluid mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card-premium">
            <div className="card-body">
              <div className="row justify-content-center mb-5">
                <div className="col-lg-10">
                  <div className="fade-in-up">
                    <div className="d-flex flex-column-reverse flex-md-row align-items-center gap-4">
                      <div style={{ flex: 1 }}>
                        <h1 className="display-4 fw-bold mb-3 text-dark" style={{ fontSize: '2.5rem', lineHeight: '1.2' }}>
                          Master Web Skills — Interactive Quizzes
                        </h1>
                        <p className="lead mb-4 text-muted" style={{ fontSize: '1.1rem' }}>
                          Curated quizzes and live try-it editors to sharpen your HTML, CSS and Bootstrap skills.
                        </p>
                        <div className="d-flex gap-3 flex-wrap">
                          <Link to="/quiz/html" className="btn btn-premium btn-lg">Start HTML Quiz</Link>
                          <Link to="/quiz/css" className="btn btn-ghost btn-lg">Start CSS Quiz</Link>
                        </div>
                      </div>

                      <div style={{ minWidth: 240, textAlign: 'center' }}>
                        <div style={{
                          fontSize: 100,
                          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          marginBottom: '1rem'
                        }}>
                          <i className="bi bi-code-slash"></i>
                        </div>
                        <div className="text-muted" style={{ fontWeight: '500' }}>Practice · Learn · Repeat</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="cards-grid fade-in-up" style={{ animationDelay: '0.2s' }}>
                {categories.map((cat, index) => (
                  <div key={cat.key} style={{ animationDelay: `${0.3 + index * 0.1}s` }} className="fade-in-up">
                    <div className="card-premium">
                      <div className="d-flex align-items-center mb-3">
                        <div style={{
                          width: 48,
                          height: 48,
                          borderRadius: 'var(--radius-md)',
                          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          boxShadow: '0 4px 12px rgba(99,102,241,0.3), inset 0 2px 4px rgba(255,255,255,0.2)'
                        }}>
                          <i className={cat.icon} style={{ fontSize: 20 }} />
                        </div>
                        <h5 className="mb-0 ms-3 text-dark" style={{ fontWeight: '600' }}>{cat.title}</h5>
                      </div>
                      <p className="mb-4 text-muted">{cat.desc}</p>
                      <div className="mt-auto d-flex gap-2">
                        <Link to={`/quiz/${cat.key}`} className="btn btn-ghost btn-premium">Choose Level</Link>
                        <Link to={`/quiz/${cat.key}`} className="btn btn-premium">Quick Start</Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-5 fade-in-up" style={{ animationDelay: '0.6s' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1rem 1.5rem',
                  borderRadius: 999,
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  color: '#e2e8f0',
                  fontWeight: '500'
                }}>
                  <div style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '12px'
                  }}>
                    <i className="bi bi-lightbulb-fill"></i>
                  </div>
                  <strong className="text-dark">Pro tip:</strong> Try the "Choose Level" to pick difficulty and track progress.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
