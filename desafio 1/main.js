/* 
ProductManager es una clase que cuenta con tres metodos:
    -getProducts(): Obtiene los productos existentes;
    -addProduct(titulo, descripcion, precio, url, codigo, stock): Agrega un nuevo producto con los parametros pasados. En caso de que falte alguno, arroja error. En caso que el codigo se repita con otro producto, tambien arroja error. A cada producto le asigna un Id correlativo. Los errores son retornados, deben ser mostrados por linea de consola si asi lo desea;
    -getProducts(id): Busca dentro de los productos existentes uno con el Id solicitado. En caso de encontrarlo retorna el producto, en caso contrario retorna un error.

Al utilizar el constructor de ProductManager se crea un array vacio de productos.

A continuacion un ejemplo del funcionamiento:
*/

import { ProductManager } from "./class.js";

//Creacion de una nueva lista de productos

let newProductList = new ProductManager();

//Verifico que creo un array vacio

let myProducts = newProductList.getProducts();
console.log(myProducts);

//Creacion de los productos

newProductList.addProduct("Arroz", "Arroz blanco grano largo", 900, "https://http2.mlstatic.com/D_NQ_NP_786419-MLA69999631004_062023-O.webp", "AB91C3", 10);
newProductList.addProduct("Arroz", "Arroz blanco grano largo", 900, "https://http2.mlstatic.com/D_NQ_NP_786419-MLA69999631004_062023-O.webp", "AB91C3", 10);//Agrego dos veces el mismo producto, da error
newProductList.addProduct("Arroz", "Arroz blanco grano largo", 900, "https://http2.mlstatic.com/D_NQ_NP_786419-MLA69999631004_062023-O.webp", 10);//Agrego el producto con un dato faltante, da error

newProductList.addProduct("Aceite", "Aceite de girasol", 700, "https://i0.wp.com/www.alpuntodeventa.com.ar/wp-content/uploads/0767-scaled.jpg?fit=600%2C600&ssl=1", "AB91C4", 10);
newProductList.addProduct("Harina", "Harina blanca 000", 1000, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGkek73ZnRDfxH2dE0g-eID6ZxJS8Z-YNPiECJy2jDqQ&s", "AB91C5", 10);

//Verifico que los productos fueron creados correctamente
myProducts = newProductList.getProducts();
console.log(myProducts);

//Busco el producto que quiera
console.log(newProductList.getProductById(3));
console.log(newProductList.getProductById(4));//Producto no encontrado