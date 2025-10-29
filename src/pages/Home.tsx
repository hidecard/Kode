import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Home: React.FC = () => {
  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="text-center mb-5">
            <h1 className="display-4 text-success mb-3">
              <i className="bi bi-mortarboard-fill me-3"></i>
              Web Learning Platform
            </h1>
            <p className="lead text-muted">Master HTML, CSS, and Bootstrap with interactive lessons and quizzes</p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-success">
                <div className="card-body text-center">
                  <i className="bi bi-code-square text-success" style={{ fontSize: '3rem' }}></i>
                  <h5 className="card-title mt-3">HTML Basics</h5>
                  <p className="card-text">Learn the fundamentals of HTML structure and elements.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-success">
                <div className="card-body text-center">
                  <i className="bi bi-palette text-success" style={{ fontSize: '3rem' }}></i>
                  <h5 className="card-title mt-3">CSS Styling</h5>
                  <p className="card-text">Master CSS properties, selectors, and responsive design.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-success">
                <div className="card-body text-center">
                  <i className="bi bi-bootstrap text-success" style={{ fontSize: '3rem' }}></i>
                  <h5 className="card-title mt-3">Bootstrap Framework</h5>
                  <p className="card-text">Build responsive websites with Bootstrap components.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-5">
            <div className="alert alert-success" role="alert">
              <i className="bi bi-lightbulb me-2"></i>
              <strong>Getting Started:</strong> Select a category from the sidebar to begin your learning journey!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
