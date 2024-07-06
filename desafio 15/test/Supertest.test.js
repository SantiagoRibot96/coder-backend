import supertest from "supertest";

import {expect} from "chai";

const requester = supertest("http://localhost:8080");

describe("Testing del e-commerce", () => {
    describe("Testing de Products: ", () => {
        it("Endpoint POST /api/products debe crear un producto", async () => {
            const mockProduct = {
                title: "Pepino", 
                description: "Pepinillos encurtidos", 
                category: "Alimentos", 
                price: 2000, 
                thumbnail: "", 
                code: "sdasd", 
                stock: 10,
            }

            const {statusCode, ok, _body} = await requester.post("/api/products").send(mockProduct);

            console.log(statusCode);
            console.log(ok);
            console.log(_body);

            expect(_body.payload).to.have.property("_id")
        });
    });
});