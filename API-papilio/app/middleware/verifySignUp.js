const db = require("../models");
const ROLES = db.ROLES;
const User = db.usuarios;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  console.log(req.body);
    if(req.body.username==""){
      //el campo usuario esta vacio
      res.status(201).send({
        error: {"username":["El campo de usuario está vacío"]}
      });
      return;
    }
    if(req.body.email==""){
      res.status(201).send({
        error: {"email":["El campo de correo está vacío"]}
      });
      return;
    }
    if(req.body.password==""){
      res.status(201).send({
        error: {"password":["El campo contraseña esá vacío"]}
      });
      return;
    }
    if(req.body.c_password==""){
      res.status(201).send({
        error: {"c_password":["No olvide confirmar la contraseña"]}
      });
      return;
    }

  // Username
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(201).send({
        error: {"username":["Este nombre de usuario ya está en uso"]}
      });
      return;
    }

    if(req.body.password!=req.body.c_password){
      res.status(201).send({
        error: {"password":["La contraseña no coincide"]}
      });
      return;
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(201).send({
          error: {"email":["Este correo electronico ya está en uso"]}
        });
        return;
      }

      next();
    });



  });
};
//revisa si los roles existen (no, todo usuario deberia iniciar como usuario basico)

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          error: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  //checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;