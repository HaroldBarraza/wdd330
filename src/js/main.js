import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
 

document.addEventListener('DOMContentLoaded', function () {
    const hasSeenModal = localStorage.getItem('hasSeenModal');

    if (!hasSeenModal) {
        const modal = document.getElementById('register-modal');
        modal.classList.remove('hidden');

        localStorage.setItem('hasSeenModal', 'true');
    }

    const closeButton = document.querySelector('#close-button');
    if (closeButton) {
        closeButton.addEventListener('click', function () {
            const modal = document.getElementById('register-modal');
            if (modal) {
                modal.classList.add('hidden');
            }
        });
    } else {
        console.error('Close button not found!');
    }

    const registerButton = document.getElementById('register-button');
    registerButton.addEventListener('click', function () {
    });
});
