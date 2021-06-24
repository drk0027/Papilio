module.exports = (sequelize, Sequelize) => {
    const Fotos = sequelize.define(
        "fotos", {
            id_foto: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull:false,
                unique:true,
                autoIncrement: true
            },
            slug: {
                type: Sequelize.STRING,
                allowNull:true,
                unique:false
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
                allowNull:true,
                unique:false
            },
            ext: {
                type: Sequelize.STRING,
                allowNull:true,
                unique:false
            },
            size: {
                type: Sequelize.STRING,
                allowNull:true,
                unique:false
            },
            estado:{
                type: Sequelize.STRING,
                allowNull:false,
                defaultValue:1
            }
            
        });
    return Fotos;
  };
  