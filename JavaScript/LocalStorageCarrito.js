function GuardarProducto() {
    const parametrosURL = new URLSearchParams(window.location.search);
    const productoID = parametrosURL.get("ID");

    let productoBuscado = products.find((b) => b.ID == productoID);

    if (productoBuscado) {
        console.table(productoBuscado);

        // Asigna los valores a variables separadas
        const precio = parseInt(productoBuscado.Precio);
        const nombre = productoBuscado.Nombre;
        const primeraImagen = productoBuscado.Galeria[0];
        var cantidadDelProducto = parseInt(document.getElementById("productQuantity").value);
        const subtotal = cantidadDelProducto * precio;

        const producto = {
            productoID,
            primeraImagen,
            nombre,
            precio,
            cantidadDelProducto,
            subtotal
        };

        VerificacionDeProductos(producto);
    }
};

function AlmacenarEnLocalStorage(producto) {
    let productosAlmacenados = JSON.parse(localStorage.getItem("productos")) || [];
    productosAlmacenados.push(producto);
    localStorage.setItem("productos", JSON.stringify(productosAlmacenados));

    //Pruebas
    productoEnLocalStorage = JSON.parse(localStorage.getItem("productos")) || [];
    console.table(productoEnLocalStorage);
};

function ActualizarProductosEnLocalStorage(producto) {
    let productosAlmacenados = JSON.parse(localStorage.getItem("productos")) || [];

    for (let i = 0; i < productosAlmacenados.length; i++) {
        if (productosAlmacenados[i].productoID === producto.productoID) {
            productosAlmacenados[i].cantidadDelProducto += producto.cantidadDelProducto;
            productosAlmacenados[i].subtotal = productosAlmacenados[i].precio * productosAlmacenados[i].cantidadDelProducto;
        }
    }

    localStorage.setItem("productos", JSON.stringify(productosAlmacenados));

    //Pruebas
    productoEnLocalStorage = JSON.parse(localStorage.getItem("productos")) || [];
    console.table(productoEnLocalStorage);
}

function VerificacionDeProductos(producto) {
    let seEncuentraElProducto = false;
    let productosAlmacenados = JSON.parse(localStorage.getItem("productos")) || [];

    for (let i = 0; i < productosAlmacenados.length; i++) {
        if (productosAlmacenados[i].productoID === producto.productoID) {
            seEncuentraElProducto = true;
            break; // Sal del bucle una vez encontrado el producto
        }
    }

    if (seEncuentraElProducto) {
        ActualizarProductosEnLocalStorage(producto)
    } else {
        AlmacenarEnLocalStorage(producto);
    }

    // Asegúrate de que la alerta esté inicialmente oculta
    const alert = document.querySelector('.alert');
    alert.classList.add('hide');

    // Mostrar la alerta
    setTimeout(function () {
        alert.classList.remove('hide'); // Mostrar la alerta
    }, 100); // Esperar un poco para asegurarse de que se muestra

    // Ocultar la alerta después de 2 segundos
    setTimeout(function () {
        alert.classList.add('hide');
    }, 3000);
}

