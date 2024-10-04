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
        const products  = req.body; // Ahora se espera un array de objetos

        // Asegúrate de que products es un array y no está vacío
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: "Product array is required and should be an array." });
        }

        // Extraer los producto_id de cada objeto
        const productIds = products.map(product => {
            if (product && product.producto_id) {
                return product.producto_id; // Devuelve el producto_id si existe
            }
            throw new Error("Invalid product object"); // Lanza un error si el objeto es inválido
        });

        // Fetch the products using the function from the schema
        const fetchedProducts = await getProductsByIds(productIds);

        // Mapear los productos a la nueva estructura
        const responseProducts = fetchedProducts.map(product => ({
            producto_id: product.id, // Asegúrate de que estas propiedades coincidan con las que devuelve getProductsByIds
            nombre_producto: product.nombre // Cambia esto según el nombre del campo que contiene el nombre del producto
        }));

        // Devuelve la lista de productos en la nueva estructura
        return res.status(200).json(responseProducts);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: error.message || "An error occurred" }); // Muestra el mensaje de error si existe
    }
};


export const getHolaFunction = async (req: express.Request, res: express.Response) => {
    return res.send("La api funciona!");
}