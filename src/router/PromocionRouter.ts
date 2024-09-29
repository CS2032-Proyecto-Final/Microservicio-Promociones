import express from 'express';
import { getProm, getPromocionDias, getPromociones, getPromocionTienda } from '../controllers/PromocionController'; // Import the controller function

export default (router: express.Router) => {
    // Define a route with a path parameter ':id' and call getPromocionDias
    router.get('/promocion/:id/dias', getPromocionDias);
    router.get('/promocion/:id/tienda', getPromocionTienda);
    router.get('/promociones', getPromociones);
    router.get('/promocion/:id', getProm);
};

