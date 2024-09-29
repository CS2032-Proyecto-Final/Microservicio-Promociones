// controllers/promocionController.ts

import express from 'express';

import { ProductModel,getProductById } from '../db/Producto';
import { PromocionModel } from '../db/Promocion';
import { getPromocionById, getPromocionDiasById } from '../db/Promocion';
import { fetchNombresTiendas, fetchNombreTiendaById } from '../api';

export const getPromocionDias = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params; // Extract the id from the path parameters

        const promocionDias = await getPromocionDiasById(Number(id));

        // If no promotion is found, return a 404 error
        if (!promocionDias) {
            return res.status(404).json({ error: "Promotion not found" });
        }

        // Return the start and end dates
        return res.status(200).json(promocionDias);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};


export const getPromocionTienda = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params; // Extract the id from the path parameters

        // Find the promotion by ID
        const promocion = await getPromocionById(Number(id));

        // If no promotion is found, return a 404 error
        if (!promocion) {
            return res.status(404).json({ error: "Promotion not found" });
        }

        // Find the product by producto_id from the promotion
        const product = await getProductById(promocion.producto_id);

        // If no product is found, return a 404 error
        if (!product) {
            return res.status(404).json({ error: "Product not found for the promotion" });
        }

        // Return the tienda_id from the product
        return res.status(200).json({ tienda_id: product.tienda_id });
    } catch (error) {
        console.error(error);
        return res.sendStatus(400);
    }
};


export const getPromociones = async (req: express.Request, res: express.Response) => {
    try {
        // Step 1: Get all promotions from the database
        const promociones = await PromocionModel.find().lean(); // Use lean() to get plain JavaScript objects

        // Step 2: Get unique tienda_id values from ProductModel
        const products = await ProductModel.find().lean();
        const uniqueTiendaIds = [...new Set(products.map((product) => product.tienda_id))]; // Get unique tienda_id

        // Step 3: Fetch names of the tiendas using the unique tienda_ids
        const tiendas = await fetchNombresTiendas(uniqueTiendaIds);

        // Step 4: Create a lookup object for tienda_id to nombre_tienda
        const tiendaLookup: { [key: number]: string } = {};
        tiendas?.forEach((tienda) => {
            tiendaLookup[tienda.tienda_id] = tienda.nombre_tienda;
        });

        // Step 5: Map promociones with additional product and tienda information
        const result = promociones.map((promocion) => {
            const product = products.find(p => p.id === promocion.producto_id);
            return {
                id: promocion.id,
                nombre_tienda: tiendaLookup[product?.tienda_id] || 'Unknown', // In case no tienda is found
                nombre_producto: product?.nombre || 'Unknown Product',
                descuento: promocion.descuento,
                precio: product?.precio || 0,
                dia_inicio: promocion.dia_inicio, // Will be used for sorting
            };
        });

        // Step 6: Sort by dia_inicio (sorted by day)
        result.sort((a, b) => new Date(a.dia_inicio).getTime() - new Date(b.dia_inicio).getTime());

        // Step 7: Send the response
        return res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching promociones:', error);
        return res.status(500).json({ message: 'Error fetching promociones' });
    }
};

export const getProm = async (req: express.Request, res: express.Response) => {
    try {
        // Step 1: Get the promotion id from request parameters (or adjust if it comes from body/query)
        const { id } = req.params;

        // Step 2: Find the specific promotion by id
        const promocion = await PromocionModel.findOne({ id }).lean();
        if (!promocion) {
            return res.status(404).json({ message: 'Promotion not found' });
        }

        // Step 3: Find the product associated with the promotion
        const product = await ProductModel.findOne({ id: promocion.producto_id }).lean();
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Step 4: Fetch the tienda (store) name using the product's tienda_id
        const tienda = await fetchNombreTiendaById(product.tienda_id);
        if (!tienda) {
            return res.status(404).json({ message: 'Store not found' });
        }

        // Step 5: Construct the result with the promotion and product information
        const result = {
            id: promocion.id,
            nombre_tienda: tienda.nombre_tienda,
            nombre_producto: product.nombre,
            descuento: promocion.descuento,
            precio: product.precio,
        };

        // Step 6: Send the response with status 200
        return res.status(200).json(result);

    } catch (error) {
        console.error('Error fetching promotion:', error);
        return res.status(500).json({ message: 'Error fetching promotion' });
    }
};
