const router = require('express').Router()
const movimientoController = require('../controllers/movimientoController')

router.get('/', function (req, res) {
    res.status(200).json({ message: 'Estás en Movimientos' })
  })

router.post('/create', function(req, res){
    movimientoController.create(req,res)
    console.log("/create");
})

router.delete('/:id', function(req, res){
    movimientoController.remove(req,res)
})

router.put('/:id', function(req, res){
    movimientoController.update(req,res)
    console.log("/update");
})

router.get('/getByID/:id', function(req, res){
    movimientoController.getByID(req,res)
    console.log("/getByID");
})

router.get('/getAll', function(req, res){
    movimientoController.getAll(req,res)
    console.log("/getAll");
})
module.exports = router