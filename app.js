const db = firebase.firestore();
const contenedorProductos = document.getElementById("lista-productos");
const deleteProduct = (id) => db.collection("lista-productos").doc(id).delete();


const addProduct = (nombre, precio, año) => {
    db.collection("lista-productos").doc().set({
        nombre,
        precio,
        año,
    });
}

const resetearFormulario = () => document.getElementById("formulario").reset();

  const mostrarMensaje = (mensaje, cssClass) => {
    const div = document.createElement("div");
    div.className = `alert alert-${cssClass} mt-2`;
    div.appendChild(document.createTextNode(mensaje));
    // mostrar en el DOM
    const container = document.querySelector(".container");
    const app = document.querySelector("#App");
    container.insertBefore(div, app);
    setTimeout(function () {
        document.querySelector(".alert").remove();
    }, 2000);
}

const obtener = (call) =>{
db.collection("lista-productos").onSnapshot(call);
}


window.addEventListener("DOMContentLoaded",  (e) => {
      obtener((querySnapshot) => {
        contenedorProductos.innerHTML = ``;
        querySnapshot.forEach((doc) => {
            const product = doc.data();
            product.id = doc.id;
            console.log(product);
            
            contenedorProductos.innerHTML += `<div class="card text-center mb-4">
            <div class="card-body">
            <strong>Nombre Del Producto</strong>: ${product.nombre}
            <strong>Presio Del Producto</strong>: ${product.precio}
            <strong>Año Del Producto</strong>: ${product.año}
            <a href="#" class="btn btn-danger btn-borrar" id="${product.id}">Eliminar</a>
          </div>
        </div>`;

        })
    })
})


// eventos DOM
document.getElementById("formulario").addEventListener("submit", function (e) {
    e.preventDefault();
  const nomProduc = document.getElementById("name").value;
  const precio = document.getElementById("precio").value;
  const año = document.getElementById("año").value;

  const producto = new Producto(precio, año, nomProduc);
  //const interface = new Interface();

  if (precio === "" || nomProduc === "" || año === "") {
    return mostrarMensaje("Complete los Espacios", "danger");
  }

  //interface.agregarProducto(producto);
  addProduct(nomProduc, precio, año);
  resetearFormulario();
  mostrarMensaje("Producto Agregado Sactifactoriamente", "success");

});

document
  .getElementById("lista-productos")
  .addEventListener("click", function (e) {
    
    //alert(`Producto Eliminado ${e.target.id}`)
    deleteProduct(e.target.id);
    mostrarMensaje("Producto Eliminado Sactifactoriamente", "danger");
  });
