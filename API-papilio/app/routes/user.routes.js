const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

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

  app.post(//VER MENSAJES DEL SISTEMA
    "/api/user/ver_mensajes",
    [authJwt.verifyToken, authJwt.isUser],
    controller.ver_mensajes
  );

  app.get(//DESCARGAR ARCHIVO
    "/api/user/descargar_archivo/:archivo",
    [authJwt.verifyToken, authJwt.isUser],
    controller.descargar_archivo
  );

  //SEGURIDAD
  app.post(//ACTUALIZAR CONTRASEÑA
    "/api/user/actualizar_password",
    [authJwt.verifyToken, authJwt.isUser],
    controller.actualizar_password
  );
  
  app.post(//VER INFORMACION DE PERFIL PERSONAL
    "/api/user/ver_perfil",
    [authJwt.verifyToken, authJwt.isUser],
    controller.ver_perfil
  );
  app.post(//ACTUALIZAR INFORMACION DE PERFIL PERSONAL
    "/api/user/actualizar_perfil",
    [authJwt.verifyToken, authJwt.isUser],
    controller.actualizar_perfil
  );
  
/*
  app.get("/api/test/all/:id", controller.allAccess);

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
  
  //RUTAS DE ADMINISTRACION DE PERFIL
    //RUTA DE NEGOCIOS
  app.post(//VER INFORMACION DEL NEGOCIO
    "/api/usuario/ver_negocio",
    [authJwt.verifyToken, authJwt.isUser],
    controller.ver_negocio
  );
  app.post(//VER TIPOS DE NEGOCIOS
    "/api/usuario/ver_tipos_negocio",
    [authJwt.verifyToken, authJwt.isUser],
    controller.ver_tipos_negocio
  );
  app.post(//CREAR NUEVO NEGOCIO
    "/api/usuario/crear_negocio",
    [authJwt.verifyToken, authJwt.isUser],
    controller.crear_negocio
  );
  app.post(//ACTUALIZAR INFORMACION DEL NEGOCIO
    "/api/usuario/actualizar_negocio",
    [authJwt.verifyToken, authJwt.isUser],
    controller.actualizar_negocio
  );
  app.post(//ELIMINAR NEGOCIO
    "/api/usuario/eliminar_negocio",
    [authJwt.verifyToken, authJwt.isUser],
    controller.eliminar_negocio
  );
  app.post(//ACTUALIZAR IMAGEN DEL NEGOCIO (sobreescribe la imagen anterior con el mismo nombre que ya esta en el servidor)
    "/api/usuario/actualizar_imagen_negocio",
    [authJwt.verifyToken, authJwt.isUser,upload.array('archivos', 12)],
    controller.actualizar_imagen_negocio
  );
  //RUTA DE OFERTAS
  app.post(//VER INFORMACION DE LAS OFERTAS
    "/api/usuario/ver_oferta",
    [authJwt.verifyToken, authJwt.isUser],
    controller.ver_oferta
  );
  app.post(//CREAR NUEVA OFERTA
    "/api/usuario/crear_oferta",
    [authJwt.verifyToken, authJwt.isUser],
    controller.crear_oferta
  );
  
  app.post(//ACTUALIZAR INFORMACION DE LA OFERTA
    "/api/usuario/actualizar_oferta",
    [authJwt.verifyToken, authJwt.isUser],
    controller.actualizar_oferta
  );
  app.post(//ACTUALIZAR IMAGEN DE LA OFERTA (sobreescribe la imagen anterior con el mismo nombre que ya esta en el servidor)
    "/api/usuario/actualizar_imagen_oferta",
    [authJwt.verifyToken, authJwt.isUser,upload.array('archivos', 12)],
    controller.actualizar_imagen_oferta
  );
  app.post(//ELIMINAR OFERTA
    "/api/usuario/eliminar_oferta",
    [authJwt.verifyToken, authJwt.isUser],
    controller.eliminar_oferta
  );

  //RUTA DE PERFIL
  app.post(//actualizar o insertar datos de usuario
    "/api/usuario/actualizar_usuario",
    [authJwt.verifyToken, authJwt.isUser],
    controller.actualizar_usuario
  );

  app.post(//se solicita la informacion personal del usuario indicado por el id
    "/api/usuario/",
    [authJwt.verifyToken, authJwt.isUser],
    controller.userinfo
  );
  
  //RUTA DE TRANSPORTE
  app.post(//VER INFORMACION DEL Transporte
    "/api/usuario/ver_transporte",
    [authJwt.verifyToken, authJwt.isUser],
    controller.ver_transporte
  );
  app.post(//CREAR NUEVO NEGOCIO
    "/api/usuario/crear_transporte",
    [authJwt.verifyToken, authJwt.isUser],
    controller.crear_transporte
  );
  app.post(//ACTUALIZAR INFORMACION DEL TRANSPORTE
    "/api/usuario/actualizar_transporte",
    [authJwt.verifyToken, authJwt.isUser],
    controller.actualizar_transporte
  );
  app.post(//ELIMINAR TRANSPORTE
    "/api/usuario/eliminar_transporte",
    [authJwt.verifyToken, authJwt.isUser],
    controller.eliminar_transporte
  );
  app.post(//ACTUALIZAR IMAGEN DEL NEGOCIO (sobreescribe la imagen anterior con el mismo nombre que ya esta en el servidor)
    "/api/usuario/actualizar_imagen_transporte",
    [authJwt.verifyToken, authJwt.isUser,upload.array('archivos', 12)],
    controller.actualizar_imagen_transporte
  );*/
};