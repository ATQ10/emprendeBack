const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Movimiento = require('../modelos/movimiento');

module.exports = {
  create: function (req, res) {
    try {
      console.log("req.body",req.body)
        var newMovimiento = new Movimiento(req.body)
        console.log("newMovimiento",newMovimiento)
        newMovimiento.idU = req.user._id;
        console.log("Move: ",newMovimiento);
        newMovimiento.save(function (err,movimiento) {
            return res.status(200).json({
                message: 'Movimiento registrado',
                _id: movimiento._id
            })
        })
    } catch (error) {
        console.log(error)
    }
  },
  remove: function (req, res) {
      var id = req.params.id
      Movimiento.findByIdAndRemove(id, function(err, movimiento){
          if(err){
              return res.json(500, {
                  message: 'No existe movimiento'
                })
          }
          return res.json(movimiento)
      })
  },
  getByID: function (req, res) {
      var id = req.params.id
      Movimiento.findOne({_id:id}, function(err, movimiento){
          if(err) {
              return res.status(500).json({
                message: 'Se ha producido un error al obtener el movimiento'
              })
          }
          if(!movimiento){
              return res.status(404).json( {
                  message: 'No tenemos este movimiento'
              })
          }
          return res.json(movimiento)
      })
  },
  getAll: function(req, res) {
    try{
      Movimiento.find({idU:req.user._id},function(err, movimientos){
        if(err) {
          return res.status(500).json({
            message: 'Error obteniendo los movimientos'
          })
        }
        return res.json(movimientos)
      })
    }catch (error) {
      console.log(error)
    }
  },
  update: function (req, res) {
    var id = req.params.id;
    let newMovimiento = req.body;
      Movimiento.findByIdAndUpdate(id,newMovimiento, function(err, movimiento){
          if(err) {
            return res.status(500).json({
              message: 'Error actualizando movimiento'
            })
          }
          return res.json(movimiento);
      })
  },
}