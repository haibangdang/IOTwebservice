module.exports = (sequelize, Sequelize, model) => {
    const trackingdata = sequelize.define("trackingdata", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      day : {
        type: Sequelize.SMALLINT
      },
      month : {
        type: Sequelize.SMALLINT
      },
      year : {
        type: Sequelize.SMALLINT
      },
      hour : {
        type: Sequelize.SMALLINT
      },
      minute : {
        type: Sequelize.SMALLINT
      },
      seconds : {
        type: Sequelize.SMALLINT
      },
      date  : {
        type: Sequelize.DATE
      },
      value : {
        type: Sequelize.STRING
      },
      deviceId : {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    },
    {
      timestamps: false 
    });

    // trackingdata.belongsTo(model.device);

    // model.device.hasMany(trackingdata);
 
    return trackingdata;
  };