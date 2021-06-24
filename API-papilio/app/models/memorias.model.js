module.exports = (sequelize, Sequelize) => {
    const Memorias = sequelize.define(
        "memorias", {
            id_memoria: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull:false,
                unique:true,
                autoIncrement: true
            },
            slug: {
                type: Sequelize.STRING,
                allowNull:false,
                unique:true
            },
            nombres: {
                type: Sequelize.STRING,
                allowNull:true,
                unique:false
            },
            apellidos: {
                type: Sequelize.STRING,
                allowNull:true,
                unique:false
            },
            contenido: {
                type: Sequelize.TEXT,
                allowNull:false,
            },
            fecha_nacimiento: {
                type: Sequelize.DATE,
                allowNull:false,
            },
            fecha_muerte: {
                type: Sequelize.DATE,
                allowNull:false,
            },
           
        });
    return Memorias;
  };
  