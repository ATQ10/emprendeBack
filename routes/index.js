var router = require('express').Router()
var usuario = require('./usuarioRoutes')
var actividad = require('./actividadRoutes')
var movimiento = require('./movimientoRoutes')
var negocio = require('./negocioRoutes')
var comentario = require('./comentarioRoutes')
var producto = require('./productoRoutes')

router.use('/usuario', usuario);
router.use('/actividad', actividad);
router.use('/movimiento', movimiento);
router.use('/negocio', negocio);
router.use('/comentario', comentario);
router.use('/producto', producto);

router.get('/', function (req, res) {
    res.status(200).json({ message: 'Estás conectado a nuestra API para desarrollar sistema de Emprendedores' })
  })

  module.exports = router