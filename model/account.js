module.exports = (sequelize, Sequelize) => {
    const Account = sequelize.define("account", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      accountName: {
        type: Sequelize.STRING
      },
      accountPassword: {
        type: Sequelize.STRING
      },
      projectId: {
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
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
      addressDetail: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      accountType: {
        type: Sequelize.INTEGER
      },
      accountRole: {
        type: Sequelize.INTEGER
      },
      avatar: {
        type: Sequelize.STRING
      }
    },
    {
      timestamps: false 
    });
    
    return Account;
  };