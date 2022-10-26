const multer = require('multer');

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
      const ext = file.originalname.split(".").pop(); 
      const fileName = Date.now();
      cb(null, `${fileName}.${ext}`);
      req.url = `${fileName}.${ext}`;
    },
    destination: function (res, file, cb) {
      cb(null, `./storage/images`);
    },
  });
  
/*const upload = multer({
    limits:{
        fileSize: 4 * 1024 * 1024,
    }
}) */

module.exports = multer({storage});