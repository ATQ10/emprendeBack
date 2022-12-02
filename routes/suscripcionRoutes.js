const router = require('express').Router()
const suscripcionController = require('../controllers/suscripcionController')
const verifyToken = require('../middlewares/authJWT');

router.get('/', function (req, res) {
    res.status(200).json({ message: 'Estás en suscripcion' })
  })

router.post('/create',verifyToken, function(req, res){
    if (!req.user) {
        res.status(403)
          .send({
            message: "Invalid JWT token"
          });
    }else
      suscripcionController.create(req,res)
    console.log("/create");
})

router.delete('/:id',verifyToken, function(req, res){
    if (!req.user) {
        res.status(403)
          .send({
            message: "Invalid JWT token"
          });
    }else
      suscripcionController.remove(req,res)
})

router.put('/:id',verifyToken, function(req, res){
    if (!req.user) {
        res.status(403)
          .send({
            message: "Invalid JWT token"
          });
    }else
      suscripcionController.update(req,res)
    console.log("/update");
})

router.get('/getByID/:id',verifyToken, function(req, res){
    if (!req.user) {
        res.status(403)
          .send({
            message: "Invalid JWT token"
          });
    }else
      suscripcionController.getByID(req,res)
    console.log("/getByID");
})

router.get('/getAll',verifyToken, function(req, res){
    if (!req.user) {
        res.status(403)
          .send({
            message: "Invalid JWT token"
          });
    }else
      suscripcionController.getAll(req,res)
    console.log("/getAll");
})
module.exports = router