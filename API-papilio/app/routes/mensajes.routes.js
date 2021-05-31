const { authJwt } = require("../middleware");
const controller = require("../controllers/mensajes.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/mensajes/ultimos/:cantidad", controller.ultimos); //ultimos tantos mensajes por usuario y canal

/*
  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );
    */
};