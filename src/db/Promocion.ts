import mongoose from 'mongoose';

const PromocionSchema = new mongoose.Schema({
    id : { type: Number, required: true},
    producto_id : { type: Number, required: true},
    descuento: { type: Number, rquired: true},
    dia_inicio: { type: Date, required: true},
    dia_final: { type: Date }
})

export const PromocionModel = mongoose.model('promociones', PromocionSchema)

// Funciones para el CRUD de Promocion

export const getPromociones = () => {
    return PromocionModel.find();
}
export const getPromocionById = (id :Number) => {
    return PromocionModel.findOne({id})
}
export const updatePromocionById = (id : Number, values: Record<string, any>) => {
    return PromocionModel.findByIdAndUpdate(id, values);
}
export const deleteByPromocionId = (id : Number) => {
    return PromocionModel.findOneAndDelete({id : id})
}

export const getPromocionDiasById = (id: Number) => {
    return PromocionModel.findOne(
        { id }, // Find promotion by id
        { dia_inicio: 1, dia_final: 1, _id: 0 } // Select only dia_inicio and dia_final fields, exclude _id
    );
};