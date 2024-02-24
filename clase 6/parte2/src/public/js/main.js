const socket = io();

// Para enviar mensajes del cliente al servidor, utilizamos emit
// Para escuchar mensajes uso on.

socket.emit("mensaje", "Soy un cliente nuevo");

socket.on("respuesta", (data) => {
    const listaUsuarios = document.getElementById("lista-usuarios");

    listaUsuarios.innerHTML = "";

    data.forEach(item => {
        listaUsuarios.innerHTML += `<li>${item.nombre} - ${item.apellido}</li>`
    });

    socket.disconnect();
});