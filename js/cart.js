// se obtiene el carrito de productos desde el localstorage
let carritoProductos = JSON.parse(localStorage.carrito_productos);

const cartVacio = document.querySelector("#cart__Vacio");
const cartProductos = document.querySelector("#cart__productos");
const cartElementos = document.querySelector("#cart__elementos")
let buttonRemove = document.querySelector("#cart__productos--borrar")
const buttonEmpty = document.querySelector("#cart__elementos--borrar")
const total = document.querySelector("#total")
const buttonBuy = document.querySelector(".cart__elementos--comprar")

// funcion para mostrar los productos en el carrito
function mostrarProductosCart() {
    cartProductos.innerHTML = "";

    if (carritoProductos && carritoProductos.length > 0) {
        cartVacio.classList.add("none");
        cartProductos.classList.remove("none");
        cartElementos.classList.remove("none");

        carritoProductos.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("cart__producto");
            div.innerHTML = `
    <div class="cart__productos--producto">
    <img class="cart__productos--img" src="${producto.imagen}" alt="${producto.titulo}">
    <div class="cart__productos--titulo">
        <small>Titulo</small>
        <h2>${producto.titulo}</h2>
    </div>
    <div class="cart__productos--unidades">
        <small>Unidades</small>
        <p>${producto.cantidad}</p>
    </div>
    <div class="cart__productos--precio">
        <small>Precio</small>
        <p>$${producto.precio}</p>
    </div>
    <div class="cart__productos--subtotal">
        <small>Subtotal</small>
        <p>$${producto.precio * producto.cantidad}</p>
    </div>
    <button id= "${producto.id}" class="cart__productos--borrar"><svg xmlns="http://www.w3.org/2000/svg" width="16"
            height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
            <path
                d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
        </svg></button>
    </div>
    `;
            cartProductos.append(div);

        });


    } else {
        cartVacio.classList.remove("none");
        cartProductos.classList.add("none");
        cartElementos.classList.add("none");
    }
    buttonRemoveRemake();
    totalRemake();
}
mostrarProductosCart();


// funcion para actualizar los event listeners de los botones de eliminar de cada producto
function buttonRemoveRemake() {

    buttonRemove = document.querySelectorAll(".cart__productos--borrar")

    buttonRemove.forEach(boton => {
        boton.addEventListener("click", eliminarProducto)
    });
}


// funcion para eliminar un producto del carrito
function eliminarProducto(e) {
    const idBoton = e.currentTarget.id;
    const indiceProducto = carritoProductos.findIndex(producto => producto.id === idBoton);

    if (indiceProducto !== -1) {
        const productoSeleccionado = carritoProductos[indiceProducto];

        if (productoSeleccionado.cantidad > 1) {
            productoSeleccionado.cantidad--;
        } else {
            carritoProductos.splice(indiceProducto, 1);
        }

        localStorage.setItem('carrito_productos', JSON.stringify(carritoProductos));

        mostrarProductosCart();
    }
}
//agrego un event listener al buttonEmpty
buttonEmpty.addEventListener("click", borrarCarrito);

// funcion para eliminar todos los productos del carrito 
function borrarCarrito() {

    carritoProductos = [];

    localStorage.setItem('carrito_productos', JSON.stringify(carritoProductos));

    mostrarProductosCart();
}

// funcion para actualizar el precio total
function totalRemake() {
    let totalPrecio = carritoProductos.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalPrecio}`;
}

//agrego un event listener al buttonBuy
buttonBuy.addEventListener("click", buy);

//funcion para comprar productos y que aparezca una alterta de la lbireria sweet alert
function buy() {
    carritoProductos.length = 0;
    localStorage.setItem("carrito_productos", JSON.stringify(carritoProductos));
    cartVacio.classList.add("none");
    cartProductos.classList.add("none");
    cartElementos.classList.add("none");

    Swal.fire({
        title: '¡Compra exitosa!',
        text: 'Muchas gracias por tu compra',
        icon: 'success',
        confirmButtonText: 'Cool'
      })
}
