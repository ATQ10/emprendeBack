const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Negocio = require('../modelos/negocio');

module.exports = {
  create: function (req, res) {
    try {
        var newNegocio = new Negocio(req.body)
        newNegocio.save(function (err,negocio) {
            return res.status(200).json({
                message: 'Negocio registrado',
                _id: negocio._id
            })
        })
    } catch (error) {
        console.log(error)
    }
  },
  remove: function (req, res) {
      var id = req.params.id
      Negocio.findByIdAndRemove(id, function(err, negocio){
          if(err){
              return res.json(500, {
                  message: 'No existe negocio'
                })
          }
          return res.json(negocio)
      })
  },
  getByID: function (req, res) {
      var id = req.params.id
      Negocio.findOne({_id:id}, function(err, negocio){
          if(err) {
              return res.status(500).json({
                message: 'Se ha producido un error al obtener el negocio'
              })
          }
          if(!negocio){
              return res.status(404).json( {
                  message: 'No tenemos este negocio'
              })
          }
          return res.json(negocio)
      })
  },
  getAll: function(req, res) {
    Negocio.find(function(err, negocios){
        if(err) {
          return res.status(500).json({
            message: 'Error obteniendo los negocios'
          })
        }
        return res.json(negocios)
      })
  },
  update: function (req, res) {
    var id = req.params.id;
    let newNegocio = req.body;
      Negocio.findByIdAndUpdate(id,newNegocio, function(err, negocio){
          if(err) {
            return res.status(500).json({
              message: 'Error actualizando negocio'
            })
          }
          return res.json(negocio);
      })
  },
}