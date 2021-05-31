const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//db.user = require("./user.model.js")(sequelize, Sequelize);
db.roles = require("./roles.model.js")(sequelize, Sequelize);
db.usuarios = require("./usuarios.model.js")(sequelize, Sequelize);
db.sistemas = require("./sistemas.model.js")(sequelize, Sequelize);
db.contactos = require("./contactos.model.js")(sequelize, Sequelize);

/* db.tiendas = require("./tiendas.model.js")(sequelize, Sequelize);
db.formas_de_pago = require("./formas_de_pago.model.js")(sequelize, Sequelize);
db.tipos_tienda = require("./tipos_tienda.model.js")(sequelize, Sequelize);
db.comentarios = require("./comentarios.model.js")(sequelize, Sequelize);
db.ofertas = require("./ofertas.model.js")(sequelize, Sequelize);
db.solicitudes = require("./solicitudes.model.js")(sequelize, Sequelize);
db.carritos = require("./carritos.model.js")(sequelize, Sequelize);
db.ordenes = require("./ordenes.model.js")(sequelize, Sequelize);
db.respuestas = require("./respuestas.model.js")(sequelize, Sequelize);
db.transportes = require("./transportes.model.js")(sequelize, Sequelize); */

db.roles.belongsToMany(db.usuarios, {
  through: "rol_usuario",
  foreignKey: "id_rol",
  otherKey: "id_usuario"
});
db.usuarios.belongsToMany(db.roles, {
  through: "rol_usuario",
  foreignKey: "id_usuario",
  otherKey: "id_rol"
});

/*
//Transportes <- Usuario : Cada usuario puede crear un nuevo transporte
db.transportes.belongsTo(db.usuarios,{
  foreignKey: 'id_usuario',
});

//Tienda <- Usuario : cada tienda tiene un solo usuario propietario
db.tiendas.belongsTo(db.usuarios,{
  foreignKey: 'id_usuario'
});

//Tienda <- tienda_forma_pago -> Forma de pago : cada tienda puede tener varias formas de pago
db.tiendas.belongsToMany(db.formas_de_pago, {
  through: "tienda_forma_pago",
  foreignKey: "id_tienda",
  otherKey: "id_forma_de_pago"
});
db.formas_de_pago.belongsToMany(db.tiendas, {
  through: "tienda_forma_pago",
  foreignKey: "id_forma_de_pago",
  otherKey: "id_tienda"
});

//Tienda <- Tipo_tienda : cada tienda solo tiene un tipo de tienda, indicando si es un bazar, un pequeño local, mini mercado y asi
db.tiendas.belongsTo(db.tipos_tienda,{
  foreignKey: 'id_tipo_tienda'
});

//Carritos <- Oferta <- Usuario : cada carrito posee solo quien hizo la compra, que compró y que cantidad compró
db.carritos.belongsTo(db.usuarios,{
  foreignKey: 'id_usuario',
});

db.carritos.belongsTo(db.ofertas,{
  foreignKey: 'id_oferta',
});

//Ordenes <- Oferta <- Usuario <- Negocio : Cada orden posee el negocio a quien corresponde la orden, quien realizo la orden , que compró y cuanto compró
db.ordenes.belongsTo(db.usuarios,{
  foreignKey: 'id_usuario',
});

db.ordenes.belongsTo(db.ofertas,{
  foreignKey: 'id_oferta',
});

//Solicitudes <- Usuario: Cada solicitud pertenece a un usuario, las demandas deben ser respondidas por acuerdos internos y marcadas como completadas
db.solicitudes.belongsTo(db.usuarios,{
  foreignKey: 'id_usuario',
});

//Respuestas <- Demanda <- Usuario: Cada respuesta pertenece a una demanda y pertenece a un usuario
db.respuestas.belongsTo(db.usuarios,{
  foreignKey: 'id_usuario',
});

db.respuestas.belongsTo(db.solicitudes,{
  foreignKey: 'id_demanda',
});

//Tienda <- comentario_tienda -> Comentarios : cada tienda puede tener un comentario por usuario
db.tiendas.belongsToMany(db.comentarios, {
  through: "comentarios_tienda",
  foreignKey: "id_tienda",
  otherKey: "id_comentario"
});
db.comentarios.belongsToMany(db.tiendas, {
  through: "comentarios_tienda",
  foreignKey: "id_comentario",
  otherKey: "id_tienda"
});

//ofertas <- Tienda : cada oferta pertenece a una tienda
db.ofertas.belongsTo(db.tiendas,{
  foreignKey: 'id_tienda'
});

/*
//Productos <- Tienda : cada producto pertenece a una tienda
db.productos.belongsTo(db.tiendas,{
  foreignKey: 'id_tienda'
});

//Servicios <- Tienda : cada servicio pertenece a una tienda
db.servicios.belongsTo(db.tiendas,{
  foreignKey: 'id_tienda'
});

*/

db.ROLES = ["Usuario", "Admin", "Moderador"];

module.exports = db;