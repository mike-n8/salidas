let listaPersonas = JSON.parse(localStorage.getItem("personas")) || [];
let objetoPersona = {};

function guardarDato(event) {
    event.preventDefault();
    // Obtener el valor del input
    const palabraNombre = document.getElementById('name').value;
    const secondPalaApellido = document.getElementById('apellido').value;
    //const imagen = document.getElementById('imagen').value;
    const codigophoto = document.getElementById("preview").src;
    let inputManana = document.getElementById("mananaInp").checked;
    let inputTarde = document.getElementById("tardeInp").checked;
    let inputFinde = document.getElementById("findeInp").checked;

    objetoPersona.nombre= palabraNombre;
    objetoPersona.apellido= secondPalaApellido;
    objetoPersona.codigophoto= codigophoto;
    objetoPersona.manana= inputManana;
    objetoPersona.tarde= inputTarde;
    objetoPersona.finde= inputFinde;

        // Guardar el número en el arreglo
        listaPersonas.push(objetoPersona);
        console.log(listaPersonas);
        localStorage.setItem("personas", JSON.stringify(listaPersonas));
        window.location.href = "left-sidebar.html";

}

//TABLA
for (let i = 0; i < listaPersonas.length; i++) {
    let tbody = document.getElementById('tbodyRegister');
    let trNombre = document.createElement('tr');
    let tdNombre = document.createElement('td');
    let tdApellido = document.createElement('td');
    let tdChecMan = document.createElement('td');
    let InputChecMan = document.createElement('input');
    InputChecMan.type = 'checkbox';
    let tdChecTar = document.createElement('td');
    let InputChecTar = document.createElement('input');
    InputChecTar.type = 'checkbox';
    let tdChecFinde = document.createElement('td');
    let InputChecFinde = document.createElement('input');
    InputChecFinde.type = 'checkbox';

    tdChecMan.appendChild(InputChecMan);
    tdChecTar.appendChild(InputChecTar);
    tdChecFinde.appendChild(InputChecFinde);
    
    tdNombre.textContent = listaPersonas[i].nombre;
    tdApellido.textContent = listaPersonas[i].apellido;
    InputChecMan.checked = listaPersonas[i].manana;
    InputChecTar.checked = listaPersonas[i].tarde;
    InputChecFinde.checked = listaPersonas[i].finde;
    tbody.appendChild(trNombre);
// Agregar múltiples <td> al <tr>
[tdNombre, tdApellido, tdChecMan, tdChecTar, tdChecFinde].forEach(td => trNombre.appendChild(td));
InputChecMan.addEventListener('click', ()=>{
    if(InputChecMan.checked) {
        listaPersonas[i].manana = true;
        localStorage.setItem("personas", JSON.stringify(listaPersonas));
    } else {
        listaPersonas[i].manana = false;
        localStorage.setItem("personas", JSON.stringify(listaPersonas));
    }
})
InputChecTar.addEventListener('click', ()=>{
    if(InputChecTar.checked) {
        listaPersonas[i].tarde = true;
        localStorage.setItem("personas", JSON.stringify(listaPersonas));
    } else {
        listaPersonas[i].tarde = false;
        localStorage.setItem("personas", JSON.stringify(listaPersonas));
    }
})
InputChecFinde.addEventListener('click', ()=>{
    if(InputChecFinde.checked) {
        listaPersonas[i].finde = true;
        localStorage.setItem("personas", JSON.stringify(listaPersonas));
    } else {
        listaPersonas[i].finde = false;
        localStorage.setItem("personas", JSON.stringify(listaPersonas));
    }
})
}





  document.getElementById("photoInput").addEventListener("change", function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById("preview").src = e.target.result;
    };
    reader.readAsDataURL(file);
});

function volver(){
    window.location.href = "index.html";
}