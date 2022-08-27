const db = require("../model/database");
const statuscode = require("../config/statuscode");
const trackingdata = db.trackingdata;

exports.addData = (req, res) => {
    const schemaname = req.params.schemaname;
    
    const data = {
        deviceid :  req.body.deviceid,
        day : req.body.day,
        month : req.body.month,
        year : req.body.year,
        hour : req.body.hour,
        minute : req.body.minute,
        seconds : req.body.seconds,
        date :  req.body.date,
        value : req.body.value
    };

    trackingdata.schema(schemaname).create(data)
        .then(data => {
            res.status(statuscode.STATUS_OK).send({ id: data.id });
        })
        .catch(err => {
            res.status(statuscode.STATUS_ERROR).send(err.message);
        });
};

exports.getDataInRangeDate = (req, res) => {
    const schemaname = req.params.schemaname;
    const deviceid = req.query.deviceid;
    const from = req.query.from;
    const to = req.query.to;

    trackingdata.schema(schemaname).findAll({
        where : { deviceId : deviceid,
            date : {[db.Sequelize.between]  : [from, to]}
    }})
        .then(data => {
            res.status(statuscode.STATUS_OK).send(data);
        })
        .catch(err => {
            res.status(statuscode.STATUS_ERROR).send(err.message);
        });
};

exports.getLastNRecord = (req, res) => {
    const schemaname = req.params.schemaname;
    const deviceid = req.query.deviceId;
    const count = req.query.count;

    trackingdata.schema(schemaname).findAll({
        where: {deviceId : deviceid},
        order: [['date', 'DESC']],
        limit: count
    })
        .then(data => {
            res.status(statuscode.STATUS_OK).send(data);
        })
        .catch(err => {
            res.status(statuscode.STATUS_ERROR).send(err);
        });
};


exports.addDataBroker = (schemaname, deviceId, value) => {
    
    const data = {
        deviceId :  deviceId,
        day : null,
        month : null,
        year : null,
        hour : null,
        minute : null,
        seconds : null,
        date :  null,
        value : value
    };

    trackingdata.schema(schemaname).create(data)
        .then(data => {
            console.log("Add data ok");
        })
        .catch(err => {
            console.log("Add data error : %s", err);
        });
};