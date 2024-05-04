import mongoJugueteDao from "./mongoJugueteDao.js";
import memoryJugueteDao from "./memoryJugueteDao.js";
import fileSystemJugueteDao from "./fileSystemJugueteDao.js";
import config from "../config/config.js";

let DAO;

switch(config.persistence) {
    case "mongo":
        DAO = mongoJugueteDao;
        break;
    
    case "memory":
        DAO = memoryJugueteDao;
        break;

    case "file":
        DAO = fileSystemJugueteDao;
        break;
    
    default:
        console.log("Falta el DAO");
        break;
}

export default DAO