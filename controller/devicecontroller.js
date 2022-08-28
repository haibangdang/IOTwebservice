const db = require("../model/database");
const statuscode = require("../config/statuscode");
const brokerConfig = require("../config/BrokerConfig");
const device = db.device;



// exports.createDevice = (req, res) => {
//     const schemaname = req.params.schemaname;

//     const newdevice = {
//         //id: req.body.id,
//         deviceName: req.body.deviceName,
//         parentId: req.body.parentId,
//         status: req.body.status,
//         protocol: req.body.protocol,
//         deviceType: req.body.deviceType,
//         serialNumber: req.body.serialNumber,
//         createAt: req.body.createAt,
//         createBy: req.body.createBy,
//         startDate: req.body.startDate,
//         endDate: req.body.endDate,
//         deleteAt: req.body.deleteAt,
//         deleteBy: req.body.deleteBy,
//         updateAt: req.body.updateAt,
//         updateBy: req.body.updateBy,
//         description: req.body.description,
//         stationId: req.body.stationId,
//         projectId: req.body.projectId
//     };

//     device.schema(schemaname).create(newdevice)
//         .then(data => {
//             resstatus(statuscode.STATUS_OK).send({ id: data.id });
//         })
//         .catch(err => {
//             res.status(statuscode.STATUS_ERROR).send(err.message);
//         });
// };

 exports.createDevice = async (req, res) => {
    const schemaname = req.params.schemaname;

    const newDevice = {
        //id: req.body.id,
        deviceName: req.body.name,
        parentId: req.body.parentId,
        status: req.body.status,
        protocol: req.body.protocol,
        deviceType: req.body.deviceType,
        serialNumber: req.body.serialNumber,
        createAt: req.body.createAt,
        createBy: req.body.createBy,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        deleteAt: req.body.deleteAt,
        deleteBy: req.body.deleteBy,
        updateAt: req.body.updateAt,
        updateBy: req.body.updateBy,
        description: req.body.description,
        stationId: req.body.stationId,
        projectId: req.body.projectId,
        jsonEnable: req.body.jsonEnable,
        key : req.body.key
    };

    var newDeviceInf = await device.schema(schemaname).create(newDevice)
    .catch(err => {
        console.log("Error :%s", err);
    });
    
    return  newDeviceInf;
};

exports.updateDevice = (req, res) => {
    const schemaname = req.params.schemaname;
    const id = req.body.id;

    if (!id) {
        res.sendStatus(statuscode.STATUS_NOT_FOUND);
        return;
    }

    device.schema(schemaname).findByPk(id)
        .then(deviceinfo => {
            Object.assign(deviceinfo, req.body);
            deviceinfo.save();
            res.sendStatus(statuscode.STATUS_OK);
        })
        .catch(err => {
            res.status(statuscode.STATUS_ERROR).send(err.message);
        });
};

exports.deleteDevice = (req, res) => {
    const id = req.body.id;
    const schemaname = req.params.schemaname;

    device.schema(schemaname).destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.sendStatus(statuscode.STATUS_OK);
            } else {
                res.sendStatus(statuscode.STATUS_NOT_FOUND);
            }
        })
        .catch(err => {
            res.status(statuscode.STATUS_ERROR).send(err.message);
        });
};

exports.getDeviceById = (req, res) => {
    const schemaname = req.params.schemaname;
    const id = req.query.id;

    device.schema(schemaname).findByPk(id)
        .then(data => {
            if (data) {
                var datas = {
                    bang: []
                };

                for(var i in data) {    

                    var item = data[i];   
                
                    datas.bang.push({
                      'id': item.id,
                      'deviceName': itemdy.name,
                      'parentId': item.parentId,
                      'status': item.status,
                      'protocol': item.protocol,
                      'deviceType': item.deviceType,
                      'serialNumber': item.serialNumber,
                      'createAt': item.createAt,
                      'createBy': item.createBy,
                      'startDate': item.startDate,
                      'endDate': item.endDate,
                      'deleteAt': item.deleteAt,
                      'deleteBy': item.deleteBy,
                      'updateAt': item.updateAt,
                      'updateBy': item.updateBy,
                      'description': item.description,
                      'stationId': item.stationId,
                      'projectId': item.projectId,
                      'jsonEnable': item.jsonEnable,
                      'key': item.key,
                    });
                }
                
                res.status(statuscode.STATUS_OK).send(datas);
            } else {
                res.status(statuscode.STATUS_NOT_FOUND).send("Can not find id");
            }
        })
        .catch(err => {
            res.status(statuscode.STATUS_ERROR).send("error");
        });
};

exports.getNDevice = (req, res) => {
    const startOffset = req.query.startOffset;
    const numberOfDevice = req.query.count;
    const schemaname = req.params.schemaname;

    device.schema(schemaname).findAll({
        offset: startOffset,
        limit: numberOfDevice,
        attributes: [
            'device.*',
            'project.projectName',
            'station.stationName'
        ],

        include: [
            {
                model: db.project.schema(schemaname),
                attributes: []
            },
            {
                model: db.station.schema(schemaname),
                attributes: []
            }
        ],

        raw: true

    })
        .then(data => {
            res.status(statuscode.STATUS_OK).send(data);
        })
        .catch(err => {
            res.status(statuscode.STATUS_ERROR).send(err);
        });
}

exports.countDevice = (req, res) => {
    const schemaname = req.params.schemaname;

    device.schema(schemaname).count()
        .then(count => {
            res.status(statuscode.STATUS_OK).send({ count: count });
        })
        .catch(err => {
            res.status(statuscode.STATUS_ERROR).send(err);
        });
}

exports.getAllDeviceInStation = (req, res) => {
    const schemaname = req.params.schemaname;
    const stationId = req.query.stationId;

    device.schema(schemaname).findAll({
        where: { stationId: stationId }
    })
        .then(data => {
            res.status(statuscode.STATUS_OK).send(data);
        })
        .catch(err => {
            res.status(statuscode.STATUS_ERROR).send(err);
        });
}

exports.getAllDeviceInProject = (req, res) => {
    const schemaname = req.params.schemaname;
    const projectId = req.query.projectId;

    device.schema(schemaname).findAll({
        where: { projectId: projectId }
    })
        .then(data => {
            res.status(statuscode.STATUS_OK).send(data);
        })
        .catch(err => {
            res.status(statuscode.STATUS_ERROR).send(err);
        });
}


exports.getAllDeviceName = async (schemaname) => {

    var data = {}; 

    const list =  await device.schema(schemaname).findAll({
        attributes: [
            'id',
            // 'key'
        ]
    })   
    .catch(err => {
         return [];
    });

    // list.forEach(function(value){
    //     data[brokerConfig.feedDevice + value.key] = {id : value.id, workspace : schemaname};
    //   });

    return data;
}