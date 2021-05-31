//en inicio va todo lo relacionado con comercio directo, comercios locales, transporte y perfil publico
//todas las operaciones en inicio no requieren de tener sesion iniciada, son para los usuarios invitados y los registrados.

const { authJwt } = require("../middleware");
const controller = require("../controllers/inicio.controller");

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

  //RUTAS DE PORTADA
    //RUTA DE INICIO
  
  app.post(//VER TODOS LOS PRODUCTOS Y SERVICIOS EN PORTADA 
    "/api/inicio/ver_ofertas",
    controller.ver_ofertas
  );
  
  app.post(//VER TODOS LOS PRODUCTOS Y SERVICIOS EN PORTADA 
    "/api/inicio/ver_negocios",
    controller.ver_negocios
  );

  //RUTA DE COMERCIO
  //VER CARRITO
  app.post(//VER TODOS LOS PRODUCTOS Y SERVICIOS EN PORTADA 
    "/api/inicio/ver_carrito",
    [authJwt.verifyToken, authJwt.isUser],
    controller.ver_carrito
  );

  //ACTUALIZAR CARRITO
  app.post(//VER TODOS LOS PRODUCTOS Y SERVICIOS EN PORTADA 
    "/api/inicio/actualizar_carrito",
    [authJwt.verifyToken, authJwt.isUser],
    controller.actualizar_carrito
  );

  //ELIMINAR CARRITO?
  app.post(//VER TODOS LOS PRODUCTOS Y SERVICIOS EN PORTADA 
    "/api/inicio/eliminar_carrito",
    [authJwt.verifyToken, authJwt.isUser],
    controller.eliminar_carrito
  );
  
  //CONFIRMAR ORDEN
  app.post(//VER TODOS LOS PRODUCTOS Y SERVICIOS EN PORTADA 
    "/api/inicio/confirmar_orden",
    [authJwt.verifyToken, authJwt.isUser],
    controller.confirmar_orden
  );
  //VER ORDENES
  app.post(
    "/api/inicio/ver_ordenes",
    [authJwt.verifyToken, authJwt.isUser],
    controller.ver_ordenes
  );
  //VER PEDIDOS
  app.post(
    "/api/inicio/ver_pedidos",
    [authJwt.verifyToken, authJwt.isUser],
    controller.ver_pedidos
  );
  //ACTUALIZAR PEDIDOS
  app.post(
    "/api/inicio/actualizar_pedidos",
    [authJwt.verifyToken, authJwt.isUser],
    controller.actualizar_pedidos
  );
  //VER TRANSPORTES
  app.post(
    "/api/inicio/ver_transportes",
    controller.ver_transportes
  );
};