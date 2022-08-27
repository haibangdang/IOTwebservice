const dbConfig = require("../config/dbconfig.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

//sequelize.createSchema('abcaa', {ifNotExists: true });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.workspace = require("./workspace")(sequelize, Sequelize);
db.account = require("./account.js")(sequelize, Sequelize);
db.project = require("./project.js")(sequelize, Sequelize);
db.station = require("./station")(sequelize, Sequelize, db);
db.indicator = require("./indicator")(sequelize, Sequelize);
db.device = require("./device")(sequelize, Sequelize, db);
db.deviceusage = require("./deviceusage")(sequelize, Sequelize, db);
db.trackingdata = require("./trackingdata")(sequelize, Sequelize, db);
db.deviceAttribute = require("./deviceAttribute")(sequelize, Sequelize, db);


module.exports = db;