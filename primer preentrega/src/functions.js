import * as fs from "fs";

export function validateCode (products, code) {
    
    let productCode = [];

    products.forEach(item => {
        productCode.push(item.code);    
    });
    
    return !productCode.includes(code);
}

export function arrayCompleted (title, description, price, thumbnail, code, stock) {
    if(title && description && price && thumbnail && code && stock) {
        return true;
    }else {
        return false;
    }
}

export function getCurrentID(prod) {
    let prevId = [];

    prod.forEach(item => {
        prevId.push(item.id);
    });


    if(!prevId[0]){
        return 1;
    }else{
        return Math.max(...prevId)+1;
    }
}

export async function readFromFile(path, products) {
    try {
        const cont = await fs.promises.readFile(path, "utf-8");

        return JSON.parse(cont);
    } catch (error) {
        await fs.promises.writeFile(path, JSON.stringify(products, null, 2));

        try {
            const cont = await fs.promises.readFile(path, "utf-8");

            return JSON.parse(cont);
        } catch (error) {
            console.log(`No se pudieron traer los productos al programa ${error}`);

            return false;
        }
    }
}

export async function saveToFile(path, prod) {
    try {
        await fs.promises.writeFile(path, JSON.stringify(prod, null, 2));

        return true;
    } catch (error) {
        console.log(`No se pudieron guardar los productos al archivo ${error}`);

        return false;
    }
}