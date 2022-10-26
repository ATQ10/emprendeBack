const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Producto = require('../modelos/producto');

module.exports = {
  create: function (req, res) {
    try {
        console.log("File:",req.url);
        var newProducto = new Producto(req.body)
        if(req.url[0]!='/'){
          newProducto.url = req.url;
        }
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
    var id = req.params.id
      if(id=="-1"){
        Producto.find(function(err, productos){
          if(err) {
            return res.status(500).json({
              message: 'Error obteniendo los productos'
            })
          }
          return res.json(productos)
        })
      }else{
        console.log("IDN:",id);
        Producto.find({idN:id},function(err, productos){
          if(err) {
            return res.status(500).json({
              message: 'Error obteniendo los productos'
            })
          }
          return res.json(productos)
        })
      }
      
  },
  update: function (req, res) {
    var id = req.params.id;
    console.log("File:",req.url);
    let newProducto = req.body;
    if(req.url[0]!='/'){
      newProducto.url = req.url;
    }
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