const mongoose = require('mongoose'),
 Schema = mongoose.Schema;

const suscripcionSchema = new Schema({
  idU:{
    type: Schema.Types.ObjectId, 
    ref: 'Usuario' 
  },
  fechaInicio: {
    type: Date,
  },
  fechaFinal: {
    type: Date,
  },
  creado: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Suscripcion', suscripcionSchema);