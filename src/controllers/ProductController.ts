import express from 'express';

import { createProduct, getProducts, getProductsByIds } from '../db/Producto';

export const getAllProducts = async (req: express.Request, res: express.Response) => {
    try {
        const products = await getProducts();

        return res.status(200).json(products);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const postProduct = async (req: express.Request, res: express.Response) => {
    try {
        const {id, tienda_id, nombre, precio} = req.body;

        const product = await createProduct({
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

export const getProductosNombre = async (req: express.Request, res: express.Response) => {
    try {
        const { productIds } = req.body; // Assuming you're sending an array of product IDs in the request body

        // Ensure productIds is an array and not empty
        if (!Array.isArray(productIds) || productIds.length === 0) {
            return res.status(400).json({ error: "Product IDs are required and should be an array." });
        }

        // Fetch the products using the function from the schema
        const products = await getProductsByIds(productIds);

        // Return the found products
        return res.status(200).json(products);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

