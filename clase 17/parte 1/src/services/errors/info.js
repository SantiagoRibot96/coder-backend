export const generarInfoError = (user) => {
    return `Los datos estan incompretos o no son validos,
    Se estaperaba
    - Nombre: String, pero se recibio ${user.nomre}
    - Apellido: String, pero se recibio ${user.apellido}
    - Email: String, pero se recibio ${user.email}`;
}