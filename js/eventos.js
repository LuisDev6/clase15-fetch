
let boton = document.getElementById("btninisesion");
let boton2 = document.getElementById("btncrearusuario")

boton.addEventListener("click", iniciarSesion);
boton2.addEventListener("click", crearUsuario);


function iniciarSesion() {
    
    Swal.fire({
        title: 'Ingrese su Usuario y Contraseña',
        html:
          '<input id="swal-input1" class="swal2-input" placeholder="Usuario">' +
          '<input id="swal-input2" class="swal2-input" placeholder="Contraseña">',
        focusConfirm: false,

      })
}

function crearUsuario(){

    Swal.fire({
        title: 'Creacion de Usuario',
        html:
          '<input id="swal-input1" class="swal2-input" placeholder="Usuario">' +
          '<input id="swal-input2" class="swal2-input" placeholder="Contraseña">' +
          '<input id="swal-input2" class="swal2-input" placeholder="Repita Contraseña">',
        focusConfirm: false,

      })


}