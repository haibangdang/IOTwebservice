const express = require('express');
const app = express();




const serverconfig = require("./config/serverconfig.js");

const cors = require("cors");



var corsOptions = {
  origin: "http://localhost:8081"
};




app.get('/', function(req, res){
  res.send('Hello');
})

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

const db = require("./model/database");
db.sequelize.authenticate();

require("./routes/routes.js")(app);

app.listen(process.env.PORT || serverconfig.serverport, function(){
    console.log("Server start on localhost:%s", serverconfig.serverport);
})