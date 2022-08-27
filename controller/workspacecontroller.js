const db = require("../model/database");
const statuscode = require("../config/statuscode");
const workspace = db.workspace;

const account = db.account;
const project = db.project;
const device = db.device;
const station = db.station;
const deviceusage = db.deviceusage;
const trackingdata = db.trackingdata;
const indicator = db.indicator;
const deviceAttribute = db.deviceAttribute;

exports.checkWorkspaceExist = async (workspacename) => {

    return await workspace.findOne({
        where: {
            workspaceName: workspacename
        }
    }).then(data => {
        if (data !== null) {
            return true;
        }
        else {
            return false;
        }
    })
        .catch(err => {
            return false;
        });
};

exports.createWorkSpace = async (req, res) => {

    const workspacename = req.body.workspaceName;

    if (!workspacename) {
        res.status(statuscode.STATUS_ERROR).send("workspace must be not null");
        return;
    }

    const newWorkspace = {
        workspaceName: req.body.workspaceName,
        allowCreateAccount: req.body.allowCreateAccount,
        description: req.body.description
    }

    await db.sequelize.createSchema(workspacename, { ifNotExists: true })
        .then(data => {

            workspace.sync()
                .catch(err => {
                    res.status(statuscode.STATUS_ERROR).send(err.message);
                });

            account.schema(workspacename).sync()
                .catch(err => {
                    res.status(statuscode.STATUS_ERROR).send(err.message);
                });

            project.schema(workspacename).sync()
                .catch(err => {
                    res.status(statuscode.STATUS_ERROR).send(err.message);
                });

            station.schema(workspacename).sync()
                .catch(err => {
                    res.status(statuscode.STATUS_ERROR).send(err.message);
                });
            
            indicator.schema(workspacename).sync()
                .catch(err => {
                    res.status(statuscode.STATUS_ERROR).send(err.message);
                });    

            device.schema(workspacename).sync()
                .catch(err => {
                    res.status(statuscode.STATUS_ERROR).send(err.message);
                });

            deviceAttribute.schema(workspacename).sync()
                .catch(err => {
                    res.status(statuscode.STATUS_ERROR).send(err.message);
                });

            // deviceusage.schema(workspacename).sync()
            //     .catch(err => {
            //         res.status(statuscode.STATUS_ERROR).send(err.message);
            //     });
            trackingdata.schema(workspacename).sync()
            .catch(err => {
                res.status(statuscode.STATUS_ERROR).send(err.message);
            });

        });

    await workspace.create(newWorkspace)
    .then(() =>{
        res.status(statuscode.STATUS_OK).send("ok");
    })
    .catch(err => {
        res.status(statuscode.STATUS_ERROR).send(err.message);
        return;
    });
}


exports.getAllWorkspaceName = async () => {

    let listWorkspace = [];

    const workspaces = await workspace.findAll({
        attributes: [
            'workspaceName'
        ]
    })
    .catch(err => {
        console.log('error');
    });
    
    if (workspaces != undefined) {
        workspaces.forEach(function(value){
            listWorkspace.push(value.workspaceName);
          });
    }

    return listWorkspace;
};