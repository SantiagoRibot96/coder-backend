# Entregas de Ribot Santiago

ProductManager es una clase que cuenta con tres metodos:
- getProducts(): Obtiene los productos existentes;
- addProduct(titulo, descripcion, precio, url, codigo, stock): Agrega un nuevo producto con los parametros pasados. En caso de que falte alguno, arroja error. En caso que el codigo se repita con otro producto, tambien arroja error. A cada producto le asigna un Id correlativo. Retorna true o false dependiendo si pudo ejecutar la operacion;
- getProducts(id): Busca dentro de los productos existentes uno con el Id solicitado. En caso de encontrarlo retorna el producto, en caso contrario retorna un error.
- readProductsFromFile(): Busca dentro del archivo en this.path (Direccion a cargar en la instanciacion de la clase)
- saveProductsToFile(prod): Guarda dentro del archivo en this.path
- deleteProduct(id): Borra el producto con el id correspondiente
- upgradeProduct(id, newProduct): Actualiza un producto del id correspondiente. NewProduct debe ser un objeto completo.

Al utilizar el constructor de ProductManager se crea un array vacio de productos. Se debe pasar como argumento el path donde se van a guardar los productos.

TODOS los metodos de la clase son asincronicos, por lo cual a la hora de utilizarlos hay que usar la palabra reservada AWAIT.