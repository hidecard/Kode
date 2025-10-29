import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface TryEditorProps {
  initialCode: string;
  lessonId?: string;
}

const TryEditor: React.FC<TryEditorProps> = ({ initialCode, lessonId }) => {
  const [code, setCode] = useState(initialCode);
  const [statusMsg, setStatusMsg] = useState<string>('');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const buildHtml = (userCode: string) => {
    if (lessonId?.startsWith('bootstrap-')) {
      return `<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="p-3 bg-light">
  ${userCode}
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`;
    } else if (lessonId?.startsWith('css-')) {
      return `<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <style>${userCode}</style>
</head>
<body>
  <h3>CSS Demo</h3>
  <p class="demo">Sample paragraph</p>
</body>
</html>`;
    }
    return `<!doctype html>
<html>
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body>${userCode}</body>
</html>`;
  };

  const runCode = () => {
    try {
      setStatusMsg('');
      const html = buildHtml(code);
      if (!iframeRef.current) return;
      iframeRef.current.srcdoc = html;
      setStatusMsg('Rendered successfully');
      setTimeout(() => setStatusMsg(''), 2000);
    } catch (err) {
      console.error(err);
      setStatusMsg('Error rendering preview.');
    }
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setStatusMsg('Code copied to clipboard');
      setTimeout(() => setStatusMsg(''), 1500);
    } catch {
      setStatusMsg('Copy failed');
      setTimeout(() => setStatusMsg(''), 1500);
    }
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${lessonId || 'snippet'}.html`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setStatusMsg('Downloaded');
    setTimeout(() => setStatusMsg(''), 1500);
  };

  // auto render when initialCode changes (or on mount)
  useEffect(() => {
    runCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCode]);

  return (
    <div className="try-editor mt-4">
      <div className="row g-3">
        <div className="col-12 col-md-6">
          <label htmlFor="try-code" className="form-label visually-hidden">Code editor</label>
          <textarea
            id="try-code"
            className="form-control font-monospace"
            rows={16}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{ minHeight: 320 }}
            aria-label="Code editor"
          />
          <div className="d-flex gap-2 mt-2">
            <button className="btn btn-success" onClick={runCode} aria-label="Run code">
              <i className="bi bi-play-fill me-1" /> Run
            </button>
            <button className="btn btn-outline-secondary" onClick={copyCode} aria-label="Copy code">
              <i className="bi bi-clipboard me-1" /> Copy
            </button>
            <button className="btn btn-outline-primary" onClick={downloadCode} aria-label="Download code">
              <i className="bi bi-download me-1" /> Download
            </button>
            <div className="ms-auto align-self-center small text-muted" aria-live="polite">
              {statusMsg}
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <strong className="small mb-0">Preview</strong>
            <small className="text-muted">Sandboxed iframe</small>
          </div>
          <div className="flex-grow-1">
            <iframe
              ref={iframeRef}
              className="border rounded w-100"
              style={{ height: 320, minHeight: 240 }}
              title="Preview"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryEditor;
