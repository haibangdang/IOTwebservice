const db = require("../model/database");

const statuscode = require("../config/statuscode");
const deviceAttribute = db.deviceAttribute;


exports.createDeviceAttribute = async (attInfo, schema, deviceId) => {

    var listAttr = [];

    for(var record in attInfo){
        listAttr.push({
            deviceId : deviceId ,
            name: attInfo.name,
            jsonExtraction : attInfo.jsonExtraction
        });
    }

    var listAttribute =  await deviceAttribute.schema(schema).bulkCreate(listAttr)

   .catch(err => {
        console.log("Error :%s", err);
    });

   return listAttribute;
};
