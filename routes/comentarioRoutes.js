const router = require('express').Router()
const comentarioController = require('../controllers/comentarioController')
const verifyToken = require('../middlewares/authJWT');

router.get('/', function (req, res) {
    res.status(200).json({ message: 'Estás en Comentarios' })
  })

router.post('/create',verifyToken, function(req, res){
    if (!req.user) {
        res.status(200)
          .send({
            message: "Invalid JWT token"
          });
    }else
        comentarioController.create(req,res)
    console.log("/create");
})


router.post('/sendEmail/:email',verifyToken, function(req, res){
  if (!req.user) {
      res.status(200)
        .send({
          message: "Invalid JWT token"
        });
  }else
      comentarioController.sendEmail(req,res)
  console.log("/sendEmail");
})

router.delete('/:id',verifyToken, function(req, res){
    if (!req.user) {
        res.status(403)
          .send({
            message: "Invalid JWT token"
          });
    }else
        comentarioController.remove(req,res)
})

router.put('/:id',verifyToken, function(req, res){
    if (!req.user) {
        res.status(403)
          .send({
            message: "Invalid JWT token"
          });
    }else
        comentarioController.update(req,res)
    console.log("/update");
})

router.get('/getByID/:id',verifyToken, function(req, res){
    if (!req.user) {
        res.status(403)
          .send({
            message: "Invalid JWT token"
          });
    }else
        comentarioController.getByID(req,res)
    console.log("/getByID");
})

router.get('/getAll/:idP',verifyToken, function(req, res){
    if (!req.user) {
      comentarioController.getAll(req,res)
        //res.status(403)
        //  .send({
        //    message: "Invalid JWT token"
        //  });
    }else
        comentarioController.getAll(req,res)
    console.log("/getAll");
})
module.exports = router