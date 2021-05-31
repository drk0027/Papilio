//en inicio va todo lo relacionado con comercio directo, comercios locales, transporte y perfil publico
//todas las operaciones en inicio no requieren de tener sesion iniciada, son para los usuarios invitados y los registrados.

const { authJwt } = require("../middleware");
const controller = require("../controllers/admin.controller");

const multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})
const upload = multer({ storage: storage })
var fs = require('fs');

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  /*
    Todas las funciones realizadas por un usuario con rol admin deberan ser realizadas aqui
    funciones equivalentes a las aqui realizadas pero que no requieran rol de admin deberan ser realizadas en sus respetivas llamadas de APIs
  */


  //Configuracion del sistema
  app.post(//VER TODAS LAS CONFIGURACIONES DEL SISTEMA
    "/api/admin/ver_sistema",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.ver_sistema
  );

  app.post(//VER TODAS LAS CONFIGURACIONES DEL SISTEMA
    "/api/admin/actualizar_sistema",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.actualizar_sistema
  );
  
};