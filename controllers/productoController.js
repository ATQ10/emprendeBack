const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Producto = require('../modelos/producto');
const Comentario = require('../modelos/comentario');
const Usuario = require('../modelos/usuario');
const LIMITEFREE = 10;

module.exports = {
  create: function (req, res) {
    try {
        console.log("File:",req.url);
        var newProducto = new Producto(req.body)
        if(req.url[0]!='/'){
          newProducto.url = req.url;
        }
        newProducto.activo = false;
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
          }else{
            Comentario.find({idP:producto._id}, function(err, comments){
              if(err){
                  return res.json(500, {
                      message: 'No existe comentario'
                    })
              }else{
                comments.forEach(comm => {
                  Comentario.findByIdAndRemove(comm._id,function(err, comment){
                    if(err){
                      return res.json(500, {
                        message: 'No existe comentario'
                      })
                    }
                  }
                  );
                });
              }
            })
            return res.json(producto)
          }
      })
  },
  getByID: function (req, res) {
      var id = req.params.id
      Producto.findOne({_id:id,activo:true}, function(err, producto){
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
      if(id.substring(0,3)=="*-1"){
        if(id.length == 3){
          Producto.find(
            {
              'activo': true
            }
            ,
            function(err, productos){
            if(err) {
              return res.status(500).json({
                message: 'Error obteniendo los productos'
              })
            }
              return res.json(productos)
          })
        }else{
          var buscar = id.substring(3, id.length);
          console.log("Bustar: "+buscar);
          if (buscar.match(/^[0-9a-fA-F]{24}$/)) {
            Producto.find(
              { 
                $and: 
                [
                  { 
                    'idN': buscar
                  },
                  {
                    'activo': true
                  }
                ]
              }
            ,function(err, productos
              ){
              if(err) {
                console.log(err);
                return res.status(500).json({
                  message: 'Error obteniendo los productos'
                })
              }
              return res.json(productos)
            })
          }else{
            Producto.find(
              { 
                $and: 
                [
                  { $or: 
                    [
                      {
                        'nombre': {'$regex': buscar, '$options': 'i'}
                      },
                      {
                        'descripcion': {'$regex': buscar, '$options': 'i'}
                      },
                      {
                        'detalles': {'$regex': buscar, '$options': 'i'}
                      }
                    ]
                  },
                  {
                    'activo': true
                  }
                ]
              }
            ,function(err, productos
              ){
              if(err) {
                console.log(err);
                return res.status(500).json({
                  message: 'Error obteniendo los productos'
                })
              }
              return res.json(productos)
            })
          }

        }
      }else{
        if(id.substring(0,2)=="-1"){
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
        
      }
      
  },
  update: function (req, res) {
    var id = req.params.id;
    console.log("File:",req.url);
    let newProducto = req.body;
    if(req.url[0]!='/'){
      newProducto.url = req.url;
    }
    console.log("ACTUALIZANDO PRODUCTO",newProducto);
    //VERIFICACION: Se ha cambiado a activo --> true
    Producto.find({
      $and:[
        {idN:newProducto.idN},
        {activo:true}
      ]
    }
      , function(err0, prodsOrigen){
      let actualizar = false;
      prodsOrigen.forEach(prod=>{
        if(prod._id.valueOf() == newProducto._id){
          console.log("Entra")
          //console.log("actualizar",prod,newProducto)
          actualizar = true;
        }
      })
      console.log("actualizar",actualizar,prodsOrigen.length)
      if(prodsOrigen.length<LIMITEFREE || actualizar){ //  NO SE EXCEDE LIMITE
        Producto.findByIdAndUpdate(id,newProducto, function(err, producto){
        console.log(err);
          if(err) {
            return res.status(500).json({
              message: 'Error actualizando producto'
            })
          }
          return res.json(newProducto);
        })
      }else{ //  SE EXCEDE LIMITE
        Usuario.findOne({_id:req.user._id}, function(err, usuario){
          console.log("USUARIO",usuario)
          if(usuario.premium){ // ES PREMIUM
            Producto.findByIdAndUpdate(id,newProducto, function(err, producto){
            console.log(err);
              if(err) {
                return res.status(500).json({
                  message: 'Error actualizando producto'
                })
              }
              return res.json(newProducto);
            })
          }else{ // NO LO ES
            return res.status(200).json({
              message: 'Haz excedido el límite gratuito'
            })
          }
        });
      }
    });
  },
}