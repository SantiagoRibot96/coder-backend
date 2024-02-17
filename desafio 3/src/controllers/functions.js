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