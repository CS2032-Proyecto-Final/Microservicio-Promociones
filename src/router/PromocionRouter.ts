import express from 'express';
import { getProm, getPromociones, getPromocionPagoById } from '../controllers/PromocionController'; // Import the controller function

export default (router: express.Router) => {
    // Define a route with a path parameter ':id' and call getPromocionDias
    router.get('/', (req: express.Request, res: express.Response) => {
        res.status(200).json({ Status: 'UP' });
    });
    router.get('/promociones', getPromociones);
    router.get('/promocion/:id', getProm);
    router.get('/promocion/:id/pago', getPromocionPagoById)
};

