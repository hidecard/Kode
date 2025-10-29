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

const Sidebar: React.FC<SidebarProps> = ({ onCategorySelect, onLessonSelect, onQuizSelect, selectedCategory, lessons }) => {
  // collapsed -> desktop compact icons only
  const [collapsed, setCollapsed] = useState<boolean>(false);
  // mobile overlay open
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  // track viewport (md breakpoint)
  const [isDesktop, setIsDesktop] = useState<boolean>(window.matchMedia('(min-width: 768px)').matches);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    try {
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    } catch {
      // fallback for older browsers
      mq.addListener(handler);
      return () => mq.removeListener(handler);
    }
  }, []);

  // close mobile overlay when switching to desktop
  useEffect(() => {
    if (isDesktop) setMobileOpen(false);
  }, [isDesktop]);

  const categories = [
    { key: 'HTML', icon: 'bi bi-code-slash' },
    { key: 'CSS', icon: 'bi bi-palette' },
    { key: 'Bootstrap', icon: 'bi bi-bootstrap' },
  ];

  // Render list content (shared between desktop and mobile)
  const renderContent = (isCompact: boolean) => (
    <div className="d-flex flex-column h-100">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center gap-2">
          <i className="bi bi-bookmarks fs-5 text-success" aria-hidden="true"></i>
          {!isCompact && <h6 className="mb-0">Lessons</h6>}
        </div>
        <div className="d-flex align-items-center gap-2">
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => setCollapsed(c => !c)}
            aria-pressed={collapsed}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={collapsed ? 'Expand' : 'Collapse'}
          >
            {collapsed ? '▶' : '◀'}
          </button>
        </div>
      </div>

      <nav className="flex-grow-1 overflow-auto" aria-label="Lessons navigation">
        <ul className="list-unstyled mb-0">
          {categories.map(({ key, icon }) => {
            const isActive = selectedCategory === key;
            return (
              <li key={key} className="mb-2">
                <div className="d-flex align-items-center justify-content-between">
                  <button
                    className={`btn btn-link text-start p-0 d-flex align-items-center ${isActive ? 'fw-bold text-success' : ''}`}
                    onClick={() => { onCategorySelect(key); if (!isDesktop) setMobileOpen(false); }}
                    title={collapsed ? key : undefined}
                    style={{ gap: 8 }}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    <i className={`${icon} fs-6 me-2`} aria-hidden="true"></i>
                    {!isCompact && <span>{key}</span>}
                  </button>

                  {isActive && !isCompact && <i className="bi bi-chevron-down text-muted" aria-hidden="true"></i>}
                </div>

                {isActive && !isCompact && lessons[key] && (
                  <ul className="list-unstyled ms-3 mt-2">
                    {lessons[key].map((lesson: Lesson) => (
                      <li key={lesson.id} className="mb-1">
                        <button
                          className="btn btn-sm btn-outline-secondary w-100 text-start"
                          onClick={() => { onLessonSelect(lesson.id); if (!isDesktop) setMobileOpen(false); }}
                          aria-label={`Open lesson ${lesson.title}`}
                        >
                          {lesson.title}
                        </button>
                      </li>
                    ))}
                    <li className="mt-2">
                      <button
                        className="btn btn-sm btn-outline-primary w-100 text-start"
                        onClick={() => { onQuizSelect(key.toLowerCase()); if (!isDesktop) setMobileOpen(false); }}
                        aria-label={`Open ${key} quiz`}
                      >
                        <i className="bi bi-question-circle me-2"></i>
                        Quiz
                      </button>
                    </li>
                  </ul>
                )}

                {isActive && isCompact && lessons[key] && (
                  <div className="d-flex flex-column mt-2">
                    {lessons[key].slice(0, 5).map((lesson: Lesson) => (
                      <button
                        key={lesson.id}
                        className="btn btn-sm btn-light mb-1"
                        onClick={() => { onLessonSelect(lesson.id); if (!isDesktop) setMobileOpen(false); }}
                        title={lesson.title}
                        aria-label={lesson.title}
                      >
                        <i className="bi bi-file-earmark-text text-secondary" aria-hidden="true"></i>
                      </button>
                    ))}
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => { onQuizSelect(key.toLowerCase()); if (!isDesktop) setMobileOpen(false); }}
                      title={`${key} Quiz`}
                      aria-label={`${key} Quiz`}
                    >
                      <i className="bi bi-question-circle-fill" aria-hidden="true"></i>
                    </button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-3">
        {!isCompact ? (
          <small className="text-muted">Tip: collapse sidebar to icons for a compact workspace.</small>
        ) : (
          <small className="text-muted">Expanded view available</small>
        )}
      </div>
    </div>
  );

  // Desktop rendering (inside provided column)
  if (isDesktop) {
    return (
      <div className="h-100">
        <div className={`bg-white border rounded p-3 h-100`} style={{ minHeight: 200, width: collapsed ? 72 : '100%' }}>
          {renderContent(collapsed)}
        </div>
      </div>
    );
  }

  // Mobile rendering: show a small toggle button and full-screen overlay when open
  return (
    <>
      <div className="d-flex d-md-none align-items-center mb-2">
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          title="Open menu"
        >
          <i className="bi bi-list"></i>
        </button>
        <div className="ms-2 small text-muted">Lessons</div>
      </div>

      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{ zIndex: 1055, background: 'rgba(0,0,0,0.35)' }}
        >
          <div className="position-absolute top-0 start-0 bg-white h-100" style={{ width: '86%', maxWidth: 360 }}>
            <div className="p-3 d-flex align-items-center justify-content-between border-bottom">
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-bookmarks fs-5 text-success" aria-hidden="true"></i>
                <h6 className="mb-0">Lessons</h6>
              </div>
              <div>
                <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => setCollapsed(c => !c)} aria-label="Toggle compact">
                  {collapsed ? '▶' : '◀'}
                </button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>
            </div>

            <div className="p-3">
              {renderContent(collapsed)}
            </div>
          </div>

          {/* click outside to close */}
          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{ left: '86%' }}
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
        </div>
      )}
    </>
  );
};

export default Sidebar;
