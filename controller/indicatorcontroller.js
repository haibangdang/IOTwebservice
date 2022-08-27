const db = require("../model/database");
const statuscode = require("../config/statuscode");
const project = db.project;
const device = db.device;
const station = db.station;
const indicator = db.indicator;

exports.createIndicator = (req, res) => {
    const schemaname = req.params.schemaname;

    const newindicator = {
        name : req.body.name,
        unitType : req.body.unitType,
        minValue : req.body.minValue,
        maxValue : req.body.maxValue,
        threshold : req.body.threshold,
        valueType : req.body.valueType,
        argument : req.body.argument
    };

    indicator.schema(schemaname).create(newindicator)
        .then(data => {
            resstatus(statuscode.STATUS_OK).send({ id: data.id });
        })
        .catch(err => {
            res.status(statuscode.STATUS_ERROR).send(err.message);
        });
};

exports.updateIndicator = (req, res) => {
    const schemaname = req.params.schemaname;
    const id = req.body.id;

    if (!id) {
        res.sendStatus(statuscode.STATUS_NOT_FOUND);
        return;
    }

    indicator.schema(schemaname).findByPk(id)
        .then(deviceinfo => {
            Object.assign(indicator, req.body);
            indicator.save();
            res.sendStatus(statuscode.STATUS_OK);
        })
        .catch(err => {
            res.status(statuscode.STATUS_ERROR).send(err.message);
        });
};

exports.deleteIndicator = (req, res) => {
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

exports.getAllIndicatorInfo = (req, res) => {
    const schemaname = req.params.schemaname;

    indicator.schema(schemaname).findAll()
        .then(data => {
            res.status(statuscode.STATUS_OK).send(data);
        })
        .catch(err => {
            res.status(statuscode.STATUS_ERROR).send(err);
        });
}

exports.getIndicatorInfo = (req, res) => {
    const schemaname = req.params.schemaname;
    const indicatorId = req.query.id;

    indicator.schema(schemaname).findByPk(indicatorId)
        .then(data => {
            res.status(statuscode.STATUS_OK).send(data);
        })
        .catch(err => {
            res.status(statuscode.STATUS_ERROR).send(err);
        });
}