$(document).ready(function() {
    let formLoaded = false; 

    $("#BTNcomprar").on("click", function(event) {
        event.preventDefault(); 

        if ($("#postal").is(":checked")) {
            localStorage.setItem("shippingMethod", "postal");
        } else {
            localStorage.setItem("shippingMethod", "pickup");
        }
        
        window.location.href = "procesoDePago.html";
    });

    if (window.location.pathname.endsWith("procesoDePago.html")) {
        const shippingMethod = localStorage.getItem("shippingMethod");

        if (shippingMethod === "postal") {
            const billingForm = `
                <div class="col-12">
                    <h5 class="text-center" style="color: #333; font-size: 1.2rem;">Dirección de Facturación</h5>
                </div>
                <div class="col-md-6 mb-2">
                    <label for="full-name" style="font-weight: 600; font-size: 0.8rem;">Nombre Completo</label>
                    <input type="text" class="form-control form-control-sm" id="full-name" placeholder="Nombre completo">
                </div>
                <div class="col-md-6 mb-2">
                    <label for="email" style="font-weight: 600; font-size: 0.8rem;">Correo Electrónico</label>
                    <input type="email" class="form-control form-control-sm" id="email" placeholder="Correo electrónico">
                </div>
                <div class="col-md-6 mb-2">
                    <label for="address" style="font-weight: 600; font-size: 0.8rem;">Dirección</label>
                    <input type="text" class="form-control form-control-sm" id="address" placeholder="Dirección">
                </div>
                <div class="col-md-6 mb-2">
                    <label for="city" style="font-weight: 600; font-size: 0.8rem;">Ciudad</label>
                    <input type="text" class="form-control form-control-sm" id="city" placeholder="Ciudad">
                </div>
                <div class="col-md-6 mb-2">
                    <label for="state" style="font-weight: 600; font-size: 0.8rem;">Estado/Provincia</label>
                    <input type="text" class="form-control form-control-sm" id="state" placeholder="Estado/Provincia">
                </div>
                <div class="col-md-6 mb-2">
                    <label for="zip-code" style="font-weight: 600; font-size: 0.8rem;">Código Postal</label>
                    <input type="text" class="form-control form-control-sm" id="zip-code" placeholder="Código postal">
                </div>
            `;
            $("#Facturación").html(billingForm);
            formLoaded = true; 
        }
    }

    $("#finalize-button").click(function(event) {
        event.preventDefault();

        if (formLoaded) {
            if (validatePaymentForm() && validateCardForm()) {
                // Mostrar el círculo de carga
                $("#loading-overlay").removeClass("d-none");

                // Esperar 3 segundos antes de mostrar el mensaje de éxito y redirigir
                setTimeout(function() {
                    $("#loading-overlay .spinner-border").addClass("d-none"); // Ocultar el spinner
                    $("#success-message").removeClass("d-none"); // Mostrar el mensaje de éxito

                    // Redirigir a la factura después de mostrar el mensaje
                    setTimeout(function() {
                        window.location.href = "factura.html";
                    }, 2000); // Espera 2 segundos para que el usuario vea el mensaje antes de redirigir
                }, 3000); // Espera 3 segundos para el círculo de carga
            } else {
                alert("Por favor, corrige los errores en el formulario antes de continuar.");
            }
        } else {
            if (validateCardForm()) {
                // Mostrar el círculo de carga
                $("#loading-overlay").removeClass("d-none");

                // Esperar 3 segundos antes de redirigir
                setTimeout(function() {
                    $("#loading-overlay .spinner-border").addClass("d-none"); // Ocultar el spinner
                    $("#success-message").removeClass("d-none"); // Mostrar el mensaje de éxito

                    // Redirigir a la factura después de mostrar el mensaje
                    setTimeout(function() {
                        window.location.href = "factura.html";
                    }, 2000); // Espera 2 segundos para que el usuario vea el mensaje antes de redirigir
                }, 3000); // Espera 3 segundos para el círculo de carga
            } else {
                alert("Por favor, corrige los errores en el formulario antes de continuar.");
            }
        }
    });

    function validatePaymentForm() {
        let isValid = true;
    
        // Validar nombre completo (solo letras y espacios)
        const fullName = $("#full-name").val().trim();
        const namePattern = /^[a-zA-Z\s]+$/;
        if (!namePattern.test(fullName)) {
            isValid = false;
            $("#full-name").addClass("is-invalid");
            $("#full-name").siblings(".invalid-feedback").remove();
            $("#full-name").after('<div class="invalid-feedback">El nombre completo debe contener solo letras y espacios.</div>');
        } else if (fullName === "") {
            isValid = false;
            $("#full-name").addClass("is-invalid");
            $("#full-name").siblings(".invalid-feedback").remove();
            $("#full-name").after('<div class="invalid-feedback">Por favor, ingresa tu nombre completo.</div>');
        } else {
            $("#full-name").removeClass("is-invalid");
            $("#full-name").siblings(".invalid-feedback").remove();
        }
    
        // Validar dirección (solo letras y espacios)
        const address = $("#address").val().trim();
        if (!namePattern.test(address) || address === "") {
            isValid = false;
            $("#address").addClass("is-invalid");
            $("#address").siblings(".invalid-feedback").remove();
            $("#address").after('<div class="invalid-feedback">La dirección debe contener solo letras y espacios.</div>');
        } else {
            $("#address").removeClass("is-invalid");
            $("#address").siblings(".invalid-feedback").remove();
        }
    
        // Validar ciudad (solo letras y espacios)
        const city = $("#city").val().trim();
        if (!namePattern.test(city) || city === "") {
            isValid = false;
            $("#city").addClass("is-invalid");
            $("#city").siblings(".invalid-feedback").remove();
            $("#city").after('<div class="invalid-feedback">La ciudad debe contener solo letras y espacios.</div>');
        } else {
            $("#city").removeClass("is-invalid");
            $("#city").siblings(".invalid-feedback").remove();
        }
    
        // Validar provincia/estado (solo letras y espacios)
        const state = $("#state").val().trim();
        if (!namePattern.test(state) || state === "") {
            isValid = false;
            $("#state").addClass("is-invalid");
            $("#state").siblings(".invalid-feedback").remove();
            $("#state").after('<div class="invalid-feedback">El estado o provincia debe contener solo letras y espacios.</div>');
        } else {
            $("#state").removeClass("is-invalid");
            $("#state").siblings(".invalid-feedback").remove();
        }
    
        // Validar código postal (solo números y debe tener 5 o 9 dígitos)
        const zipCode = $("#zip-code").val().trim();
        const zipPattern = /^\d{5}(-\d{4})?$/;
        if (!zipPattern.test(zipCode)) {
            isValid = false;
            $("#zip-code").addClass("is-invalid");
            $("#zip-code").siblings(".invalid-feedback").remove();
            $("#zip-code").after('<div class="invalid-feedback">Por favor, ingresa un código postal válido.</div>');
        } else {
            $("#zip-code").removeClass("is-invalid");
            $("#zip-code").siblings(".invalid-feedback").remove();
        }
    
        // Validar correo electrónico (debe ser hotmail o gmail y terminar en .com)
        const email = $("#email").val().trim();
        const emailPattern = /^[^\s@]+@(hotmail|gmail)\.com$/;
        if (!emailPattern.test(email)) {
            isValid = false;
            $("#email").addClass("is-invalid");
            $("#email").siblings(".invalid-feedback").remove();
            $("#email").after('<div class="invalid-feedback">Por favor, ingresa un correo electrónico válido (hotmail o gmail con .com).</div>');
        } else {
            $("#email").removeClass("is-invalid");
            $("#email").siblings(".invalid-feedback").remove();
        }
    
        return isValid;
    }
    

    function validateCardForm() {
        let isValid = true;
    
        // Validar el nombre en la tarjeta (solo letras y espacios)
        const cardHolderName = $("#card-holder").val().trim();
        const namePattern = /^[a-zA-Z\s]+$/;
        if (!namePattern.test(cardHolderName)) {
            isValid = false;
            $("#card-holder").addClass("is-invalid");
            $("#card-holder").siblings(".invalid-feedback").remove();
            $("#card-holder").after('<div class="invalid-feedback">El nombre en la tarjeta debe contener solo letras y espacios.</div>');
        } else {
            $("#card-holder").removeClass("is-invalid");
            $("#card-holder").siblings(".invalid-feedback").remove();
        }
    
        // Validar el número de tarjeta (solo números y mínimo 8 dígitos)
        const cardNumber = $("#card-number").val().trim();
        const cardNumberPattern = /^\d{8,16}$/;
        if (!cardNumberPattern.test(cardNumber)) {
            isValid = false;
            $("#card-number").addClass("is-invalid");
            $("#card-number").siblings(".invalid-feedback").remove();
            $("#card-number").after('<div class="invalid-feedback">El número de tarjeta debe contener solo números y tener entre 8 y 16 dígitos.</div>');
        } else {
            $("#card-number").removeClass("is-invalid");
            $("#card-number").siblings(".invalid-feedback").remove();
        }
    
        // Validar el CVV (solo números y mínimo 3 dígitos)
        const cvv = $("#cvv").val().trim();
        const cvvPattern = /^\d{3,4}$/;
        if (!cvvPattern.test(cvv)) {
            isValid = false;
            $("#cvv").addClass("is-invalid");
            $("#cvv").siblings(".invalid-feedback").remove();
            $("#cvv").after('<div class="invalid-feedback">El CVV debe contener solo números y tener entre 3 y 4 dígitos.</div>');
        } else {
            $("#cvv").removeClass("is-invalid");
            $("#cvv").siblings(".invalid-feedback").remove();
        }
    
        // Validar el mes y año de expiración
        const expirationMonth = $("#expiration-month").val();
        const expirationYear = $("#expiration-year").val();
        if (expirationMonth === "month" || expirationYear === "year") {
            isValid = false;
            $("#expiration-month").addClass("is-invalid");
            $("#expiration-month").siblings(".invalid-feedback").remove();
            $("#expiration-month").after('<div class="invalid-feedback">Por favor, selecciona el mes de expiración.</div>');
            $("#expiration-year").addClass("is-invalid");
            $("#expiration-year").siblings(".invalid-feedback").remove();
            $("#expiration-year").after('<div class="invalid-feedback">Por favor, selecciona el año de expiración.</div>');
        } else {
            $("#expiration-month").removeClass("is-invalid");
            $("#expiration-month").siblings(".invalid-feedback").remove();
            $("#expiration-year").removeClass("is-invalid");
            $("#expiration-year").siblings(".invalid-feedback").remove();
    
            const today = new Date();
            const currentMonth = today.getMonth() + 1;
            const currentYear = today.getFullYear();
            if (parseInt(expirationYear) < currentYear || 
                (parseInt(expirationYear) === currentYear && parseInt(expirationMonth) < currentMonth)) {
                isValid = false;
                $("#expiration-month").addClass("is-invalid");
                $("#expiration-month").siblings(".invalid-feedback").remove();
                $("#expiration-month").after('<div class="invalid-feedback">La tarjeta ha expirado.</div>');
                $("#expiration-year").addClass("is-invalid");
                $("#expiration-year").siblings(".invalid-feedback").remove();
                $("#expiration-year").after('<div class="invalid-feedback">La tarjeta ha expirado.</div>');
            }
        }
    
        return isValid;
    }
    
});
