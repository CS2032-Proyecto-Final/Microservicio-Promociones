// controllers/promocionController.ts

import express from 'express';
import { getPromocionDiasById } from '../db/Promocion';

export const getPromocionDias = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params; // Extract the id from the path parameters

        // Find the promotion's start and end dates using the DB function
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
