const mongoose = require('mongoose'),
 Schema = mongoose.Schema;

const actividadSchema = new Schema({
  idU:{
    type: Schema.Types.ObjectId, 
    ref: 'Usuario' 
  },
  tarea:{
    type: String,
    required:[true, "tarea requerida!"]
  },
  fechaInicio: {
    type: Date,
  },
  fechaFinal: {
    type: Date,
  },
  estado:{
    type: String,
    required:[true, "estado requerido!"]
  },
  creado: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Actividad', actividadSchema);