$(document).ready(function () {
    monstrarProductosDelCarrito();
    productosCarritoBarraLateral(); 
    
    var sidebarCart = new bootstrap.Offcanvas($('#sidebarCart')[0]);

    $('.fa-shopping-cart').on('click', function() {
        sidebarCart.show();
    });

    $("#productos-list").on("change", ".input__elemento", function() {
        ActualizarCantCarrito($(this));
    });

    $("#cartItems").on("change", ".cantidad", function() {
        ActualizarCantBarraLateral($(this));
    });

    // Escuchar cambios en el método de envío
    $("input[name='shippingMethod']").on("change", function() {
        productosCarritoBarraLateral();
    });

    $('#cantidadCarrito').on('change', function() {
        let value = parseInt($(this).val());
        if (isNaN(value) || value < 1) {
            $(this).val(1);
        } else if (value > 9) {
            $(this).val(9);
        }
    });

    // Prevenir la entrada de caracteres no numéricos
    $('#cantidadCarrito').on('input', function(e) {
        let inputVal = $(this).val();
        // Remover cualquier caracter no numérico
        $(this).val(inputVal.replace(/\D/g, ''));
    });
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
                                <img src="${producto.primeraImagen}" alt="" class="img-fluid">
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
                                    <input id="cantidad" type="number" min="1" value="${producto.cantidadDelProducto}" class="input__elemento form-control custom-input">
                                    <button class="eliminar btn btn-danger ms-2" data-id="${index}">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </div>
                            </td>
            `;

        colProducto.innerHTML = productoItem;
        $("#productos-list").append(colProducto);
    });

    $("#productos-list").off("click", ".eliminar").on("click", ".eliminar", function() {
        const id = $(this).data("id");
        eliminarProductoDelCarrito(id);
    });
}

function productosCarritoBarraLateral() {
    $("#cartItems").html('');

    let productosAlmacenados = JSON.parse(localStorage.getItem("productos")) || [];
    let subtotal = 0;
    let total = 0;

    productosAlmacenados.forEach((producto, index) => {
        const productoItem =`
        <li class="list-group-item d-flex flex-column mb-3">
            <div class="row">
                <div class="col-12 col-md-3 d-flex align-items-center mb-2 mb-md-0">
                    <img src="${producto.primeraImagen}" alt="" class="img-fluid rounded" style="width: 50px; height: 50px;">
                </div>
                <div class="col-12 col-md-9 d-flex flex-column">
                    <div class="d-flex align-items-center mb-2">
                        <span class="fw-bold flex-grow-1">${producto.nombre}</span>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                            <div class="input-group input-group-sm" style="width: 80px;">
                                <input id="cantidadCarrito" type="number" min="1" max="5" value="${producto.cantidadDelProducto}" class="form-control form-control-sm cantidad" data-id="${index}">
                            </div>
                            <button class="eliminar btn btn-danger btn-sm border-0 ms-2" style="width: 30px;" data-id="${index}">
                                <i class="bi bi-trash text-white"></i>
                            </button>
                        </div>
                        <span class="fw-bold">$ ${producto.precio}</span>
                    </div>
                </div>
            </div>
        </li>`;

        $("#cartItems").append(productoItem);

        subtotal += producto.precio * producto.cantidadDelProducto;
    });

    // Calcular el total incluyendo el costo de envío si aplica
    let metodoEnvioCosto = $("input[name='shippingMethod']:checked").val() === "postal" ? 5000 : 0;
    total = subtotal + metodoEnvioCosto;

    $("#cartsubtotal").text(`$${subtotal.toFixed(2)}`);
    $("#cartTotal").text(`$${total.toFixed(2)}`);

    $("#carritosubtotal").text(`$${subtotal.toFixed(2)}`);
    $("#carritoTotal").text(`$${total.toFixed(2)}`);

    $("#cartItems").off("click", ".eliminar").on("click", ".eliminar", function() {
        const id = $(this).data("id");
        eliminarProductoDelCarrito(id);
    });
}

function eliminarProductoDelCarrito(id) {
    let productosAlmacenados = JSON.parse(localStorage.getItem("productos")) || [];

    productosAlmacenados.splice(id, 1);

    localStorage.setItem("productos", JSON.stringify(productosAlmacenados));

    monstrarProductosDelCarrito();
    productosCarritoBarraLateral();
    ActualizarCantidadCarrito();
}

function actualizarCantidadEnLocalStorage(id, nuevaCantidad) {
    let productosAlmacenados = JSON.parse(localStorage.getItem("productos")) || [];

    if (nuevaCantidad <= 0) {
        productosAlmacenados.splice(id, 1);
    } else {
        productosAlmacenados[id].cantidadDelProducto = nuevaCantidad;
        productosAlmacenados[id].subtotal = productosAlmacenados[id].precio * nuevaCantidad;
    }

    localStorage.setItem("productos", JSON.stringify(productosAlmacenados));
}

function ActualizarCantCarrito($input) {
    const id = $input.closest("tr").index(); 
    const nuevaCantidad = parseInt($input.val());

    actualizarCantidadEnLocalStorage(id, nuevaCantidad);
    monstrarProductosDelCarrito();
    productosCarritoBarraLateral();
    ActualizarCantidadCarrito();
}

function ActualizarCantBarraLateral($input) {
    const id = $input.data("id");
    const nuevaCantidad = parseInt($input.val());

    actualizarCantidadEnLocalStorage(id, nuevaCantidad);
    monstrarProductosDelCarrito();
    productosCarritoBarraLateral();
    ActualizarCantidadCarrito();
}
