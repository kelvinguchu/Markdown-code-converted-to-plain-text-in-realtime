window.onload = function() {
    const markdownInput = document.getElementById('markdown-input');
    const renderedOutput = document.getElementById('rendered-output');

    markdownInput.addEventListener('input', function() {
        const markdown = markdownInput.value;
        const html = marked(markdown);
        renderedOutput.innerHTML = html;
    });
}
