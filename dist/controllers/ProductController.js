"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductosNombre = exports.postProduct = exports.getAllProducts = void 0;
const Producto_1 = require("../db/Producto");
const getAllProducts = async (req, res) => {
    try {
        const products = await (0, Producto_1.getProducts)();
        return res.status(200).json(products);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.getAllProducts = getAllProducts;
const postProduct = async (req, res) => {
    try {
        const { id, tienda_id, nombre, precio } = req.body;
        const product = await (0, Producto_1.createProduct)({
            id, tienda_id, nombre, precio
        });
        console.log('adentro');
        return res.status(200).json(product).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.postProduct = postProduct;
const getProductosNombre = async (req, res) => {
    try {
        const { productIds } = req.body; // Assuming you're sending an array of product IDs in the request body
        // Ensure productIds is an array and not empty
        if (!Array.isArray(productIds) || productIds.length === 0) {
            return res.status(400).json({ error: "Product IDs are required and should be an array." });
        }
        // Fetch the products using the function from the schema
        const products = await (0, Producto_1.getProductsByIds)(productIds);
        // Return the found products
        return res.status(200).json(products);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.getProductosNombre = getProductosNombre;
//# sourceMappingURL=ProductController.js.map