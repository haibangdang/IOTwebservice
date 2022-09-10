module.exports = (sequelize, Sequelize, model) => {
    const deviceAttribute = sequelize.define("deviceAttribute", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      deviceId : {
        type: Sequelize.INTEGER
      },
      name : {
        type: Sequelize.STRING
      },
      jsonExtraction : {
        type: Sequelize.STRING
      }
    },
    {
      timestamps: false 
    });

    // model.device.hasMany(deviceAttribute);

    // deviceAttribute.belongsTo(model.device);
 
    return deviceAttribute;
  };