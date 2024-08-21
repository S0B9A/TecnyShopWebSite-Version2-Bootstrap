$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productID = urlParams.get("ID");

    if (productID) {
        const product = products.find((p) => p.ID == productID);

        if (product) {
            $("#productName").text(product.Nombre);
            
            const carouselInner = $("#productCarousel .carousel-inner");
            carouselInner.empty(); 

            product.Galeria.forEach((image, index) => {
                const carouselItem = $(`
                    <div class="carousel-item ${index === 0 ? 'active' : ''}">
                        <img src="${image}" class="d-block w-100" alt="ImagenProducto">
                    </div>
                `);
                carouselInner.append(carouselItem);
            });

            const stockText = product.Stock ? "Stock: Disponible online" : "Stock: Disponible en tienda física";
            $("#productStock").text(stockText);

            $("#productPrice").text(`₡${product.Precio}`);

            $("#productDescription").text(product.Descripcion);

            $('#productQuantity').on('change', function() {
                let value = parseInt($(this).val());
                if (isNaN(value) || value < 1) {
                    $(this).val(1);
                } else if (value > 9) {
                    $(this).val(9);
                }
            });
        
            $('#productQuantity').on('input', function(e) {
                let inputVal = $(this).val();
                
                $(this).val(inputVal.replace(/\D/g, ''));
            });

        } else {
            console.error("Producto no encontrado.");
        }
    } else {
        console.error("ID de producto no proporcionado.");
    }
});
