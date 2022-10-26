const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const productoSchema = new Schema({
  idN:{
    type: Schema.Types.ObjectId, 
    ref: 'Negocio' 
  },
  nombre: {
    type: String,
    required: [true, "nombre requerido!"]
  },
  descripcion: {
    type: String,
    required: [true, "descripción requerida!"],
  },
  precioCompra: {
    type: Number,
    required: [true, "precio de compra requerido!"],
  },
  precioVenta: {
    type: Number,
    required: [true, "precio de venta requerido!"],
  },
  stock: {
    type: Number,
    required: [true, "tope de inventario requerido!"],
  },
  minStock: {
    type: Number,
    required: [true, "mínimo de tope de inventario requerido!"],
  },
  detalles: {
    type: String,
  },
  creado: {
    type: Date,
    default: Date.now
  },
  url:{
    type: String
  }
});

module.exports = mongoose.model('Producto', productoSchema);