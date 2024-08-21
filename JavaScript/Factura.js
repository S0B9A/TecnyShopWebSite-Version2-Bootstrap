function actualizarFactura() {
    const hoy = new Date();
    const opcionesFecha = { day: '2-digit', month: 'long', year: 'numeric' };
    const fechaFormateada = hoy.toLocaleDateString('es-ES', opcionesFecha);

    const numeroFactura = Math.floor(Math.random() * (500 - 200 + 1)) + 200;

    $(".invoice-header p").eq(0).html(`<strong>Fecha:</strong> ${fechaFormateada}`);
    $(".invoice-header p").eq(1).html(`<strong>Número de Factura:</strong> #${numeroFactura}`);
    
    const productosAlmacenados = JSON.parse(localStorage.getItem("productos")) || [];
    const tablaCuerpo = $(".invoice-items tbody");
    let subtotal = 0;
    
    tablaCuerpo.empty();

    productosAlmacenados.forEach((producto, index) => {
        const productoSubtotal = producto.precio * producto.cantidadDelProducto;
        subtotal += productoSubtotal;

        const fila = `
            <tr>
                <td>${producto.nombre}</td>
                <td>${producto.cantidadDelProducto}</td>
                <td>$${producto.precio.toFixed(2)}</td>
                <td>$${productoSubtotal.toFixed(2)}</td>
            </tr>
        `;

        tablaCuerpo.append(fila);
    });

    let metodoEnvioCosto = 0;
    const shippingMethod = localStorage.getItem("shippingMethod");

        if (shippingMethod === "postal") {
            metodoEnvioCosto=5000;
            const filaEnvio = `
        <tr>
            <td colspan="3" class="text-end"><strong>Gastos de envio</strong></td>
            <td>$${metodoEnvioCosto.toFixed(2)}</td>
        </tr>
    `;
    tablaCuerpo.append(filaEnvio);
        }
    const total = subtotal + metodoEnvioCosto;

    const filaTotal = `
        <tr>
            <td colspan="3" class="text-end"><strong>Total</strong></td>
            <td>$${total.toFixed(2)}</td>
        </tr>
    `;
    tablaCuerpo.append(filaTotal);

    localStorage.removeItem("productos");
    localStorage.removeItem("shippingMethod");
}

$(document).ready(function() {
    actualizarFactura();
});
