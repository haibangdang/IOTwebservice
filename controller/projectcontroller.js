const db = require("../model/database");
const statuscode = require("../config/statuscode");
const project = db.project;

//project ==============================================================
exports.createProject = (req, res) => {
    const schemaname = req.params.schemaname;

    const newproject = {
        // customerId: req.body.customerId,
        // salePersonId: req.body.salePersonId,
        // projectName: req.body.projectName,
        // createAt: req.body.createAt,
        // createBy: req.body.createBy,
        // deleteAt: req.body.deleteAt,
        // deleteBy: req.body.deleteBy,
        // updateAt: req.body.updateAt,
        // updateBy: req.body.updateBy,
        // startDate: req.body.startDate,
        // endDate: req.body.endDate,
        // city: req.body.city,
        // district: req.body.district,
        // ward: req.body.ward,
        // longitude: req.body.longitude,
        // latitude: req.body.latitude,
        // addressDetail: req.body.addressDetail,
        // fileAttached: req.body.fileAttached,
        // decription: req.body.decription

        projectName: req.body.projectName,
        addressDetail: req.body.addressDetail,
        description: req.body.description,
        createdBy: req.body.createdBy
    };

    project.schema(schemaname).create(newproject)
        .then(data => {
            res.status(statuscode.STATUS_OK).send({ id: data.id });
        })
        .catch(err => {
            res.status(statuscode.STATUS_ERROR).send(err.message);
        });
};

exports.updateProject = (req, res) => {
    const schemaname = req.params.schemaname;
    const id = req.body.id;

    if (!id) {
        res.sendStatus(statuscode.STATUS_NOT_FOUND);
        return;
    }

    project.schema(schemaname).findByPk(id)
        .then(projectinfo => {
            Object.assign(projectinfo, req.body);
            projectinfo.save();
            res.sendStatus(statuscode.STATUS_OK);
        })
        .catch(err => {
            res.send(statuscode.STATUS_ERROR).send(err.message);
        });
};

exports.deleteProject = (req, res) => {
    const schemaname = req.params.schemaname;
    const id = req.body.id;

    project.schema(schemaname).destroy({
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

exports.findProjectById = (req, res) => {
    const schemaname = req.params.schemaname;
    const id = req.query.id;

    project.schema(schemaname).findByPk(id)
        .then(data => {
            if (data) {
                res.status(statuscode.STATUS_OK).send(data);
            } else {
                res.status(statuscode.STATUS_NOT_FOUND).send("Can not find id");
            }
        })
        .catch(err => {
            res.status(statuscode.STATUS_ERROR).send(err.message);
        });
};

exports.getNProject = (req, res) => {
    const startOffset = req.query.startOffset;
    const numberOfPProject = req.query.count;
    const schemaname = req.params.schemaname;

    project.schema(schemaname).findAll({
        offset: startOffset,
        limit: numberOfPProject
    })
        .then(data => {
            res.status(statuscode.STATUS_OK).send(data);
        })
        .catch(err => {
            res.status(statuscode.STATUS_ERROR).send(err);
        });
}

exports.countProject = (req, res) => {
    const schemaname = req.params.schemaname;

    project.schema(schemaname).count()
        .then(count => {
            res.status(statuscode.STATUS_OK).send({ count: count });
        })
        .catch(err => {
            res.status(statuscode.STATUS_ERROR).send(err);
        });
}

exports.getAllProjectInfo = (req, res) => {
    const schemaname = req.params.schemaname;

    project.schema(schemaname).findAll()
        .then(data => {
            res.status(statuscode.STATUS_OK).send(data);
        })
        .catch(err => {
            res.status(statuscode.STATUS_ERROR).send(err);
        });
}
//project ==============================================================
