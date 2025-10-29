import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Link, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import LessonPage from './pages/LessonPage';
import QuizPage from './pages/QuizPage';
import htmlData from './data/html-basics.json';
import cssData from './data/css-basics.json';
import bootstrapData from './data/bootstrap-basics.json';


interface Lesson {
  id: string;
  title: string;
  description: string;
  example: string;
}

// Simple ErrorBoundary to avoid full app crash and show a user friendly message
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, message?: string}> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, message: error?.message || String(error) };
  }
  componentDidCatch(error: any, info: any) {
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
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [lessons, setLessons] = useState<{ [key: string]: Lesson[] }>({});
  const [searchQuery, setSearchQuery] = useState<string>('');
  // navCollapsed removed to prevent slide/collapse navbar behavior

  // UI/UX enhancements
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [searchResultMsg, setSearchResultMsg] = useState<string>('');

  useEffect(() => {
    // apply theme class to body
    if (darkMode) {
      document.body.classList.add('bg-dark', 'text-light');
    } else {
      document.body.classList.remove('bg-dark', 'text-light');
    }
  }, [darkMode]);

  // ensure content isn't hidden under the fixed navbar
  useEffect(() => {
    const prevPadding = document.body.style.paddingTop;
    document.body.style.paddingTop = '64px'; // adjust if navbar height changes
    return () => { document.body.style.paddingTop = prevPadding; };
  }, []);

  useEffect(() => {
    // Load data statically
    const loadedLessons: { [key: string]: Lesson[] } = {
      HTML: htmlData,
      CSS: cssData,
      Bootstrap: bootstrapData,
    };
    setLessons(loadedLessons);
  }, []);

  // Derive selectedCategory from the current path and available lessons.
  useEffect(() => {
    const path = location.pathname.toLowerCase();
    if (path.startsWith('/html')) {
      setSelectedCategory('HTML');
      return;
    }
    if (path.startsWith('/css')) {
      setSelectedCategory('CSS');
      return;
    }
    if (path.startsWith('/bootstrap')) {
      setSelectedCategory('Bootstrap');
      return;
    }
    if (Object.keys(lessons).length > 0) {
      setSelectedCategory(prev => prev || 'HTML');
    }
  }, [location.pathname, lessons]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    navigate('/');
  };

  // Infer category if missing (helps direct /reload navigation)
  const handleLessonSelect = (lessonId: string) => {
    let category = selectedCategory;
    if (!category) {
      for (const cat of Object.keys(lessons)) {
        if (lessons[cat].some(l => l.id === lessonId)) {
          category = cat;
          break;
        }
      }
    }
    const categorySlug = (category || 'HTML').toLowerCase();
    navigate(`/${categorySlug}/${lessonId}`);
  };

  const handleQuizSelect = (category: string) => {
    navigate(`/quiz/${category}`);
  };

  const isLoaded = Object.keys(lessons).length > 0;

  // Search: find first lesson whose title or id includes the query and navigate to it
  const performSearch = () => {
    const q = searchQuery.trim().toLowerCase();
    setSearchResultMsg('');
    if (!q) {
      setSearchResultMsg('Please type something to search.');
      return;
    }
    for (const cat of Object.keys(lessons)) {
      const found = lessons[cat].find(l => l.title.toLowerCase().includes(q) || l.id.toLowerCase().includes(q));
      if (found) {
        const slug = cat.toLowerCase();
        navigate(`/${slug}/${found.id}`);
        // no collapse behavior
        setSearchResultMsg('');
        return;
      }
    }
    // no match: show inline feedback
    setSearchResultMsg('No matching lesson found. Try another query.');
  };

  // Wrapper to find lesson by id and pass to LessonPage
  const LessonRoute = ({ categoryKey }: { categoryKey: 'HTML' | 'CSS' | 'Bootstrap' }) => {
    const params = useParams();
    const lessonId = params.lessonId;
    if (!lessonId) {
      return <div className="p-4"><h4>Lesson not specified</h4></div>;
    }
    const categoryLessons = lessons[categoryKey] || [];
    const lesson = categoryLessons.find(l => l.id === lessonId);

    if (!lesson) {
      return (
        <div className="p-4">
          <h4 className="text-warning">Lesson not found</h4>
          <p>The requested lesson does not exist in {categoryKey}.</p>
        </div>
      );
    }

    // Pass both the specific lesson and the full list for backward compatibility
    return <LessonPage category={categoryKey} lessons={categoryLessons} lesson={lesson} />;
  };

  // Breadcrumb data: tries to extract category and lesson title from path
  const getBreadcrumb = () => {
    if (!isLoaded) return null;
    const path = location.pathname.toLowerCase();
    const match = path.match(/^\/(html|css|bootstrap)\/([^/]+)/);
    if (!match) {
      return { parts: [{ name: 'Home', to: '/' }, { name: selectedCategory || 'HTML', to: '/' }] };
    }
    const catKey = match[1] === 'html' ? 'HTML' : match[1] === 'css' ? 'CSS' : 'Bootstrap';
    const lessonId = match[2];
    const lesson = (lessons[catKey] || []).find(l => l.id === lessonId);
    const lessonTitle = lesson ? lesson.title : lessonId;
    return {
      parts: [
        { name: 'Home', to: '/' },
        { name: catKey, to: '/' },
        { name: lessonTitle, to: location.pathname }
      ]
    };
  };

  const breadcrumb = getBreadcrumb();

  return (
    <div className="App">
      {/* fixed, non-collapsing navbar */}
      <nav className={`navbar ${darkMode ? 'navbar-dark bg-dark' : 'navbar-dark bg-success'} fixed-top`}>
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <i className="bi bi-code-slash me-2"></i>
            <span className="d-none d-sm-inline">Web Learning Platform</span>
          </Link>

          {/* Always-visible controls (no slide/collapse) */}
          <div className="ms-auto d-flex align-items-center gap-2">
             <input
               className="form-control me-2"
               type="search"
               placeholder="Search lessons..."
               aria-label="Search lessons"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               onKeyDown={(e) => { if (e.key === 'Enter') performSearch(); }}
               style={{ minWidth: 200 }}
             />
             <button
               className="btn btn-outline-light"
               type="button"
               onClick={performSearch}
               aria-label="Search"
             >
               <i className="bi bi-search"></i>
             </button>

             {/* Theme toggle */}
             <button
               className="btn btn-outline-light ms-2"
               type="button"
               aria-label="Toggle theme"
               onClick={() => setDarkMode(d => !d)}
               title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
             >
               <i className={`bi ${darkMode ? 'bi-sun-fill' : 'bi-moon-stars-fill'}`}></i>
             </button>
          </div>
         </div>
       </nav>

      <div className="container-fluid py-3">
        <div className="row gx-4">
          <div className="col-12 col-md-3 mb-3">
            <Sidebar
              onCategorySelect={handleCategorySelect}
              onLessonSelect={handleLessonSelect}
              onQuizSelect={handleQuizSelect}
              selectedCategory={selectedCategory}
              lessons={lessons}
            />
          </div>

          <div className="col-12 col-md-9">
            {/* Category tabs + Breadcrumb */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="btn-group btn-group-sm">
                {Object.keys(lessons).map((cat) => (
                  <button
                    key={cat}
                    className={`btn ${selectedCategory === cat ? 'btn-success' : 'btn-outline-secondary'}`}
                    onClick={() => handleCategorySelect(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              {/* small search feedback */}
              <div aria-live="polite" className={`text-${darkMode ? 'light' : 'muted'} small`}>
                {searchResultMsg}
              </div>
            </div>

            {/* Breadcrumb */}
            <div className="mb-3">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  {breadcrumb && breadcrumb.parts.map((p: any, idx: number) => (
                    <li
                      key={idx}
                      className={`breadcrumb-item ${idx === breadcrumb.parts.length - 1 ? 'active' : ''}`}
                      aria-current={idx === breadcrumb.parts.length - 1 ? 'page' : undefined}
                    >
                      {idx === breadcrumb.parts.length - 1 ? (
                        p.name
                      ) : (
                        <Link to={p.to}>{p.name}</Link>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            </div>

            {!isLoaded ? (
              <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                <div className="spinner-border text-success" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className={`card ${darkMode ? 'bg-secondary text-light' : ''} shadow-sm`}>
                <div className="card-body" style={{ minHeight: 320 }}>
                  <ErrorBoundary>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/html/:lessonId" element={<LessonRoute categoryKey="HTML" />} />
                      <Route path="/css/:lessonId" element={<LessonRoute categoryKey="CSS" />} />
                      <Route path="/bootstrap/:lessonId" element={<LessonRoute categoryKey="Bootstrap" />} />
                      <Route path="/quiz/:category" element={<QuizPage />} />
                      <Route path="*" element={<div className="p-4"><h4>Page not found</h4></div>} />
                    </Routes>
                  </ErrorBoundary>
                </div>
              </div>
            )}

            {/* Footer */}
            <footer className="mt-4 pt-3 border-top">
              <div className="d-flex justify-content-between align-items-center small text-muted">
                <div>© {new Date().getFullYear()} Web Learning Platform</div>
                <div>Made with <i className="bi bi-heart-fill text-danger"></i></div>
              </div>
            </footer>
          </div>
        </div>
      </div>

      {/* Floating feedback button */}
      <a
        href="mailto:feedback@example.com?subject=Web%20Learning%20Platform%20Feedback"
        className="btn btn-primary shadow-lg"
        style={{
          position: 'fixed',
          right: 18,
          bottom: 18,
          borderRadius: '50%',
          width: 56,
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1050
        }}
        aria-label="Send feedback"
        title="Send feedback"
      >
        <i className="bi bi-chat-dots-fill"></i>
      </a>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
