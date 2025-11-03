import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Certificate: React.FC = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mock data - in real app, this would come from context/state management
  const userName = localStorage.getItem('userName') || 'Student';
  const quizResults = JSON.parse(localStorage.getItem('quizResults') || '{}');

  const completedQuizzes = Object.values(quizResults).filter((result: any) => result.completed).length;
  const totalScore = Object.values(quizResults).reduce((sum: number, result: any) => sum + (result.score / result.total), 0);
  const averageScore = completedQuizzes > 0 ? (totalScore / completedQuizzes) * 100 : 0;

  // Redirect if not all quizzes completed
  React.useEffect(() => {
    if (completedQuizzes < 4) {
      navigate('/');
    }
  }, [completedQuizzes, navigate]);

  const generateCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 800, 600);
    gradient.addColorStop(0, '#6366f1');
    gradient.addColorStop(1, '#8b5cf6');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 600);

    // Add pattern overlay
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    for (let i = 0; i < 800; i += 60) {
      for (let j = 0; j < 600; j += 60) {
        ctx.beginPath();
        ctx.arc(i, j, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, 760, 560);

    // Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Certificate of Completion', 400, 100);

    // Subtitle
    ctx.font = '24px Arial';
    ctx.fillText('Web Development Quiz Series', 400, 140);

    // Award icon (simple star)
    ctx.beginPath();
    ctx.moveTo(400, 180);
    for (let i = 0; i < 5; i++) {
      ctx.lineTo(400 + 30 * Math.cos((i * 4 * Math.PI) / 5 - Math.PI / 2),
                 180 + 30 * Math.sin((i * 4 * Math.PI) / 5 - Math.PI / 2));
      ctx.lineTo(400 + 10 * Math.cos((i * 4 * Math.PI) / 5 + Math.PI / 2),
                 180 + 10 * Math.sin((i * 4 * Math.PI) / 5 + Math.PI / 2));
    }
    ctx.closePath();
    ctx.fillStyle = '#fbbf24';
    ctx.fill();

    // Main text
    ctx.font = '18px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('This is to certify that', 400, 250);

    // Name
    ctx.font = 'bold 32px Arial';
    ctx.fillText(userName, 400, 290);

    // Completion text
    ctx.font = '18px Arial';
    ctx.fillText('has successfully completed', 400, 330);

    // Quiz details
    ctx.fillText(`${completedQuizzes} of 3 quizzes with ${averageScore.toFixed(1)}% average score`, 400, 370);

    // Individual scores
    ctx.font = '16px Arial';
    let yPos = 420;
    Object.entries(quizResults).forEach(([key, result]: [string, any]) => {
      if (result.completed) {
        const percentage = ((result.score / result.total) * 100).toFixed(0);
        ctx.fillText(`${key.toUpperCase()}: ${percentage}%`, 400, yPos);
        yPos += 25;
      }
    });

    // Date
    ctx.font = '14px Arial';
    ctx.fillText(`Issued on ${new Date().toLocaleDateString()}`, 400, 550);

    // Download
    const link = document.createElement('a');
    link.download = 'certificate.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  if (completedQuizzes < 4) {
    return null; // Will redirect
  }

  return (
    <div className="container-fluid mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card-premium">
            <div className="card-body text-center">
              <div className="mb-4">
                <i className="bi bi-award-fill text-warning" style={{ fontSize: '4rem' }}></i>
              </div>

              <h1 className="display-4 fw-bold mb-4 text-dark">Certificate of Completion</h1>

              <div className="certificate-preview mb-4" style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                borderRadius: '20px',
                padding: '3rem 2rem',
                position: 'relative',
                overflow: 'hidden',
                maxWidth: '800px',
                margin: '0 auto'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                  opacity: 0.1
                }}></div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                  <h2 className="mb-3" style={{ color: 'white', fontWeight: 'bold' }}>Certificate of Completion</h2>
                  <p className="mb-2" style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem' }}>
                    This is to certify that
                  </p>
                  <h3 className="mb-3" style={{
                    color: 'white',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                  }}>
                    {userName}
                  </h3>
                  <p className="mb-4" style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem' }}>
                    has successfully completed
                  </p>
                  <div className="mb-4">
                    <h4 style={{ color: 'white', fontWeight: 'bold' }}>Web Development Quiz Series</h4>
                    <p style={{ color: 'rgba(255,255,255,0.8)' }}>
                      {completedQuizzes} of 3 quizzes completed with {averageScore.toFixed(1)}% average score
                    </p>
                  </div>

                  <div className="d-flex justify-content-center gap-4 mb-4">
                    {Object.entries(quizResults).map(([key, result]: [string, any]) => (
                      result.completed && (
                        <div key={key} className="text-center">
                          <div style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 0.5rem',
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            color: 'white'
                          }}>
                            {((result.score / result.total) * 100).toFixed(0)}%
                          </div>
                          <small style={{ color: 'rgba(255,255,255,0.8)', textTransform: 'capitalize' }}>
                            {key}
                          </small>
                        </div>
                      )
                    ))}
                  </div>

                  <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.3)',
                    paddingTop: '1rem',
                    marginTop: '2rem'
                  }}>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>
                      Issued on {new Date().toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-center gap-3">
                <button
                  className="btn btn-premium btn-lg"
                  onClick={generateCertificate}
                >
                  <i className="bi bi-download me-2"></i>Download Certificate PNG
                </button>
                <button
                  className="btn btn-ghost btn-lg"
                  onClick={() => navigate('/dashboard')}
                >
                  <i className="bi bi-bar-chart me-2"></i>View Dashboard
                </button>
                <button
                  className="btn btn-outline-primary btn-lg"
                  onClick={() => navigate('/')}
                >
                  <i className="bi bi-house me-2"></i>Back to Home
                </button>
              </div>

              <canvas ref={canvasRef} style={{ display: 'none' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
