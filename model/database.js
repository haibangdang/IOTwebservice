const dbConfig = require("../config/dbconfig.js");
const Sequelize = require("sequelize");

// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//   host: dbConfig.HOST,
//   dialect: dbConfig.dialect,

//   pool: {
//     max: dbConfig.pool.max,
//     min: dbConfig.pool.min,
//     acquire: dbConfig.pool.acquire,
//     idle: dbConfig.pool.idle
//   }
// });

// const sequelize = new Sequelize("postgres://cwopzfjpugaekz:6de8743afcf26594ca239d8974ee2dc1244243e8cb4de0554f0851e3141371f6@ec2-54-157-79-121.compute-1.amazonaws.com:5432/ded1b1kursclcg")


const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
      ssl: true
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