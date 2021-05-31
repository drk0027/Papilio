const db = require("../models");
const usuarios = db.usuarios;
const chalk = require('chalk');

//MODELOS DE TIENDAS
const tiendas = db.tiendas;
const tipos_tienda = db.tipos_tienda;
//MODELOS DE OFERTA
const ofertas = db.ofertas;
//MODELOS DE TRANSPORTE
const transportes = db.transportes

const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
var fs = require('fs');

exports.allAccess = (req, res) => {
    //res.status(200).send("por esta salida pueden ver lo que sea los usuarios");
    const id = req.params.id;
    //console.log(req.params.id);

    usuario.findAll()
    .then(
      data => {
        res.send(data);
      }
    )
  };
  
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

//CONTROLADORES DE PERFIL DE USUARIO
//ACTUALIZAR INFORMACION DE PERFIL DE USUARIO
exports.actualizar_usuario = (req, res) => {//el usuario solo puede ver informacion sobre si mismo 
  console.log(chalk.red("CONTORLADOR DE ACTUALIZAR INFORMACION DE USUARIO"))

  jwt.verify(req.headers['x-access-token'], config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    //console.log(decoded)
    id_usuario = decoded.id;
    //next();
  });
  console.log(req.body.columnas.split("|")[2])
  usuarios.update({ 
      email2: req.body.columnas.split("|")[0],
      telefono1: req.body.columnas.split("|")[1],
      telefono2: req.body.columnas.split("|")[2],
      direccion1: req.body.columnas.split("|")[3] 
    }, {
    where: {
      id_usuario: id_usuario
    }
  }).then(
    data=>{
      res.status(200).send({success:data})
    }
  )
  ;

};
//VER INFORMACION DE PERFIL DE USUARIO
exports.userinfo = (req, res) => {//el usuario solo puede ver informacion sobre si mismo 
  //console.log(req.headers['x-access-token'])

  jwt.verify(req.headers['x-access-token'], config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    //console.log(decoded)
    id_usuario = decoded.id;
    //next();
  });


  //console.log(res)
  usuarios.findAll({
    attributes:[
      "nombre_usuario",
      "email",
      "email2",
      "telefono1",
      "telefono2",
      "direccion1",
      "direccion2",
      "createdAt"
    ],
    where:{
      id_usuario:id_usuario
    }
  })
    .then(
      data => {
        //console.log(data)
        //data={"success":data}
        res.status(200).send({success:data});
      }
    )

  //res.status(200).send("informacion personal del usuario.");
};
//CONTROLADORES DE NEGOCIO
//CREAR NEGOCIO
exports.crear_negocio = (req, res) => {//el usuario solo puede ver informacion sobre si mismo 
  console.log("CONTROLADOR CREAR NEGOCIO")
  jwt.verify(req.headers['x-access-token'], config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    //console.log(decoded)
    id_usuario = decoded.id;
    //next();
  });

  
  let date_ob = new Date();

  const crypto = require('crypto')
  var timestamp = new Date().getTime();
  //console.log(timestamp.toString(10))
  nombre_archivo=crypto.createHash('md5').update(timestamp.toString(10)).digest("hex");
  //copiar imagen temporal con el nombre definitivo
  fs.createReadStream("./uploads/tienda_predeterminada.png").pipe(fs.createWriteStream("./uploads/"+nombre_archivo+".png"));
  //console.log(nombre_archivo)
  //console.log("./uploads/"+nombre_archivo+".png")
  //console.log(req.body.columnas.split("|"))
  tiendas.create({ 
    nombre: req.body.columnas.split("|")[0],
    descripcion: req.body.columnas.split("|")[1],
    direccion: req.body.columnas.split("|")[2],
    telefono1: req.body.columnas.split("|")[3],
    telefono2: req.body.columnas.split("|")[4],
    correo1: req.body.columnas.split("|")[5],
    correo2: req.body.columnas.split("|")[6],
    img: nombre_archivo+".png",
    estado_validacion:"Sin Validacion",
    estado:"Activo",
    id_usuario: id_usuario,
    id_tipo_tienda: req.body.columnas.split("|")[7],
    }
  ).then(
    data=>{
      //esta salida devuelve los datos pertenecientes al ultimo ingreso, de esta manera, es posible hacer un update para guardar la imagen luego usando otro protoculo
      //console.log("resultado:" +data)
      res.status(200).send({success:data});
    }
  ).catch(function (err) {
    // handle error;
    //console.log(err)
    res.status(200).send({error:err});
  });
};
//ACTUALIZAR IMAGEN NEGOCIO
exports.actualizar_imagen_negocio = (req, res) => {//actualizar imagenes para el negocio seleccionado
  console.log("CONTROLADOR ACTUALIZAR_IMAGEN_NEGOCIO")
  jwt.verify(req.headers['x-access-token'], config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    //console.log(decoded)
    id_usuario = decoded.id;
    //next();
  });
  //console.log(req.files)
  //console.log('Body- ' + JSON.stringify(req.body));
  

  //establecer si el formato de la imagen es el correcto
  //console.log("el archivo es de tipo " +req.files[0].mimetype.split("/")[0] + " y tiene la extension "+req.files[0].originalname.split(".")[req.files[0].originalname.split(".").length-1])
  //console.log(req.files.length)
  if(req.files.length>0){
    if(req.files[0].mimetype.split("/")[0]=='image'){
      //borramos la imagen temporal
      try {
        //console.log("./uploads/"+ req.body.img)
        fs.unlinkSync("./uploads/"+ req.body.img)
      } catch(err) {
        //console.error(err)
        res.status(200).send({error:"No se pudo eliminar la imagen"})
      }
      //copiamos la imagen nueva con el nombre temporal
      try{
        /*console.log("++++++++++++++++++++++++++++")
        console.log(req.body.img.split(".")[0])
        console.log(req.files[0].originalname.split("."))
        console.log(req.files[0].originalname.split(".")[req.files[0].originalname.split(".").length-1])
        console.log(req.files[0].path)
        console.log("++++++++++++++++++++++++++++")
        */ 
        fs.createReadStream(req.files[0].path).pipe(fs.createWriteStream(req.files[0].destination+"/"+req.body.img.split(".")[0]+"."+req.files[0].originalname.split(".")[req.files[0].originalname.split(".").length-1]))
      }catch(err) {
        console.error(err)
      }
      //eliminamos la imagen original
      try {
        fs.unlinkSync(req.files[0].path)
      } catch(err) {
        console.error(err)
      }
      //ahora hay que actualizar el campo en la base de datos para anunciar que la imagen ya existe
      //req.body.img+"."+req.files[0].originalname.split(".")[req.files[0].originalname.split(".").length-1]) nombre del archivo en la base de datos
      let nueva_imagen=req.body.img.split(".")[0]+"."+req.files[0].originalname.split(".")[req.files[0].originalname.split(".").length-1]
      tiendas.update({ 
        img: nueva_imagen
      }, {
      where: {
          id_tienda: req.body.id_tienda
        }
      }).then(
        data=>{
          console.log("he guardado los datos")
        }
      );

      return res.status(200).send({success:"imagen cargada correctamente"})
    }else{
      try {
        fs.unlinkSync(req.files[0].path)
      } catch(err) {
        console.error(err)
      }
      return res.status(200).send({error:"el archivo no era una imagen"})
    }
  }
  
  res.status(200).send({success:"imagen actualizada exitosamente"});
};
//ELIMINAR NEGOCIO
exports.eliminar_negocio = (req, res) => {//el usuario solo puede ver informacion sobre si mismo 
  console.log("CONTROLADOR ELIMINAR_NEGOCIO")

  jwt.verify(req.headers['x-access-token'], config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    //console.log(decoded)
    id_usuario = decoded.id;
    //next();
  });

  let donde=[]
  if(req.body.donde==""){
    donde["id_usuario"]=id_usuario
  }else{
    let obj = new Object()
    obj["id_usuario"]=id_usuario
    if(req.body.donde.split("|").length==2&&req.body.donde.split("|")[1]==""){
      obj[req.body.donde.split("|")[0].split("=")[0]]=req.body.donde.split("|")[0].split("=")[1]
      donde.push(obj)
    }else{
      console.log("es una consulta masiva")
      req.body.donde.split("|")
      .map(x=>{
        let a=x.split("=")[0]
        let b=x.split("=")[1]
        let obj = new Object()
        obj[a]=b
        donde.push(obj)
      })
    }
  }
  //eliminar negocio tambien deberia eliminar la foto 
  tiendas.findAll({
    where:donde
  }).then(data=>{
    console.log(data[0].img)
    try {
      //console.log("./uploads/"+ req.body.img)
      fs.unlinkSync("./uploads/"+ data[0].img)
    } catch(err) {
      //console.error(err)
      res.status(200).send({error:"No se pudo eliminar la imagen"})
    }
  })

  tiendas.destroy({
    where:donde
  }).then( data=>{
    console.log(data)
    res.status(200).send({success:data})
  }).catch(err=>{
    res.status(200).send({error:err})
  })
  


};
//ACTUALIZAR NEGOCIO
exports.actualizar_negocio = (req, res) => {//el usuario solo puede ver informacion sobre si mismo 
  console.log("CONTROLADOR ACTUALIZAR_NEGOCIO")

  jwt.verify(req.headers['x-access-token'], config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    //console.log(decoded)
    id_usuario = decoded.id;
    //next();
  });

  let donde=[]
  if(req.body.donde==""){
    donde["id_usuario"]=id_usuario
  }else{
    let obj = new Object()
    obj["id_usuario"]=id_usuario
    if(req.body.donde.split("|").length==2&&req.body.donde.split("|")[1]==""){
      obj[req.body.donde.split("|")[0].split("=")[0]]=req.body.donde.split("|")[0].split("=")[1]
      donde.push(obj)
    }else{
      console.log("es una consulta masiva")
      req.body.donde.split("|")
      .map(x=>{
        let a=x.split("=")[0]
        let b=x.split("=")[1]
        let obj = new Object()
        obj[a]=b
        donde.push(obj)
      })
    }
  }


  console.log(req.body.columnas.split("|")[2])
  console.log(req.body)
  tiendas.update({ 
    nombre: req.body.columnas.split("|")[0],
    descripcion: req.body.columnas.split("|")[1],
    direccion: req.body.columnas.split("|")[2],
    telefono1: req.body.columnas.split("|")[3],
    telefono2: req.body.columnas.split("|")[4],
    correo1: req.body.columnas.split("|")[5],
    correo2: req.body.columnas.split("|")[6],
    img: req.body.columnas.split("|")[8],
    estado_validacion:"Sin Validacion",
    estado:"Activo",
    id_usuario: id_usuario,
    id_tipo_tienda: req.body.columnas.split("|")[7],
    }, 
    {where: donde}
  )
  .catch(function (err) {
    // handle error;
    console.log(err)
    res.status(200).send({error:err});
  });

  tiendas.findAll({
    attributes:[
      "id_tienda",
      "nombre",
      "descripcion",
      "correo1",
      "correo2",
      "telefono1",
      "telefono2",
      "direccion",
      "img",
      "estado_validacion",
      "estado"
    ],
    where:donde,
    include:tipos_tienda
  }).then(data => {
    console.log("DATOS ACTUALIZADOS")
    //console.log(data)
    res.status(200).send({success:data})
  })

};
//VER NEGOCIO
exports.ver_negocio = (req, res) => {//el usuario solo puede ver informacion sobre si mismo 
  console.log("CONTROLADOR VER NEGOCIO")
  jwt.verify(req.headers['x-access-token'], config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    //console.log(decoded)
    id_usuario = decoded.id;
    //next();
  });
  console.log(req.body)
  
  let donde=[]
  let limite=10
  let off=0
  
  let orden=[req.body.orden.split(" ")[0],req.body.orden.split(" ")[1]]
  console.log(orden)
  
  if(req.body.donde==""){
    donde["id_usuario"]=id_usuario
  }else{
    let obj = new Object()
    obj["id_usuario"]=id_usuario
    if(req.body.donde.split("|").length==2&&req.body.donde.split("|")[1]==""){
      obj[req.body.donde.split("|")[0].split("=")[0]]=req.body.donde.split("|")[0].split("=")[1]
      donde.push(obj)
    }else{
      console.log("es una consulta masiva")
      req.body.donde.split("|")
      .map(x=>{
        let a=x.split("=")[0]
        let b=x.split("=")[1]
        let obj = new Object()
        obj[a]=b
        donde.push(obj)
      })
    }
  }

  if(req.body.limite!=""){
    let limite=req.body.limite.split(",")[1]
    let off=req.body.limite.split(",")[0]
  }else{
    let limite=10
    let off=0
  }

  tiendas.findAll({
    attributes:[
      "id_tienda",
      "nombre",
      "descripcion",
      "correo1",
      "correo2",
      "telefono1",
      "telefono2",
      "direccion",
      "img",
      "estado_validacion",
      "estado"
    ],
    where:donde,
    limit:limite,
    offset:off,
    order:[
      orden
    ],
    include:tipos_tienda
  })
    .then(
      data => {
        //console.log(data)
        //data={"success":data}
        tiendas.count({
          where:donde
        }).then(
          count =>{
            res.status(200).send({success:data,count:count});
          }
        )

        
      }
    )

  //res.status(200).send("informacion personal del usuario.");
};
//VER TIPOS DE NEGOCIOS
exports.ver_tipos_negocio = (req, res) => {//el usuario solo puede ver informacion sobre si mismo 
  jwt.verify(req.headers['x-access-token'], config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    //console.log(decoded)
    id_usuario = decoded.id;
    //next();
  });

  
  let donde=[]
  let limite=10
  let off=0
  console.log(req.body)
  console.log(req.body.donde)
  if(req.body.donde==""){
    donde["id_usuario"]=id_usuario
  }else{
    let obj = new Object()
    obj["id_usuario"]=id_usuario
    if(req.body.donde.split("|").length==2&&req.body.donde.split("|")[1]==""){
      obj[req.body.donde.split("|")[0].split("=")[0]]=req.body.donde.split("|")[0].split("=")[1]
      donde.push(obj)
    }else{
      console.log("es una consulta masiva")
      req.body.donde.split("|")
      .map(x=>{
        let a=x.split("=")[0]
        let b=x.split("=")[1]
        let obj = new Object()
        obj[a]=b
        donde.push(obj)
      })
    }
  }

  if(req.body.limite!=""){
    let limite=req.body.limite.split(",")[1]
    let off=req.body.limite.split(",")[0]
  }else{
    let limite=10
    let off=0
  }

  tipos_tienda.findAll({
    attributes:[
      "id_tipo_tienda",
      "nombre",
      "descripcion",
    ],
    where:donde,
    limit:limite,
    offset:off,
  })
    .then(
      data => {
        //console.log(data)
        //data={"success":data}
        tipos_tienda.count({
          where:donde
        }).then(
          count =>{
            res.status(200).send({success:data,count:count});
          }
        )
      }
    )

  //res.status(200).send("informacion personal del usuario.");
};

