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
    //console.log(file.originalname.split("."))
    //console.log(file.originalname.split(".").length)
    //console.log(file.originalname.split(".")[parseInt(file.originalname.split(".").length)-1])
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix+"."+file.originalname.split(".")[parseInt(file.originalname.split(".").length)-1])
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


  //CONFIGURACION DEL SISTEMA
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

  //INFORMACION DE CONTACTO
  app.post(//VER SOLICITUD DE CONTACTO
    "/api/admin/ver_solicitud_contacto",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.ver_solicitud_contacto
  );
  app.post(//ELIMINAR SOLICITUD DE CONTACTO
    "/api/admin/eliminar_solicitud_contacto",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.eliminar_solicitud_contacto
  );

  //SEGURIDAD
  app.post(//ELIMINAR SOLICITUD DE CONTACTO
    "/api/admin/actualizar_password",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.actualizar_password
  );  
  app.post(//VER LISTA DE CUENTAS DE USUARIO
    "/api/admin/ver_cuentas",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.ver_cuentas
  );
  app.post(//CREAR NUEVAS CUENTAS DE USUARIO
    "/api/admin/crear_cuenta",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.crear_cuenta
  );
  app.post(//ACTUALIZAR CUENTAS DE USUARIO
    "/api/admin/actualizar_cuenta",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.actualizar_cuenta
  );
  app.post(//ELIMINAR CUENTAS DE USUARIO
    "/api/admin/eliminar_cuenta",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.eliminar_cuenta
  );


  //AJUSTES DE ENVIOS DE CORREOS
  app.post(//LEER AJUSTES DE ENVIOS DE CORREOS
    "/api/admin/ver_confsendmail",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.ver_confsendmail
  );
  app.post(//ACTUALIZAR AJUSTES DE ENVIOS DE CORREOS
    "/api/admin/actualizar_confsendmail",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.actualizar_confsendmail
  );

  //GESTION DE MENSAJES
  app.post(//ENVIAR UN MENSAJE A UN USUARIO
    "/api/admin/enviar_mensaje",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.enviar_mensaje
  );

  //GESTION DE ARCHIVOS
  app.post(//ENVIAR UN MENSAJE A UN USUARIO
    "/api/admin/guardar_archivos",
    [authJwt.verifyToken, authJwt.isAdmin,upload.array('archivos', 12)],
    controller.guardar_archivos
  );

  //GESTION DE MEMORIAL
  app.post(//VER LISTA DE MEMORIAS
    "/api/admin/ver_memorias",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.ver_memorias
  );
  app.post(//CREAR MEMORIA
    "/api/admin/crear_memoria",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.crear_memoria
  );
  app.post(//ACTUALIZAR MEMORIA
    "/api/admin/actualizar_memoria",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.actualizar_memoria
  );
  app.post(//ELIMINAR MEMORIA
    "/api/admin/eliminar_memoria",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.eliminar_memoria
  );
  app.post(//GUARDAR FOTO
    "/api/admin/guardar_foto",
    [authJwt.verifyToken, authJwt.isAdmin,upload.array('archivos', 12)],
    controller.guardar_foto
  );
  
};