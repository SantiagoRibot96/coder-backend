import { validateCode, arrayCompleted } from "../functions.js";
import * as fs from "fs";

export class CartManager {

    constructor(path) {
        this.products = [];
        this.path = path;
        this.currentId = 1;
    }
}