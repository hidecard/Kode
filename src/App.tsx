import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import LessonPage from './pages/LessonPage';
import htmlData from './data/html-basics.json';
import cssData from './data/css-basics.json';
import bootstrapData from './data/bootstrap-basics.json';


interface Lesson {
  id: string;
  title: string;
  description: string;
  example: string;
}



function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [lessons, setLessons] = useState<{ [key: string]: Lesson[] }>({});
  useEffect(() => {
    // Load data statically
    const loadedLessons: { [key: string]: Lesson[] } = {
      HTML: htmlData,
      CSS: cssData,
      Bootstrap: bootstrapData,
    };

    setLessons(loadedLessons);
  }, []);

  // Set selectedCategory based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith('/html')) {
      setSelectedCategory('HTML');
    } else if (path.startsWith('/css')) {
      setSelectedCategory('CSS');
    } else if (path.startsWith('/bootstrap')) {
      setSelectedCategory('Bootstrap');
    } else if (Object.keys(lessons).length > 0 && !selectedCategory) {
      setSelectedCategory('HTML');
    }
  }, [location.pathname, lessons, selectedCategory]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    navigate('/');
  };

  const handleLessonSelect = (lessonId: string) => {
    const categorySlug = selectedCategory.toLowerCase();
    navigate(`/${categorySlug}/${lessonId}`);
  };

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <a className="navbar-brand" href="#" onClick={() => navigate('/')}>
            <i className="bi bi-code-slash me-2"></i>
            Web Learning Platform
          </a>
          <div className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search..." />
            <button className="btn btn-outline-light" type="submit">
              <i className="bi bi-search"></i>
            </button>
          </div>
        </div>
      </nav>
      <div className="container-fluid">
        <div className="row">
          <Sidebar
            onCategorySelect={handleCategorySelect}
            onLessonSelect={handleLessonSelect}
            selectedCategory={selectedCategory}
            lessons={lessons}
          />
          <div className="col-md-9">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/html/:lessonId" element={<LessonPage category="HTML" lessons={lessons.HTML || []} />} />
              <Route path="/css/:lessonId" element={<LessonPage category="CSS" lessons={lessons.CSS || []} />} />
              <Route path="/bootstrap/:lessonId" element={<LessonPage category="Bootstrap" lessons={lessons.Bootstrap || []} />} />
            </Routes>
          </div>
        </div>
      </div>
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
