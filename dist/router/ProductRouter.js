"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProductController_1 = require("../controllers/ProductController");
exports.default = (router) => {
    router.get('/products', ProductController_1.getAllProducts);
    router.post('/product', ProductController_1.postProduct);
    router.get('/productos/nombre', ProductController_1.getProductosNombre);
};
//# sourceMappingURL=ProductRouter.js.map