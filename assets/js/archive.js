const usuariosGuardados = JSON.parse(localStorage.getItem("personas"));
// Obtener el contenedor donde agregar las imágenes
const gallery = document.getElementById('gallery');

for (let i = 0; i < usuariosGuardados.length; i++) {

    let params = new URLSearchParams(window.location.search);
    let diaSemana = params.get('diaSemana');
    let hora = params.get('hora');


    if( (diaSemana === 'Sabado' || diaSemana === 'Domingo') && usuariosGuardados[i].finde) {// tiene que coincidir el dia del conductor con el dia de la tabla
        mostrarImagenes(usuariosGuardados,i);
    } else {
      if(hora > 12 && usuariosGuardados[i].tarde){// si el conductor tiene activo el horario de la tarde consulta si coincide con la hora de la tabla
        mostrarImagenes(usuariosGuardados,i);
      }
      if(hora < 12 && usuariosGuardados[i].manana){
            mostrarImagenes(usuariosGuardados,i);
        }
    }

    
}

function mostrarImagenes(usuariosGuardados,i){
    // Crear un elemento <img>
    const img = document.createElement('img');
    //img.id = `preview-${i}`; // Asignar un id único
    img.classList.add('preview'); // Asignar una clase
    img.src = usuariosGuardados[i].codigophoto;  // Asignar la URL de la imagen
    img.setAttribute("info", usuariosGuardados[i].nombre + " " +usuariosGuardados[i].apellido);  // Asignar la URL de la imagen
    img.width = 300;  // Establecer el tamaño (100px de ancho)

    // Añadir la imagen al contenedor de la galería
    gallery.appendChild(img); // otra opción document.getElementById('gallery').appendChild(img);
}

    document.querySelectorAll('.preview').forEach(function(element) {
        element.addEventListener('click', function(event) {
            console.log("El elemento que disparó el evento es: ", event.target);
            console.log("usuario: ", event.target.getAttribute('info'));
            const info = event.target.getAttribute('info');
                window.opener.volverAlTd(info);// Asegurar que `window.opener` existe y está abierto
                window.close(); // Cerrar el popup
                // Notificar a la otra página
                //localStorage.setItem("actualizacionConductores", Date.now());
            
        });
    });

    

