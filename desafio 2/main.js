/* 
ProductManager es una clase que cuenta con 7 metodos:
    -getProducts(): Obtiene los productos existentes;
    -addProduct(titulo, descripcion, precio, url, codigo, stock): Agrega un nuevo producto con los parametros pasados. En caso de que falte alguno, arroja error. En caso que el codigo se repita con otro producto, tambien arroja error. A cada producto le asigna un Id correlativo. Retorna true o false dependiendo si pudo ejecutar la operacion;
    -getProducts(id): Busca dentro de los productos existentes uno con el Id solicitado. En caso de encontrarlo retorna el producto, en caso contrario retorna un error.
    -readProductsFromFile(): Busca dentro del archivo en this.path (Direccion a cargar en la instanciacion de la clase)
    -saveProductsToFile(prod): Guarda dentro del archivo en this.path
    -deleteProduct(id): Borra el producto con el id correspondiente
    -upgradeProduct(id, newProduct): Actualiza un producto del id correspondiente. NewProduct debe ser un objeto completo.

Al utilizar el constructor de ProductManager se crea un array vacio de productos. Se debe pasar como argumento el path donde se van a guardar los productos.

TODOS los metodos de la clase son asincronicos, por lo cual a la hora de utilizarlos hay que usar la palabra reservada AWAIT.

A continuacion un ejemplo del funcionamiento:
*/

import { ProductManager } from "./class.js";

//Creacion de una nueva lista de productos

let newProductList = new ProductManager("./products.json");

//Verifico que creo un array vacio

let myProducts = await newProductList.getProducts();
console.log(myProducts);

//Creacion de los productos

await newProductList.addProduct("Arroz", "Arroz blanco grano largo", 900, "https://http2.mlstatic.com/D_NQ_NP_786419-MLA69999631004_062023-O.webp", "AB91C3", 10);
await newProductList.addProduct("Arroz", "Arroz blanco grano largo", 900, "https://http2.mlstatic.com/D_NQ_NP_786419-MLA69999631004_062023-O.webp", "AB91C3", 10);//Agrego dos veces el mismo producto, da error
await newProductList.addProduct("Arroz", "Arroz blanco grano largo", 900, "https://http2.mlstatic.com/D_NQ_NP_786419-MLA69999631004_062023-O.webp", 10);//Agrego el producto con un dato faltante, da error

await newProductList.addProduct("Aceite", "Aceite de girasol", 700, "https://i0.wp.com/www.alpuntodeventa.com.ar/wp-content/uploads/0767-scaled.jpg?fit=600%2C600&ssl=1", "AB91C4", 10);
await newProductList.addProduct("Harina", "Harina blanca 000", 1000, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGkek73ZnRDfxH2dE0g-eID6ZxJS8Z-YNPiECJy2jDqQ&s", "AB91C5", 10);

//Verifico que los productos fueron creados correctamente
myProducts = await newProductList.getProducts();
console.log(myProducts);

//Busco el producto que quiera
console.log(await newProductList.getProductById(3));
console.log(await newProductList.getProductById(4));//Producto no encontrado

const upgradedProduct = {
    id: 3,
    title: "Harina",
    description: "Harina integral",
    price: 800,
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGkek73ZnRDfxH2dE0g-eID6ZxJS8Z-YNPiECJy2jDqQ&s",
    code: "AB91C4",
    stock: 7
}

await newProductList.updateProduct(2, upgradedProduct);

myProducts = await newProductList.getProducts();
console.log(myProducts);

await newProductList.deleteProduct(1);

myProducts = await newProductList.getProducts();
console.log(myProducts);

await newProductList.addProduct("Harina", "Harina blanca 000", 1000, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGkek73ZnRDfxH2dE0g-eID6ZxJS8Z-YNPiECJy2jDqQ&s", "AB91C8", 10);
await newProductList.addProduct("Harina", "Harina blanca 000", 1000, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGkek73ZnRDfxH2dE0g-eID6ZxJS8Z-YNPiECJy2jDqQ&s", "AB91C5", 10);
await newProductList.addProduct("Harina", "Harina blanca 000", 1000, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGkek73ZnRDfxH2dE0g-eID6ZxJS8Z-YNPiECJy2jDqQ&s", "AB91C9", 10);

myProducts = await newProductList.getProducts();
console.log(myProducts);