"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsByIds = exports.createProduct = exports.deleteProductById = exports.updateProductById = exports.getProductById = exports.getProducts = exports.ProductModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ProductShema = new mongoose_1.default.Schema({
    id: { type: Number, required: true, unique: true },
    tienda_id: { type: Number, required: true },
    nombre: { type: String, required: true },
    precio: { type: Number, required: true }
});
exports.ProductModel = mongoose_1.default.model('Product', ProductShema);
// Funciones para el CRUD de Producto
const getProducts = () => {
    return exports.ProductModel.find();
};
exports.getProducts = getProducts;
const getProductById = (id) => {
    return exports.ProductModel.findOne({ id });
};
exports.getProductById = getProductById;
const updateProductById = (id, values) => {
    return exports.ProductModel.findByIdAndUpdate(id, values);
};
exports.updateProductById = updateProductById;
const deleteProductById = (id) => {
    return exports.ProductModel.findOneAndDelete({ _id: id });
};
exports.deleteProductById = deleteProductById;
const createProduct = (values) => new exports.ProductModel(values)
    .save()
    .then((product) => product.toObject());
exports.createProduct = createProduct;
const getProductsByIds = (productIds) => {
    return exports.ProductModel.find({ id: { $in: productIds } }, { id: 1, nombre: 1 });
};
exports.getProductsByIds = getProductsByIds;
//# sourceMappingURL=Producto.js.map