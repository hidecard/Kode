import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Home: React.FC = () => {
  return (
    <div className="container-fluid py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="p-5 rounded shadow-lg text-center" style={{ background: 'linear-gradient(180deg,#e6fff0,#f8fff8)' }}>
            <h1 className="display-4 text-success mb-3">
              <i className="bi bi-mortarboard-fill me-3"></i>
              Web Learning Platform
            </h1>
            <p className="lead text-muted mb-4">Premium interactive lessons and quizzes for HTML, CSS and Bootstrap — learn by doing.</p>

            <div className="d-flex justify-content-center gap-3">
              <a className="btn btn-success btn-lg" href="/" onClick={(e) => e.preventDefault()}>
                <i className="bi bi-play-btn me-2"></i>Get Started
              </a>
              <a className="btn btn-outline-success btn-lg" href="/" onClick={(e) => e.preventDefault()}>
                <i className="bi bi-journal-text me-2"></i>Browse Lessons
              </a>
            </div>
          </div>

          <div className="row g-4 mt-5">
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body text-center">
                  <i className="bi bi-code-square text-success" style={{ fontSize: '3rem' }}></i>
                  <h5 className="card-title mt-3">HTML Basics</h5>
                  <p className="card-text text-muted">Structure the web with semantic HTML.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body text-center">
                  <i className="bi bi-palette text-success" style={{ fontSize: '3rem' }}></i>
                  <h5 className="card-title mt-3">CSS Styling</h5>
                  <p className="card-text text-muted">Create beautiful, responsive layouts.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body text-center">
                  <i className="bi bi-bootstrap text-success" style={{ fontSize: '3rem' }}></i>
                  <h5 className="card-title mt-3">Bootstrap Framework</h5>
                  <p className="card-text text-muted">Fast prototypes with Bootstrap components.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-5">
            <div className="alert alert-success shadow-sm" role="alert">
              <i className="bi bi-lightbulb me-2"></i>
              <strong>Pro tip:</strong> Use the Try it editor to experiment with code in real time.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
