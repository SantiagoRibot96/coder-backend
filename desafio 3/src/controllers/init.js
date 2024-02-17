import express from "express";

export const app = express();
export const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

export async function createProducts(newProductList){
    const products = await newProductList.getProducts();

    if(!(products[0])){
        await newProductList.addProduct("Harina", "Haria 000 blancaflor", 1500, "https://Harina", "ABC001", 10);
        await newProductList.addProduct("Miel", "Miel pura de abeja", 1200, "https://Miel", "ABC002", 12);
        await newProductList.addProduct("Arroz", "Arroz grano largo", 100, "https://Arroz", "ABC003", 5);
        await newProductList.addProduct("Papa", "Papa blanca", 500, "https://Papa", "ABC004", 17);
        await newProductList.addProduct("Espinaca", "Espinaca congelada Granja del Sol", 150, "https://Espinaca", "ABC005", 15);
        await newProductList.addProduct("Lentejas", "Lentejas grandes enlatadas", 1700, "https://Lentejas", "ABC006", 20);
        await newProductList.addProduct("Yerba", "Yerba playadito", 200, "https://Yerba", "ABC007", 4);
        await newProductList.addProduct("Helado", "Helado casata", 2000, "https://Helado", "ABC008", 5);
        await newProductList.addProduct("Arvejas", "Arvejas en caja", 1800, "https://Arvejas", "ABC009", 8);
        await newProductList.addProduct("Porotos", "Poroto negro en lata", 2000, "https://Porotoas", "ABC010", 3);
    }
}