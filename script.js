'use strict';

// DOM Elements for Markdown rendering
const markdownInput = document.getElementById('markdown-input');  // Markdown input text area element
const renderedOutput = document.getElementById('rendered-output');  // Rendered output div element

// Function to reset the UI state after a successful copy
function resetUIState() {
  const copyButton = document.getElementById('copy-button');
  const tick = document.getElementById('tick');

  tick.style.display = 'none'; // Hide the "tick" indicating successful copy
  copyButton.style.display = 'block'; // Show the "Copy" button
}

// Function to copy the plain text content of the rendered output to the clipboard
function copyRenderedOutput() {
  // Get the rendered HTML content
  const outputHtml = renderedOutput.innerHTML;

  // Create a temporary div element to parse the HTML content
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = outputHtml;

  // Extract the plain text content from the temporary div
  const plainTextOutput = tempDiv.textContent;

  // Copy the plain text content to the clipboard
  navigator.clipboard.writeText(plainTextOutput)
    .then(() => {
      const tick = document.getElementById('tick');
      tick.style.display = 'block'; // Show the "tick" indicating successful copy

      // Hide the "tick" and reset UI state after 3 seconds
      setTimeout(resetUIState, 3000);
    })
    .catch((error) => {
      console.error('Failed to copy to clipboard:', error);
    });
}

// Event listener for rendering markdown on input change
window.onload = () => {
  const headingLevelSelect = document.getElementById('heading-level');
  headingLevelSelect.style.display = 'none';  // Hide heading level select dropdown

  markdownInput.addEventListener('input', () => {
    const markdown = markdownInput.value;  // Get the current value of the markdown input
    const html = marked.parse(markdown, { mangle: false, headerIds: false });  // Parse the markdown into HTML
    renderedOutput.innerHTML = html;  // Update the rendered output with the HTML
  });
  const copyButton = document.getElementById('copy-button');
  copyButton.addEventListener('click', copyRenderedOutput);
};

let isHeadingActive = false;  // Flag to track if heading button is active

// Utility function to update the Markdown input
function updateMarkdownSnippet(snippet) {
  const currentPosition = markdownInput.selectionStart;  // Get the current cursor position in the input
  const updatedMarkdown = markdownInput.value.substring(0, currentPosition) + snippet +
    markdownInput.value.substring(currentPosition);  // Insert the snippet at the cursor position
  markdownInput.value = updatedMarkdown;  // Update the markdown input with the new value

  // Adjust cursor position to between the snippet if necessary
  let middle = snippet.length / 2;
  if (snippet === '****' || snippet === '__' || snippet === '<u></u>' || snippet.includes('```') || snippet === '``') {
    markdownInput.setSelectionRange(currentPosition + middle, currentPosition + middle);  // Place cursor in the middle of the snippet
  } else {
    markdownInput.setSelectionRange(currentPosition + snippet.length, currentPosition + snippet.length);  // Place cursor at the end of the snippet
  }

  setTimeout(() => markdownInput.focus(), 10);  // Set focus back to the markdown input
}

// Handle button clicks for markdown shortcuts
document.getElementById('bold').addEventListener('click', (event) => {
  event.preventDefault();  // Prevent the default click behavior
  updateMarkdownSnippet('****');  // Insert bold markdown syntax
});

document.getElementById('italic').addEventListener('click', (event) => {
  event.preventDefault();  // Prevent the default click behavior
  updateMarkdownSnippet('__');  // Insert italic markdown syntax
});

document.getElementById('underline').addEventListener('click', (event) => {
  event.preventDefault();  // Prevent the default click behavior
  updateMarkdownSnippet('<u></u>');  // Insert underline markdown syntax
});

document.getElementById('link').addEventListener('click', (event) => {
  event.preventDefault();  // Prevent the default click behavior
  updateMarkdownSnippet('[Link Text](URL)');  // Insert link markdown syntax
});

