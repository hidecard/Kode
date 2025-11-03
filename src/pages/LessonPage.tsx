import React from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Lesson } from '../data';

interface LessonPageProps {
  category: string;
  lessons: Lesson[];
}

const LessonPage: React.FC<LessonPageProps> = ({ category, lessons }) => {
  const { lessonId } = useParams<{ lessonId?: string }>();
  const current = lessons.find(l => l.id === lessonId) || lessons[0];

  if (!current) {
    return (
      <div className="p-4">
        <h4>No lessons available</h4>
        <p>There are no lessons for {category} yet.</p>
        <Link to="/" className="btn btn-sm btn-primary">Go home</Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="mb-3 d-flex justify-content-between align-items-start">
        <div>
          <h2 className="mb-1">{current.title}</h2>
          <small className="text-muted">{category} • Lesson {current.id}</small>
        </div>
        <div>
          <Link to={`/`} className="btn btn-sm btn-outline-secondary">Back</Link>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <p className="mb-3">{current.description}</p>
          <pre style={{ whiteSpace: 'pre-wrap', background: '#f8f9fa', padding: 12, borderRadius: 6 }}>
            <code>{current.example}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;