//CONTROLADORES DE OFERTAS
//VER OFERTAS
exports.ver_oferta = (req, res) => {//el usuario solo puede ver informacion sobre si mismo 
  console.log("CONTROLADOR VER OFERTAS")
  jwt.verify(req.headers['x-access-token'], config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    //console.log(decoded)
    id_usuario = decoded.id;
    //next();
  });
  console.log(req.body)
  
  let donde=[]
  let limite=10
  let off=0
  
  let orden=[req.body.orden.split(" ")[0],req.body.orden.split(" ")[1]]
  //console.log(orden)
  
  if(req.body.donde==""){
    //donde["id_usuario"]=id_usuario
    donde["id_oferta"]=req.body.donde.split("|")[0].split("=")[1]
  }else{
    let obj = new Object()
    //obj["id_usuario"]=id_usuario
    if(req.body.donde.split("|").length==2&&req.body.donde.split("|")[1]==""){
      obj[req.body.donde.split("|")[0].split("=")[0]]=req.body.donde.split("|")[0].split("=")[1]
      donde.push(obj)
    }else{
      console.log("es una consulta masiva")
      req.body.donde.split("|")
      .map(x=>{
        let a=x.split("=")[0]
        let b=x.split("=")[1]
        let obj = new Object()
        obj[a]=b
        donde.push(obj)
      })
    }
  }

  if(req.body.limite!=""){
    let limite=req.body.limite.split(",")[1]
    let off=req.body.limite.split(",")[0]
  }else{
    let limite=10
    let off=0
  }
  //buscar negocio y si le pertenece al usuario, mostrar los datos solicitados


  //console.log(donde)
  //console.time(req.body)
  ofertas.findAll({
    attributes:[
      "id_oferta",
      "nombre",
      "descripcion",
      "precio",
      "img",
      "tipo",
      "estado",
      "id_tienda"
    ],
    limit:limite,
    offset:off,
    order:[
      orden
    ],
    include:tiendas,
    where:donde
  }).then(resp=>{
    //console.log(resp)
    tiendas.findAll({
      where:{
        id_tienda:resp[0].id_tienda,
        id_usuario:id_usuario
      }
    }).then(resp2=>{
      console.log("verificado que esto pertenece a un usuario, se procede a mostrar los resultados \n")
      ofertas.count({
        where:{
          id_oferta:resp[0].id_oferta
        }
      }).then(count =>{
        res.status(200).send({success:resp,count:count});
      })
    })
  }).catch(err=>{
    res.status(200).send({error:err})
  })

  /*
  ofertas.findAll({
    attributes:[
      "id_oferta",
      "nombre",
      "descripcion",
      "precio",
      "img",
      "tipo",
      "estado"
    ],
    where:donde,
    limit:limite,
    offset:off,
    order:[
      orden
    ],
    include:tiendas
  })
    .then(
      data => {
        //console.log(data)
        //data={"success":data}
        ofertas.count({
          where:donde
        }).then(count =>{
          res.status(200).send({success:data,count:count});
        })
      }
    )
      */
  //res.status(200).send("informacion personal del usuario.");
};
//CREAR OFERTA
exports.crear_oferta = (req, res) => {//el usuario solo puede ver informacion sobre si mismo 
  console.log("CONTROLADOR CREAR OFERTA")
  jwt.verify(req.headers['x-access-token'], config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    //console.log(decoded)
    id_usuario = decoded.id;
    //next();
  });

  
  let date_ob = new Date();

  const crypto = require('crypto')
  var timestamp = new Date().getTime();
  nombre_archivo=crypto.createHash('md5').update(timestamp.toString(10)).digest("hex");
  fs.createReadStream("./uploads/producto_predeterminado.png").pipe(fs.createWriteStream("./uploads/"+nombre_archivo+".png"));
  ofertas.create({ 
    nombre: req.body.columnas.split("|")[0],
    descripcion: req.body.columnas.split("|")[1],
    precio: req.body.columnas.split("|")[2],
    img: nombre_archivo+".png",
    estado:"Activo",
    tipo: req.body.columnas.split("|")[4],
    id_tienda: req.body.columnas.split("|")[5],
    }
  ).then(
    data=>{
      res.status(200).send({success:data});
    }
  ).catch(function (err) {
    res.status(200).send({error:err});
  });
};
//ACTUALIZAR IMAGEN OFERTA
exports.actualizar_imagen_oferta = (req, res) => {//actualizar imagenes para el negocio seleccionado
  console.log("CONTROLADOR ACTUALIZAR_IMAGEN_OFERTA")
  jwt.verify(req.headers['x-access-token'], config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    id_usuario = decoded.id;
  });
  if(req.files.length>0){
    if(req.files[0].mimetype.split("/")[0]=='image'){
      try {
        fs.unlinkSync("./uploads/"+ req.body.img)
      } catch(err) {
        res.status(200).send({error:"No se pudo eliminar la imagen"})
      }
      try{
        fs.createReadStream(req.files[0].path).pipe(fs.createWriteStream(req.files[0].destination+"/"+req.body.img.split(".")[0]+"."+req.files[0].originalname.split(".")[req.files[0].originalname.split(".").length-1]))
      }catch(err) {
        console.error(err)
      }

      try {
        fs.unlinkSync(req.files[0].path)
      } catch(err) {
        console.error(err)
      }
      let nueva_imagen=req.body.img.split(".")[0]+"."+req.files[0].originalname.split(".")[req.files[0].originalname.split(".").length-1]
      ofertas.update({ 
        img: nueva_imagen
      }, {
      where: {
          id_oferta: req.body.id_oferta
        }
      }).then(data=>{
        //console.log("he guardado los datos")
        //res.status(200).send({success:"imagen guardada correctamente"})
      });
      return res.status(200).send({success:"imagen cargada correctamente"})
    }else{
      try {
        fs.unlinkSync(req.files[0].path)
      } catch(err) {
        console.error(err)
      }
      return res.status(200).send({error:"el archivo no era una imagen"})
    }
  }
  res.status(200).send({success:"imagen actualizada exitosamente"});
};
//ELIMINAR OFERTA
exports.eliminar_oferta = (req, res) => {//el usuario solo puede ver informacion sobre si mismo 
  console.log("CONTROLADOR ELIMINAR_OFERTA")

  jwt.verify(req.headers['x-access-token'], config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    id_usuario = decoded.id;
  });

  let donde=[]
  if(req.body.donde==""){
    donde["id_usuario"]=id_usuario
  }else{
    let obj = new Object()
    obj["id_usuario"]=id_usuario
    if(req.body.donde.split("|").length==2&&req.body.donde.split("|")[1]==""){
      obj[req.body.donde.split("|")[0].split("=")[0]]=req.body.donde.split("|")[0].split("=")[1]
      donde.push(obj)
    }else{
      console.log("es una consulta masiva")
      req.body.donde.split("|")
      .map(x=>{
        let a=x.split("=")[0]
        let b=x.split("=")[1]
        let obj = new Object()
        obj[a]=b
        donde.push(obj)
      })
    }
  }
  //verificar si el negocio al que pertenece la oferta, pertencece al usuario
  //console.log(donde)
  //console.log(req.body.donde.split("|")[0].split("=")[1])
  ofertas.findAll({
    where:{
      id_oferta:req.body.donde.split("|")[0].split("=")[1]
    }
  }).then(resultado=>{
    console.log(resultado[0])
    if(resultado[0]!==undefined){
      tiendas.findAll({
        where:{
          id_tienda:resultado[0].id_tienda,
          id_usuario:id_usuario
        }
      }).then(resultado2=>{
        ///si llega aqui es porque la tienda existe y pertenece al usuario, se procede a borrar la oferta y su imagen
        //console.log(resultado2)

        //console.log(resultado[0].img)
        try {
          fs.unlinkSync("./uploads/"+ resultado[0].img)
        } catch(err) {
          console.error(err)
          //res.status(200).send({error:"No se pudo eliminar la imagen"})
        }
        
        ofertas.destroy({
          where:{
            id_oferta:resultado[0].id_oferta
          }
        }).then( data=>{
          console.log(data)
          res.status(200).send({success:data})
        }).catch(err=>{
          res.status(200).send({error:err})
        })
      })
    }else{
      res.status(200).send({error:"Ha intentado una operacion ilegal"})
    }
  })
};
//ACTUALIZAR OFERTA
exports.actualizar_oferta = (req, res) => {//el usuario solo puede ver informacion sobre si mismo 
  console.log("CONTROLADOR ACTUALIZAR_OFERTA")

  jwt.verify(req.headers['x-access-token'], config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    //console.log(decoded)
    id_usuario = decoded.id;
    //next();
  });
  //console.log(req.body)
  let donde=[]
  if(req.body.donde==""){
    //donde["id_usuario"]=id_usuario
    donde["id_oferta"]=req.body.donde.split("|")[0].split("=")[1]
  }else{
    let obj = new Object()
    //obj["id_usuario"]=id_usuario
    if(req.body.donde.split("|").length==2&&req.body.donde.split("|")[1]==""){
      obj[req.body.donde.split("|")[0].split("=")[0]]=req.body.donde.split("|")[0].split("=")[1]
      donde.push(obj)
    }else{
      console.log("es una consulta masiva")
      req.body.donde.split("|")
      .map(x=>{
        let a=x.split("=")[0]
        let b=x.split("=")[1]
        let obj = new Object()
        obj[a]=b
        donde.push(obj)
      })
    }
  }

  //console.log(donde)
  //oootra vez, verifica que la oferta exista, que pertenezca a un negocio y este negocio pertenezca al usuario que hace la consulta
  ofertas.findAll({
    attributes:[
      "id_oferta",
      "nombre",
      "descripcion",
      "precio",
      "img",
      "tipo",
      "estado",
      "id_tienda"
    ],
    include:tiendas,
    where:donde
  }).then(resp=>{
    console.log(resp)
    tiendas.findAll({
      where:{
        id_tienda:resp[0].id_tienda,
        id_usuario:id_usuario
      }
    }).then(resp2=>{
      console.log("verificado que esto pertenece a un usuario, se procede a mostrar los resultados \n")
      ofertas.update({ 
        nombre: req.body.columnas.split("|")[0],
        descripcion: req.body.columnas.split("|")[1],
        precio: req.body.columnas.split("|")[2],
        img: req.body.columnas.split("|")[3],
        estado:"Activo",
        tipo: req.body.columnas.split("|")[4],
        id_tienda: req.body.columnas.split("|")[5],
        }, 
        {where: donde}
      )
      .catch(function (err) {
        console.log(err)
        res.status(200).send({error:err});
      });
    
      ofertas.findAll({
        attributes:[
          "id_oferta",
          "nombre",
          "descripcion",
          "precio",
          "img",
        ],
        where:donde,
      }).then(data => {
        res.status(200).send({success:data})
      })
    })
  }).catch(err=>{
    res.status(200).send({error:err})
  })
};
//CONTROLADORES DE TRANSPORTE
//VER TRANSPORTE
exports.ver_transporte = (req, res) => {//el usuario solo puede ver informacion sobre si mismo 
  console.log(chalk.red("*******************"))
  console.log(chalk.red("Controlador de ver transporte"))
  console.log(chalk.red("*******************"))
  jwt.verify(req.headers['x-access-token'], config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    //console.log(decoded)
    id_usuario = decoded.id;
    //next();
  });
  console.log(req.body)
  
  let donde=[]
  let limite=10
  let off=0
  
  let orden=[req.body.orden.split(" ")[0],req.body.orden.split(" ")[1]]
  console.log(orden)
  
  if(req.body.donde==""){
    donde["id_usuario"]=id_usuario
  }else{
    let obj = new Object()
    obj["id_usuario"]=id_usuario
    if(req.body.donde.split("|").length==2&&req.body.donde.split("|")[1]==""){
      obj[req.body.donde.split("|")[0].split("=")[0]]=req.body.donde.split("|")[0].split("=")[1]
      donde.push(obj)
    }else{
      console.log("es una consulta masiva")
      req.body.donde.split("|")
      .map(x=>{
        let a=x.split("=")[0]
        let b=x.split("=")[1]
        let obj = new Object()
        obj[a]=b
        donde.push(obj)
      })
    }
  }

  if(req.body.limite!=""){
    let limite=req.body.limite.split(",")[1]
    let off=req.body.limite.split(",")[0]
  }else{
    let limite=10
    let off=0
  }

  transportes.findAll({
    attributes:[
      "id_transporte",
      "nombre",
      "descripcion",
      "correo1",
      "correo2",
      "telefono1",
      "telefono2",
      "direccion",
      "img",
      "estado_validacion",
      "estado"
    ],
    where:donde,
    limit:limite,
    offset:off,
    order:[
      orden
    ],
  })
    .then(
      data => {
        //console.log(data)
        //data={"success":data}
        transportes.count({
          where:donde
        }).then(
          count =>{
            res.status(200).send({success:data,count:count});
          }
        )
      }
    )
};
//ELIMINAR TRANSPORTE
exports.eliminar_transporte = (req, res) => {//el usuario solo puede ver informacion sobre si mismo 
  console.log(chalk.red("*******************"))
  console.log(chalk.red("Controlador de eliminar transporte"))
  console.log(chalk.red("*******************"))

  jwt.verify(req.headers['x-access-token'], config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    //console.log(decoded)
    id_usuario = decoded.id;
    //next();
  });

  let donde=[]
  if(req.body.donde==""){
    donde["id_usuario"]=id_usuario
  }else{
    let obj = new Object()
    obj["id_usuario"]=id_usuario
    if(req.body.donde.split("|").length==2&&req.body.donde.split("|")[1]==""){
      obj[req.body.donde.split("|")[0].split("=")[0]]=req.body.donde.split("|")[0].split("=")[1]
      donde.push(obj)
    }else{
      console.log("es una consulta masiva")
      req.body.donde.split("|")
      .map(x=>{
        let a=x.split("=")[0]
        let b=x.split("=")[1]
        let obj = new Object()
        obj[a]=b
        donde.push(obj)
      })
    }
  }
  //eliminar negocio tambien deberia eliminar la foto 
  transportes.findAll({
    where:donde
  }).then(data=>{
    console.log(data[0].img)
    try {
      //console.log("./uploads/"+ req.body.img)
      fs.unlinkSync("./uploads/"+ data[0].img)
    } catch(err) {
      //console.error(err)
      res.status(200).send({error:"No se pudo eliminar la imagen"})
    }
  })

  transportes.destroy({
    where:donde
  }).then( data=>{
    console.log(data)
    res.status(200).send({success:data})
  }).catch(err=>{
    res.status(200).send({error:err})
  })
};
//ACTUALIZAR TRANSPORTE
exports.actualizar_transporte = (req, res) => {//el usuario solo puede ver informacion sobre si mismo 
  console.log(chalk.red("*******************"))
  console.log(chalk.red("Controlador de actualizar transporte"))
  console.log(chalk.red("*******************"))

  jwt.verify(req.headers['x-access-token'], config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    //console.log(decoded)
    id_usuario = decoded.id;
    //next();
  });

  let donde=[]
  if(req.body.donde==""){
    donde["id_usuario"]=id_usuario
  }else{
    let obj = new Object()
    obj["id_usuario"]=id_usuario
    if(req.body.donde.split("|").length==2&&req.body.donde.split("|")[1]==""){
      obj[req.body.donde.split("|")[0].split("=")[0]]=req.body.donde.split("|")[0].split("=")[1]
      donde.push(obj)
    }else{
      console.log("es una consulta masiva")
      req.body.donde.split("|")
      .map(x=>{
        let a=x.split("=")[0]
        let b=x.split("=")[1]
        let obj = new Object()
        obj[a]=b
        donde.push(obj)
      })
    }
  }


  console.log(req.body.columnas.split("|")[2])
  console.log(req.body)
  transportes.update({ 
    nombre: req.body.columnas.split("|")[0],
    descripcion: req.body.columnas.split("|")[1],
    direccion: req.body.columnas.split("|")[2],
    telefono1: req.body.columnas.split("|")[3],
    telefono2: req.body.columnas.split("|")[4],
    correo1: req.body.columnas.split("|")[5],
    correo2: req.body.columnas.split("|")[6],
    img: req.body.columnas.split("|")[8],
    estado_validacion:"Sin Validacion",
    estado:"Activo",
    id_usuario: id_usuario,
    id_tipo_tienda: req.body.columnas.split("|")[7],
    }, 
    {where: donde}
  )
  .catch(function (err) {
    // handle error;
    console.log(err)
    res.status(200).send({error:err});
  });

  transportes.findAll({
    attributes:[
      "id_tienda",
      "nombre",
      "descripcion",
      "correo1",
      "correo2",
      "telefono1",
      "telefono2",
      "direccion",
      "img",
      "estado_validacion",
      "estado"
    ],
    where:donde,
    include:tipos_tienda
  }).then(data => {
    console.log("DATOS ACTUALIZADOS")
    //console.log(data)
    res.status(200).send({success:data})
  })

};
//ACTUALIZAR IMAGEN TRANSPORTE
exports.actualizar_imagen_transporte = (req, res) => {//actualizar imagenes para el negocio seleccionado
  console.log(chalk.red("*******************"))
  console.log(chalk.red("Controlador de actualizar imagen transporte"))
  console.log(chalk.red("*******************"))
  jwt.verify(req.headers['x-access-token'], config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    //console.log(decoded)
    id_usuario = decoded.id;
    //next();
  });
  //console.log(req.files)
  //console.log('Body- ' + JSON.stringify(req.body));
  

  //establecer si el formato de la imagen es el correcto
  //console.log("el archivo es de tipo " +req.files[0].mimetype.split("/")[0] + " y tiene la extension "+req.files[0].originalname.split(".")[req.files[0].originalname.split(".").length-1])
  //console.log(req.files.length)
  if(req.files.length>0){
    if(req.files[0].mimetype.split("/")[0]=='image'){
      //borramos la imagen temporal
      try {
        //console.log("./uploads/"+ req.body.img)
        fs.unlinkSync("./uploads/"+ req.body.img)
      } catch(err) {
        //console.error(err)
        res.status(200).send({error:"No se pudo eliminar la imagen"})
      }
      //copiamos la imagen nueva con el nombre temporal
      try{
        /*console.log("++++++++++++++++++++++++++++")
        console.log(req.body.img.split(".")[0])
        console.log(req.files[0].originalname.split("."))
        console.log(req.files[0].originalname.split(".")[req.files[0].originalname.split(".").length-1])
        console.log(req.files[0].path)
        console.log("++++++++++++++++++++++++++++")
        */ 
        fs.createReadStream(req.files[0].path).pipe(fs.createWriteStream(req.files[0].destination+"/"+req.body.img.split(".")[0]+"."+req.files[0].originalname.split(".")[req.files[0].originalname.split(".").length-1]))
      }catch(err) {
        console.error(err)
      }
      //eliminamos la imagen original
      try {
        fs.unlinkSync(req.files[0].path)
      } catch(err) {
        console.error(err)
      }
      //ahora hay que actualizar el campo en la base de datos para anunciar que la imagen ya existe
      //req.body.img+"."+req.files[0].originalname.split(".")[req.files[0].originalname.split(".").length-1]) nombre del archivo en la base de datos
      let nueva_imagen=req.body.img.split(".")[0]+"."+req.files[0].originalname.split(".")[req.files[0].originalname.split(".").length-1]
      transportes.update({ 
        img: nueva_imagen
      }, {
      where: {
          id_tienda: req.body.id_tienda
        }
      }).then(
        data=>{
          console.log("he guardado los datos")
        }
      );

      return res.status(200).send({success:"imagen cargada correctamente"})
    }else{
      try {
        fs.unlinkSync(req.files[0].path)
      } catch(err) {
        console.error(err)
      }
      return res.status(200).send({error:"el archivo no era una imagen"})
    }
  }
  
  res.status(200).send({success:"imagen actualizada exitosamente"});
};
//CREAR TRANSPORTE
exports.crear_transporte = (req, res) => {//el usuario solo puede ver informacion sobre si mismo 
  console.log(chalk.red("*******************"))
  console.log(chalk.red("Controlador de crear transporte"))
  console.log(chalk.red("*******************"))
  jwt.verify(req.headers['x-access-token'], config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    //console.log(decoded)
    id_usuario = decoded.id;
    //next();
  });

  
  let date_ob = new Date();

  const crypto = require('crypto')
  var timestamp = new Date().getTime();
  //console.log(timestamp.toString(10))
  nombre_archivo=crypto.createHash('md5').update(timestamp.toString(10)).digest("hex");
  //copiar imagen temporal con el nombre definitivo
  fs.createReadStream("./uploads/tienda_predeterminada.png").pipe(fs.createWriteStream("./uploads/"+nombre_archivo+".png"));
  //console.log(nombre_archivo)
  //console.log("./uploads/"+nombre_archivo+".png")
  //console.log(req.body.columnas.split("|"))
  transportes.create({ 
    nombre: req.body.columnas.split("|")[0],
    descripcion: req.body.columnas.split("|")[1],
    direccion: req.body.columnas.split("|")[2],
    telefono1: req.body.columnas.split("|")[3],
    telefono2: req.body.columnas.split("|")[4],
    correo1: req.body.columnas.split("|")[5],
    correo2: req.body.columnas.split("|")[6],
    img: nombre_archivo+".png",
    estado_validacion:"Sin Validacion",
    estado:"Activo",
    id_usuario: id_usuario,
    id_tipo_tienda: req.body.columnas.split("|")[7],
    }
  ).then(
    data=>{
      //esta salida devuelve los datos pertenecientes al ultimo ingreso, de esta manera, es posible hacer un update para guardar la imagen luego usando otro protoculo
      //console.log("resultado:" +data)
      res.status(200).send({success:data});
    }
  ).catch(function (err) {
    // handle error;
    //console.log(err)
    res.status(200).send({error:err});
  });
};
//CONTROLADORES DE SOCIAL
//VER SOLICITUDES
//ELIMINAR SOLICITUDES
//ACTUALIZAR SOLICITUDES
//ACTUALIZAR IMAGEN SOLICITUDES
//CREAR SOLICITUDES
exports.crear_transporte = (req, res) => {//el usuario solo puede ver informacion sobre si mismo 
  console.log(chalk.red("*******************"))
  console.log(chalk.red("Controlador de crear Solicitudes"))
  console.log(chalk.red("*******************"))
  jwt.verify(req.headers['x-access-token'], config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    //console.log(decoded)
    id_usuario = decoded.id;
    //next();
  });

  
  let date_ob = new Date();

  const crypto = require('crypto')
  var timestamp = new Date().getTime();
  //console.log(timestamp.toString(10))
  nombre_archivo=crypto.createHash('md5').update(timestamp.toString(10)).digest("hex");
  //copiar imagen temporal con el nombre definitivo
  fs.createReadStream("./uploads/tienda_predeterminada.png").pipe(fs.createWriteStream("./uploads/"+nombre_archivo+".png"));
  //console.log(nombre_archivo)
  //console.log("./uploads/"+nombre_archivo+".png")
  //console.log(req.body.columnas.split("|"))
  transportes.create({ 
    nombre: req.body.columnas.split("|")[0],
    descripcion: req.body.columnas.split("|")[1],
    direccion: req.body.columnas.split("|")[2],
    telefono1: req.body.columnas.split("|")[3],
    telefono2: req.body.columnas.split("|")[4],
    correo1: req.body.columnas.split("|")[5],
    correo2: req.body.columnas.split("|")[6],
    img: nombre_archivo+".png",
    estado_validacion:"Sin Validacion",
    estado:"Activo",
    id_usuario: id_usuario,
    id_tipo_tienda: req.body.columnas.split("|")[7],
    }
  ).then(
    data=>{
      //esta salida devuelve los datos pertenecientes al ultimo ingreso, de esta manera, es posible hacer un update para guardar la imagen luego usando otro protoculo
      //console.log("resultado:" +data)
      res.status(200).send({success:data});
    }
  ).catch(function (err) {
    // handle error;
    //console.log(err)
    res.status(200).send({error:err});
  });
};