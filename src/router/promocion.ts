import express from 'express';
import { getPromocionDias } from '../controllers/promocion'; // Import the controller function

export default (router: express.Router) => {
    // Define a route with a path parameter ':id' and call getPromocionDias
    router.get('/promocion/:id', getPromocionDias);
};

