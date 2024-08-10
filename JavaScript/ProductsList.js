function detalleProducto(ID) {
    window.location.href = `detalleProducto.html?ID=${ID}`;
}

function listProducts(products) {  
    $("#products-list").html('')
    products.forEach(product => {
        const cardProduct=`
        <div class="col-md-3">
            <div class="card">
                <img class="card-image-top p-3" src="${product.Galeria[0] || './Images/Productos/image-not-found.jpg'}" alt="${product.Nombre}">
                <div class="card-body p-1 mb-4">
                    <h4 class="card-title text-center">${product.Nombre}</h4>
                    <hr>
                    <p class="card-text text-center">${product.Descripcion}</p>
                    <h4 class="text-center">₡${product.Precio}</h4>
                    <div class="btn">
                        <button type="button" class="btn btn-primary w-100" onclick="detalleProducto(${product.ID})">Comprar</button>
                    </div>
                </div>
            </div>
        </div>`;
    $("#products-list").append(cardProduct)
    });
   
  }
  function displayCategories() {
    var select = $('#filter');
    var categories = [];
    
    $.each(products, function(index, pr) {
      if($.inArray(pr.Categoria, categories) === -1) {
        categories.push(pr.Categoria);
        select.append(`<option value="${pr.Categoria}">${pr.Categoria}</option>`);
      }
    });
  }
  
  $(document).ready(function () {
    listProducts(products)
    displayCategories()

    $('#filter').change(function () {
        var category = $(this).val();
        var filteredProducts;
        if (category === 'all') {
          filteredProducts = products;
        } else {
          filteredProducts = products.filter(function(product) {
            return product.Categoria === category;
          });
        }
        listProducts(filteredProducts);
      });
  });