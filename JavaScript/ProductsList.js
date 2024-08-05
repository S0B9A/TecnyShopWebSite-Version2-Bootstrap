function detalleProducto(){
    window.location.href = `detalleProducto.html`;
}

function listProducts(data) {  
    $("#products-list").html('')
    data.forEach(product => {
        const cardProduct=`
        <div class="col-md-3">
            <div class="card">
                <img class="card-image-top p-3" src="${product.Galeria[0] || './Images/Productos/image-not-found.jpg'}" alt="${product.Nombre}">
                <div class="card-body p-1 mb-4">
                    <h4 class="card-title text-center">${product.Nombre}</h4>
                    <hr>
                    <p class="card-text text-center">${product.Descripcion}</p>
                    <h4 class="text-center">${product.Precio}</h4>
                    <div class="btn">
                        <button type="button" onclick="detalleProducto()">Comprar</button>
                    </div>
                </div>
            </div>
        </div>`;
    $("#products-list").append(cardProduct)
    });
   
  }
  
  $(document).ready(function () {
    //Listar productos
    listProducts(products)
  });