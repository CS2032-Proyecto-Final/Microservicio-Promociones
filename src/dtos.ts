export interface promocionDiasDto {
    dia_inicio : Date;
    dia_final : Date;
}
export interface promocionPagoDto {
    tienda_id: number;
    dia_inicio: Date;
    dia_final: Date;
    precio: number;
    descuento: number;
    producto_id: number
}
