var broker = require("./Broker.js");
const device = require("../controller/devicecontroller");
const deviceAttribute = require("../controller/deviceAttributeController");
const crypto = require("crypto");
const statuscode = require("../config/statuscode");
const brokerConfig = require("../config/BrokerConfig");

var https = require('https');


var brokerConnection = new broker();
brokerConnection.loadAllDevice();
brokerConnection.connect();

async function CreateAdafruitDevice(schemaname, deviceName, deviceId) {

    var postData = JSON.stringify(
        {
            "feed": {
                "name": deviceName,
                "description": "Esp8266 connection status",
                "visibility": "public"
            }
        }
    );

    var options = {
      hostname: brokerConfig.host,
      port: 443,
      path: brokerConfig.apiFeedPath,
      method: "POST",
      headers: {
           'Content-Type' : 'application/json',
           "Content-Length" : postData.length,
           "X-AIO-Key" : brokerConfig.accountKey
         }
    };
    
    var req = https.request(options, (res) => {
      console.log('statusCode:', res.statusCode);

      if (res.statusCode === 201  || res.statusCode === 200) {
        brokerConnection.addNewDevice(schemaname, deviceName, deviceId);
      }

      res.on('data', (data) => {
        console.log('data: %s', data);     
      });
    });
    
    req.on('error', (e) => {
      console.error(e);
    });
    
    req.write(postData);
    req.end();
}

exports.createNewDevice = async (req, res) => {

    var deviceKey = crypto.randomBytes(20).toString('hex');
    var listAttribute = req.body.attributes;
    const schemaname = req.params.schemaname;

    req.body['key'] = deviceKey;

    var deviceInfo = await device.createDevice(req, res);

    listAttribute = await  deviceAttribute.createDeviceAttribute(listAttribute, schemaname, deviceInfo.id);

    var returnData  = req.body;

    returnData.id = deviceInfo.id;
    returnData.attributes = listAttribute;

    CreateAdafruitDevice(schemaname, deviceKey, deviceInfo.id);

    res.status(statuscode.STATUS_OK).send(returnData);
}
