document.addEventListener("DOMContentLoaded", () => {
  cargarProductos(); // muestra el catálogo
  actualizarCarrito(); // actualiza el contador
  mostrarCarritoConLocalStorage();
  vaciarCarrito(); // engancha el listener de “vaciar carrito”
});

function mostrarAlerta(mensaje, tiempo = 2000) {
  const alerta = document.createElement("div");
  alerta.textContent = mensaje;
  Object.assign(alerta.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    background: "#fffb01",
    color: "#000",
    padding: "12px 24px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    zIndex: "9999",
  });
  document.body.appendChild(alerta);
  setTimeout(() => alerta.remove(), tiempo);
}

function cargarProductos() {
  fetch("https://fakestoreapi.com/products")
    .then((r) => r.json())
    .then((data) => {
      const cont = document.getElementById("productos-container");
      data.forEach((p) => {
        cont.innerHTML += `
          <div class="js-card">
            <img src="${p.image}" alt="${p.title}" height="120">
            <h3>${p.title}</h3>
            <p>Precio: $${p.price}</p>
            <button onclick="agregarAlCarrito(${p.id})">
              <strong>Añadir al carrito</strong>
            </button>
          </div>`;
      });
    })
    .catch((err) => {
      console.error("Error al cargar catálogo:", err);
    });
}

function agregarAlCarrito(productID) {
  // Lee o inicializa como objeto
  let carrito = JSON.parse(localStorage.getItem("carrito")) || {};
  // Incrementa hasta 99
  carrito[productID] = Math.min((carrito[productID] || 0) + 1, 99);
  localStorage.setItem("carrito", JSON.stringify(carrito));

  mostrarAlerta(
    `Producto ${productID} agregado. Cantidad: ${carrito[productID]}`
  );
  actualizarCarrito();
  mostrarCarritoConLocalStorage();
}

function actualizarCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || {};
  // la suma de todas las cantidades
  const totalItems = Object.values(carrito).reduce((sum, c) => sum + c, 0);
  const counter = document.getElementById("cart-counter");
  if (counter) counter.textContent = totalItems;
}

// function vaciarCarrito() {
//   const btn = document.getElementById("vaciar-carrito");
//   if (!btn) return;
//   btn.addEventListener("click", () => {
//     localStorage.removeItem("carrito");
//     mostrarAlerta("Carrito vaciado");
//     actualizarCarrito();
//     mostrarCarritoConLocalStorage();
//   });
// }

function mostrarCarritoConLocalStorage() {
  const lista = document.getElementById("lista-carrito");
  lista.innerHTML = "";
  let total = 0;

  // lee y normaliza (en caso de haber quedado un array viejo)
  let raw = JSON.parse(localStorage.getItem("carrito")) || {};
  const carrito = Array.isArray(raw)
    ? raw.reduce((o, id) => {
        o[id] = (o[id] || 0) + 1;
        return o;
      }, {})
    : raw;
  localStorage.setItem("carrito", JSON.stringify(carrito));

  const ids = Object.keys(carrito);
  if (ids.length === 0) {
    lista.innerHTML = `
      <li style="padding:16px;text-align:center;font-weight:bold;
                 background:#f0f0f0;border-radius:8px;">
        El carrito está vacío.
      </li>`;
    return;
  }

  fetch("https://fakestoreapi.com/products")
    .then((r) => r.json())
    .then((productos) => {
      ids.forEach((id) => {
        const p = productos.find((x) => x.id == id);
        if (!p) return;
        const c = carrito[id];

        const li = document.createElement("li");
        Object.assign(li.style, {
          display: "flex",
          alignItems: "center",
          gap: "12px",
          margin: "12px 0",
          padding: "12px",
          backgroundColor: "#fff",
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
        });

        // Imagen
        const img = document.createElement("img");
        img.src = p.image;
        img.alt = p.title;
        img.height = 80;
        img.style.borderRadius = "4px";

        // Papelera
        const btnTrash = document.createElement("img");
        btnTrash.src = "imagenes/recycle-bin.png";
        btnTrash.className = "js-bin";
        btnTrash.alt = "Eliminar producto";
        btnTrash.style.height = "20px";
        btnTrash.style.width = "20px";
        btnTrash.onclick = () => {
          delete carrito[id];
          localStorage.setItem("carrito", JSON.stringify(carrito));
          mostrarAlerta(`Producto ${id} eliminado.`);
          actualizarCarrito();
          mostrarCarritoConLocalStorage();
        };

        // Restar
        const btnMenos = document.createElement("button");
        btnMenos.type = "button";
        btnMenos.style.backgroundColor = "#fbff00ff";
        btnMenos.textContent = "−";
        btnMenos.disabled = c <= 1;
        btnMenos.onclick = () => {
          if (carrito[id] > 1) {
            carrito[id]--;
            localStorage.setItem("carrito", JSON.stringify(carrito));
            mostrarAlerta(`Producto ${id} reducido. Cantidad: ${carrito[id]}`);
            actualizarCarrito();
            mostrarCarritoConLocalStorage();
          }
        };

        // Texto
        const spanTexto = document.createElement("span");
        spanTexto.textContent = `${c}× ${p.title}`;
        spanTexto.style.flex = "1";

        // Sumar
        const btnMas = document.createElement("button");
        btnMas.type = "button";
        btnMas.style.backgroundColor = "#fbff00ff";
        btnMas.textContent = "+";
        btnMas.disabled = c >= 99;
        btnMas.onclick = () => {
          if (carrito[id] < 99) {
            carrito[id]++;
            localStorage.setItem("carrito", JSON.stringify(carrito));
            mostrarAlerta(`Producto ${id} agregado. Cantidad: ${carrito[id]}`);
            actualizarCarrito();
            mostrarCarritoConLocalStorage();
          }
        };

        // Precio
        const spanPrecio = document.createElement("span");
        spanPrecio.textContent = `$${(p.price * c).toFixed(2)}`;
        Object.assign(spanPrecio.style, {
          minWidth: "80px",
          textAlign: "right",
          fontWeight: "bold",
        });

        // Montaje
        [img, btnTrash, btnMenos, spanTexto, btnMas, spanPrecio].forEach((el) =>
          li.appendChild(el)
        );
        lista.appendChild(li);
        total += p.price * c;
      });

      // Total final
      const liTotal = document.createElement("li");
      liTotal.textContent = `Total: $${total.toFixed(2)}`;
      Object.assign(liTotal.style, {
        fontWeight: "bold",
        marginTop: "24px",
        padding: "12px",
        background: "#f0f0f0",
        borderRadius: "8px",
      });
      lista.appendChild(liTotal);
    })
    .catch((err) => {
      console.error("🚨 Error al cargar el carrito:", err);
      lista.innerHTML = `<li style="color:red;padding:16px;">Error al cargar el carrito.</li>`;
    });
}
