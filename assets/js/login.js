function enviarForm(event) {

    event.preventDefault();

    const usuario= "Miqueas"; 
    const contraseña= "elbicho";
    const idUsuario = document.getElementById("user").value;
    const idContra = document.getElementById("contra").value;

    console.log("idUsuario:", idUsuario);
    console.log("idContra:", idContra);

    if (idUsuario === usuario  && idContra === contraseña) {
        window.location.href = "index.html";
    } else {
      alert("Usuario y/o Contraseña Incorrecta");
      }
}