const router = require('express').Router()
const movimientoController = require('../controllers/movimientoController')
const verifyToken = require('../middlewares/authJWT');

router.get('/', function (req, res) {
    res.status(200).json({ message: 'Estás en Movimientos' })
  })

router.post('/create',verifyToken, function(req, res){
    if (!req.user) {
        res.status(403)
          .send({
            message: "Invalid JWT token"
          });
    }else
        movimientoController.create(req,res)
    console.log("/create");
})

router.delete('/:id',verifyToken, function(req, res){
    if (!req.user) {
        res.status(403)
          .send({
            message: "Invalid JWT token"
          });
    }else
        movimientoController.remove(req,res)
})

router.put('/:id',verifyToken, function(req, res){
    if (!req.user) {
        res.status(403)
          .send({
            message: "Invalid JWT token"
          });
    }else
        movimientoController.update(req,res)
    console.log("/update");
})

router.get('/getByID/:id',verifyToken, function(req, res){
    if (!req.user) {
        res.status(403)
          .send({
            message: "Invalid JWT token"
          });
    }else
        movimientoController.getByID(req,res)
    console.log("/getByID");
})

router.get('/getAll',verifyToken, function(req, res){
    if (!req.user) {
        res.status(403)
          .send({
            message: "Invalid JWT token"
          });
    }else
        movimientoController.getAll(req,res)
    console.log("/getAll");
})
module.exports = router