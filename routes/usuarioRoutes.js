const router = require('express').Router()
const usuarioController = require('../controllers/usuarioController');
const upload = require('../helpers/storageHelper');
const verifyToken = require('../middlewares/authJWT'),
  {
    signup,
    signin
  } = require("../controllers/authController.js");

router.post("/register", signup, function (req, res) {

});

router.post("/login", signin, function (req, res) {

});

router.get("/hiddencontent", verifyToken, function (req, res) {
  if (!req.user) {
    res.status(403)
      .send({
        message: "Invalid JWT token"
      });
  }else{
    res.status(200)
      .send({
        message: "Usted esta accediendo con "+req.user.email
      });
  } 
});

router.get('/', function (req, res) {
    res.status(200).json({ message: 'Estás en Usuario' })
})

router.post('/create', usuarioController.create);

router.delete('/:id', verifyToken, function(req, res){
  if (!req.user) {
    res.status(403)
      .send({
        message: "Invalid JWT token"
      });
  }else
    usuarioController.remove(req,res)
})

router.put('/:id',verifyToken, function(req, res){
    console.log("/update");
    if (!req.user) {
      res.status(403)
        .send({
          message: "Invalid JWT token"
        });
    }else
      usuarioController.update(req,res)
})

router.get('/getByID/:id',verifyToken, function(req, res){
    console.log("/getByID");
/*    if (!req.user) {
      res.status(403)
        .send({
          message: "Invalid JWT token"
        });
    }else */
      usuarioController.getByID(req,res)
})

router.get('/getAll',verifyToken, function(req, res){
    console.log("/getAll");
/*    if (!req.user) {
      res.status(403)
        .send({
          message: "Invalid JWT token"
        });
    }else */
      usuarioController.getAll(req,res)
})

module.exports = router