const express = require('express'),
    router = express.Router(),
    {
        signup,
        signin
    } = require('../controllers/authController');
const upload = require('../helpers/storageHelper');

    router.get('/', function (req, res) {
      res.status(200).json({ message: 'Estás en usuarios' })
    })

    router.post('/register',upload.single('image'),signup)

    router.post('/login', signin, (req, res)=>{

    });

    module.exports = router;