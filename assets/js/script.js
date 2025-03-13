let listaPrograma = JSON.parse(localStorage.getItem("programa")) || [];
if(listaPrograma.length === 0){
  for (let i = 0; i < 18; i++) { //Cuando no hay ninguna salida te crea 18 filas vacias.
    let objetoPrograma = {
      id: i,
      dia:"",
      fecha:"",
      hora:"",
      lugar:"",
      conductor:"",
      territorio:"",
      grupo:""
    };
    listaPrograma.push(objetoPrograma);
  }
  localStorage.setItem("programa", JSON.stringify(listaPrograma));
} else {
  for (let i = 0; i < listaPrograma.length; i++) {
    //HORA
    let tr = document.getElementById(i);
    let tdHora = tr.querySelector('.hora');
    let inputHora = tdHora.querySelector('input');
    inputHora.value = listaPrograma[i].hora;
    //LUGAR
    let tdLugar = tr.querySelector('.lugares');
    tdLugar.textContent = listaPrograma[i].lugar;
    //CONDUCTORES
    let tdConductor = tr.querySelector('.conductores');
    tdConductor.textContent = listaPrograma[i].conductor;
    //TERRITORIOS
    let inputTerritorio = tr.querySelector('.territorio').querySelector('.input-terri');
    inputTerritorio.value = listaPrograma[i].territorio;
  }
}

function guardarHora(td) {  
  window.tdSeleccionadoHora = td; // Guardar referencia del TD
}

function guardarLugar(td) {
  window.tdSeleccionadoLugar = td; // Guardar referencia del TD
}

function guardarTerritorio(td) {
  window.tdSeleccionadoTerritorio = td;
}

// Seleccionamos todos los inputs de tipo time y number
const inputsHora = document.querySelectorAll(".hora");
const inputTerri = document.querySelectorAll(".territorio");

// Agregamos un evento 'change' a cada input de hora
inputsHora.forEach(input => {
  input.addEventListener("change", (event) => {
    let horaSeleccionada = event.target.value;
    let idTrSeleccionado = tdSeleccionadoHora.closest('tr').id;

    const programa = JSON.parse(localStorage.getItem("programa"));
    let index = programa.findIndex(prog => prog.id === Number(idTrSeleccionado));
    programa[index].hora = horaSeleccionada;
    localStorage.setItem("programa", JSON.stringify(programa));
  });
});

// Agregamos un evento 'change' a cada input de territorio
inputTerri.forEach(input => {
  input.addEventListener("change", (event) => {
    let territorioSeleccionado = event.target.value;
    let idTrSeleccionado = tdSeleccionadoTerritorio.closest('tr').id;

    const programa = JSON.parse(localStorage.getItem("programa"));
    let index = programa.findIndex(prog => prog.id === Number(idTrSeleccionado));
    if (index !== -1) {
      programa[index].territorio = territorioSeleccionado;
      localStorage.setItem("programa", JSON.stringify(programa));
    }
  });
});

// ///////////////// GUARDAR LOS LUGARES DE SALIDA ///////////////////////////
let listaLugar = JSON.parse(localStorage.getItem("direccion")) || [];
let objetoLugar = {};

function guardarSalida(event) {
    event.preventDefault();
    // Obtener el valor del input
    const lugarDireccion = document.getElementById('lugar').value;

    objetoLugar= lugarDireccion;

        // Guardar el número en el arreglo
        listaLugar.push(objetoLugar);
        console.log(listaLugar);
        localStorage.setItem("direccion", JSON.stringify(listaLugar));
        window.location.href = "index.html";

}


