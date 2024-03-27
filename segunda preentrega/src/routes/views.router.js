import express from "express";
import { newProductList } from "../app.js";
import { io } from "../init.js";
import { ProductModel } from "../models/product.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const sort = {};
    const sortValue = req.query.sort;
    const query = {};
    const queryParams = req.query.query || "";

    let nextLink;
    let prevLink;
    let firstPage;

    if (sortValue === "desc") {
        sort.price = -1;
    } else if (sortValue === "asc") {
        sort.price = 1;
    }

    if (queryParams) {
        const key = queryParams.split(",")[0];
        let value = queryParams.split(",")[1];

    if (!isNaN(Number(value))) {
        value = Number(value);
    }

    query[key] = value;
    }

    try {
        const productList = await ProductModel.paginate(query, {
            page,
            sort,
            limit,
            lean: true
        });

        if(productList.hasNextPage){
            nextLink = `/?page=${productList.nextPage}&limit=${limit}&sort=${sortValue}`;
        }else{
            nextLink = null;
        }

        if(productList.hasPrevPage){
            prevLink = `/?page=${productList.prevPage}&limit=${limit}&sort=${sortValue}`;
        }else{
            prevLink = null;
        }

        if(productList.page === 1){
            firstPage = true;
        }else{
            firstPage = false;
        }

        res.render("home", {
            status: "success",
            payload: productList.docs,
            hasPrevPage: productList.hasPrevPage,
            hasNextPage: productList.hasNextPage,
            prevPage: productList.prevPage,
            nextPage: productList.nextPage,
            currentPage: productList.page,
            totalPages: productList.totalPages,
            nextLink,
            prevLink,
            firstPage,
            limit
        });

    } catch (error) {
        console.log(error);
    }
});

router.get("/chat", (req, res) => {
    res.render("chat");
});

export default router;