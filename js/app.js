let carritoDeCompras = [];
let stockProductos = [];

const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById('carrito-contenedor');

const botonTerminar = document.getElementById('terminar');
const finCompra = document.getElementById('fin-compra');

const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');

const selecCategoria = document.getElementById('selecCategoria');
const buscador = document.getElementById('buscar');


//CARGO DATOS DE LA API
cargaProductos();




//FILTRO DE DE CATEGORIAS
selecCategoria.addEventListener('change', () => {
    if (selecCategoria.value == 'todos') {
        mostrarProductos(stockProductos)
    } else {
        mostrarProductos(stockProductos.filter(elemento => elemento.categoria == selecCategoria.value))
    }
})



//logica de la APP

async function cargaProductos() {

    const apiProductos = await fetch("../js/apiproductos.json");
    stockProductos = await apiProductos.json();

    console.log(stockProductos);
    mostrarProductos(stockProductos);
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
                            <a id="agregar${item.id}"  class="btn"><i class="medium material-icons">add_shopping_cart</i></a>
                    </div>
            </div>
        `;
        contenedorProductos.appendChild(div);

        let btnAgregar = document.getElementById(`agregar${item.id}`)

        btnAgregar.addEventListener('click', () => {
            agregarAlCarrito(item.id);
        })
    })
}




function agregarAlCarrito(id) {
    let existe = carritoDeCompras.find(item => item.id == id)
    if (existe) {
        existe.cantidad = existe.cantidad + 1
        document.getElementById(`und${existe.id}`).innerHTML = ` <p id=und${existe.id}>Und:${existe.cantidad}</p>`
        actualizarCarrito()
    } else {
        let agregarProducto = stockProductos.find(elemento => elemento.id == id)

        agregarProducto.cantidad = 1

        carritoDeCompras.push(agregarProducto)

        actualizarCarrito()

        mostrarCarrito(agregarProducto)
    }

    localStorage.setItem('carrito', JSON.stringify(carritoDeCompras))

}

function mostrarCarrito(agregarProducto) {
    let div = document.createElement('div')
    div.className = 'productoEnCarrito'
    div.innerHTML = `
                    <p>${agregarProducto.nombre}</p>
                    <p>Precio: $${agregarProducto.precio}</p>
                    <p id="und${agregarProducto.id}">Und:${agregarProducto.cantidad}</p>
                    <button id="eliminar${agregarProducto.id}" class="boton-eliminar"><i class="tiny material-icons">delete_forever
                    </i></button>
                    
    `
    contenedorCarrito.appendChild(div)

    let btnEliminar = document.getElementById(`eliminar${agregarProducto.id}`)

    btnEliminar.addEventListener('click', () => {
        if (agregarProducto.cantidad == 1) {
            btnEliminar.parentElement.remove()
            carritoDeCompras = carritoDeCompras.filter(item => item.id != agregarProducto.id)
            actualizarCarrito()
            localStorage.setItem('carrito', JSON.stringify(carritoDeCompras))
        } else {
            agregarProducto.cantidad = agregarProducto.cantidad - 1
            document.getElementById(`und${agregarProducto.id}`).innerHTML = ` <p id=und${agregarProducto.id}>Und:${agregarProducto.cantidad}</p>`
            actualizarCarrito()
            localStorage.setItem('carrito', JSON.stringify(carritoDeCompras))
        }


    })

}

function actualizarCarrito() {
    contadorCarrito.innerText = carritoDeCompras.reduce((acc, el) => acc + el.cantidad, 0)
    precioTotal.innerText = carritoDeCompras.reduce((acc, el) => acc + (el.precio * el.cantidad), 0)

}

function recuperarCarrito() {
    let recuperarLS = JSON.parse(localStorage.getItem('carrito'))

    if (recuperarLS) {
        recuperarLS.forEach(el => {
            mostrarCarrito(el)
            carritoDeCompras.push(el)
            actualizarCarrito()
        })
    }


}

//MUESTRO PRODUCTOS 
mostrarProductos(stockProductos);

//RECUPERO DATOS DEL LOCALSTORAGE
recuperarCarrito();




