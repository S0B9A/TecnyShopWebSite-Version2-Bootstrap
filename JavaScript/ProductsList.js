function displayBooks(data) {  
    $("#products-list").html('')
    data.forEach(book => {
        const cardBook=`
        <div class="col-md-3">
            <div class="card">
                <img class="card-image-top p-3" src="${book.Galeria[0] || './Images/Productos/image-not-found.jpg'}" alt="${book.Nombre}">
                <div class="card-body p-1 mb-4">
                    <h2 class="card-title text-center">${book.Nombre}</h2>
                    <hr>
                    <p class="card-text text-center">${book.Descripcion}</p>
                    <h4 class="text-center">${book.Precio}</h4>
                    <div class="btn">
                        <button type="button">Comprar</button>
                    </div>
                </div>
            </div>
        </div>`;
    $("#products-list").append(cardBook)
    });
   
  }
  
  $(document).ready(function () {
    //Listar Libros
    displayBooks(products)
  });