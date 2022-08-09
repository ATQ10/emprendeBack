const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Comentario = require('../modelos/comentario');

module.exports = {
  create: function (req, res) {
    try {
        var newComentario = new Order(req.body)
        newComentario.save(function (err,comentario) {
            return res.status(200).json({
                message: 'Comentario registrado',
                _id: comentario._id
            })
        })
    } catch (error) {
        console.log(error)
    }
  },
  remove: function (req, res) {
      var id = req.params.id
      Comentario.findByIdAndRemove(id, function(err, comentario){
          if(err){
              return res.json(500, {
                  message: 'No existe comentario'
                })
          }
          return res.json(comentario)
      })
  },
  getByID: function (req, res) {
      var id = req.params.id
      Comentario.findOne({_id:id}, function(err, comentario){
          if(err) {
              return res.status(500).json({
                message: 'Se ha producido un error al obtener el comentario'
              })
          }
          if(!comentario){
              return res.status(404).json( {
                  message: 'No tenemos este comentario'
              })
          }
          return res.json(comentario)
      })
  },
  getAll: function(req, res) {
    Comentario.find(function(err, comentarios){
        if(err) {
          return res.status(500).json({
            message: 'Error obteniendo los comentarios'
          })
        }
        return res.json(comentarios)
      })
  },
  update: function (req, res) {
    var id = req.params.id;
    let newComentario = req.body;
      Comentario.findByIdAndUpdate(id,newComentario, function(err, comentario){
          if(err) {
            return res.status(500).json({
              message: 'Error actualizando comentario'
            })
          }
          return res.json(comentario);
      })
  },
}