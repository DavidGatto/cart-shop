// clase constructora 
class Producto {
    constructor(id, titulo, imagen, categoria, precio) {
      this.id = id;
      this.titulo = titulo;
      this.imagen = imagen;
      this.categoria = categoria;
      this.precio = precio;
    }
  }
  
  const productosCart = [
    new Producto(
      "teclado-01",
      "teclado 01",
      "./images/teclados/teclado_1.webp",
      {
        nombre: "Teclados",
        id: "teclados"
      },
      11500
    ),
    new Producto(
      "teclado-02",
      "teclado 02",
      "./images/teclados/teclado_2.webp",
      {
        nombre: "Teclados",
        id: "teclados"
      },
      13750
    ),
    new Producto(
      "teclado-03",
      "teclado 03",
      "./images/teclados/teclado_3.webp",
      {
        nombre: "Teclados",
        id: "teclados"
      },
      10100
    ),
    new Producto(
      "teclado-04",
      "teclado 04",
      "./images/teclados/teclado_4.webp",
      {
        nombre: "Teclados",
        id: "teclados"
      },
      5400
    ),
    new Producto(
      "notebook-01",
      "notebook 01",
      "./images/notebooks/notebook-1.webp",
      {
        nombre: "Notebooks",
        id: "notebooks"
      },
      12100
    ),
    new Producto(
      "notebook-02",
      "notebook 02",
      "./images/notebooks/notebook-2.webp",
      {
        nombre: "Notebooks",
        id: "notebooks"
      },
      101050
    ),
    new Producto(
      "notebook-03",
      "notebook 03",
      "./images/notebooks/notebook-3.jpg",
      {
        nombre: "Notebooks",
        id: "notebooks"
      },
      234000
    ),
    new Producto(
      "mouse-01",
      "mouse 01",
      "./images/mouses/mouse-1.jpg",
      {
        nombre: "Mouses",
        id: "mouses"
      },
      14300
    ),
    new Producto(
      "mouse-02",
      "mouse 02",
      "./images/mouses/mouse-2.jpg",
      {
        nombre: "Mouses",
        id: "mouses"
      },
      7890
    )
  ];
  
  
  

const contenedorProductos = document.querySelector("#contenedor__productos");
const botonesElegidos = document.querySelectorAll(".boton-elegido")
const tituloCategorias = document.querySelector("#titulo__principal")
let buttonAdd = document.querySelectorAll(".productos__button--add")
const numeroCart = document.querySelector("#numeroCart")


// funcion para mostrar los productos en el contenedor segun la categoria seleccionada
function mostrarProductos(elegirProductos) {
    contenedorProductos.innerHTML = "";
    elegirProductos.forEach (producto => {
    const div = document.createElement("div");
    div.classList.add("productos");
    div.innerHTML = `
    <div class="img">
                        <img class="productos__imagen ${producto.clase}" src="${producto.imagen}" alt="${producto.titulo}">
    </div>
     <div class="productos__2">
     <h2 class="productos__titulo">${producto.titulo}</h2>
     <p class="productos__precio">$${producto.precio}</p>
    <button class="productos__button--add" id="${producto.id}">Añadir</button>
    </div>
    `;
    contenedorProductos.append(div);
})
buttonAddRemake();
}
mostrarProductos(productosCart);

botonesElegidos.forEach(boton => {
    boton.addEventListener("click", (e) =>{
        if(e.currentTarget.id !== "all"){
            const categoriaElegida = productosCart.find (producto => producto.categoria.id === e.currentTarget.id)
            tituloCategorias.innerHTML = categoriaElegida.categoria.nombre;
    const productosCartBoton = productosCart.filter(producto => producto.categoria.id === e.currentTarget.id);
mostrarProductos(productosCartBoton);
}
else{
    tituloCategorias.innerHTML = "Todos los productos"
    mostrarProductos(productosCart);
}
})  
})

// funcion para actualizar los event listeners de los botones para agregar al carrito
function buttonAddRemake(){
    buttonAdd = document.querySelectorAll(".productos__button--add");

buttonAdd.forEach(boton => {
    boton.addEventListener('click', agregarCarrito)
})
}

// se inicia un carrito vacio o recupera el carrito desde el localstorage
let carritoProductos;
const carritoProductosRemake = JSON.parse(localStorage.getItem('carrito_productos')) || [];
if (carritoProductosRemake){
    carritoProductos = carritoProductosRemake;
    numeroActualizado();
}else{
    carritoProductos = [];
}

// funcion para agregar un producto al carrito cuando se hace clic en el boton
function agregarCarrito(e) {
    const buttonId = e.currentTarget.id;
    const productoSeleccionado = carritoProductos.find(producto => producto.id === buttonId);
  
    if (productoSeleccionado) {
      productoSeleccionado.cantidad = (productoSeleccionado.cantidad || 0) + 1;
    } else {
      const productoNuevo = {
        ...productosCart.find(producto => producto.id === buttonId),
        cantidad: 1
      };
      carritoProductos.push(productoNuevo);
    }
    numeroActualizado()
    localStorage.carrito_productos = JSON.stringify(carritoProductos);
  }

// funcion para actualizar el contador de productos en el carrito 
function numeroActualizado() {
    let nuevoNumeroCart = carritoProductos.reduce((acc, producto) => acc + producto.cantidad, 0);
    numeroCart.innerText = nuevoNumeroCart
}
