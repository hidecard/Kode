import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface TryEditorProps {
  initialCode: string;
  lessonId?: string;
}

const TryEditor: React.FC<TryEditorProps> = ({ initialCode, lessonId }) => {
  const [code, setCode] = useState(initialCode);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Update code when lesson changes
  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const runCode = () => {
    if (!iframeRef.current) return;

    let htmlContent = '';

    // ✅ For Bootstrap Lessons
    if (lessonId?.startsWith('bootstrap-')) {
      htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Bootstrap Lesson</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="p-3">
  ${code}
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`;
    }

    // ✅ For CSS Lessons
    else if (lessonId?.startsWith('css-')) {
      htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CSS Lesson</title>
  <style>
${code}
  </style>
</head>
<body>
  <h1>CSS Example</h1>
  <p>This is a paragraph with some <span class="highlight">highlighted text</span>.</p>
  <div class="container">
      <div class="item">Item 1</div>
      <div class="item">Item 2</div>
      <div class="item">Item 3</div>
  </div>
</body>
</html>`;
    }

    // ✅ For HTML or Default Lessons
    else {
      htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>HTML Lesson</title>
</head>
<body>
  ${code}
</body>
</html>`;
    }

    // Refresh iframe to avoid caching issues
    iframeRef.current.srcdoc = '';
    setTimeout(() => {
      if (iframeRef.current) {
        iframeRef.current.srcdoc = htmlContent;
      }
    }, 20);
  };

  // Automatically render once when component loads
  useEffect(() => {
    runCode();
  }, [lessonId]);

  return (
    <div className="try-editor mt-4">
      <h5>Try it Yourself</h5>
      <div className="row">
        <div className="col-md-6">
          <textarea
            className="form-control"
            rows={10}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{ fontFamily: 'monospace' }}
          />
          <button className="btn btn-success mt-2" onClick={runCode}>
            <i className="bi bi-play-fill me-1"></i>Run
          </button>
        </div>
        <div className="col-md-6">
          <iframe
            ref={iframeRef}
            className="border rounded"
            style={{ width: '100%', height: '350px' }}
            title="Preview"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </div>
    </div>
  );
};

export default TryEditor;
