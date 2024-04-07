import bcrypt from "bcrypt";

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

//hashSync toma el pass que le pasamos, y genera el hasheo a partir del Salt. Salt es una cadena de caracteres aleatorea para encriptar la pass.

export const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password);

//compareSync compara los password ya encriptados para ver si realmente son iguales. No sirve hacer password === user.password