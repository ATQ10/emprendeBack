const router = require('express').Router()
const productController = require('../controllers/productoController')

router.get('/', function (req, res) {
    res.status(200).json({ message: 'Estás en Productos' })
  })

router.post('/create', function(req, res){
    productController.create(req,res)
    console.log("/create");
})

router.delete('/:id', function(req, res){
    productController.remove(req,res)
    console.log("/delete");
})

router.put('/:id', function(req, res){
    productController.update(req,res)
    console.log("/update");
})

router.get('/getByID/:id', function(req, res){
    productController.getByID(req,res)
    console.log("/getByID");
})

router.get('/getAll', function(req, res){
    productController.getAll(req,res)
    console.log("/getAll");
})
module.exports = router