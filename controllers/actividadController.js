const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Actividad = require('../modelos/actividad');

module.exports = {
  create: function (req, res) {
    try {
        console.log("req.body",req.body)
        var newActividad = new Actividad(req.body)
        console.log("newActividad",newActividad)
        newActividad.idU = req.user._id;
        console.log("Activity: ",newActividad);
        var newActividad = new Actividad(req.body)
        newActividad.save(function (err,actividad) {
            return res.status(200).json({
                message: 'Actividad registrada',
                _id: actividad._id
            })
        })
    } catch (error) {
        console.log(error)
    }
  },
  remove: function (req, res) {
      var id = req.params.id
      Actividad.findByIdAndRemove(id, function(err, actividad){
          if(err){
              return res.json(500, {
                  message: 'No existe actividad'
                })
          }
          return res.json(actividad)
      })
  },
  getByID: function (req, res) {
      var id = req.params.id
      Actividad.findOne({_id:id}, function(err, actividad){
          if(err) {
              return res.status(500).json({
                message: 'Se ha producido un error al obtener la actividad'
              })
          }
          if(!actividad){
              return res.status(404).json( {
                  message: 'No tenemos esta actividad'
              })
          }
          return res.json(actividad)
      })
  },
  getAll: function(req, res) {
      let idUser = req.user._id;
      Actividad.find({idU:idUser},function(err, actividades){
        if(err) {
          return res.status(500).json({
            message: 'Error obteniendo las actividades'
          })
        }
        return res.json(actividades)
      })
  },
  update: function (req, res) {
    var id = req.params.id;
    let newActividad = req.body;
    Actividad.findByIdAndUpdate(id,newActividad, function(err, actividad){
          if(err) {
            return res.status(500).json({
              message: 'Error actualizando actividad'
            })
          }
          return res.json(actividad);
      })
  },
}