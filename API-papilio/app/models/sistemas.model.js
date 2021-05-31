module.exports = (sequelize, Sequelize) => {
    const Sistema = sequelize.define(
        "sistemas", {
            id_sistema: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull:false,
                unique:true,
                autoIncrement: true
            },
            nombre_empresa: {
                type: Sequelize.STRING,
                allowNull:false,
                unique:true
            },
            nombres_propietario: {
                type: Sequelize.STRING,
                allowNull:false,
            },
            apellidos_propietario: {
                type: Sequelize.STRING,
                allowNull:false,
            },
            telefono1: {
                type: Sequelize.STRING,
                allowNull:false,
            },
            telefono2: {
                type: Sequelize.STRING,
                allowNull:true,
            },
            correo1: {
                type: Sequelize.STRING,
                allowNull:false,
            },
            correo2: {
                type: Sequelize.STRING,
                allowNull:true,
            },
            direccion: {
                type: Sequelize.STRING,
                allowNull:false,
            },
            lat: {
                type: Sequelize.INTEGER,
                allowNull:true,
            },
            long: {
                type: Sequelize.INTEGER,
                allowNull:true,
            },
            descripcion: {
                type: Sequelize.TEXT,
                allowNull:true,
                defaultValue: Sequelize.NOW,
            },
        });
    return Sistema;
  };
  