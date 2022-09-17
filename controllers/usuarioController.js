const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../modelos/usuario');
const fs = require('fs')
const { promisify } = require('util')

const unlinkAsync = promisify(fs.unlink) 

module.exports = {
  create: async (req, res)=> {
    try {
        let newUsuario = new Usuario({
          email: req.body.email,
          password: req.body.password,
          nombre: req.body.nombre,
          apellido: req.body.apellido,
          telefono: req.body.telefono,
        })

        console.log(newUsuario);

        newUsuario.save(async (err,usuario)=>{
          if (err) {
            // Delete the file like normal
            if(req.file){
             await unlinkAsync(req.file.path)
            }
             res.status(500)
               .send({
                 message: err
               });
             return;
          }else{
            return res.status(200).json({
              message: 'Usuario registrado',
              _id: usuario._id
            })
          }
        })
    } catch (error) {
        console.log(error)
    }
  },
  remove: function (req, res) {
      var id = req.params.id
      Usuario.findByIdAndRemove(id, function(err, usuario){
          if(err){
              return res.status(500).json({
                  message: 'No existe usuario'
                })
          }
          return res.status(200).json(usuario)
      })
  },
  getByID: function (req, res) {
      var id = req.params.id
      Usuario.findOne({_id:id}, function(err, usuario){
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
          return res.json(usuario)
      })
  },
  getAll: function(req, res) {
    Usuario.find(function(err, usuarios){
        if(err) {
          return res.status(500).json({
            message: 'Error obteniendo los usuarios'
          })
        }
        return res.json(usuarios)
      })
  },
  update: function (req, res) {
    var id = req.params.id;
    let newUsuario = req.body;
      Usuario.findByIdAndUpdate(id,newUsuario, function(err, usuario){
          if(err) {
            return res.status(500).json({
              message: 'Error actualizando usuario'
            })
          }
          return res.json(usuario);
      })
  },
}