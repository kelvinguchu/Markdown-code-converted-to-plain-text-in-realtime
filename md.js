'use strict'

let markdownInput = document.getElementById('markdown-input');
let renderedOutput = document.getElementById('rendered-output');

window.onload = function() {
    markdownInput.addEventListener('input', function() {
        const markdown = markdownInput.value;
        const html = marked.parse(markdown, { mangle: false, headerIds: false });
        renderedOutput.innerHTML = html;
    });
}

const bold = document.getElementById('bold');
const italic = document.getElementById('italic');
const underline = document.getElementById('underline');
const link = document.getElementById('link');
const unorderedList = document.getElementById('unordered-list');
const orderedList = document.getElementById('ordered-list');
const heading = document.getElementById('heading');
const quote = document.getElementById('quote');
const code = document.getElementById('code');
const fileCode = document.getElementById('file-code');
const image = document.getElementById('image');

bold.addEventListener('click', function(event) {
    event.preventDefault();
  
    const boldMarkdown = '****';
    const currentPosition = markdownInput.selectionStart;
    const updatedMarkdown = markdownInput.value.substring(0, currentPosition) + boldMarkdown +
    markdownInput.value.substring(currentPosition);
    markdownInput.value = updatedMarkdown;
  
    // Set the cursor position in between the `****` characters
    const newCursorPosition = currentPosition + 2;
    markdownInput.setSelectionRange(newCursorPosition, newCursorPosition);
  
    setTimeout(() => {
      markdownInput.focus();
    }, 10);
  });

  italic.addEventListener('click', function(event) {
    event.preventDefault();
  
    const italicMarkdown = '__';
    const currentPosition = markdownInput.selectionStart;
    const updatedMarkdown = markdownInput.value.substring(0, currentPosition) + italicMarkdown +
    markdownInput.value.substring(currentPosition);
    markdownInput.value = updatedMarkdown;
  
    const newCursorPosition = currentPosition + 1;
    markdownInput.setSelectionRange(newCursorPosition, newCursorPosition);
  
    setTimeout(() => {
      markdownInput.focus();
    }, 10);
  });

  underline.addEventListener('click', function(event) {
    event.preventDefault();
  
    const underlineMarkdown = `<u></u>`;
    const currentPosition = markdownInput.selectionStart;
    const updatedMarkdown = markdownInput.value.substring(0, currentPosition) + underlineMarkdown +
    markdownInput.value.substring(currentPosition);
    markdownInput.value = updatedMarkdown;
  
    const newCursorPosition = currentPosition + 3;
    markdownInput.setSelectionRange(newCursorPosition, newCursorPosition);
  
    setTimeout(() => {
      markdownInput.focus();
    }, 10);
  });

  link.addEventListener('click', function(event) {
    event.preventDefault();
    
    const linkMarkdown = `[Link Text](URL)`;
    const currentPosition = markdownInput.selectionStart;
    const updatedMarkdown = markdownInput.value.substring(0, currentPosition) + linkMarkdown +
    markdownInput.value.substring(currentPosition);
    markdownInput.value = updatedMarkdown;
  
    const newCursorPosition = currentPosition + 10;
    markdownInput.setSelectionRange(newCursorPosition, newCursorPosition);
  
    setTimeout(() => {
      markdownInput.focus();
    }, 10);
  })

  unorderedList.addEventListener('click', function(event) {
    event.preventDefault();
  
    const listMarkdown = '- List item\n';
    const currentPosition = markdownInput.selectionStart;
    const updatedMarkdown = markdownInput.value.substring(0, currentPosition) + listMarkdown +
    markdownInput.value.substring(currentPosition);
    markdownInput.value = updatedMarkdown;
  
    const newCursorPosition = currentPosition + 1;
    markdownInput.setSelectionRange(newCursorPosition, newCursorPosition);
  
    setTimeout(() => {
      markdownInput.focus();
    }, 10);
  });
