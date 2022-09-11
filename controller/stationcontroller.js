const db = require("../model/database");
const statuscode = require("../config/statuscode");
const station = db.station;

//station =============================================================
exports.createStation = (req, res) => {
    const schemaname = req.params.schemaname;

    station.schema(schemaname).create(req.body)
        .then(data => {
            res.status(statuscode.STATUS_OK).send({ id: data.id });
        })
        .catch(err => {
            res.status(statuscode.STATUS_ERROR).send(err.message);
        });
};

exports.updateStation = (req, res) => {
    const schemaname = req.params.schemaname;
    const id = req.query.id;

    if (!id) {
        res.sendStatus(statuscode.STATUS_NOT_FOUND);
        return;
    }

    station.schema(schemaname).findByPk(id)
        .then(stationinfo => {
            Object.assign(stationinfo, req.body);
            projectinfo.save();
            res.sendStatus(statuscode.STATUS_OK);
        })
        .catch(err => {
            res.send(statuscode.STATUS_ERROR).send(err.message);
        });
};

exports.deleteStation = (req, res) => {
    const schemaname = req.params.schemaname;
    const id = req.query.id;

    station.schema(schemaname).destroy({
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
            res.sendStatus(statuscode.STATUS_ERROR).send(err.message);
        });
};

exports.findStationById = (req, res) => {
    const schemaname = req.params.schemaname;
    const id = req.query.id;

    station.schema(schemaname).findByPk(id)
        .then(data => {
            if (data) {
                res.status(statuscode.STATUS_OK).send(data);
            } else {
                res.status(statuscode.STATUS_NOT_FOUND).send("Can not find id");
            }
        })
        .catch(err => {
            res.status(statuscode.STATUS_ERROR).send("error");
        });
};


exports.getNStation = (req, res) => {
    const schemaname = req.params.schemaname;
    const startOffset = req.query.startOffset;
    const numberOfStation = req.query.count;

    station.schema(schemaname).findAll({
        offset: startOffset,
        limit: numberOfStation
    })
        .then(data => {
            res.status(statuscode.STATUS_OK).send(data);
        })
        .catch(err => {
            res.status(statuscode.STATUS_ERROR).send(err);
        });
};

exports.countStation = (req, res) => {
    const schemaname = req.params.schemaname;

    station.schema(schemaname).count()
        .then(count => {
            res.status(statuscode.STATUS_OK).send({ count: count });
        })
        .catch(err => {
            res.status(statuscode.STATUS_ERROR).send(err);
        });
}

exports.getAllStationInProject = (req, res) => {
    const schemaname = req.params.schemaname;
    const projectId = req.query.projectId;

    station.schema(schemaname).findAll({
        where : { projectId: projectId }
    })   
        .then(data => {
            res.status(statuscode.STATUS_OK).send(data);
        })
        .catch(err => {
            res.status(statuscode.STATUS_ERROR).send(err);
        });
}
//station =============================================================
