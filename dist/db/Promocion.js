"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPromocionDiasById = exports.deleteByPromocionId = exports.updatePromocionById = exports.getPromocionById = exports.getPromociones = exports.PromocionModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const PromocionSchema = new mongoose_1.default.Schema({
    id: { type: Number, required: true },
    producto_id: { type: Number, required: true },
    descuento: { type: Number, rquired: true },
    dia_inicio: { type: Date, required: true },
    dia_final: { type: Date }
});
exports.PromocionModel = mongoose_1.default.model('Promocion', PromocionSchema);
// Funciones para el CRUD de Promocion
const getPromociones = () => {
    return exports.PromocionModel.find();
};
exports.getPromociones = getPromociones;
const getPromocionById = (id) => {
    return exports.PromocionModel.findOne({ id });
};
exports.getPromocionById = getPromocionById;
const updatePromocionById = (id, values) => {
    return exports.PromocionModel.findByIdAndUpdate(id, values);
};
exports.updatePromocionById = updatePromocionById;
const deleteByPromocionId = (id) => {
    return exports.PromocionModel.findOneAndDelete({ id: id });
};
exports.deleteByPromocionId = deleteByPromocionId;
const getPromocionDiasById = (id) => {
    return exports.PromocionModel.findOne({ id }, // Find promotion by id
    { dia_inicio: 1, dia_final: 1, _id: 0 } // Select only dia_inicio and dia_final fields, exclude _id
    );
};
exports.getPromocionDiasById = getPromocionDiasById;
//# sourceMappingURL=Promocion.js.map