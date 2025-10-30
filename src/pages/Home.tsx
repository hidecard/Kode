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
    <div className="hero">
      <div className="container">
        <div className="row justify-content-center mb-4">
          <div className="col-lg-10">
            <div className="glass">
              <div className="d-flex flex-column-reverse flex-md-row align-items-center gap-4">
                <div style={{ flex: 1 }}>
                  <h1 className="display-4 fw-bold text-white mb-2">Master Web Skills — Interactive Quizzes</h1>
                  <p className="lead text-white-50 mb-3">Curated quizzes and live try-it editors to sharpen your HTML, CSS and Bootstrap skills.</p>
                  <div className="d-flex gap-2 flex-wrap">
                    <Link to="/quiz/html" className="btn btn-warning btn-lg btn-premium text-dark shadow-sm">Start HTML</Link>
                    <Link to="/quiz/css" className="btn btn-lg btn-outline-light btn-premium shadow-sm">Start CSS</Link>
                  </div>
                </div>

                <div style={{ minWidth: 220, textAlign: 'center' }}>
                  <div style={{ fontSize: 96, color: 'rgba(255,215,0,0.12)' }}>
                    <i className="bi bi-code-slash"></i>
                  </div>
                  <div className="text-white-50 small mt-2">Practice · Learn · Repeat</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Use the requested grid template here */}
        <div className="container">
          <div className="cards-grid">
            {categories.map(cat => (
              <div key={cat.key}>
                <div className="card-premium">
                  <div className="d-flex align-items-center mb-3">
                    <i className={`${cat.icon} text-warning`} style={{ fontSize: 28 }} />
                    <h5 className="mb-0 ms-3 text-white">{cat.title}</h5>
                  </div>
                  <p className="text-white-50 mb-4">{cat.desc}</p>
                  <div className="mt-auto d-flex gap-2">
                    <Link to={`/quiz/${cat.key}`} className="btn btn-ghost btn-premium">Choose Level</Link>
                    <Link to={`/quiz/${cat.key}`} className="btn btn-warning btn-premium text-dark">Quick Start</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-5">
          <div className="badge bg-transparent text-white-50" style={{ padding: '0.8rem 1.4rem', borderRadius: 999 }}>
            <i className="bi bi-lightbulb-fill text-warning me-2"></i>
            <strong>Pro tip:</strong> Try the "Choose Level" to pick difficulty and track progress.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
