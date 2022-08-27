module.exports = (sequelize, Sequelize) => {
    const indicator = sequelize.define("indicator", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name : {
        type: Sequelize.STRING
      },
      unitType : {
        type: Sequelize.INTEGER
      },
      minValue : {
        type: Sequelize.DOUBLE
      },
      maxValue : {
        type: Sequelize.DOUBLE
      },
      threshold : {
        type: Sequelize.DOUBLE
      },
      valueType : {
        type: Sequelize.STRING
      },
      argument : {
        type: Sequelize.STRING
      }
    },
    {
      timestamps: false 
    });
  
    return indicator;
  };