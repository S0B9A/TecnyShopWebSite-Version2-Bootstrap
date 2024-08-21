document.querySelector('.card-number-input').oninput = () =>{
    const cardNumberInput = document.querySelector('.card-number-input').value;
    document.querySelector('.card-number-box').innerText = cardNumberInput || '############';
}

document.querySelector('.card-holder-input').oninput = () =>{
    const cardHolderInput = document.querySelector('.card-holder-input').value;
    document.querySelector('.card-holder-name').innerText = cardHolderInput || 'full name';
}

document.querySelector('.month-input').oninput = () =>{
    document.querySelector('.exp-month').innerText = document.querySelector('.month-input').value;
}

document.querySelector('.year-input').oninput = () =>{
    document.querySelector('.exp-year').innerText = document.querySelector('.year-input').value;
}

document.querySelector('.cvv-input').onmouseenter = () =>{
    document.querySelector('.front').style.transform = 'perspective(1000px) rotateY(-180deg)';
    document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(0deg)';
}

document.querySelector('.cvv-input').onmouseleave = () =>{
    document.querySelector('.front').style.transform = 'perspective(1000px) rotateY(0deg)';
    document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(180deg)';
}

document.querySelector('.cvv-input').oninput = () =>{
    document.querySelector('.cvv-box').innerText = "cvv " + document.querySelector('.cvv-input').value;
}

document.addEventListener('DOMContentLoaded', function () {
    // Seleccionamos los elementos relevantes del DOM
    const cardNumberInput = document.getElementById('card-number');
    const cardLogoFront = document.querySelector('.imagen-tipoDeTarjeta-Front');
    const cardLogoBack = document.querySelector('.imagen-tipoDeTarjeta-Back');

    // Función que se ejecuta cada vez que se escribe en el input del número de tarjeta
    cardNumberInput.addEventListener('input', function () {
        // Tomamos los primeros 8 dígitos del número de tarjeta ingresado
        const firstEightDigits = cardNumberInput.value.substring(0, 8);

        if (firstEightDigits.length === 8) { // Verificamos que haya 8 dígitos antes de hacer la solicitud
            // Hacemos la solicitud a la API
            fetch(`https://data.handyapi.com/bin/${firstEightDigits}`)
                .then(response => response.json()) // Convertimos la respuesta en JSON
                .then(data => {
                    // Verificamos si el estado de la respuesta es "SUCCESS"
                    if (data.Status === "SUCCESS") {
                        // Comprobamos si es Visa o MasterCard
                        if (data.Scheme === "VISA") {
                            // Si es VISA, actualizamos la imagen del logo
                            cardLogoFront.src = './Images/Tarjeta/Visa-Logo-2.png';
                            cardLogoBack.src = './Images/Tarjeta/Visa-Logo-2.png';
                        } else if (data.Scheme === "MASTERCARD") {
                            // Si es MasterCard, actualizamos la imagen del logo
                            cardLogoFront.src = './Images/Tarjeta/Mastercard-logo.1.png';
                            cardLogoBack.src = './Images/Tarjeta/Mastercard-logo.1.png';
                        } else {
                            // Si no es ni Visa ni MasterCard, ocultamos el logo
                            cardLogoFront.src = '';
                            cardLogoBack.src = '';
                        }
                    } else {
                        // Si la API no devuelve un estado "SUCCESS", ocultamos el logo
                        cardLogoFront.src = '';
                        cardLogoBack.src = '';
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    // Si hay un error en la solicitud, ocultamos el logo
                    cardLogoFront.src = '';
                    cardLogoBack.src = '';
                });
        } else {
            // Si no hay suficientes dígitos, ocultamos el logo
            cardLogoFront.src = '';
            cardLogoBack.src = '';
        }
    });
});

