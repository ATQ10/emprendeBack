const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../modelos/usuario');
const fs = require('fs')
const { promisify } = require('util')

const unlinkAsync = promisify(fs.unlink)

exports.signup = async (req, res) => {
    const usuario = new Usuario({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      telefono: req.body.telefono,
    });

    if(req.file){
      const {filename} = req.file
      usuario.setImgUrl(filename)
    }else{
      usuario.setImgUrl('avatar.png')
    }

    usuario.save(async (err, user) => {
      if (err) {
         // Delete the file like normal
          await unlinkAsync(req.file.path)
          res.status(500)
            .send({
              message: err
            });
          return;
      } else {
        res.status(200)
          .send({
            message: "usuario registrado exitosamente"
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
            .send({
              accessToken: null,
              message: "Contraseña inválida!"
            });
        }
        //signing token with user id
        var token = jwt.sign({
          id: usuario.id
        }, process.env.API_SECRET, {
          expiresIn: 86400
        });
  
        //responding to client request with user profile success message and  access token .
        res.status(200)
          .send({
            usuario: {
              id: usuario._id,
              email: usuario.email,
              nombre: usuario.nombre,
            },
            message: "Inicio de sesión exitoro",
            accessToken: token,
          });
      });
  };