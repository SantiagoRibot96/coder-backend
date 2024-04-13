const formulario = document.getElementById("loginForm");

formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    let usuario = document.getElementById("usuario").value;
    let pass = document.getElementById("pass").value;

    let objetoLogin = {usuario, pass};

    fetch("/login", {
        method: "POST",
        body: JSON.stringify(objetoLogin),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer: ${localStorage.getItem("authToken")}`
        }
    })
    .then(res => res.json())
        .then(json => {
            localStorage.setItem("authToken", json.token);
        });
});//Guardar en el localStorage es muy inseguro. En cambio las Cookies las puedo limitar para que solo puedan ser accesibles a travez de http