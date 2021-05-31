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
            email: {
                type: Sequelize.STRING,
                allowNull:true,
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
            fecha_ultimo_mensaje: {
                type: Sequelize.DATE,
                allowNull:false,
                defaultValue: Sequelize.NOW,
            },
            fecha_descubrimiento: {
                type: Sequelize.DATE(3),
                defaultValue: Sequelize.NOW,
            },
            palabras: {
                type: Sequelize.INTEGER,
                allowNull:false,
                defaultValue: "0",
            },
            contador_mensajes: {
                type: Sequelize.INTEGER,
                allowNull:false,
                defaultValue: "1"
            },
        });
    return Usuarios;
  };
  