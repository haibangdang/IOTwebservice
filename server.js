
const express = require('express');
const app = express();




const serverconfig = require("./config/serverconfig.js");

const cors = require("cors");



var corsOptions = {
  origin: "https://danghaibang-iot-webservice.herokuapp.com/",
  credentials: true
};




app.get('/', function(req, res){
  res.send('Hello');
})

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// Add headers before the routes are defined
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'https://danghaibang-iot-webservice.herokuapp.com/');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

const db = require("./model/database");
db.sequelize.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

require("./routes/routes.js")(app);

app.listen(process.env.PORT || serverconfig.serverport, function(){
    console.log("Server start on localhost:%s", serverconfig.serverport);
})