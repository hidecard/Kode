export type Lesson = {
  id: string;
  title: string;
  description: string;
  example: string;
};

// Minimal sample lesson data to satisfy imports and allow the app to run.
// Replace or expand these arrays with your real lesson content.
export const htmlData: Lesson[] = [
  { id: '1', title: 'HTML Basics', description: 'Intro to HTML elements and structure.', example: '<!doctype html>...' },
  { id: '2', title: 'HTML Forms', description: 'Inputs, labels, and form submission.', example: '<form>...</form>' }
];

export const cssData: Lesson[] = [
  { id: '1', title: 'CSS Fundamentals', description: 'Selectors, box model, and layout.', example: 'div { display: block; }' },
  { id: '2', title: 'Flexbox', description: 'Flex container and items.', example: '.container { display: flex; }' }
];

export const bootstrapData: Lesson[] = [
  { id: '1', title: 'Bootstrap Grid', description: 'Responsive layout with Bootstrap grid.', example: '<div class="row">...</div>' },
  { id: '2', title: 'Bootstrap Components', description: 'Buttons, cards, modals.', example: '<button class="btn btn-primary">Click</button>' }
];
