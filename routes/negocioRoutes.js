const router = require('express').Router()
const negocioController = require('../controllers/negocioController')
const verifyToken = require('../middlewares/authJWT');
const upload = require('../middlewares/uploadMiddleware');
const multer = require("multer");

router.get('/', function (req, res) {
    res.status(200).json({ message: 'Estás en Negocios' })
  })

router.post('/create',verifyToken,upload.single('imagen'), function(req, res){
    if (!req.user) {
        res.status(403)
          .send({
            message: "Invalid JWT token"
          });
    }else
        negocioController.create(req,res)
    console.log("/create");
})

router.delete('/:id',verifyToken, function(req, res){
    if (!req.user) {
        res.status(403)
          .send({
            message: "Invalid JWT token"
          });
    }else
        negocioController.remove(req,res)
})

router.put('/:id',verifyToken,upload.single('imagen'), function(req, res){
    if (!req.user) {
        res.status(403)
          .send({
            message: "Invalid JWT token"
          });
    }else
        negocioController.update(req,res)
    console.log("/update");
})

router.get('/getByID/:id',verifyToken, function(req, res){
    if (!req.user) {
      negocioController.getByID(req,res)
      /*
        res.status(403)
          .send({
            message: "Invalid JWT token"
          });    
      */
    }else
        negocioController.getByID(req,res)
    console.log("/getByID");
})

router.get('/getAll',verifyToken, function(req, res){
    if (!req.user) {
        res.status(403)
          .send({
            message: "Invalid JWT token"
          });
    }else
        negocioController.getAll(req,res)
    console.log("/getAll");
})
module.exports = router