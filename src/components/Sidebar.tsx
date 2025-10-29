import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface Lesson {
  id: string;
  title: string;
  description: string;
  example: string;
}

interface SidebarProps {
  onCategorySelect: (category: string) => void;
  onLessonSelect: (lessonId: string) => void;
  onQuizSelect: (category: string) => void;
  selectedCategory: string;
  lessons: { [key: string]: Lesson[] };
}

const Sidebar: React.FC<SidebarProps> = ({ onCategorySelect, onLessonSelect, onQuizSelect, selectedCategory, lessons }) => {
  const [isOpen, setIsOpen] = useState(true);

  const categories = ['HTML', 'CSS', 'Bootstrap'];

  return (
    <div className={`bg-light border-end ${isOpen ? 'col-md-3' : 'col-md-1'} d-none d-md-block`}>
      <div className="p-3">
        <button
          className="btn btn-outline-secondary mb-3"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '◀' : '▶'}
        </button>
        {isOpen && (
          <>
            <h5>Lessons</h5>
            <ul className="list-group list-group-flush lesson-list">
              {categories.map((category) => {
                const iconClass = category === 'HTML' ? 'bi bi-code-slash' :
                                 category === 'CSS' ? 'bi bi-palette' :
                                 'bi bi-bootstrap';
                return (
                  <li key={category} className="list-group-item">
                    <button
                      className={`btn btn-link text-decoration-none d-flex align-items-center ${selectedCategory === category ? 'fw-bold' : ''}`}
                      onClick={() => onCategorySelect(category)}
                    >
                      <i className={`${iconClass} me-2 sidebar-icon`}></i>
                      {category}
                    </button>
                    {selectedCategory === category && lessons[category] && (
                      <ul className="list-unstyled ms-3">
                        {lessons[category].map((lesson: Lesson) => (
                          <li key={lesson.id}>
                            <button
                              className="btn btn-link text-decoration-none"
                              onClick={() => onLessonSelect(lesson.id)}
                            >
                              {lesson.title}
                            </button>
                          </li>
                        ))}
                        <li>
                          <button
                            className="btn btn-link text-decoration-none"
                            onClick={() => onQuizSelect(category.toLowerCase())}
                          >
                            <i className="bi bi-question-circle me-1"></i>Quiz
                          </button>
                        </li>
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
