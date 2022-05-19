let stockProductos = [];

const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById('carrito-contenedor');

const botonTerminar = document.getElementById('terminar');
const finCompra = document.getElementById('fin-compra');

const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');

const selecCategoria = document.getElementById('selecCategoria');
const buscador = document.getElementById('buscar');


selecCategoria.addEventListener('change',()=>{
    if(selecCategoria.value == 'todos'){
        mostrarProductos(stockProductos)
    }else{
        mostrarProductos(stockProductos.filter(elemento => elemento.categoria == selecCategoria.value))
    }
})
//CARGO DATOS DE LA API
cargaProductos();

//MUESTRO PRODUCTOS 
mostrarProductos(stockProductos);


//logica de la APP

async function cargaProductos() {

    const apiProductos = await fetch("../js/apiproductos.json");
    stockProductos = await apiProductos.json();

    console.log(stockProductos);
}

function mostrarProductos(array) {

    contenedorProductos.innerHTML = "";
    array.forEach(item => {
        let div = document.createElement('div');
        div.classList.add('producto');

        div.innerHTML += 
        `
            <div class="card" style="width: 18rem;">
                 <img src="${item.img}" class="card-img-top" alt="..." width="300" height="300">
                    <div class="card-body">
                            <h5 class="card-title">${item.nombre}</h5>
                            <p class="card-text">${item.descripcion}</p>
                            <p>Precio:$${item.precio}</p>    
                            <a id="boton"  class="btn btn-primary">Comprar</a>
                    </div>
            </div>
        `;       
        contenedorProductos.appendChild(div);
    })
}




function agregarAlCarrito() {

}

function mostrarCarrito() {

}

function actualizarCarrito() {

}

function recuperarCarrito() {

}



