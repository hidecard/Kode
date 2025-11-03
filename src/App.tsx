import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/premium.css'; // new global premium styles
import './styles/navbar-buttons.css'; // navbar button styles
import Home from './pages/HomeNew';
import QuizPage from './pages/QuizPage';
import Certificate from './pages/Certificate';
import Dashboard from './components/Dashboard';
import { htmlData, cssData, bootstrapData, Lesson } from './data'; // import Lesson type to satisfy TS usage
import LessonPage from './pages/LessonPage';




// Simple ErrorBoundary to avoid full app crash and show a user friendly message
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, message?: string}> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, message: error?.message || String(error) };
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary caught', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4">
          <h4 className="text-danger">Something went wrong</h4>
          <p>{this.state.message || 'An unexpected error occurred.'}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

function AppContent() {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState<{ [key: string]: Lesson[] }>({});

  useEffect(() => {
    const loadedLessons: { [key: string]: Lesson[] } = {
      HTML: htmlData,
      CSS: cssData,
      Bootstrap: bootstrapData
      // removed JavaScript entry
    };
    setLessons(loadedLessons);
  }, []);

  const handleCategorySelect = (category: string) => {
    navigate(`/${category.toLowerCase()}/1`);
  };

  // removed "JavaScript" from categories array
  const categories = ['HTML', 'CSS', 'Bootstrap'];

  // compact premium CSS injected so no new files are required
  const premiumCss = `
:root{
  --accent-1: #7c3aed;
  --accent-2: #06b6d4;
  --muted: rgba(255,255,255,0.75);
  --glass: rgba(255,255,255,0.03);
  --card-shadow: 0 10px 30px rgba(2,6,23,0.55);
  --radius-lg: 14px;
}

/* Grid for category cards — requested template */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(220px, 1fr));
  gap: 1.25rem;
}
@media (min-width: 992px) {
  .cards-grid { grid-template-columns: repeat(3, minmax(220px, 1fr)); }
}

/* Premium hero & cards */
.hero { padding: 4rem 0; background: linear-gradient(180deg,#071021 0%, #071426 60%); color: #e6eef8; }
.glass { background: linear-gradient(180deg, var(--glass), rgba(255,255,255,0.015)); border-radius: var(--radius-lg); padding: 2rem; box-shadow: var(--card-shadow); border: 1px solid rgba(255,255,255,0.04); }
.card-premium { background: rgba(255,255,255,0.02); padding: 1.1rem; border-radius: 12px; box-shadow: 0 8px 24px rgba(2,6,23,0.4); display:flex; flex-direction:column; height:100%; }
.btn-premium { border-radius: 999px; padding: .6rem 1.1rem; font-weight:600; }
.badge-letter { width:36px;height:36px;border-radius:10px;background:rgba(255,255,255,0.04); display:flex;align-items:center;justify-content:center;margin-right:12px;font-weight:700; }

/* Quiz panel */
.quiz-panel { border-radius: 14px; overflow: hidden; box-shadow: 0 12px 40px rgba(2,6,23,0.6); }
.quiz-header { padding: 1rem 1.25rem; background: linear-gradient(90deg,#083344,#04263a); color: #fff; }
.quiz-body { padding: 1.25rem; background: #fff; color: #0f172a; }

/* Quiz options */
.quiz-option { border-radius: 12px; padding: 12px 14px; cursor: pointer; transition: transform .15s ease, box-shadow .15s ease; background:#0f172a; color:#e6eef8; display:flex; align-items:center; box-shadow: 0 6px 18px rgba(2,6,23,0.06); }
.quiz-option:hover { transform: translateY(-4px); box-shadow: 0 12px 30px rgba(2,6,23,0.12); }
.quiz-option.selected { background:#374151; color:#fff; }
.quiz-option.correct { background:#16a34a; color:#fff; }
.quiz-option.wrong { background:#dc2626; color:#fff; }
.explanation { margin-top:1rem; padding:12px; border-radius:8px; background:#f8fafc; color:#111827; }

/* Responsive tweaks */
@media (max-width:767.98px){
  .hero { padding:2rem 0; }
  .cards-grid { grid-template-columns: 1fr; }
}
`;

  return (
    <div className="App" style={{ minHeight: '100vh' }}>
      {/* inject CSS for premium styling */}
      <style>{premiumCss}</style>

      {/* Premium responsive navbar */}
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark" style={{
        background: 'linear-gradient(135deg, rgba(30,41,59,0.95) 0%, rgba(51,65,85,0.98) 100%)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
      }}>
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center text-white" to="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            <div className="premium-brand-badge" style={{
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              boxShadow: '0 8px 25px rgba(99,102,241,0.4), inset 0 2px 4px rgba(255,255,255,0.2)'
            }}>
              <i className="bi bi-code-slash" />
            </div>
            <div className="d-none d-md-block ms-2">
              <div style={{ fontWeight: 700, color: '#e2e8f0' }}>Web Learning</div>
              <small style={{ color: 'rgba(255,255,255,0.7)' }}>Interactive quizzes</small>
            </div>
          </Link>

          {/* toggler and collapse */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* category buttons (desktop) */}
              {categories.map(cat => (
                <li className="nav-item d-none d-lg-block" key={cat}>
                  <button
                    className="btn btn-sm btn-ghost me-2"
                    onClick={() => handleCategorySelect(cat)}
                    style={{
                      transition: 'all 0.3s ease',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: 'rgba(255,255,255,0.8)'
                    }}
                  >
                    {cat}
                  </button>
                </li>
              ))}
              {/* mobile category links */}
              <li className="nav-item d-lg-none">
                <div className="nav-link">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      className="btn btn-sm btn-ghost me-2 mb-2"
                      onClick={() => handleCategorySelect(cat)}
                      style={{
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: 'rgba(255,255,255,0.8)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </li>
            </ul>

            <div className="d-flex align-items-center gap-2 ms-auto">
            </div>
          </div>
        </div>
      </nav>

      <main className="container-fluid" style={{ paddingTop: 92 }}>
        <div className="row justify-content-center gx-4">
          <div className="col-12">
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/certificate" element={<Certificate />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/html/:lessonId" element={<LessonPage category="HTML" lessons={lessons.HTML || []} />} />
                <Route path="/css/:lessonId" element={<LessonPage category="CSS" lessons={lessons.CSS || []} />} />
                <Route path="/bootstrap/:lessonId" element={<LessonPage category="Bootstrap" lessons={lessons.Bootstrap || []} />} />
                {/* removed JavaScript lesson route */}
                <Route path="/quiz/:category" element={<QuizPage />} />
                <Route path="*" element={<div className="p-4"><h4>Page not found</h4></div>} />
              </Routes>
            </ErrorBoundary>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
