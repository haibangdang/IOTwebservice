module.exports = (sequelize, Sequelize, model) => {
    const deviceusage = sequelize.define("deviceusage", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: true
      }

    },
    {
      timestamps: false 
    });

    model.station.hasMany(deviceusage);
    model.device.hasMany(deviceusage);
    model.project.hasMany(deviceusage);
    deviceusage.belongsTo(model.station);
    deviceusage.belongsTo(model.device);
    deviceusage.belongsTo(model.project);
  
    return deviceusage;
  };