//Fecha de la columna "Fecha"
  const rows = document.querySelectorAll("tbody tr");
  const today = new Date();
  const todayDay = today.getDay(); // Día de la semana actual (0 = Domingo, 1 = Lunes, ...)

  // Determinar si estamos en la semana actual o la siguiente
  let referenceDate = new Date(today);
  if (todayDay !== 1) { // Si hoy NO es lunes
      referenceDate.setDate(today.getDate() + (8 - todayDay)); // Ir al próximo lunes
  } else {
      referenceDate.setDate(today.getDate()); // Usar este lunes como referencia
  }

  rows.forEach(row => {
    const dayCell = row.querySelector("td[data-day]");

    if (!dayCell) {
        return; // Saltar filas sin el atributo data-day
    }

      const dayNumber = parseInt(row.querySelector("td[data-day]").dataset.day);
      const dateInput = row.querySelector(".date-input");

      // Calcular la fecha correcta basada en el lunes de referencia
      let selectedDate = new Date(referenceDate);
      selectedDate.setDate(referenceDate.getDate() + (dayNumber - 1)); // Ajustar días

      // Si es domingo, ajustar la fecha según la condición dada
      if (dayNumber === 0) {
          selectedDate.setDate(selectedDate.getDate() + (todayDay === 1 ? 14 : 7));
      }

      // Establecer la fecha en formato ISO (YYYY-MM-DD)
      dateInput.value = selectedDate.toISOString().split("T")[0];
  });


// Función para manejar la edición de celdas
document.querySelectorAll(".grupos, .lugares").forEach(cell => {
  cell.addEventListener('click', function () {
    let currentText = this.innerText;
    let input = document.createElement('input');
    input.value = currentText;

    // Si la celda es de tipo "lugares", agregamos la clase
    if (this.classList.contains("lugares")) {
      input.classList.add("input-lugar");
    }

    // Reemplazar la celda por el input
    this.innerHTML = '';
    this.appendChild(input);
    input.focus();

    // Mostrar sugerencias si la celda es de tipo "lugares"
    if (this.classList.contains("lugares")) {
      suggestionsContainer = document.getElementById("suggestions");
      suggestionsContainer.innerHTML = "";
      suggestionsContainer.style.display = "none";

      const lugaresGuardados = JSON.parse(localStorage.getItem("direccion")) || [];

      input.addEventListener("input", () => {
        const query = input.value.toLowerCase();
        console.log('Consultando sugerencias para: ', query);
        suggestionsContainer.innerHTML = "";

        if (query) {
          const filteredCalles = lugaresGuardados.filter(calle => calle.toLowerCase().includes(query));

          filteredCalles.forEach(calle => {
            const div = document.createElement("div");
            div.textContent = calle;
            div.classList.add("suggestion");

            div.addEventListener("click", () => {
              input.value = calle;
              guardarEnLocalStorage(calle);
              this.innerHTML = calle;
              suggestionsContainer.style.display = "none";
            });

            suggestionsContainer.appendChild(div);
          });

          // Posicionar las sugerencias
          const rect = input.getBoundingClientRect();
          const offsetTop = rect.top + window.scrollY;
          const offsetLeft = rect.left + window.scrollX;

          suggestionsContainer.style.top = `${offsetTop + rect.height}px`;
          suggestionsContainer.style.left = `${offsetLeft}px`;
          suggestionsContainer.style.width = `${rect.width}px`;
          suggestionsContainer.style.display = "block";
        }
      });
      // Añadir estilos directamente desde JS
      suggestionsContainer.style.position = "absolute";
      suggestionsContainer.style.backgroundColor = "white";
      suggestionsContainer.style.border = "1px solid #ccc";
      suggestionsContainer.style.zIndex = "1000";
      suggestionsContainer.style.maxHeight = "150px";
      suggestionsContainer.style.overflowY = "auto";
    }

   
  function guardarEnLocalStorage(valor) {
    let idTrSeleccionado = tdSeleccionadoLugar.closest('tr').id;
    const programa = JSON.parse(localStorage.getItem("programa"));

    if (programa && Array.isArray(programa)) {
      let index = programa.findIndex(prog => prog.id === Number(idTrSeleccionado));
      if (index !== -1) {
        programa[index].lugar = valor; // Guarda la opción seleccionada
        localStorage.setItem("programa", JSON.stringify(programa));
      }
    }
  }


  });
});


//INPUT modificar el territorio!
let inputTerriInput = document.querySelectorAll('.input-terri');

const allowedKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', 'ArrowLeft', 'ArrowRight']; // Teclas permitidas