document.getElementById('unordered-list').addEventListener('click', (event) => {
  event.preventDefault();  // Prevent the default click behavior
  updateMarkdownSnippet('- ');  // Insert unordered list item markdown syntax
});

document.getElementById('ordered-list').addEventListener('click', (event) => {
  event.preventDefault();  // Prevent the default click behavior
  updateMarkdownSnippet('1. ');  // Insert ordered list item markdown syntax
});

document.getElementById('quote').addEventListener('click', (event) => {
  event.preventDefault();  // Prevent the default click behavior
  updateMarkdownSnippet('> ');  // Insert blockquote markdown syntax
});

document.getElementById('code').addEventListener('click', (event) => {
  event.preventDefault();  // Prevent the default click behavior
  updateMarkdownSnippet('```\n\n```');  // Insert code block markdown syntax
});

document.getElementById('file-code').addEventListener('click', (event) => {
  event.preventDefault();  // Prevent the default click behavior
  updateMarkdownSnippet('``');  // Insert inline code markdown syntax
});

document.getElementById('image').addEventListener('click', (event) => {
  event.preventDefault();  // Prevent the default click behavior
  updateMarkdownSnippet('![Alt Text](Image URL)');  // Insert image markdown syntax
});

document.getElementById('heading').addEventListener('click', (event) => {
  event.preventDefault();  // Prevent the default click behavior
  const headingLevelSelect = document.getElementById('heading-level');
  if (!isHeadingActive) {
    headingLevelSelect.style.display = 'inline';  // Show the heading level select dropdown
    headingLevelSelect.selectedIndex = 0;  // Reset the selected option
    isHeadingActive = true;  // Set the heading button as active
  } else {
    headingLevelSelect.style.display = 'none';  // Hide the heading level select dropdown
    isHeadingActive = false;  // Set the heading button as inactive
  }
});

// Event listener for heading level selection
document.addEventListener('change', function (event) {
  if (isHeadingActive && event.target.id === 'heading-level') {
    const headingLevelSelect = document.getElementById('heading-level');
    const selectedLevel = parseInt(headingLevelSelect.value);  // Get the selected heading level
    const headingMarkdown = '#'.repeat(selectedLevel) + ' ';  // Construct the heading markdown syntax
    updateMarkdownSnippet(headingMarkdown);  // Insert the heading markdown syntax

    headingLevelSelect.style.display = 'none';  // Hide the heading level select dropdown
    isHeadingActive = false;  // Set the heading button as inactive
  }
});

markdownInput.addEventListener('keydown', function (event) {
  const isOrderedListActive = document.getElementById('ordered-list').classList.contains('active');
  const isUnorderedListActive = document.getElementById('unordered-list').classList.contains('active');

  if (event.key === 'Enter' && (isOrderedListActive || isUnorderedListActive)) {
    event.preventDefault();

    const currentPosition = markdownInput.selectionStart;
    const currentLine = getCurrentLine(markdownInput.value, currentPosition);
    let newLine;

    if (currentLine.startsWith('- ') && isUnorderedListActive) {
      newLine = '- ';
    } else if (currentLine.match(/^\d+\.\s/) && isOrderedListActive) {
      const number = parseInt(currentLine.match(/^\d+/)[0]) + 1;
      newLine = `${number}. `;
    } else {
      newLine = isUnorderedListActive ? '- ' : '';
    }

    const updatedMarkdown = markdownInput.value.substring(0, currentPosition) + '\n' +
      newLine + markdownInput.value.substring(currentPosition);
    markdownInput.value = updatedMarkdown;

    const newCursorPosition = currentPosition + newLine.length + 1;
    markdownInput.setSelectionRange(newCursorPosition, newCursorPosition);
  }
});

function getCurrentLine(text, position) {
  const lines = text.substring(0, position).split('\n');  // Split the text into lines up to the current position
  return lines[lines.length - 1];  // Return the last line (current line)
};