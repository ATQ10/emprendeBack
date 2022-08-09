const router = require('express').Router()
const actividadController = require('../controllers/actividadController')

router.get('/', function (req, res) {
    res.status(200).json({ message: 'Estás en Actividad' })
  })

router.post('/create', function(req, res){
    actividadController.create(req,res)
    console.log("/create");
})

router.delete('/:id', function(req, res){
    actividadController.remove(req,res)
})

router.put('/:id', function(req, res){
    actividadController.update(req,res)
    console.log("/update");
})

router.get('/getByID/:id', function(req, res){
    actividadController.getByID(req,res)
    console.log("/getByID");
})

router.get('/getAll', function(req, res){
    actividadController.getAll(req,res)
    console.log("/getAll");
})
module.exports = router