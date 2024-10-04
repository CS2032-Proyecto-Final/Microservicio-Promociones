import express from 'express';

import { getAllProducts, getHolaFunction, getProductosNombre, postProduct } from '../controllers/ProductController';

export default ( router: express.Router) => {
    router.get('/hola', getHolaFunction)
    router.get('/products', getAllProducts);
    router.post('/product', postProduct);
    router.patch('/productos/nombre', getProductosNombre)
}

