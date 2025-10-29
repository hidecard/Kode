# Fix Routing, Data Loading, and Iframe Issues

## 1. Update App.tsx
- [ ] Import JSON data files statically
- [ ] Load data on mount without fetch
- [ ] Pass loaded data as props to LessonPage
- [ ] Set selectedCategory based on current route

## 2. Update LessonPage.tsx
- [ ] Remove fetch calls for lesson and quiz data
- [ ] Use data passed as props instead
- [ ] Add error handling for missing lessons/quizzes

## 3. Update TryEditor.tsx
- [ ] Improve default HTML for CSS iframe to match examples
- [ ] Improve default HTML for Bootstrap iframe to match examples
- [ ] Ensure HTML examples render properly

## 4. Testing
- [ ] Test routing to HTML, CSS, Bootstrap lessons
- [ ] Verify data renders correctly in lessons
- [ ] Test iframe functionality for all lesson types
- [ ] Check for console errors
