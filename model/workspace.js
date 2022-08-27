module.exports = (sequelize, Sequelize) => {
    const Workspace = sequelize.define("workspace", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        workspaceName: {
            type: Sequelize.STRING
        },
        allowCreateAccount: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        description: {
            type: Sequelize.STRING
        }
    },
    {
      timestamps: false 
    });

    return Workspace;
};