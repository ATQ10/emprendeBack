const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Negocio = require('../modelos/negocio');
const Producto = require('../modelos/producto');

module.exports = {
  create: function (req, res) {
    try {
        console.log("File:",req.url);
        var newNegocio = new Negocio(req.body)
        if(req.url[0]!='/'){
          newNegocio.url = req.url;
        }
        newNegocio.idU = req.user._id;
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
      var id = req.params.id;
      //Verificar que no existan productos
      Producto.find({idN:id}, function(err,productos){
        let tamanio = 0;
        productos.forEach(prod => {
          tamanio++;
        });
        if(tamanio == 0){
          Negocio.findByIdAndRemove(id, function(err, negocio){
            if(err){
                return res.json(500, {
                    message: 'No existe negocio'
                  })
              }
              return res.json(200, {
                message: 'Negocio eliminado'
              })
          })
        }else{
          return res.json(200, {
            message: 'No es posible eliminar negocio, tiene productos ligados al mismo'
          })
        }
      });
      //Fin verificacion
      
  },
  getByID: function (req, res) {
      var id = req.params.id
      if(id=="-1"){
        console.log(req.user._id);
        Negocio.findOne({idU:req.user._id}, function(err, negocio){
          if(err) {
              return res.status(500).json({
                message: 'Se ha producido un error al obtener el negocio'
              })
          }
          if(!negocio){
              return res.json( {
                  message: 'No tenemos este negocio'
              })
          }
          return res.json(negocio)
      })
      }else{
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
    }
      
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
    console.log("File:",req.url);
    let newNegocio = req.body;
    if(req.url[0]!='/'){
      newNegocio.url = req.url;
    }
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