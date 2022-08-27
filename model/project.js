module.exports = (sequelize, Sequelize) => {
  const Project = sequelize.define("project", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    customerId: {
      type: Sequelize.INTEGER
    },
    salePersonId: {
      type: Sequelize.INTEGER
    },
    projectName: {
      type: Sequelize.STRING
    },
    createAt: {
      type: Sequelize.DATE
    },
    createBy: {
      type: Sequelize.INTEGER
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
    startDate: {
      type: Sequelize.DATE
    },
    endDate: {
      type: Sequelize.DATE,
      allowNull: true
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
    fileAttached: {
      type: Sequelize.STRING
    },
    decription: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false 
  });

  return Project;
};