// Recorre la NodeList y añade el event listener a cada input
inputTerriInput.forEach((input) => {
  input.addEventListener('keydown', (event) => {
    // Validar teclas permitidas
    if (!allowedKeys.includes(event.key) && event.key !== "Backspace" && event.key !== "Tab") {
      event.preventDefault(); // Evita que teclas no permitidas se escriban
    }

    // Quitar foco si presionan Enter
    if (event.key === 'Enter') {
      input.blur();
    }
  });
});


   function abrirPopup(td) {
    window.tdSeleccionado = td; // Guardar referencia del TD
    let tr = td.closest('tr');
    let diaSemana = tr.querySelector('.dia').textContent;
    let tdHora = tr.querySelector('.hora');
    let inputHora = tdHora.querySelector('input').value;
    let hora= parseInt(inputHora.split(":")[0]);


    window.open('archive.html?diaSemana=' + encodeURIComponent(diaSemana) + '&hora=' + encodeURIComponent(hora), '_blank', 'width=900,height=800');
}

function volverAlTd(info) {
  if (window.tdSeleccionado) {
      window.tdSeleccionado.textContent = info; // Insertar el dato en el TD
      let idTrSeleccionado = window.tdSeleccionado.closest('tr').id; // Asignar el id de la fila más cercana a una variable
      const programa = JSON.parse(localStorage.getItem("programa")) || [];

      // Encuentra el índice del programa correspondiente al idTrSeleccionado
      let index = programa.findIndex(prog => prog.id === Number(idTrSeleccionado));

      if (index !== -1) {
          let conductorSeleccionado = info; // Asumimos que `info` es el conductor seleccionado
          programa[index].conductor = conductorSeleccionado; // Actualiza el conductor en el programa
          localStorage.setItem("programa", JSON.stringify(programa)); // Guarda los cambios en localStorage
      }
  }
}

// -----------------------------  IMPRIMIR TABLA -----------------------------------

function imprimirSoloTabla() {
  // Capturar la tabla original
  let tablaOriginal = document.getElementById('dataTable');
  let estilos = document.head.innerHTML;

  // Crear una copia de la tabla
  let tablaCopia = tablaOriginal.cloneNode(true);

  // Aplicar estilos en línea a cada elemento de la tabla copiada
  function copiarEstilos(elementoOriginal, elementoCopia) {
      let estilosComputados = window.getComputedStyle(elementoOriginal);
      for (let propiedad of estilosComputados) {
          elementoCopia.style[propiedad] = estilosComputados.getPropertyValue(propiedad);
      }
  }

  // Recorrer los nodos de la tabla original y la copia
  function recorrerYAplicarEstilos(nodoOriginal, nodoCopia) {
      copiarEstilos(nodoOriginal, nodoCopia);
      let hijosOriginales = nodoOriginal.children;
      let hijosCopia = nodoCopia.children;

      for (let i = 0; i < hijosOriginales.length; i++) {
          recorrerYAplicarEstilos(hijosOriginales[i], hijosCopia[i]);
      }
  }

  recorrerYAplicarEstilos(tablaOriginal, tablaCopia);

  // Copiar valores de los inputs
  let inputsOriginales = tablaOriginal.querySelectorAll('input');
  let inputsCopia = tablaCopia.querySelectorAll('input');

  inputsOriginales.forEach((inputOriginal, index) => {
      if (inputsCopia[index]) {
          inputsCopia[index].setAttribute('value', inputOriginal.value);
      }
  });

  // Crear una nueva ventana con la tabla y los estilos
  // Determinar el tamaño completo de la pantalla
  let anchoPantalla = screen.width;
  let altoPantalla = screen.height;

  // Abrir una nueva ventana con tamaño completo
  let ventana = window.open(
      '', 
      '', 
      `width=${anchoPantalla}, height=${altoPantalla}, top=0, left=0`
  );
  ventana.document.write('<html><head>' + estilos + '</head><body style="background: linear-gradient(to bottom, #7dccd8, #00f7ff); padding: 20px;">');
  ventana.document.write(tablaCopia.outerHTML);
  ventana.document.write('</body></html>');
  ventana.document.close();

  // Imprimir la nueva ventana
  ventana.print();
}



document.getElementById('descargarExcel').addEventListener('click', function() {
  // Seleccionar la tabla por su id
  let tabla = document.getElementById('dataTable');
  
  // Crear un libro de trabajo a partir de la tabla HTML
  let wb = XLSX.utils.table_to_book(tabla, { sheet: "Hoja 1" });
  
  // Crear un enlace para descargar el archivo Excel
  XLSX.writeFile(wb, "tabla.xlsx");
});

