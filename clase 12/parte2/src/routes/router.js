//Creando un custom Router

import express from "express";

const router = express.Router();

class Router {
    constructor() {
        this.router = router;
        this.init();
    }

    getRouter() {
        return this.router;
    }

    get(path, ...callbacks) {
        this.router.get(path, this.applyCallbacks(callbacks));
    }

    applyCallbacks(callbacks) {
        return callbacks.map(callback => async (...params) => {
            try {
                await callback.apply(this, params);
            } catch (error) {
                console.log(error);
                params[1].status(500).send(error);
            }
        })
    }
}

export default Router;