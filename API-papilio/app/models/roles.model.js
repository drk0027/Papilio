module.exports = (sequelize, Sequelize) => {
    const Roles = sequelize.define("roles", {
      id_rol: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      nombre: {
        type: Sequelize.STRING
      }
    });
  
    return Roles;
  };