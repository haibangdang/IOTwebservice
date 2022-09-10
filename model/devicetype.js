module.exports = (sequelize, Sequelize, model) => {
    const devicetype = sequelize.define("devicetype", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      typeName : {
        type: Sequelize.STRING
      },
      description : {
        type: Sequelize.STRING
      }
    },
    {
      timestamps: false 
    });

    // model.device.belongsTo(devicetype);
 
    return Device;
  };