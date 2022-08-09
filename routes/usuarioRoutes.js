const router = require('express').Router()
const usuarioController = require('../controllers/usuarioController');
const upload = require('../helpers/storageHelper');

router.get('/', function (req, res) {
    res.status(200).json({ message: 'Estás en Usuario' })
})

router.post('/create', usuarioController.create);

router.delete('/:id', function(req, res){
    usuarioController.remove(req,res)
})

router.put('/:id', function(req, res){
    usuarioController.update(req,res)
    console.log("/update");
})

router.get('/getByID/:id', function(req, res){
    usuarioController.getByID(req,res)
    console.log("/getByID");
})

router.get('/getAll', function(req, res){
    usuarioController.getAll(req,res)
    console.log("/getAll");
})
module.exports = router