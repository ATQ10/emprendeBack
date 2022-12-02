const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../modelos/usuario');
const fs = require('fs')
const { promisify } = require('util')
var nodemailer = require('nodemailer');
const Suscripcion = require('../modelos/suscripcion');

const unlinkAsync = promisify(fs.unlink)

exports.signup = async (req, res) => {
    const usuario = new Usuario({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      telefono: req.body.telefono,
      premium: false
    });
/*
    if(req.file){
      const {filename} = req.file
      usuario.setImgUrl(filename)
    }else{
      usuario.setImgUrl('avatar.png')
    }
*/
    usuario.save(async (err, user) => {
      if (err) {
         // Delete the file like normal
         // await unlinkAsync(req.file.path)
          res.status(500)
            .send({
              message: err
            });
          return;
      } else {

        //Creamos el objeto de transporte
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'emprenego.notificacion@gmail.com',
            pass: 'ebibqctqkpzkxitt'
          }
        });

        var mensaje = "Bienvenid@ a EmpreNego\n"+
                      "Accede a tu cuenta con: "+req.body.email+"\n"+
                      "Contraseña: "+req.body.password;

        var mailOptions = {
          from: 'emprenego.notificacion@gmail.com',
          to: req.body.email,
          subject: 'Registro EmpreNego',
          text: mensaje
        };

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email enviado: ' + info.response);
          }
        });

        res.status(200)
          .send({
            message: "Usuario registrado exitosamente"
          })
      }
    });
  };
  
  exports.signin = (req, res) => {
    Usuario.findOne(
      {email: req.body.email}
      )
      .exec((err, usuario) => {
        if (err) {
          res.status(500)
            .send({
              message: err
            });
          return;
        }
        if (!usuario) {
          return res.status(404)
            .send({
              message: "Usuario no encontrado."
            });
        }
  
        //comparing passwords
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          usuario.password
        );
        // checking if password was valid and send response accordingly
        if (!passwordIsValid) {
          return res.status(401)
            .json({
              accessToken: null,
              message: "Contraseña inválida!"
            });
        }
        //signing token with user id
        var token = jwt.sign({
          id: usuario._id
        }, process.env.API_SECRET, {
          expiresIn: 86400
        });

        //Verificar que el usuario es premium -- INICIO
        let idUser = usuario._id;
        Suscripcion.find({idU:idUser},function(err, suscripciones){
          /*
          if(err) {
            return res.status(500).json({
              message: 'Error obteniendo las suscripciones'
            })
          }*/
          let suscipcionActiva = false;
          if(suscripciones.length!=0){
            suscripciones.sort((a, b)=> {
              if(a.fechaFinal < b.fechaFinal) { return 1; }
              if(a.fechaFinal > b.fechaFinal) { return -1; }
              return 0;
            });
            console.log("Ultima suscripcion:",suscripciones[0]);
            let UltimaSuscripcion = suscripciones[0];
            const dateActual = new Date(Date.now());
            if(dateActual<UltimaSuscripcion.fechaFinal){
              console.log("---> SUSCRIPCION ACTIVA")
              suscipcionActiva = true;
            }else{
              console.log("---> SIN SUSCRIPCION")
            }
          }else{
            console.log("---> SIN SUSCRIPCION")
          }

          //Actualizando status de suscripción
          Usuario.findOne({_id:idUser}, function(err, usuario){
            /*
            if(err) {
                return res.status(500).json({
                  message: 'Se ha producido un error al obtener el usuario'
                })
            }
            if(!usuario){
                return res.status(404).json( {
                    message: 'No tenemos este usuario'
                })
            
            }*/
            usuario.premium = suscipcionActiva;
            Usuario.findByIdAndUpdate(usuario._id,usuario, function(err, usuarioEdit){
              /*
              if(err) {
                return res.status(500).json({
                  message: 'Error actualizando usuario'
                })
              }
              return res.json(usuarioEdit);
              */
            })
          })
        })
        //Verificar que el usuario es premium -- FINAL 
  
        //responding to client request with user profile success message and  access token .
        res.status(200)
          .json({
            usuario: {
              id: usuario._id,
              email: usuario.email,
              nombre: usuario.nombre,
              apellido: usuario.apellido,
            },
            message: "Inicio de sesión exitoso",
            accessToken: token,
          });
      });
  };