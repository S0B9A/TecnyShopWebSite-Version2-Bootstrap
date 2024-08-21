document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario por defecto

    let isValid = true;

    // Validación del Nombre Completo
    const nombreCompleto = document.getElementById('nombreCompleto').value;
    if (nombreCompleto.trim() === '') {
        showError('El nombre completo es requerido.');
        isValid = false;
    }

    // Validación del Email
    const email = document.getElementById('email').value;
    if (!email.includes('@') && !email.includes('.')) {
        showError('El email no es válido.');
        isValid = false;
    }


    const telefono = document.getElementById('telefono').value;
    const telefonoPattern = /^\d{8}$/; 
    if (!telefonoPattern.test(telefono)) {
        showError('El teléfono debe tener 8 dígitos. ejemplo "########"');
        isValid = false;
    }


    // Validación de la Fecha de Nacimiento
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    if (!fechaNacimiento) {
        showError('La fecha de nacimiento es requerida.');
        isValid = false;
    }

    // Validación de la Provincia
    const provincia = document.getElementById('provincia').value;
    if (provincia === '') {
        showError('La provincia es requerida.');
        isValid = false;
    }

    // Validación del Género
    const generoMasculino = document.getElementById('masculino').checked;
    const generoFemenino = document.getElementById('femenino').checked;
    if (!generoMasculino && !generoFemenino) {
        showError('El género es requerido.');
        isValid = false;
    }

    // Validación del Mensaje
    const mensaje = document.getElementById('mensaje').value;
    if (mensaje.trim() === '') {
        showError('El mensaje es requerido.');
        isValid = false;
    }

    if (isValid) {
       showError("Formulario enviado con éxito.");
    }
});

function showError(message) {
    // Asegúrate de que la alerta esté inicialmente oculta
    const alert = document.querySelector('.alert');
    alert.classList.add('hide');
    alert.textContent = message;

    // Mostrar la alerta
    setTimeout(function () {
        alert.classList.remove('hide'); // Mostrar la alerta
    }, 100); // Esperar un poco para asegurarse de que se muestra

    // Ocultar la alerta después de 2 segundos
    setTimeout(function () {
        alert.classList.add('hide');
    }, 3000);
}

