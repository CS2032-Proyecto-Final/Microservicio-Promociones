import express from 'express';

import products from './products';
import promociones from './promocion'

const router = express.Router();

export default (): express.Router => {
    products(router);
    promociones(router);
    
    return router;
}