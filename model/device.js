module.exports = (sequelize, Sequelize, model) => {
    const Device = sequelize.define("devices", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      deviceName : {
        type: Sequelize.STRING
      },
      parentId: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.INTEGER
      },
      protocol: {
        type: Sequelize.INTEGER
      },
      deviceType : {
        type: Sequelize.INTEGER
      },
      serialNumber : {
        type: Sequelize.STRING
      },
      createAt : {
        type: Sequelize.DATE
      },
      createBy : {
        type: Sequelize.INTEGER
      },
      startDate: {
        type: Sequelize.DATE
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      deleteAt : {
        type: Sequelize.DATE,
        allowNull: true
      },
      deleteBy : {
        type: Sequelize.INTEGER
      },
      updateAt  : {
        type: Sequelize.DATE,
        allowNull: true
      },
      updateBy  : {
        type: Sequelize.INTEGER
      },
      jsonEnable  : {
        type: Sequelize.BOOLEAN
      },
      key : {
        type: Sequelize.STRING
      },
      description : {
        type: Sequelize.STRING
      }
    },
    {
      timestamps: false 
    });

    // model.station.hasMany(Device);
    // model.project.hasMany(Device);
    // model.indicator.hasMany(Device);

    // Device.belongsTo(model.station);
    // Device.belongsTo(model.project);
    // Device.belongsTo(model.indicator);
  
    return Device;
  };