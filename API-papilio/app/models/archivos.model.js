module.exports = (sequelize, Sequelize) => {
    const Archivos = sequelize.define(
        "archivos", {
            id_archivo: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull:false,
                unique:true,
                autoIncrement: true
            },
            nombre: {
                type: Sequelize.STRING,
                allowNull:true,
                unique:false
            },
            nombre_original: {
                type: Sequelize.STRING,
                allowNull:true,
                unique:false
            },
            descripcion: {
                type: Sequelize.TEXT,
                allowNull:false,
            },
            ext: {
                type: Sequelize.STRING,
                allowNull:true,
            },
            size:{
                type: Sequelize.STRING,
                allowNull:true,
            },
            estado:{
                type: Sequelize.STRING,
                allowNull:true,
            }
            
        });
    return Archivos;
  };
  