const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const {appConfig} = require('../config');

const usuarioSchema = new Schema({
  email: {
    type: String,
    unique: [true, "email existente en la base de datos!"],
    lowercase: true,
    trim: true,
    required: [true, "falta email"],
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: '{VALUE} no es un email!'
    }

  },
  password: {
    type: String,
    required: true
  },
  nombre:{
    type: String,
    required:[true, "nombre requerido!"]
  },
  apellido:{
    type: String,
    required:[true, "apellido requerido!"]
  },
  telefono:{
    type: String,
    required:[true, "telefono requerido!"]
  },
  creado: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Usuario', usuarioSchema);