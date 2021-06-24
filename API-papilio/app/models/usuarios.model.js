module.exports = (sequelize, Sequelize) => {
    const Usuarios = sequelize.define(
        "usuarios", {
            id_usuario: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull:false,
                unique:true,
                autoIncrement: true
            },
            codigo_usuario: {
                type: Sequelize.STRING,
                allowNull:true,
                unique:true
            },
            nombre_usuario: {
                type: Sequelize.STRING,
                allowNull:false,
            },
            username: {
                type: Sequelize.STRING,
                allowNull:true,
            },
            nombres: {
                type: Sequelize.STRING,
                allowNull:true,
            },
            apellidos: {
                type: Sequelize.STRING,
                allowNull:true,
            },
            cedula: {
                type: Sequelize.STRING,
                allowNull:true,
            },
            email: {
                type: Sequelize.STRING,
                allowNull:true,
                unique:true,
            },
            email2: {
                type: Sequelize.STRING,
                allowNull:true,
            },
            direccion1: {
                type: Sequelize.STRING,
                allowNull:true,
            },
            direccion2: {
                type: Sequelize.STRING,
                allowNull:true,
            },
            telefono1: {
                type: Sequelize.STRING,
                allowNull:true,
            },
            telefono2: {
                type: Sequelize.STRING,
                allowNull:true,
            },
            password: {
                type: Sequelize.STRING,
                allowNull:true,
            },
        });
    return Usuarios;
  };
  