const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const negocioSchema = new Schema({
  idU:{
    type: Schema.Types.ObjectId, 
    ref: 'Usuario' 
  },
  nombre: {
    type: String,
    required: [true, "nombre requerido!"],
  },
  descripcion: {
    type: String,
    required: [true, "descripción requerida!"],
  },
  sede: {
    type: String,
    required: [true, "sede requerida!"],
  },
  inicioFecha: {
    type: Date,
  },
  creado: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Negocio', negocioSchema);