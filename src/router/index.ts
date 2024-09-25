import express from 'express';

import products from './ProductRouter';
import promociones from './PromocionRouter'

const router = express.Router();

export default (): express.Router => {
    products(router);
    promociones(router);
    
    return router;
}