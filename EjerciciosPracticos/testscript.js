document.addEventListener("DOMContentLoaded", () => { 
 fetch("https://fakestoreapi.com/products") 
   .then((response) => response.json()) 
   .then((data) => { 
     const contenedor = 
document.getElementById("productos-container"); 
     data.forEach((producto) => { 
       contenedor.innerHTML += ` 
                 <div class="card"> 
                     <img src="${producto.image}" 
alt="${producto.title}"> 
                     <h3>${producto.title}</h3> 
                     <p>Precio: $${producto.price}</p> 
                     <button 
onclick="agregarAlCarrito(${producto.id})">Añadir al 
carrito</button> 
                 </div> 
             `; 
     }); 
   }) 
   .catch((error) => { 
     console.error("Error al obtener productos:", error); 
     contenedor.innerHTML = "<p>Hubo un problema al cargar los productos.</p>;"
   }); 
}); 
 
function agregarAlCarrito(idProducto) { 
 let carrito = JSON.parse(localStorage.getItem("carrito")) || 
[]; 
 carrito.push(idProducto); 
 localStorage.setItem("carrito", JSON.stringify(carrito)); 
 alert("Producto añadido al carrito"); 
}
function actualizarCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const carritoCounter = document.getElementById("cart-counter");
  carritoCounter.textContent = carrito.length;
}

document.addEventListener("DOMContentLoaded", () => {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      const contenedor = document.getElementById("productos-container");
      data.forEach((producto) => {
        contenedor.innerHTML += `
          <div class="card">
            <img src="${producto.image}" alt="${producto.title}">
            <h3>${producto.title}</h3>
            <p>Precio: $${producto.price}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Añadir al carrito</button>
          </div>
        `;
      });
      actualizarCarrito(); // Actualiza el contador al cargar productos
    })
    .catch((error) => {
      console.error("Error al obtener productos:", error);
      contenedor.innerHTML = "<p>Hubo un problema al cargar los productos.</p>";
    });
});

function agregarAlCarrito(idProducto) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.push(idProducto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert("Producto añadido al carrito");
  actualizarCarrito(); // Actualiza el contador al agregar
}

function actualizarCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const carritoCounter = document.getElementById("cart-counter");
  carritoCounter.textContent = carrito.length;
}

function agregarAlCarrito(idProducto) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.push(idProducto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert("Producto añadido al carrito");
  actualizarCarrito();
}

document.addEventListener("DOMContentLoaded", () => {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      const contenedor = document.getElementById("productos-container");
      data.forEach((producto) => {
        contenedor.innerHTML += `
          <div class="card">
            <img src="${producto.image}" alt="${producto.title}">
            <h3>${producto.title}</h3>
            <p>Precio: $${producto.price}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Añadir al carrito</button>
          </div>
        `;
      });
      actualizarCarrito();
    })
    .catch((error) => {
      console.error("Error al obtener productos:", error);
      contenedor.innerHTML = "<p>Hubo un problema al cargar los productos.</p>";
    });
});
