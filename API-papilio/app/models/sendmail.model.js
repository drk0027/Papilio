module.exports = (sequelize, Sequelize) => {
    const Sendmail = sequelize.define(
        "sendmails", {
            id_sendmail: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull:false,
                unique:true,
                autoIncrement: true
            },
            host: {
                type: Sequelize.STRING,
                allowNull:false,
                unique:true
            },
            port: {
                type: Sequelize.STRING,
                allowNull:false,
            },
            user: {
                type: Sequelize.STRING,
                allowNull:false,
            },
            pass: {
                type: Sequelize.STRING,
                allowNull:false,
            },
            mensaje_registro: {
                type: Sequelize.TEXT,
                allowNull:false,
            },
            mensaje_general: {
                type: Sequelize.TEXT,
                allowNull:true,
            },
        });
    return Sendmail;
  };
  