/*jslint browser: true, this: true */
/*global Image, console, Prism */
document.addEventListener("DOMContentLoaded", function() {

    const codeElements = document.querySelectorAll("code.code");

    codeElements.forEach((codeBlock) => {

        codeBlock.classList.add("language-python");

        const content = codeBlock.textContent;

        codeBlock.textContent = content;

        Prism.highlightElement(codeBlock);
    });
});