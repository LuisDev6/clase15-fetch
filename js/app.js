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


//BUSQUEDA
buscador.addEventListener("input", () => {
    if (buscador.value == "") {
        mostrarProductos(stockProductos)
    } else {
        mostrarProductos(stockProductos.filter(element => element.nombre.toLowerCase().includes(buscador.value.toLowerCase())))
    }
})


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
            <div class="card">
                 <img src="${item.img}" class="card-img-top  alt="...">
                    <div class="card-body">
                            <h5 class="card-title">${item.nombre}</h5>
                            <p class="card-text">${item.descripcion}</p>
                            <p>Precio:$${item.precio}</p>    
                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <a id="agregar${item.id}" class="btn btn-primary">Agregar <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
                            <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
                            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                            </svg></a>
                            </div>
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
                    <p>Precio:$${agregarProducto.precio}</p>
                    <p id="und${agregarProducto.id}">Cant: ${agregarProducto.cantidad}</p>
                    <button id="eliminar${agregarProducto.id}" class="boton-eliminar"><svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                  </svg></button>
                    
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




