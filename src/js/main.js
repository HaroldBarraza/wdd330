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
document.getElementById('register-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  localStorage.setItem('usuario', email);
  localStorage.setItem('contraseña', password);

  alert('Successful registration! Now you can log in.');
  window.location.href = 'login.html';
});

