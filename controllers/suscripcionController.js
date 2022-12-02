const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Suscripcion = require('../modelos/suscripcion');
const Usuario = require('../modelos/usuario');

module.exports = {
  create: function (req, res) {
    try {
        console.log("req.body",req.body)
        var newSuscripcion = new Suscripcion(req.body)
        console.log("newSuscripcion",newSuscripcion)
        newSuscripcion.idU = req.user._id;
        const dateStart = new Date(Date.now());
        newSuscripcion.fechaInicio = new Date(Date.now());
        var dateEnd = dateStart;
        if(dateStart.getMonth()==12){
          dateEnd = dateEnd.setMonth(1); //Un mes de suscripción
          dateEnd = dateEnd.setFullYear(dateEnd.getFullYear() + 1);
        }else{
          dateEnd = dateEnd.setMonth(dateEnd.getMonth() + 1); //Un mes de suscripción
        }
        newSuscripcion.fechaFinal = dateEnd;
        newSuscripcion.creado = Date.now();
        console.log("Suscripcion: ",newSuscripcion);
        newSuscripcion.save(function (err,suscripcion) {
            //Convertir usuario en premium Inicio
            Usuario.findOne({_id:newSuscripcion.idU}, function(err, usuario){
                if(err) {
                    return res.status(500).json({
                      message: 'Se ha producido un error al obtener el usuario'
                    })
                }
                if(!usuario){
                    return res.status(404).json( {
                        message: 'No tenemos este usuario'
                    })
                }
                usuario.premium = true;
                Usuario.findByIdAndUpdate(usuario._id,usuario, function(err, usuario){
                  if(err) {
                    return res.status(500).json({
                      message: 'Error actualizando usuario'
                    })
                  }
              })
            })
            //Convertir usuario en premium Final
            return res.status(200).json({
                message: 'Suscripcion registrada',
                _id: suscripcion._id
            })
        })
    } catch (error) {
        console.log(error)
    }
  },
  remove: function (req, res) {
      var id = req.params.id
      Suscripcion.findByIdAndRemove(id, function(err, suscripcion){
          if(err){
              return res.json(500, {
                  message: 'No existe Suscripcion'
                })
          }
          return res.json(suscripcion)
      });
  },
  getByID: function (req, res) {
      var id = req.params.id
      Suscripcion.findOne({_id:id}, function(err, suscripcion){
          if(err) {
              return res.status(500).json({
                message: 'Se ha producido un error al obtener la suscripcion'
              })
          }
          if(!suscripcion){
              return res.status(404).json( {
                  message: 'No tenemos esta suscripcion'
              })
          }
          return res.json(suscripcion)
      })
  },
  getAll: function(req, res) {
      let idUser = req.user._id;
      Suscripcion.find({idU:idUser},function(err, suscripciones){
        if(err) {
          return res.status(500).json({
            message: 'Error obteniendo las suscripciones'
          })
        }
        return res.json(suscripciones)
      })
  },
  update: function (req, res) {
    var id = req.params.id;
    let newSuscripcion = req.body;
    Suscripcion.findByIdAndUpdate(id,newSuscripcion, function(err, suscripcion){
          if(err) {
            return res.status(500).json({
              message: 'Error actualizando suscripcion'
            })
          }
          return res.json(suscripcion);
      })
  },
}