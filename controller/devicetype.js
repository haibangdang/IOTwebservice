const db = require("../model/database");
const statuscode = require("../config/statuscode");
const project = db.project;
const device = db.device;
const station = db.station;
const deviceType = db.deviceType;

exports.createDeviceType = (req, res) => {
    const schemaname = req.params.schemaname;

    const newtype = {
        typename : req.body.typename,
        description : req.body.description,
    };

    deviceType.schema(schemaname).create(newtype)
        .then(data => {
            resstatus(statuscode.STATUS_OK).send({ id: data.id });
        })
        .catch(err => {
            res.status(statuscode.STATUS_ERROR).send(err.message);
        });
};

exports.updateDeviceType = (req, res) => {
    const schemaname = req.params.schemaname;
    const id = req.body.id;

    if (!id) {
        res.sendStatus(statuscode.STATUS_NOT_FOUND);
        return;
    }

    deviceType.schema(schemaname).findByPk(id)
        .then(deviceType => {
            Object.assign(typename, req.body.typename);
            Object.assign(description, req.body.description);
            deviceType.save();
            res.sendStatus(statuscode.STATUS_OK);
        })
        .catch(err => {
            res.status(statuscode.STATUS_ERROR).send(err.message);
        });
};

exports.deleteDeviceType = (req, res) => {
    const id = req.body.id;
    const schemaname = req.params.schemaname;

    indicator.schema(schemaname).destroy({
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

exports.getAllDeviceTypeInfo = (req, res) => {
    const schemaname = req.params.schemaname;

    deviceType.schema(schemaname).findAll()
        .then(data => {
            res.status(statuscode.STATUS_OK).send(data);
        })
        .catch(err => {
            res.status(statuscode.STATUS_ERROR).send(err);
        });
}

exports.getDeviceTypeInfo = (req, res) => {
    const schemaname = req.params.schemaname;
    const deviceTypeId = req.query.id;

    deviceType.schema(schemaname).findByPk(deviceTypeId)
        .then(data => {
            res.status(statuscode.STATUS_OK).send(data);
        })
        .catch(err => {
            res.status(statuscode.STATUS_ERROR).send(err);
        });
}