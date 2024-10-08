import mongoose from 'mongoose';

const ProductShema = new mongoose.Schema({
    id : { type: Number, required: true, unique: true},
    tienda_id : {type: Number, required: true},
    nombre: { type: String, required: true},
    precio: { type: Number, required: true}
})

export const ProductModel = mongoose.model('productos',ProductShema )

// Funciones para el CRUD de Producto

export const getProducts = () => {
   return ProductModel.find();
}
export const getProductById = (id: Number) => {
    return ProductModel.findOne({id})
}
export const updateProductById = (id:string, values: Record<string, any>) => {
    return ProductModel.findByIdAndUpdate(id, values)
};
export const deleteProductById = (id:string) => {
    return ProductModel.findOneAndDelete({_id : id});
}
export const createProduct = (values: Record<string, any> ) => new ProductModel(values)
    .save()
    .then((product) => product.toObject());

export const getProductsByIds = (productIds: number[]) => {
        return ProductModel.find({ id: { $in: productIds } }, { id: 1, nombre: 1 });
    };

