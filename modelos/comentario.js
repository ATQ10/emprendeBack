const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const comentarioSchema = new Schema({
  idU:{
    type: Schema.Types.ObjectId, 
    ref: 'Usuario' 
  },
  idP:{
    type: Schema.Types.ObjectId, 
    ref: 'Producto' 
  },
  mensaje: {
    type: String,
    required: [true, "mensaje requerido!"],
  },
  fecha: {
    type: Date,
  },
  creado: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Comentario', comentarioSchema);