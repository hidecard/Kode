import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Quiz from '../components/Quiz';

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation?: string;
}

interface QuizData {
  quizTitle: string;
  questions: Question[];
}

// Real curated question banks for each category and level.
// Note: kept concise but realistic; expand later if you want more.
const QUESTION_BANK: { [cat: string]: { [level: string]: Question[] } } = {
  html: {
    basic: [
      { question: 'What does HTML stand for?', options: ['Hyper Text Markup Language','Home Tool Markup Language','Hyperlinks Text Mark Language','Hyperlinking Text Markup Lang'], correct: 0, explanation: 'HTML = Hyper Text Markup Language.' },
      { question: 'Which tag defines a paragraph?', options: ['<p>','<para>','<text>','<paragraph>'], correct: 0 },
      { question: 'How do you create a hyperlink?', options: ['<a href="page.html">link</a>','<link>page.html</link>','<href>page.html</href>','<url>page.html</url>'], correct: 0, explanation: 'Use the anchor <a> with href attribute.' },
      { question: 'Which tag creates an unordered list?', options: ['<ul>','<ol>','<li>','<list>'], correct: 0 },
      { question: 'Where does the page title appear?', options: ['In the <title> element inside <head>','In the body directly','In an <h1> always','In a meta tag'], correct: 0 },
      { question: 'Which tag adds an image?', options: ['<img src="pic.jpg" alt="...">','<image src="pic.jpg">','<picture src="pic.jpg">','<src img="pic.jpg">'], correct: 0 }
    ],
    intermediate: [
      { question: 'Which attribute is used for styling an element inline?', options: ['style','class','id','css'], correct: 0, explanation: 'Use style="..." for inline CSS.' },
      { question: 'Which element is semantic for navigation links?', options: ['<nav>','<div>','<section>','<menu>'], correct: 0 },
      { question: 'What is the purpose of the alt attribute on <img>?', options: ['Accessibility and fallback text','Image compression','Changing image size','SEO only'], correct: 0 },
      { question: 'Which tag is used for tabular row?', options: ['<tr>','<td>','<th>','<table>'], correct: 0 },
      { question: 'Which attribute on <form> defines where to send data?', options: ['action','method','target','enctype'], correct: 0, explanation: 'action specifies URL where form data is sent.' },
      { question: 'Which input type should be used for email validation?', options: ['email','text','tel','url'], correct: 0 }
    ],
    advanced: [
      { question: 'What is ARIA used for?', options: ['Improving accessibility','Styling elements','SEO optimization','Client-side routing'], correct: 0, explanation: 'ARIA attributes improve accessibility for assistive tech.' },
      { question: 'Which tag allows embedding interactive applications like PDFs or web pages?', options: ['<iframe>','<embed>','<object>','All of the above'], correct: 3, explanation: '<iframe>, <embed>, and <object> can embed content; "All" is correct.' },
      { question: 'Which element is best for marking independent content like a blog post?', options: ['<article>','<section>','<div>','<aside>'], correct: 0 },
      { question: 'What is the purpose of the <meta name="viewport"> tag?', options: ['Control layout on mobile browsers','Add metadata for SEO','Specify character encoding','Include external resources'], correct: 0 },
      { question: 'Which attribute should you use to preload important resources like fonts?', options: ['rel="preload"','rel="prefetch"','rel="stylesheet"','rel="preconnect"'], correct: 0, explanation: 'Use rel="preload" for high-priority resources.' },
      { question: 'Which element can improve SEO and structure by indicating an independent section of content?', options: ['<section>','<div>','<span>','<b>'], correct: 0, explanation: 'Use semantic sectioning elements for structure.' }
    ]
  },
  css: {
    basic: [
      { question: 'What does CSS stand for?', options: ['Cascading Style Sheets','Computer Style Sheets','Creative Style Sheets','Colorful Style Syntax'], correct: 0 },
      { question: 'Which property sets text color?', options: ['color','background-color','font-style','text-color'], correct: 0 },
      { question: 'How do you select an element with id "main"?', options: ['#main','.main','main','*main'], correct: 0 },
      { question: 'Which property adds space inside an element?', options: ['padding','margin','border','gap'], correct: 0 },
      { question: 'Which property controls the font size?', options: ['font-size','text-size','size','font-style'], correct: 0 },
      { question: 'How to apply CSS inline?', options: ['style="color:red;"','class="red"','id="red"','css="color:red;"'], correct: 0 }
    ],
    intermediate: [
      { question: 'Which display value creates a flex container?', options: ['display: flex','display: block','display: grid','display: inline'], correct: 0 },
      { question: 'What does the box model include?', options: ['content, padding, border, margin','content only','margin only','padding only'], correct: 0 },
      { question: 'How to make an element semi-transparent?', options: ['opacity: 0.5;','visibility: hidden;','display: none;','filter: blur(2px);'], correct: 0 },
      { question: 'Which unit is relative to the root font-size?', options: ['rem','em','px','%'], correct: 0, explanation: 'rem is relative to the root (html) font size.' },
      { question: 'How to center a block horizontally?', options: ['margin: 0 auto;','text-align: center;','align-items: center;','justify-content: center;'], correct: 0 }
    ],
    advanced: [
      { question: 'Which property creates a stacking context other than z-index?', options: ['opacity less than 1','transform','filter','All of the above'], correct: 3, explanation: 'Opacity <1, transform, and filter create stacking contexts.' },
      { question: 'Which rule allows you to create responsive breakpoints?', options: ['@media','@supports','@keyframes','@import'], correct: 0 },
      { question: 'What is the purpose of CSS variables (custom properties)?', options: ['Reuse values and theme tokens','Inline script','Server-side rendering','Image optimization'], correct: 0 },
      { question: 'Which property enables smooth changes between property values?', options: ['transition','animation','transform','motion'], correct: 0 },
      { question: 'Which layout method is best for 2D layouts?', options: ['grid','flexbox','float','inline-block'], correct: 0 }
    ]
  },
  bootstrap: {
    basic: [
      { question: 'Bootstrap primarily provides what?', options: ['CSS components and utilities','A backend server','Database tools','Image editor'], correct: 0 },
      { question: 'Which class makes a button styled as primary?', options: ['btn btn-primary','btn-primary','primary-btn','btn main'], correct: 0 },
      { question: 'Which class makes an image responsive?', options: ['img-fluid','img-responsive','responsive-img','img-fluid-sm'], correct: 0 },
      { question: 'How do you create a row in Bootstrap?', options: ['<div class="row">','<row>','<div class="grid">','<div class="container-row">'], correct: 0 },
      { question: 'Which container is full-width?', options: ['container-fluid','container','container-md','container-sm'], correct: 0 }
    ],
    intermediate: [
      { question: 'Which Bootstrap utility class adds margin-top of 3?', options: ['mt-3','mb-3','p-3','m-3'], correct: 0 },
      { question: 'What does .d-none do?', options: ['Hides an element','Displays element as block','Makes element inline','Shows element as flex'], correct: 0 },
      { question: 'Which data attribute toggles a modal via JavaScript?', options: ['data-bs-toggle="modal"','data-toggle="modal"','data-modal="true"','data-bs-modal="true"'], correct: 0 },
      { question: 'Which class aligns items vertically in a flex container?', options: ['align-items-center','justify-content-center','text-center','align-self-center'], correct: 0 }
    ],
    advanced: [
      { question: 'Which approach customizes Bootstrap without editing core files?', options: ['Override variables with custom CSS or using SCSS build','Directly editing bootstrap.css','Changing CDN CSS','Using inline styles only'], correct: 0, explanation: 'Override variables or use custom SCSS to customize safely.' },
      { question: 'Which class creates a responsive column that spans 6 on md screens?', options: ['col-md-6','col-6-md','md-col-6','col-6'], correct: 0 },
      { question: 'Which utility creates a horizontal scrollable row?', options: ['.overflow-auto','.scroll-row','.scroll-x','.overflow-x-auto'], correct: 0 }
    ]
  }
};

