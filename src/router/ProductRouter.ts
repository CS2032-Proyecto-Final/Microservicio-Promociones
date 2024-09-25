import express from 'express';

import { getAllProducts, getProductosNombre, postProduct } from '../controllers/ProductController';

export default ( router: express.Router) => {
    router.get('/products', getAllProducts);
    router.post('/product', postProduct);
    router.get('/productos/nombre', getProductosNombre)
}

