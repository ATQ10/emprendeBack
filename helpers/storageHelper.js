const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './storage/imgs')
    },
    filename: function (req, file, cb) {
        if(file){
            //falta asignar un avatar si no llega
            const filename = `${Date.now()}-img-${file.originalname}`;
            cb(null, filename)
        }
    }
  })
  
const upload = multer({ storage: storage })
module.exports = upload