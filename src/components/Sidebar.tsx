import React, { useState, useEffect } from 'react';
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

const Sidebar: React.FC<SidebarProps> = ({ onCategorySelect, onQuizSelect, selectedCategory }) => {
  // desktop collapsed (icons-only) state
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    try {
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    } catch {
      mq.addListener(handler);
      return () => mq.removeListener(handler);
    }
  }, []);

  const categories = ['HTML', 'CSS', 'Bootstrap', 'JavaScript'];

  // Desktop vertical sidebar (collapsible)
  if (isDesktop) {
    return (
      <aside className="h-100">
        <div
          className="border rounded p-3 h-100 d-flex flex-column"
          style={{
            minHeight: 200,
            width: collapsed ? 72 : '100%',
            transition: 'width 0.18s ease-in-out',
            backgroundColor: '#1e293b',
            borderColor: '#334155',
            color: '#e2e8f0',
          }}
        >
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-bookmarks fs-5 text-success" aria-hidden="true"></i>
              {!collapsed && <h6 className="mb-0 text-white">Categories</h6>}
            </div>
            <button
              className="btn btn-sm btn-outline-light"
              onClick={() => setCollapsed(c => !c)}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              title={collapsed ? 'Expand' : 'Collapse'}
            >
              {collapsed ? '▶' : '◀'}
            </button>
          </div>

          <nav className="flex-grow-1 overflow-auto" aria-label="Categories">
            <ul className="list-unstyled mb-0">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                const iconClass = cat === 'HTML' ? 'bi bi-code-slash' : cat === 'CSS' ? 'bi bi-palette' : cat === 'Bootstrap' ? 'bi bi-bootstrap' : 'bi bi-braces';
                return (
                  <li key={cat} className="mb-2">
                    <div className="d-flex align-items-center justify-content-between">
                      <button
                        className={`btn btn-link text-start p-0 d-flex align-items-center ${isActive ? 'fw-bold' : ''}`}
                        onClick={() => onCategorySelect(cat)}
                        title={collapsed ? cat : undefined}
                        style={{ gap: 8, color: isActive ? '#10b981' : '#cbd5e1' }}
                      >
                        <i className={`${iconClass} fs-6 me-2`} aria-hidden="true"></i>
                        {!collapsed && <span className="text-white">{cat}</span>}
                      </button>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => onQuizSelect(cat.toLowerCase())}
                        aria-label={`${cat} quiz`}
                        title="Open quiz"
                      >
                        <i className="bi bi-question-circle"></i>
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-3">
            {!collapsed ? (
              <small className="text-muted">Select a category and press the quiz icon to start.</small>
            ) : (
              <small className="text-muted">Quiz</small>
            )}
          </div>
        </div>
      </aside>
    );
  }

  // Mobile: horizontal pill bar (no slide)
  return (
    <div className="mb-3">
      <div className="d-flex gap-2 overflow-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`btn btn-sm ${selectedCategory === cat ? 'btn-warning' : 'btn-outline-light'}`}
            onClick={() => onCategorySelect(cat)}
            aria-pressed={selectedCategory === cat}
          >
            {cat}
          </button>
        ))}
        {/* quick quiz open buttons */}
        {categories.map((cat) => (
          <button
            key={`${cat}-quiz`}
            className="btn btn-sm btn-outline-primary"
            onClick={() => onQuizSelect(cat.toLowerCase())}
            title={`Start ${cat} quiz`}
          >
            <i className="bi bi-question-circle"></i>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
