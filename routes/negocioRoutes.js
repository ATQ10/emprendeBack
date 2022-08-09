const router = require('express').Router()
const negocioController = require('../controllers/negocioController')

router.get('/', function (req, res) {
    res.status(200).json({ message: 'Estás en Negocios' })
  })

router.post('/create', function(req, res){
    negocioController.create(req,res)
    console.log("/create");
})

router.delete('/:id', function(req, res){
    negocioController.remove(req,res)
})

router.put('/:id', function(req, res){
    negocioController.update(req,res)
    console.log("/update");
})

router.get('/getByID/:id', function(req, res){
    negocioController.getByID(req,res)
    console.log("/getByID");
})

router.get('/getAll', function(req, res){
    negocioController.getAll(req,res)
    console.log("/getAll");
})
module.exports = router