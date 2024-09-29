"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PromocionController_1 = require("../controllers/PromocionController"); // Import the controller function
exports.default = (router) => {
    // Define a route with a path parameter ':id' and call getPromocionDias
    router.get('/promocion/:id/dias', PromocionController_1.getPromocionDias);
    router.get('/promocion/:id/tienda', PromocionController_1.getPromocionTienda);
    router.get('/promociones', PromocionController_1.getPromociones);
    router.get('/promocion/:id', PromocionController_1.getProm);
};
//# sourceMappingURL=PromocionRouter.js.map