const LEVELS = ['basic', 'intermediate', 'advanced'];

const QuizPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const key = (category || 'html').toLowerCase();

  const [level, setLevel] = useState<string | null>(null);

  const quizData = useMemo(() => {
    if (!level) return null;
    const pool = (QUESTION_BANK[key] && QUESTION_BANK[key][level]) || [];
    return {
      quizTitle: `${key.toUpperCase()} Quiz — ${level[0].toUpperCase() + level.slice(1)} (${pool.length} Qs)`,
      questions: pool
    } as QuizData;
  }, [key, level]);

  return (
    <div className="container-fluid mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card bg-dark text-white shadow-sm">
            <div className="card-body">
              {!level ? (
                <>
                  <h3 className="mb-3">{(key || 'HTML').toUpperCase()} — Choose level</h3>
                  <p className="text-muted">Select a difficulty level. Each level contains curated questions.</p>
                  <div className="d-flex gap-2 flex-wrap mb-3">
                    {LEVELS.map(l => (
                      <button
                        key={l}
                        className="btn btn-outline-light"
                        onClick={() => setLevel(l)}
                      >
                        {l[0].toUpperCase() + l.slice(1)}
                      </button>
                    ))}
                  </div>
                  <div className="text-muted small">
                    Tip: you can switch level after finishing a quiz using the "Change level" button.
                  </div>
                </>
              ) : (
                <>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div>
                      <h3 className="mb-0">{quizData?.quizTitle}</h3>
                      <small className="text-muted">Category: {(key || 'HTML').toUpperCase()} — Level: {level}</small>
                    </div>
                    <div>
                      <button className="btn btn-sm btn-outline-light me-2" onClick={() => setLevel(null)}>Change level</button>
                      <button className="btn btn-sm btn-secondary" onClick={() => {
                        // re-render same level (no-op)
                        setLevel(prev => prev ? prev : null);
                      }}>Restart level</button>
                    </div>
                  </div>

                  {quizData && <Quiz quizData={quizData} />}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
