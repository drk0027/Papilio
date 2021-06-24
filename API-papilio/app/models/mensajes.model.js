module.exports = (sequelize, Sequelize) => {
    const Mensajes = sequelize.define(
        "mensajes", {
            id_mensaje: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull:false,
                unique:true,
                autoIncrement: true
            },
            asunto: {
                type: Sequelize.STRING,
                allowNull:true,
                unique:false
            },
            contenido: {
                type: Sequelize.TEXT,
                allowNull:false,
            },
            adjuntos: {
                type: Sequelize.TEXT,
                allowNull:true,
            },
            etiquetas:{
                type: Sequelize.TEXT,
                allowNull:true,
            },
            estado:{
                type: Sequelize.STRING,
                allowNull:true,
            }
            
        });
    return Mensajes;
  };
  