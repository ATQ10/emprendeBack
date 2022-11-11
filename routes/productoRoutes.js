const router = require('express').Router()
const productController = require('../controllers/productoController')
const verifyToken = require('../middlewares/authJWT');
const upload = require('../middlewares/uploadMiddleware');
const multer = require("multer");

router.get('/', function (req, res) {
    res.status(200).json({ message: 'Estás en Productos' })
  })

router.post('/create',verifyToken,upload.single('imagen'), function(req, res){
    if (!req.user) {
        res.status(403)
          .send({
            message: "Invalid JWT token"
          });
    }else
        productController.create(req,res)
    console.log("/create");
})

router.delete('/:id',verifyToken, function(req, res){
    if (!req.user) {
        res.status(403)
          .send({
            message: "Invalid JWT token"
          });
    }else
        productController.remove(req,res)
    console.log("/delete");
})

router.put('/:id',verifyToken,upload.single('imagen'), function(req, res){
    if (!req.user) {
        res.status(403)
          .send({
            message: "Invalid JWT token"
          });
    }else{        
      productController.update(req,res)
    }
    console.log("/update");
})

router.get('/getByID/:id',verifyToken, function(req, res){
    if (!req.user) {
      /*
        res.status(403)
          .send({
            message: "Invalid JWT token"
          });
      */
        productController.getByID(req,res)
    }else
        productController.getByID(req,res)
    console.log("/getByID");
})

router.get('/getAll/:id',verifyToken, function(req, res){
    if (!req.user) {
      productController.getAll(req,res)
      /*
        res.status(403)
          .send({
            message: "Invalid JWT token"
          });
      */
    }else
        productController.getAll(req,res)
    console.log("/getAll");
})
module.exports = router