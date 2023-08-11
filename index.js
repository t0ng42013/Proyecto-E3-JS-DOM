const pizzas = [
  {
    id: 1,
    nombre: "pizza de Muzzarella",
    precio: 500,
    ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
    imagen: "./img/muzzarella.png",
  },

  {
    id: 2,
    nombre: "pizza de Cebolla",
    precio: 1500,
    ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
    imagen: "./img/cebolla.png",
  },

  {
    id: 3,
    nombre: "pizza 4 Quesos",
    precio: 1380,
    ingredientes: [
      "Muzzarella",
      "Tomate",
      "Queso Azul",
      "Parmesano",
      "Roquefort",
    ],
    imagen: "./img/4quesos.png",
  },

  {
    id: 4,
    nombre: "pizza Especial",
    precio: 1000,
    ingredientes: ["Muzzarella", "Tomate", "Rucula", "Jamón"],
    imagen: "./img/especial.png",
  },

  {
    id: 5,
    nombre: "pizza con Anana",
    precio: 600,
    ingredientes: ["Muzzarella", "Tomate", "Anana"],
    imagen: "./img/anana.png",
  },
];

const input = document.querySelector("input");
const btnSearch = document.querySelector("button");
const container = document.querySelector(".card-container");

const renderHtml = (pizza) => {
  return (container.innerHTML = ` 
    
    <div class="card-logo content">
        <h2>Pizza <br><span>for you</span></h2>
    </div>
                
    <div class="new content">
        <h2>New</h2>
    </div>

     <div class="pizzas content">
         <h2 class="nombre-pizza"> ${pizza.nombre}</h2>
            <ul class="ingredientes">Ingredientes:
                 ${buscandoIngredientes(pizza)}
            </ul>
     </div>
            
     <div class="precio content">
         <h2>$${pizza.precio}</h2>
     </div>
            
            `);
};

//verifico el ingreso del usuario
const isValid = () => {
  const valor = Number(input.value);

  if (isNaN(valor) || valor < 1 || valor > 5) {
    console.log("Valor incorrecto, ingrese un número entre 1 y 5");
      mensajeError("Valor incorrecto, ingrese un número entre 1 y 5");
      input.value = '';
    return false;
  }

  return true;
};
//traigo el valor ingresado por le usuario
const traerId = () => {
  if (isValid()) {
    const id = Number(input.value);
    console.log("ID válido:", id);
    buscarObjeto(id);
    input.value = "";
  }
  return;
};

//buscar el objeto con el id
const buscarObjeto = (id) => {
  const pizzaEncontrada = pizzas.find((pizza) => pizza.id === id);

  if (pizzaEncontrada) {
    console.log("Pizza encontrada:", pizzaEncontrada);
    renderHtml(pizzaEncontrada);
    imagen(pizzaEncontrada.imagen);

    // Guardar el último ID visitado en localStorage
    localStorage.setItem("ultimoId", id);

    return;
  } else {
    console.log("No se encontró ninguna pizza con ese ID");
  }
};

const buscandoIngredientes = (pizza) => {
  return pizza.ingredientes
    .map((ingrediente) => `<li>- ${ingrediente}</li>`)
    .join("");
};

//cambiar imagen
const imagen = (url) => {
  container.style.backgroundImage = `url(${url})`;
};

//mostrar error
const mensajeError = (mensaje) => {
  container.innerHTML = ``;
  container.style.background = "none";
  container.innerHTML = `
    <div class="card-error">
            <div class="error-title">Error</div>
            <div class="error-cuerpo">
                <figure>
                    <img src="./img/error.png" alt="img-error">

                </figure>
                <p>${mensaje}</p>
            </div>
            <button id="btnError" class="btn-error">OK</button>
         </div>
         `;
  localStorage.removeItem("ultimoId");

  cerrar();
};

//cerrar el mensaje

const cerrar = () => {
  const btnClose = document.querySelector(".btn-error");
  if (btnClose) {
    btnClose.addEventListener("click", () => {
      container.innerHTML = "";
      container.style.backgroundImage = "none";
    });
  }
};

//Buscamos en LS
let ultimaPizza = JSON.parse(localStorage.getItem("pizza"));

let savePizza = () => {
  localStorage.setItem("pizza", JSON.stringify(pizzas));
};

const init = () => {
  btnSearch.addEventListener("click", traerId);

  const ultimoId = localStorage.getItem("ultimoId");
  if (ultimoId) {
    buscarObjeto(Number(ultimoId)); // Convertir a número antes de usarlo
  }
};

init();
