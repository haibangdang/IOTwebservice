const db = require("../model/database");
const workspacecontroller = require("../controller/workspacecontroller");
const statuscode = require("../config/statuscode");
const account = db.account;

exports.findById = (req, res) => {
    const id = req.params.id;

    account.findByPk(id, { attributes: ['accountname', 'accountpassword'] })
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

exports.selectprojectaccount = (req, res) => {
    const schemaname = req.params.schemaname;

    const id = req.query.id;

    account.schema(schemaname).findAll({
        attributes: { exclude: ['accountPassword'] },
        where: { projectid: id }
    })
        .then(data => {
            res.status(statuscode.STATUS_OK).send(data);
        })
        .catch(err => {
            res.status(statuscode.STATUS_ERROR).send(err.message);
        });
};



exports.createAccount = async (req, res) => {
    const schemaname = req.params.schemaname;

    if (!await workspacecontroller.checkWorkspaceExist(schemaname)) {
        res.status(statuscode.STATUS_NOT_FOUND).send("Workspace name not found");
        return;
    }

    const newaccount = {
        accountName: req.body.accountName,
        accountPassword: req.body.accountPassword,
        projectId: req.body.projectId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        city: req.body.city,
        district: req.body.district,
        ward: req.body.ward,
        addressDetail: req.body.addressDetail,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        accountType: req.body.accountType,
        accountRole: req.body.accountRole,
        avatar: req.body.avatar
    };

    account.schema(schemaname).create(newaccount)
        .then(data => {
            res.sendStatus(statuscode.STATUS_OK);
        })
        .catch(err => {
            res.status(statuscode.STATUS_ERROR).send(err.message);
        });
};

exports.updateAccount = (req, res) => {
    const schemaname = req.params.schemaname;
    const id = req.body.id;

    if (!id) {
        res.sendStatus(404);
        return;
    }

    account.schema(schemaname).findByPk(id)
        .then(user => {
            Object.assign(user, req.body);
            user.save();
            res.sendStatus(statuscode.STATUS_OK);
        })
        .catch(err => {
            res.status(statuscode.STATUS_ERROR).send(err.message);
        });
};

exports.deleteAccount = (req, res) => {
    const schemaname = req.params.schemaname;
    const id = req.body.id;

    account.schema(schemaname).destroy({
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
            res.send(statuscode.STATUS_ERROR).send(err.message);
        });
};

exports.login = async (req, res) => {
    const schemaname = req.params.schemaname;

    if (!await workspacecontroller.checkWorkspaceExist(schemaname)) {
        res.status(statuscode.STATUS_NOT_FOUND).send("Workspace name not found");
        return;
    }

    account.schema(schemaname).findOne({
        where: {
            accountName: req.body.accountname,
            accountPassword: req.body.accountpassword
        }
    })
        .then(data => {
            res.status(statuscode.STATUS_OK).send(data);
        })
        .catch(err => {
            res.send(statuscode.STATUS_ERROR).send(err.message);
        });

};
