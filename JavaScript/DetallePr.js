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

            const stockText = product.Stock ? "Disponible online" : "Disponible en tienda física";
            $("#productStock").text(stockText);

            $("#productPrice").text(`₡${product.Precio}`);

            $("#productDescription").text(product.Descripcion);

        } else {
            console.error("Producto no encontrado.");
        }
    } else {
        console.error("ID de producto no proporcionado.");
    }
});
