// const db = require("../model/database");
// const statuscode = require("../config/statuscode");
// const workspace = db.workspace;
// const account = db.account;
// const project = db.project;
// const device = db.device;
// const station = db.station;
// const deviceusage = db.deviceusage;

// exports.testDevice = (req, res) => {
//     const schemaname = req.params.schemaname;
//     const id = req.body.id;

//     db.sequelize.schema(schemaname).query(
//         'SELECT d.*, sgp."stationName", p."projectName" FROM ?/devices d\
//         join DeviceUsages du  on d.id = du.deviceId\
//         join projects p on p.id = du.projectId\
//         join stations sgp on sgp.id = stationID'
//     )
//         .then(data => {
//             res.send(data[0]);
//         });
// }
