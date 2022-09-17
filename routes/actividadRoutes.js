const router = require('express').Router()
const actividadController = require('../controllers/actividadController')
const verifyToken = require('../middlewares/authJWT');

router.get('/', function (req, res) {
    res.status(200).json({ message: 'Estás en Actividad' })
  })

router.post('/create',verifyToken, function(req, res){
    if (!req.user) {
        res.status(403)
          .send({
            message: "Invalid JWT token"
          });
    }else
        actividadController.create(req,res)
    console.log("/create");
})

router.delete('/:id',verifyToken, function(req, res){
    if (!req.user) {
        res.status(403)
          .send({
            message: "Invalid JWT token"
          });
    }else
        actividadController.remove(req,res)
})

router.put('/:id',verifyToken, function(req, res){
    if (!req.user) {
        res.status(403)
          .send({
            message: "Invalid JWT token"
          });
    }else
        actividadController.update(req,res)
    console.log("/update");
})

router.get('/getByID/:id',verifyToken, function(req, res){
    if (!req.user) {
        res.status(403)
          .send({
            message: "Invalid JWT token"
          });
    }else
        actividadController.getByID(req,res)
    console.log("/getByID");
})

router.get('/getAll',verifyToken, function(req, res){
    if (!req.user) {
        res.status(403)
          .send({
            message: "Invalid JWT token"
          });
    }else
        actividadController.getAll(req,res)
    console.log("/getAll");
})
module.exports = router