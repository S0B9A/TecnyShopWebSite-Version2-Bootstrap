$(document).ready(function () {
    const productosEnCarrito = localStorage.getItem('productos');

    // Referencia al botón de PAGAR
    const botonPagar = $('#BTNcomprar');

    // Deshabilitar el botón si no hay productos
    if (!productosEnCarrito || JSON.parse(productosEnCarrito).length === 0) {
        botonPagar.addClass('disabled');
    } else {
        botonPagar.removeClass('disabled');
    }

    $('#cantidad').on('change', function() {
        let value = parseInt($(this).val());
        if (isNaN(value) || value < 1) {
            $(this).val(1);
        } else if (value > 9) {
            $(this).val(9);
        }
    });

    // Prevenir la entrada de caracteres no numéricos
    $('#cantidad').on('input', function(e) {
        let inputVal = $(this).val();
        // Remover cualquier caracter no numérico
        $(this).val(inputVal.replace(/\D/g, ''));
    });
});
