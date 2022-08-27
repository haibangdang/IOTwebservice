module.exports = (sequelize, Sequelize, model) => {
    const Station = sequelize.define("station", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      stationName: {
        type: Sequelize.STRING
      },
      createAt: {
        type: Sequelize.DATE
      },
      createBy: {
        type: Sequelize.INTEGER
      },
      startDate: {
        type: Sequelize.DATE
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      deleteAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      deleteBy: {
        type: Sequelize.INTEGER
      },
      updateAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      updateBy: {
        type: Sequelize.INTEGER
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      balance: {
        type: Sequelize.STRING
      },
      expiredDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      qualityScore: {
        type: Sequelize.INTEGER
      },
      city: {
        type: Sequelize.STRING
      },
      district: {
        type: Sequelize.STRING
      },
      ward: {
        type: Sequelize.STRING
      },
      longitude: {
        type: Sequelize.FLOAT
      },
      latitude: {
        type: Sequelize.FLOAT
      },
      addressDetail: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      }
    },
    {
      timestamps: false 
    });

    model.project.hasMany(Station);
    Station.belongsTo(model.project);
  
    return Station;
};