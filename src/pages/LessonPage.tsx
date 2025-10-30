import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import TryEditor from '../components/TryEditor';

interface Lesson {
  id: string;
  title: string;
  description: string;
  example: string;
}

interface LessonPageProps {
  category: string;
  lessons?: Lesson[]; // may be provided by App
  lesson?: Lesson | null;
}

const LessonPage: React.FC<LessonPageProps> = ({ category, lessons: passedLessons, lesson: initialLesson }) => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(initialLesson || null);
  const [loading, setLoading] = useState<boolean>(!initialLesson);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialLesson) {
      setLesson(initialLesson);
      setLoading(false);
      return;
    }

    // if parent passed a lessons array, try to find the lesson there first
    if (passedLessons && lessonId) {
      const found = passedLessons.find(l => l.id === lessonId);
      if (found) {
        setLesson(found);
        setLoading(false);
        setError(null);
        return;
      }
    }

    const loadLesson = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!lessonId) {
          setError('Lesson id missing');
          setLesson(null);
          return;
        }
        // dynamic import from src/data
        const mod = await import(`../data/${category.toLowerCase()}-basics.json`);
        const lessonsList: Lesson[] = mod.default || mod;
        const found = lessonsList.find(l => l.id === lessonId);
        setLesson(found || null);
        if (!found) setError('Lesson not found.');
      } catch (err) {
        console.error('Error loading lesson:', err);
        setError('Unable to load lesson data.');
      } finally {
        setLoading(false);
      }
    };

    loadLesson();
  }, [lessonId, category, initialLesson, passedLessons]);

  if (loading) {
    return <div className="container mt-4 text-center"><div className="spinner-border text-primary" role="status" /></div>;
  }

  if (error || !lesson) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning shadow-sm">
          <h5 className="mb-1">Lesson unavailable</h5>
          <p className="mb-0">{error || 'The lesson could not be found.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
              <div>
                <h2 className="mb-1">{lesson.title}</h2>
                <small className="text-muted">{category} • Lesson ID: <span className="badge bg-light text-dark">{lesson.id}</span></small>
              </div>
              <div className="text-md-end">
                <button className="btn btn-outline-secondary me-2" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  <i className="bi bi-arrow-up"></i> Top
                </button>
                <a className="btn btn-primary" href="#try-editor" onClick={(e) => { e.preventDefault(); document.getElementById('try-editor')?.scrollIntoView({ behavior: 'smooth' }); }}>
                  <i className="bi bi-joystick me-1"></i>Try it
                </a>
              </div>
            </div>

            <div className="card-body">
              <div className="mb-4">
                <div className="lead" dangerouslySetInnerHTML={{ __html: lesson.description }} />
              </div>

              <div id="try-editor" className="mt-4">
                <TryEditor initialCode={lesson.example} lessonId={lesson.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;
