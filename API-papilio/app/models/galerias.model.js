module.exports = (sequelize, Sequelize) => {
    const Galerias = sequelize.define(
        "galerias", {
            id_galeria: {
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
            descripcion: {
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
    return Galerias;
  };
  