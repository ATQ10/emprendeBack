const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Producto = require('../modelos/producto');

module.exports = {
  create: function (req, res) {
    try {
        var newProducto = new Producto(req.body)
        newProducto.save(function (err,producto) {
            return res.status(200).json({
                message: 'Producto registrado',
                _id: producto.id
            })
        })
    } catch (error) {
        console.log(error)
    }
  },
  remove: function (req, res) {
      var id = req.params.id
      Producto.findByIdAndRemove(id, function(err, producto){
          if(err){
              return res.json(500, {
                  message: 'No existe producto'
                })
          }
          return res.json(producto)
      })
  },
  getByID: function (req, res) {
      var id = req.params.id
      Producto.findOne({_id:id}, function(err, producto){
          if(err) {
              return res.status(500).json({
                message: 'Se ha producido un error al obtener el producto'
              })
          }
          if(!producto){
              return res.status(404).json( {
                  message: 'No tenemos este producto'
              })
          }
          return res.json(producto)
      })
  },
  getAll: function(req, res) {
      Producto.find(function(err, productos){
        if(err) {
          return res.status(500).json({
            message: 'Error obteniendo los productos'
          })
        }
        return res.json(productos)
      })
  },
  update: function (req, res) {
    var id = req.params.id;
    let newProducto = req.body;
      Producto.findByIdAndUpdate(id,newProducto, function(err, producto){
          if(err) {
            return res.status(500).json({
              message: 'Error actualizando producto'
            })
          }
          return res.json(newProducto);
      })
  },
}