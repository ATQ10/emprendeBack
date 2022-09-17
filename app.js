const express = require("express"),
  app = express(),
  mongoose = require('mongoose'),
  cors = require("cors");
  

  app.use(cors());


require("dotenv")
  .config();

//Conectar a la base de datos
try {
    mongoose.connect(process.env.DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    console.log("Conectado a la base de Datos");
  } catch (error) {
    handleError(error);
  }
  process.on('unhandledRejection', error => {
    console.log('unhandledRejection', error.message);
  });

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
  extended: true
}));

app.use('/public', express.static(`${__dirname}/storage/imgs`))

//Router
var router = require('./routes')
app.use('/api', router)

//setup server to listen on port 3030
app.listen(process.env.PORT || 3030, () => {
  console.log("Server is live on port 3030");
})