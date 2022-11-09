const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    process.env.TZ = "America/Mexico_City";

const movimientoSchema = new Schema({
  idU:{
    type: Schema.Types.ObjectId, 
    ref: 'Usuario' 
  },
  descripcion: {
    type: String,
    required: [true, "descripción requerida!"],
  },
  monto: {
    type: Number,
    required: [true, "monto requerido!"],
  },
  tipo: {
    type: String,
    required: [true, "tipo requerido!"],
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  creado: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Movimiento', movimientoSchema);