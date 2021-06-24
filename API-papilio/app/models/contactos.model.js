module.exports = (sequelize, Sequelize) => {
    const Contactos = sequelize.define(
        "contactos", {
            id_contacto: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull:false,
                unique:true,
                autoIncrement: true
            },
            nombre: {
                type: Sequelize.STRING,
                allowNull:false,
                unique:false
            },
            correo: {
                type: Sequelize.STRING,
                allowNull:false,
            },
            telefono: {
                type: Sequelize.STRING,
                allowNull:false,
            },
            mensaje: {
                type: Sequelize.TEXT,
                allowNull:false,
            },
            ip: {
                type: Sequelize.STRING,
                allowNull:false,
            },
            estado: {
                type: Sequelize.STRING,
                allowNull:false,
                defaultValue:"1"
            },
        });
    return Contactos;
  };
  