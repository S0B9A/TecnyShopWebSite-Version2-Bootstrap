$(document).ready(function () {
    monstrarProductosDelCarrito();
});

function monstrarProductosDelCarrito() {
    $("#productos-list").html('');
    let productosAlmacenados = JSON.parse(localStorage.getItem("productos")) || [];

    productosAlmacenados.forEach((producto, index) => {

        const colProducto = document.createElement("tr");
        colProducto.classList.add("item-Producto");

        const productoItem =
            `<th scope="row" data-label="#">${index + 1}</th>
                            <td class="table__productos" data-label="Producto">
                                <img src="${producto.primeraImagen}"
                                    alt="" class="img-fluid">
                            </td>
                            <td class="table__price col-producto" data-label="Precio">
                                <p>${producto.nombre}</p>
                            </td>
                            <td class="table__price col-producto" data-label="Precio">
                                <p>$ ${producto.precio}</p>
                            </td>
                            <td class="table__subtotal col-producto" data-label="Subtotal">
                                <p>$ ${producto.subtotal}</p>
                            </td>
                            <td class="table__cantidad" data-label="Cantidad">
                                <div class="d-flex align-items-center justify-content-between">
                                    <input type="number" min="1" value="${producto.cantidadDelProducto}"
                                        class="input__elemento form-control custom-input">
                                    <button class="delete btn btn-danger ms-2" data-id="${index}">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </div>
                            </td>`;

        colProducto.innerHTML = productoItem;
        $("#productos-list").append(colProducto); 
    });

    $(".delete").on("click", function() {
        const id = $(this).data("id");
        eliminarProductoDelCarrito(id);
    });
}

function eliminarProductoDelCarrito(id) {
    let productosAlmacenados = JSON.parse(localStorage.getItem("productos")) || [];
    
    productosAlmacenados.splice(id, 1);
    
    localStorage.setItem("productos", JSON.stringify(productosAlmacenados));
    
    monstrarProductosDelCarrito();
    
    ActualizarCantidadCarrito();
}
