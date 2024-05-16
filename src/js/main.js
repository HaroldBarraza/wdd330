import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
 

document.addEventListener('DOMContentLoaded', function () {
    // Verifica si el usuario ya ha visto el modal
    const hasSeenModal = localStorage.getItem('hasSeenModal');

    if (!hasSeenModal) {
        // Si no lo ha visto, muestra el modal
        const modal = document.getElementById('register-modal');
        modal.classList.remove('hidden');

        // Almacena que el usuario ha visto el modal
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

    // Funcionalidad para el botón de registro
    const registerButton = document.getElementById('register-button');
    registerButton.addEventListener('click', function () {
 // Redirigir a la página de registro
    });
});
