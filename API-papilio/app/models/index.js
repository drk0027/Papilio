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
db.sendmail = require("./sendmail.model.js")(sequelize, Sequelize);
db.archivos = require("./archivos.model.js")(sequelize, Sequelize);
db.mensajes = require("./mensajes.model.js")(sequelize, Sequelize);
db.galerias = require("./galerias.model.js")(sequelize, Sequelize);
db.memorias = require("./memorias.model.js")(sequelize, Sequelize);
db.fotos = require("./fotos.model.js")(sequelize, Sequelize);

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
}, { onDelete: 'cascade' });
db.usuarios.belongsToMany(db.roles, {
  through: "rol_usuario",
  foreignKey: "id_usuario",
  otherKey: "id_rol"
}, { onDelete: 'cascade' });

//mensajes pertenecen a un usuario
db.mensajes.belongsTo(db.usuarios,{
  foreignKey: 'id_usuario',
}, { onDelete: 'cascade' });

//archivos pertenecen a un usuario
db.archivos.belongsTo(db.usuarios,{
  foreignKey: 'id_usuario',
}, { onDelete: 'cascade' });

//archivos pertenecen a un mensaje
db.mensajes.belongsTo(db.archivos,{
  foreignKey: 'id_archivo',
}, { onDelete: 'cascade' });

//galerias pertenece a memorias
db.memorias.belongsTo(db.galerias,{
  foreignKey: 'id_galeria',
}, { onDelete: 'cascade' });
//usuarios pertenece a memorias
db.memorias.belongsTo(db.usuarios,{
  foreignKey: 'id_usuario',
}, { onDelete: 'cascade' });
//fotos pertenece a memorias
db.memorias.belongsTo(db.fotos,{
  foreignKey: 'id_foto',
}, { onDelete: 'cascade' });

//foto-galeria
db.galerias.belongsToMany(db.fotos, {
  through: "fotos_galerias",
  foreignKey: "id_galerias",
  otherKey: "id_fotos"
}, { onDelete: 'cascade' });
db.fotos.belongsToMany(db.galerias, {
  through: "fotos_galerias",
  foreignKey: "id_fotos",
  otherKey: "id_galeria"
}, { onDelete: 'cascade' });

db.ROLES = ["Usuario", "Admin", "Moderador"];

module.exports = db;