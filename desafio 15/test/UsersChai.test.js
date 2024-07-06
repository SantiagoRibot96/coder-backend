import mongoose from "mongoose";
import UserService from "../src/services/users.services.js";
import {expect} from "chai";

mongoose.connect("mongodb+srv://santiribot79:coderhouse@cluster0.dxp69gq.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0");

describe("Test de usuarios", function () {
    
    before(function() {
        this.users = new UserService();
    });

    it("users.services debe poder crear un nuevo usuario", async function() {
        const res = await this.users.registerUser("prueba", "usuario", "prueba@usuario.com", "1234", 21);
        expect(res).to.be.an("string");
    });

    it("users.services debe poder encontrar un usuario con su mail", async function() {
        const res = await this.users.findUser("prueba@usuario.com");
        expect(res).to.be.an("object");
    });

    it("users.services debe poder validar un usuario con mail y psw", async function() {
        const res = await this.users.validateUser("prueba@usuario.com", "1234");
        expect(res).to.be.an("string");
    });

    it("users.services debe poder borrar un usuario por su mail", async function() {
        const res = await this.users.deleteUser("prueba@usuario.com");
        expect(res).to.be.an("object");
    });

    after(async function() {
        await mongoose.disconnect();
    });
});