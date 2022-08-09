const router = require('express').Router()
const comentarioController = require('../controllers/comentarioController')

router.get('/', function (req, res) {
    res.status(200).json({ message: 'Estás en Comentarios' })
  })

router.post('/create', function(req, res){
    comentarioController.create(req,res)
    console.log("/create");
})

router.delete('/:id', function(req, res){
    comentarioController.remove(req,res)
})

router.put('/:id', function(req, res){
    comentarioController.update(req,res)
    console.log("/update");
})

router.get('/getByID/:id', function(req, res){
    comentarioController.getByID(req,res)
    console.log("/getByID");
})

router.get('/getAll', function(req, res){
    comentarioController.getAll(req,res)
    console.log("/getAll");
})
module.exports = router