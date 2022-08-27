const db = require("../model/database");
const statuscode = require("../config/statuscode");
const project = db.project;
const device = db.device;
const station = db.station;
const deviceusage = db.deviceusage;

exports.getAllDeviceInfo = (req, res) => {
    const schemaname = req.params.schemaname;

    deviceusage.schema(schemaname).findAll({
        attributes: [
            'device.*',
            // 'device.deviceName',
            // 'device.parentid',
            // 'device.status',
            // 'device.protocol',
            // 'device.devicetype',
            // 'device.serialnumber',
            // 'device.createat',
            // 'device.createby',
            // 'device.startdate',
            // 'device.enddate',
            // 'device.deleteat',
            // 'device.deleteby',
            // 'device.updateat',
            // 'device.updateby',
            // 'device.description',
            'project.projectName',
            'station.stationName'
        ],

        include: [
            {
                model: project.schema(schemaname),
                attributes: []
            },
            {
                model: station.schema(schemaname),
                attributes: []
            },
            {
                model: device.schema(schemaname),
                attributes: []
            }
        ],

        raw: true
    })
        .then(data => {
            res.status(statuscode.STATUS_OK).send(data);
        })
        .catch(err => {
            res.status(statuscode.STATUS_ERROR).send(err.message);
        });
}


exports.getDeviceInfo = (req, res) => {
    const schemaname = req.params.schemaname;
    const id = req.query.id;

    deviceusage.schema(schemaname).findAll({
        where: {id: id},
        attributes: [
            'device.*',
            // 'device.deviceName',
            // 'device.parentid',
            // 'device.status',
            // 'device.protocol',
            // 'device.devicetype',
            // 'device.serialnumber',
            // 'device.createat',
            // 'device.createby',
            // 'device.startdate',
            // 'device.enddate',
            // 'device.deleteat',
            // 'device.deleteby',
            // 'device.updateat',
            // 'device.updateby',
            // 'device.description',
            'project.projectName',
            'station.stationName'
        ],

        include: [
            {
                model: project.schema(schemaname),
                attributes: []
            },
            {
                model: station.schema(schemaname),
                attributes: []
            },
            {
                model: device.schema(schemaname),
                attributes: []
            }
        ],

        raw: true
    })
        .then(data => {
            res.status(statuscode.STATUS_OK).send(data);
        })
        .catch(err => {
            res.status(statuscode.STATUS_ERROR).send(err.message);
        });
}