export class CustomError {
    static createError({name = "Error", source = "Desconocida", message, code = 1}) {
        const error = new Error(message);
        error.name = name;
        error.source = source;
        error.code = code;
        throw error;
    }
}