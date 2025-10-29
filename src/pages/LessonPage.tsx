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
  lessons: Lesson[];
}

const LessonPage: React.FC<LessonPageProps> = ({ category }) => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    const loadLesson = async () => {
      try {
        const response = await fetch(`/src/data/${category.toLowerCase()}-basics.json`);
        const lessons: Lesson[] = await response.json();
        const foundLesson = lessons.find(l => l.id === lessonId);
        setLesson(foundLesson || null);
      } catch (error) {
        console.error('Error loading lesson:', error);
      }
    };

    loadLesson();
  }, [lessonId, category]);

  if (!lesson) {
    return <div className="container mt-4">Loading lesson...</div>;
  }

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-12">
          <h2>{lesson.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: lesson.description }} />
          <TryEditor initialCode={lesson.example} lessonId={lesson.id} />
        </div>
      </div>
    </div>
  );
};

export default LessonPage;
