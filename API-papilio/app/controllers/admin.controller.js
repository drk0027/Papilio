const db = require("../models");
const chalk = require('chalk');
const nodemailer = require('nodemailer');

const usuarios = db.usuarios;
//MODELOS DE SISTEMA
const sistemas = db.sistemas;
const sendmail = db.sendmail;
const contactos = db.contactos;
const mensajes = db.mensajes;
const archivos = db.archivos;
const memorias = db.memorias;
const galerias = db.galerias;
const fotos = db.fotos;

const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
var fs = require('fs');
var bcrypt = require("bcryptjs");
var base_url = "localhost"
var frontend_url = "localhost:3000"
var backend_url = "localhost:8081"

//CRUD DEL SISTEMA
exports.ver_sistema = (req, res) => {
    console.log(chalk.blue("Consulta de configuraciones del sistema para edicion"))

    /*
        Este controlador permite obtener al administrador la lista de variables del entorno, se utiliza para actualizar las configuraciones del sistema
    */

    sistemas.findOne(

    ).then(resp => {
        res.status(200).send({ success: resp })
    }).catch(err => {
        res.status(200).send({ error: err })
    })

};
exports.actualizar_sistema = (req, res) => {
    console.log(chalk.blue("Actualizar los datos del sistema"))

    jwt.verify(req.headers['x-access-token'], config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Acceso no Autorizado"
            });
        }
        //console.log(decoded)
        id_usuario = decoded.id;
        //next();
    });

    console.log(req.body.columnas)

    sistemas.update(
        req.body.columnas
        , {
            where: {
                id_sistema: "1",
            }
        }).then(resp => {
            console.log(resp)
            res.status(200).send({ success: "correcto" })
        })
}

//Controlador de informacion de contacto
exports.ver_solicitud_contacto = (req, res) => {
    console.log(chalk.blue("Consulta de las solicitudes de informacion de los clientes"))

    /*
        Este controlador permite obtener al administrador la lista de variables del entorno, se utiliza para actualizar las configuraciones del sistema
    */

    console.log(req.body)

    contactos.findAll({
        attributes: req.body.Columnas,
        limit: req.body.Limite,
        order: req.body.Orden,
        where: req.body.Donde
    }).then(resp => {
        contactos.count({
            limit: req.body.Limite,
            order: req.body.Orden,
            where: req.body.Donde
        }).then(resp1 => {
            res.status(200).send({ success: { solicitud_contacto: resp, cantidad: resp1 } })
        }).catch(err => {
            res.status(200).send({ error: err })
        })
    }).catch(err => {
        res.status(200).send({ error: err })
    })

};
exports.eliminar_solicitud_contacto = (req, res) => {
    console.log(chalk.red("Eliminar solicitud de informacion de contacto especifica"))

    /*
        Este controlador permite obtener al administrador la lista de variables del entorno, se utiliza para actualizar las configuraciones del sistema
    */

    console.log(req.body)

    contactos.destroy({
        where: req.body.donde
    }).then(resp => {
        res.status(200).send({ success: resp })
    }).catch(err => {
        res.status(200).send({ error: err })
    })

};

//SEGURIDAD
exports.actualizar_password = (req, res) => {
    console.log(chalk.red("Eliminar solicitud de informacion de contacto especifica"))

    /*
        Este controlador permite obtener al administrador la lista de variables del entorno, se utiliza para actualizar las configuraciones del sistema
    */

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

    /*bcrypt.compareSync(

    )*/

    console.log(req.body.donde.a_password)
    //res.status(200).send({ success: "actualizado" })
    //consultar si la a_password coincide con la almacenada en la base de datos
    usuarios.findOne({
        where: {
            id_usuario: id_usuario
        }
    }).then(resp => {
        //comparo si las contraseñas coinciden
        console.log(bcrypt.compareSync(req.body.donde.a_password, resp.dataValues.password))
        if (bcrypt.compareSync(req.body.donde.a_password, resp.dataValues.password) == true) {
            console.log("las contraseñas coinciden")
            //confirmo si las nuevas coinciden
            if (req.body.donde.n_password == req.body.donde.r_password) {
                //si se cumple todo esto, actualizo la contraseña

                usuarios.update({
                    password: bcrypt.hashSync(req.body.donde.n_password, 8)
                }, {
                    where: {
                        id_usuario: id_usuario
                    }
                }).then(resp => {
                    res.status(200).send({ success: "actualizado" })
                }).catch(err => {
                    res.status(200).send({ error: err })
                })
            } else {
                res.status(200).send({ error: "La contraseña nueva y repetida no coinciden" })
            }
        } else {
            res.status(200).send({ error: "Las contraseñas no coinciden" })
        }

    }).catch(err => {

    })

    //en caso de coincidir, registrar la nueva contraseña, siempre y cuando coincida con la repeticion

    /*contactos.destroy({
        where:req.body.donde
    }).then(resp => {
        res.status(200).send({ success: resp })
    }).catch(err=>{
        res.status(200).send({ error: err })
    })
    */

};
exports.ver_cuentas = (req, res) => {
    console.log(chalk.blue("Consulta de las cuentas de los usuarios"))

    /*
        Este controlador permite obtener al administrador ver la lista de cuentas del sistema
    */

    //console.log(req.body)

    usuarios.findAll({
        attributes: req.body.Columnas,
        limit: req.body.Limite,
        order: req.body.Orden,
        where: req.body.Donde
    }).then(resp => {
        usuarios.count({
            limit: req.body.Limite,
            order: req.body.Orden,
            where: req.body.Donde
        }).then(resp1 => {
            res.status(200).send({ success: { solicitud_contacto: resp, cantidad: resp1 } })
        }).catch(err => {
            res.status(200).send({ error: err })
        })
    }).catch(err => {
        res.status(200).send({ error: err })
    })

};
exports.crear_cuenta = (req, res) => {
    console.log(chalk.blue("Crear cuenta de usuario"))

    /*
        Este controlador permite obtener al administrador crear nuevas cuentas de usuario
    */

    console.log(req.body)
    var contraseña = Math.random().toString(36).slice(2) //generada automaticamente
    console.log(contraseña)
    //agregar una funcion sendmail para enviar la notificacion de usuario creado con su contraseña temporal

    console.log(req.body.donde.nombres.split(" ")[0].substr(0, 1) + req.body.donde.apellidos.replace(" ", "_"))

    usuarios.create({
        nombre_usuario: req.body.donde.nombres.split(" ")[0].substr(0, 1) + req.body.donde.apellidos.replace(" ", "_"),
        nombres: req.body.donde.nombres,
        apellidos: req.body.donde.apellidos,
        email: req.body.donde.email,
        email2: req.body.donde.email2,
        direccion1: req.body.donde.direccion1,
        direccion2: req.body.donde.direccion2,
        cedula: req.body.donde.cedula,
        telefono1: req.body.donde.telefono1,
        telefono2: req.body.donde.telefono2,
        password: bcrypt.hashSync(contraseña, 8)
    }).then(resp => {
        //establecer rol de usuario "user"
        console.log(resp)
        resp.setRoles("2").then(() => {
            //consultar las configuraciones del sendmail
            sendmail.findOne(

            ).then(resp1 => {
                console.log(resp1.dataValues)
                let transport = nodemailer.createTransport({
                    host: resp1.dataValues.host,
                    port: resp1.dataValues.port,
                    auth: {
                        user: resp1.dataValues.user,
                        pass: resp1.dataValues.pass
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                });

                const message = {
                    from: 'home@interlan.ec', // Sender address
                    to: req.body.donde.email,         // List of recipients
                    subject: 'Bienvenido/a', // Subject line
                    html: resp1.dataValues.mensaje_registro + "<hr><h3>Credenciales:</h3><p><b>Nombre de usuario/Correo Electronico:</b>" + req.body.donde.email + "</p><p><b>Contraseña:</b>" + contraseña + "</p><p><b>Importante!</b></p><p>Cambie la contraseña lo mas pronto posible</p>" // Plain text body
                };
                transport.sendMail(message, function (err, info) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(info);
                    }
                });
            })

            res.send({ success: "El usuario ha sido creado y los datos de su cuenta, enviados a la direccion de correo especificada" });
            //aqui envia el correo notificando al usuario sus datos de la cuenta
        });

        //res.status(200).send({ success: resp })

    }).catch(err => {
        res.status(200).send({ error: err })
    })

};
exports.actualizar_cuenta = (req, res) => {
    console.log(chalk.blue("Actualizar los datos de la cuenta de usuario"))

    jwt.verify(req.headers['x-access-token'], config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Acceso no Autorizado"
            });
        }
        //console.log(decoded)
        id_usuario = decoded.id;
        //next();
    });

    console.log(req.body)

    usuarios.update(
        req.body.donde
        , {
            where: {
                id_usuario: req.body.donde.id_usuario,
            }
        }).then(resp => {
            console.log(resp)
            res.status(200).send({ success: "correcto" })
        })
}
exports.eliminar_cuenta = (req, res) => {
    console.log(chalk.red("Eliminar una cuenta especificada"))

    /*
        Este controlador permite al administrador, eliminar una cuenta segun su codigo de id_usuario
    */

    //console.log(req.body)

    usuarios.destroy({
        where: req.body.donde
    }).then(resp => {
        res.status(200).send({ success: resp })
    }).catch(err => {
        res.status(200).send({ error: err })
    })

};
exports.ver_confsendmail = (req, res) => {
    console.log(chalk.blue("Consulta de configuraciones del envio de correos"))

    /*
        Este controlador permite obtener al administrador la lista de configuraciones del sistema de envio de correos
    */

    sendmail.findOne(

    ).then(resp => {
        res.status(200).send({ success: resp })
    }).catch(err => {
        res.status(200).send({ error: err })
    })

};
exports.actualizar_confsendmail = (req, res) => {
    console.log(chalk.blue("Actualizar los datos de envio de correos"))

    jwt.verify(req.headers['x-access-token'], config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Acceso no Autorizado"
            });
        }
        //console.log(decoded)
        id_usuario = decoded.id;
        //next();
    });

    console.log(req.body)

    sendmail.update(
        req.body.donde
        , {
            where: {
                id_sendmail: "1",
            }
        }).then(resp => {
            console.log(resp)
            res.status(200).send({ success: "correcto" })
        })
}


//GESTION DE MENSAJES
exports.enviar_mensaje = (req, res) => {
    console.log(chalk.blue("Enviar mensaje a un usuario"))

    /*
        Este controlador permite al administrador enviar un mensaje a un usuario
    */
    console.log(req.body.donde)
    mensajes.create(
        req.body.donde
    ).then(resp => {
        sendmail.findOne(
        ).then(resp1 => {
            let transport = nodemailer.createTransport({
                host: resp1.dataValues.host,
                port: resp1.dataValues.port,
                auth: {
                    user: resp1.dataValues.user,
                    pass: resp1.dataValues.pass
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
            usuarios.findOne({
                where: {
                    id_usuario: req.body.donde.id_usuario
                }
            }).then(resp2 => {
                var message = {
                    from: resp1.dataValues.user, // Sender address
                    to: resp2.dataValues.email,         // List of recipients
                    subject: req.body.donde.asunto, // Subject line
                    html: req.body.donde.contenido // HTML body
                };

                if (req.body.donde.id_archivo != undefined) {
                    archivos.findOne({
                        where: {
                            id_archivo: req.body.donde.id_archivo
                        }
                    }).then(archivo => {
                        message = {
                            ...message,
                            attachments: [
                                {
                                    filename: req.body.donde.adjuntos,
                                    path: "uploads/" + archivo.dataValues.nombre_original
                                }
                            ]
                        }
                        transport.sendMail(message, function (err, info) {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log(info);
                            }
                        });
                        res.send({ success: "Mensaje enviado" });

                    }).catch(err => {
                        console.log(err)
                    })


                } else {
                    transport.sendMail(message, function (err, info) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log(info);
                        }
                    });
                    res.send({ success: "Mensaje enviado" });
                }



            }).catch(err => {
                console.log(err)
            })
        })

        //si el mensaje es enviado exitosamente, entonces enviar por correo tambien el mismo mensaje
    }).catch(err => {

    })



};



//GESTION DE ARCHIVOS

exports.guardar_archivos = (req, res) => {
    console.log(chalk.blue("Guardar y asignar archivos a un usuario"))

    /*
        Este controlador permite al administrador guardar archivos en un directorio privado y asignarlos a un usuario especifico para que solo pueda ser accedido por el
    */
    archivos.create({
        nombre: req.files[0].originalname,
        nombre_original: req.files[0].filename,
        descripcion: "archivo adjunto",
        ext: req.files[0].originalname.split(".")[parseInt(req.files[0].originalname.split(".").length) - 1],
        size: req.files[0].size,
        estado: "1",
        id_usuario: req.body.id_usuario
    }).then(resp => {
        res.status(200).send({ success: resp })
    }).catch(err => {
        res.status(200).send({ error: err })
    })
};

//GESTION MEMORIAL
exports.ver_memorias = (req, res) => {
    console.log(chalk.blue("Consulta de memorias registradas"))

    /*
        Este controlador permite obtener al administrador ver la lista de cuentas del sistema
    */

    console.log(req.body)
    var donde = {}
    if (req.body.Donde != undefined) {
        if (req.body.Donde.nombres != undefined) {
            donde = {
                ...donde,
                nombres: {
                    [Op.substring]: req.body.Donde.nombres
                }
            }
        }
        if (req.body.Donde.apellidos != undefined) {
            donde = {
                ...donde,
                apellidos: {
                    [Op.substring]: req.body.Donde.apellidos
                }
            }
        }
    }



    memorias.findAll({
        attributes: req.body.Columnas,
        limit: req.body.Limite,
        order: req.body.Orden,

        include: [
            {
                model: galerias
            },
            {
                model: usuarios,
                where: donde,
            },
            {
                model: fotos
            },
        ]
    }).then(resp => {
        memorias.count({
            limit: req.body.Limite,
            order: req.body.Orden,
            include: [
                {
                    model: galerias
                },
                {
                    model: usuarios,
                    where: donde,
                },
                {
                    model: fotos
                },
            ]
        }).then(resp1 => {
            res.status(200).send({ success: { solicitud_contacto: resp, cantidad: resp1 } })
        }).catch(err => {
            res.status(200).send({ error: err })
        })
    }).catch(err => {
        res.status(200).send({ error: err })
    })

};

exports.crear_memoria = (req, res) => {
    console.log(chalk.blue("Crea una plantilla basica de memoria"))

    /*
        Este controlador permite al administrador crear una memoria
    */
    console.log(req.body.donde)
    var crear = req.body.donde
    crear = {
        ...crear,
        slug: req.body.donde.nombres.split("")[0] + "_" + req.body.donde.apellidos.split(" ")[0] + Math.round(Math.random() * 1E9)
    }
    console.log(crear)

    memorias.create(
        crear
    ).then(resp => {
        console.log("Buscar configuraciones de envio de correo")
        sendmail.findOne(
        ).then(resp1 => {
            let transport = nodemailer.createTransport({
                host: resp1.dataValues.host,
                port: resp1.dataValues.port,
                auth: {
                    user: resp1.dataValues.user,
                    pass: resp1.dataValues.pass
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
            console.log("buscar datos del usuario")
            usuarios.findOne({
                where: {
                    id_usuario: req.body.donde.id_usuario
                }
            }).then(resp2 => {
                var message = {
                    from: resp1.dataValues.user, // Sender address
                    to: resp2.dataValues.email,         // List of recipients
                    subject: "Nueva memoria creada", // Subject line
                    html: "<h3>Saludos</h3><p>Se ha creado una nueva memoria en el siguiente <a href='http://" + frontend_url + "/Memorial/" + crear.slug + "'>enlace</a></p>" // HTML body
                };
                console.log("dependiendo de si el nuevo registro llega con id_foto, entonces enviar el mensaje")
                if (req.body.donde.id_foto != undefined) {
                    archivos.findOne({
                        where: {
                            id_archivo: req.body.donde.id_foto
                        }
                    }).then(archivo => {
                        /*message = {
                            ...message,
                            attachments: [
                                {
                                    filename: req.body.donde.adjuntos,
                                    path: "uploads/" + archivo.dataValues.nombre_original
                                }
                            ]
                        }*/
                        transport.sendMail(message, function (err, info) {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log(info);
                            }
                        });
                        res.send({ success: "Mensaje enviado" });

                    }).catch(err => {
                        console.log(err)
                    })


                } else {
                    transport.sendMail(message, function (err, info) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log(info);
                        }
                    });
                    res.send({ success: "Memoria Creada" });
                }



            }).catch(err => {
                console.log(err)
            })
        })

        //si el mensaje es enviado exitosamente, entonces enviar por correo tambien el mismo mensaje
    }).catch(err => {
        res.send({ error: err });
    })



};

exports.actualizar_memoria = (req, res) => {
    console.log(chalk.blue("Actualiza la memoria registrada"))

    /*
        Este controlador permite al administrador crear una memoria
    */
    var crear = req.body.donde
    console.log(crear)



    memorias.update({
        nombres: crear.nombres,
        apellidos: crear.apellidos,
        contenido: crear.contenido,
        fecha_nacimiento: crear.fecha_nacimiento,
        fecha_muerte: crear.fecha_muerte,
        id_foto: crear.id_foto
    },
    {
        where: {
            id_memoria: req.body.donde.id_memoria
        }
    }).then(resp => {
        console.log(resp)
        res.send({ success: "Memoria Actualizada" });
        //si el mensaje es enviado exitosamente, entonces enviar por correo tambien el mismo mensaje
    }).catch(err => {
        res.send({ error: err });
    })



};
exports.eliminar_memoria = (req, res) => {
    console.log(chalk.red("Eliminar una memoria especificada"))

    /*
        Este controlador permite al administrador, eliminar una cuenta segun su codigo de id_usuario
    */

    //console.log(req.body)

    memorias.destroy({
        where: req.body.donde
    }).then(resp => {
        res.status(200).send({ success: resp })
    }).catch(err => {
        res.status(200).send({ error: err })
    })

};

exports.guardar_foto = (req, res) => {
    console.log(chalk.blue("Guardar foto"))

    /*
        Este controlador permite al administrador guardar archivos en un directorio privado y asignarlos a un usuario especifico para que solo pueda ser accedido por el
        Pendiente:
        Crear validacion de tipo de archivos
    */
    fotos.create({
        nombre: req.files[0].originalname,
        nombre_original: req.files[0].filename,
        descripcion: "archivo adjunto",
        ext: req.files[0].originalname.split(".")[parseInt(req.files[0].originalname.split(".").length) - 1],
        size: req.files[0].size,
        estado: "1",
        id_usuario: req.body.id_usuario
    }).then(resp => {
        res.status(200).send({ success: resp })
    }).catch(err => {
        res.status(200).send({ error: err })
    })
};
//---------------------------------------------------

exports.ver_ofertas = (req, res) => {
    //CONTROLADOR DE VISTA PUBLICA DE OFERTAS
    let donde = []
    let limite = 10
    let off = 0
    let orden = [req.body.orden.split(" ")[0], req.body.orden.split(" ")[1]]
    //console.log(orden)

    if (req.body.donde == "") {
        //donde["id_usuario"]=id_usuario
        //donde["id_oferta"] = req.body.donde.split("|")[0].split("=")[1]
    } else {
        let obj = new Object()
        obj["estado"] = "Activo"
        if (req.body.donde.split("|").length == 2 && req.body.donde.split("|")[1] == "") {
            obj[req.body.donde.split("|")[0].split("=")[0]] = req.body.donde.split("|")[0].split("=")[1]
            donde.push(obj)
        } else {
            console.log("es una consulta masiva")
            req.body.donde.split("|")
                .map(x => {
                    let a = x.split("=")[0]
                    let b = x.split("=")[1]
                    let obj = new Object()
                    obj[a] = b
                    donde.push(obj)
                })
        }
    }

    if (req.body.limite != "") {
        let limite = req.body.limite.split(",")[1]
        let off = req.body.limite.split(",")[0]
    } else {
        let limite = 10
        let off = 0
    }
    console.log(donde)
    console.log(limite)
    console.log(off)
    console.log(orden)
    ofertas.findAll({
        order: [orden],
        limit: limite,
        offset: off,
        include: {
            model: tiendas,
        },
        where: donde
    }).then(resp => {
        res.status(200).send({ success: resp })
    })

};

exports.ver_negocios = (req, res) => {
    console.log("CONTROLADOR DE VISTA PUBLICA DE NEGOCIOS")
    let donde = []
    let limite = 10
    let off = 0
    let orden = [req.body.orden.split(" ")[0], req.body.orden.split(" ")[1]]
    //console.log(orden)

    if (req.body.donde == "") {
        //donde["id_usuario"]=id_usuario
        //donde["id_oferta"] = req.body.donde.split("|")[0].split("=")[1]
    } else {
        let obj = new Object()
        obj["estado"] = "Activo"
        if (req.body.donde.split("|").length == 2 && req.body.donde.split("|")[1] == "") {
            obj[req.body.donde.split("|")[0].split("=")[0]] = req.body.donde.split("|")[0].split("=")[1]
            donde.push(obj)
        } else {
            console.log("es una consulta masiva")
            req.body.donde.split("|")
                .map(x => {
                    let a = x.split("=")[0]
                    let b = x.split("=")[1]
                    let obj = new Object()
                    obj[a] = b
                    donde.push(obj)
                })
        }
    }

    if (req.body.limite != "") {
        let limite = req.body.limite.split(",")[1]
        let off = req.body.limite.split(",")[0]
    } else {
        let limite = 10
        let off = 0
    }
    console.log(donde)
    console.log(limite)
    console.log(off)
    console.log(orden)
    tiendas.findAll({
        order: [orden],
        limit: limite,
        offset: off,
        where: donde
    }).then(resp => {
        res.status(200).send({ success: resp })
    })
}

//CRUD DEL CARRITO
//VER CARRITO
exports.ver_carrito = (req, res) => {
    console.log(chalk.red("CONTROLADOR DE VISTA PERSONAL DEL CARRITO"))

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

    let donde = []
    let limite = 10
    let off = 0
    let orden = [req.body.orden.split(" ")[0], req.body.orden.split(" ")[1]]
    //console.log(orden)

    if (req.body.donde == "") {
        donde["id_usuario"] = id_usuario
        //donde["id_oferta"] = req.body.donde.split("|")[0].split("=")[1]
    } else {
        let obj = new Object()
        obj["estado"] = "Activo"
        if (req.body.donde.split("|").length == 2 && req.body.donde.split("|")[1] == "") {
            obj[req.body.donde.split("|")[0].split("=")[0]] = req.body.donde.split("|")[0].split("=")[1]
            donde.push(obj)
        } else {
            console.log("es una consulta masiva")
            req.body.donde.split("|")
                .map(x => {
                    let a = x.split("=")[0]
                    let b = x.split("=")[1]
                    let obj = new Object()
                    obj[a] = b
                    donde.push(obj)
                })
        }
    }

    if (req.body.limite != "") {
        let limite = req.body.limite.split(",")[1]
        let off = req.body.limite.split(",")[0]
    } else {
        let limite = 10
        let off = 0
    }
    console.log(chalk.yellow(donde))
    console.log(limite)
    console.log(off)
    console.log(orden)
    carritos.findAll({
        order: [orden],
        limit: limite,
        offset: off,
        where: donde,
        include: [
            ofertas,
            usuarios
        ]
    }).then(resp => {
        res.status(200).send({ success: resp })
    })
}

//ACTUALIZAR CARRITO
exports.actualizar_carrito = (req, res) => {
    console.log(chalk.red("CONTROLADOR DE ACTUALIZAR CARRITO"))

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

    let donde = []
    let limite = 10
    let off = 0
    //console.log(orden)

    if (req.body.donde == "") {
        donde["id_usuario"] = id_usuario
        //donde["id_oferta"] = req.body.donde.split("|")[0].split("=")[1]
    } else {
        donde["id_usuario"] = id_usuario
        let obj = new Object()
        obj["estado"] = "Activo"
        if (req.body.donde.split("|").length == 2 && req.body.donde.split("|")[1] == "") {
            obj[req.body.donde.split("|")[0].split("=")[0]] = req.body.donde.split("|")[0].split("=")[1]
            donde.push(obj)
        } else {
            console.log("es una consulta masiva")
            req.body.donde.split("|")
                .map(x => {
                    let a = x.split("=")[0]
                    let b = x.split("=")[1]
                    let obj = new Object()
                    obj[a] = b
                    donde.push(obj)
                })
        }
    }

    if (req.body.limite != "") {
        let limite = req.body.limite.split(",")[1]
        let off = req.body.limite.split(",")[0]
    } else {
        let limite = 10
        let off = 0
    }
    //console.log(donde[0].id_oferta)
    //console.log(limite)
    //console.log(off)
    //si el producto y el usuario ya estan registrados en el carrito, entonces suma la cantidad, de lo contrario, guarda nuevo registro
    carritos.findAll({
        where: {
            id_oferta: donde[0].id_oferta,
            id_usuario: id_usuario
        }
    }).then(resp => {
        //si hay respuesta, entonces actualizar, si no, agregar.
        console.log(donde)
        if (resp.length === 0) {
            console.log(chalk.blue("NUEVO CARRITO"))
            //agregar
            carritos.create({
                cantidad: donde[1].cantidad,
                id_oferta: donde[0].id_oferta,
                id_usuario: id_usuario,
                estado: "1"
            }).then(resp1 => {
                //carrito creado con exito
                console.log(resp1)
            })
        } else {
            //si estoy en editar, debo reemplazar en lugar de sumar
            if (req.body.columnas === "reemplazar") {
                console.log(chalk.red("ACTUALIZANDO CARRITO"))
                console.log(resp[0].cantidad)
                carritos.update({
                    cantidad: parseInt(donde[1].cantidad),
                }, {
                    where: {
                        id_usuario: id_usuario,
                        id_oferta: donde[0].id_oferta,
                    }
                }).then(resp1 => {
                    //carrito creado con exito
                    console.log(resp1)
                })
            } else {
                console.log(chalk.green("COMPRANDO EL MISMO PRODUCTO"))
                //actualizar
                console.log(resp[0].cantidad)
                carritos.update({
                    cantidad: parseInt(donde[1].cantidad) + parseInt(resp[0].cantidad),
                }, {
                    where: {
                        id_usuario: id_usuario,
                        id_oferta: donde[0].id_oferta,
                    }
                }).then(resp1 => {
                    //carrito creado con exito
                    console.log(resp1)
                })
            }

        }
        res.status(200).send({ success: resp })
    })
}

//ELIMINAR CARRITO
exports.eliminar_carrito = (req, res) => {
    console.log(chalk.red("CONTROLADOR ELIMINAR CARRITO"))

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

    let donde = []
    let limite = 10
    let off = 0
    let orden = [req.body.orden.split(" ")[0], req.body.orden.split(" ")[1]]
    //console.log(orden)

    if (req.body.donde == "") {
        donde["id_usuario"] = id_usuario
        //donde["id_oferta"] = req.body.donde.split("|")[0].split("=")[1]
    } else {
        //donde["id_usuario"]=id_usuario
        let obj = new Object()
        if (req.body.donde.split("|").length == 2 && req.body.donde.split("|")[1] == "") {
            obj[req.body.donde.split("|")[0].split("=")[0]] = req.body.donde.split("|")[0].split("=")[1]
            obj["id_usuario"] = id_usuario
            donde.push(obj)
        }
    }

    if (req.body.limite != "") {
        let limite = req.body.limite.split(",")[1]
        let off = req.body.limite.split(",")[0]
    } else {
        let limite = 10
        let off = 0
    }
    console.log(donde)

    carritos.destroy({
        where: donde
    }).then(resp => {
        res.status(200).send({ success: resp })
    })
}
//CONFIRMAR ORDEN
exports.confirmar_orden = (req, res) => {
    console.log(chalk.red("CONTROLADOR CONFIRMAR ORDEN"))
    //si el usuario llega aqui, entonces copia todos los elementos de la tabla carrito a la tabla orden

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

    let donde = []
    let limite = 10
    let off = 0
    let orden = [req.body.orden.split(" ")[0], req.body.orden.split(" ")[1]]
    //console.log(orden)

    if (req.body.donde == "") {
        donde["id_usuario"] = id_usuario
        //donde["id_oferta"] = req.body.donde.split("|")[0].split("=")[1]
    } else {
        //donde["id_usuario"]=id_usuario
        let obj = new Object()
        if (req.body.donde.split("|").length == 2 && req.body.donde.split("|")[1] == "") {
            obj[req.body.donde.split("|")[0].split("=")[0]] = req.body.donde.split("|")[0].split("=")[1]
            obj["id_usuario"] = id_usuario
            donde.push(obj)
        }
    }

    if (req.body.limite != "") {
        let limite = req.body.limite.split(",")[1]
        let off = req.body.limite.split(",")[0]
    } else {
        let limite = 10
        let off = 0
    }
    console.log(donde)

    carritos.findAll({
        where: {
            id_usuario: id_usuario
        },
    }).then(resp => {
        //se busca y selecciona todos los datos que esten en el carrito de compras del usuario
        resp.map(carrito => {
            ordenes.create({
                id_usuario: carrito["id_usuario"],
                id_oferta: carrito["id_oferta"],
                cantidad: carrito["cantidad"],
                estado: "1",
                reserva: "2"
            })
        })

        console.log("esto esta funcionando?")
        carritos.destroy({
            where: {
                id_usuario: id_usuario
            }
        }).then(resp => {
            res.status(200).send({ success: "Orden creada exitosamente" })
        }).catch(err => {
            console.log(err)
        })
        console.log("esto esta funcionando?")
    }).catch(err => {
        console.log(err)
    })

}
//VER ORDENES DE COMPRA
exports.ver_ordenes = (req, res) => {
    console.log(chalk.red("CONTROLADOR DE LISTA DE ORDEN DE COMPRA"))

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

    let donde = []
    let limite = 10
    let off = 0
    let orden = [req.body.orden.split(" ")[0], req.body.orden.split(" ")[1]]
    //console.log(orden)

    if (req.body.donde == "") {
        donde["id_usuario"] = id_usuario
        //donde["id_oferta"] = req.body.donde.split("|")[0].split("=")[1]
    } else {
        let obj = new Object()
        obj["estado"] = "Activo"
        if (req.body.donde.split("|").length == 2 && req.body.donde.split("|")[1] == "") {
            obj[req.body.donde.split("|")[0].split("=")[0]] = req.body.donde.split("|")[0].split("=")[1]
            donde.push(obj)
        } else {
            console.log("es una consulta masiva")
            req.body.donde.split("|")
                .map(x => {
                    let a = x.split("=")[0]
                    let b = x.split("=")[1]
                    let obj = new Object()
                    obj[a] = b
                    donde.push(obj)
                })
        }
    }

    if (req.body.limite != "") {
        let limite = req.body.limite.split(",")[1]
        let off = req.body.limite.split(",")[0]
    } else {
        let limite = 10
        let off = 0
    }
    console.log(chalk.yellow("***********"))
    console.log(donde)
    console.log(limite)
    console.log(off)
    console.log(orden)
    console.log(chalk.yellow("***********"))
    ordenes.findAll({
        order: [orden],
        limit: limite,
        offset: off,
        where: donde,
        include: [
            ofertas,
            usuarios
        ]
    }).then(resp => {
        res.status(200).send({ success: resp })
    })
}
//VER PEDIDOS AL NEGOCIO
exports.ver_pedidos = (req, res) => {
    console.log(chalk.red("CONTROLADOR DE VISTA DE PEDIDOS (ordenes)"))

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

    let donde = []
    let limite = 10
    let off = 0
    let orden = [req.body.orden.split(" ")[0], req.body.orden.split(" ")[1]]
    //console.log(orden)

    //restringir esta consulta a solo los pedidos realizados al negocio que pertenece al usuario que realiza la consulta
    if (req.body.donde == "") {
        donde["id_usuario"] = id_usuario
        //donde["id_oferta"] = req.body.donde.split("|")[0].split("=")[1]
    } else {
        let obj = new Object()
        //obj["estado"]="Activo"*/
        if (req.body.donde.split("|").length == 2 && req.body.donde.split("|")[1] == "") {
            obj[req.body.donde.split("|")[0].split("=")[0]] = req.body.donde.split("|")[0].split("=")[1]
            donde.push(obj)
        } else {
            console.log("es una consulta masiva")
            req.body.donde.split("|")
                .map(x => {
                    let a = x.split("=")[0]
                    let b = x.split("=")[1]
                    let obj = new Object()
                    obj[a] = b
                    donde.push(obj)
                })
        }
    }

    if (req.body.limite != "") {
        let limite = req.body.limite.split(",")[1]
        let off = req.body.limite.split(",")[0]
    } else {
        let limite = 10
        let off = 0
    }
    console.log(chalk.yellow("***********"))
    console.log(donde)
    console.log(limite)
    console.log(off)
    console.log(orden)
    console.log(chalk.yellow("***********"))
    ordenes.findAll({
        order: [orden],
        limit: limite,
        offset: off,
        where: donde,
        include: [
            ofertas,
            usuarios
        ]
    }).then(resp => {
        res.status(200).send({ success: resp })
    })
}

//ACTUALIZAR PEDIDO
exports.actualizar_pedidos = (req, res) => {
    console.log(chalk.red("CONTROLADOR DE ACTUALIZAR PEDIDOS"))

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

    let donde = []
    let limite = 10
    let off = 0
    //console.log(orden)

    if (req.body.donde == "") {
        donde["id_usuario"] = id_usuario
        //donde["id_oferta"] = req.body.donde.split("|")[0].split("=")[1]
    } else {
        donde["id_usuario"] = id_usuario
        let obj = new Object()
        //obj["estado"] = "Activo"
        if (req.body.donde.split("|").length == 2 && req.body.donde.split("|")[1] == "") {
            obj[req.body.donde.split("|")[0].split("=")[0]] = req.body.donde.split("|")[0].split("=")[1]
            donde.push(obj)
        } else {
            console.log("es una consulta masiva")
            req.body.donde.split("|")
                .map(x => {
                    let a = x.split("=")[0]
                    let b = x.split("=")[1]
                    let obj = new Object()
                    obj[a] = b
                    donde.push(obj)
                })
        }
    }

    if (req.body.limite != "") {
        let limite = req.body.limite.split(",")[1]
        let off = req.body.limite.split(",")[0]
    } else {
        let limite = 10
        let off = 0
    }
    //RECUERDA QUE SOLO PUEDE ACTUALZAR EL PEDIDO EL DUEÑO DE LA OFERTA
    console.log(chalk.yellow("***********"))
    console.log(chalk.blue("Columnas:"))
    console.log(req.body.columnas)
    console.log(chalk.blue("Donde:"))
    console.log(donde)
    console.log(chalk.blue("Limite:"))
    console.log(limite)
    console.log(chalk.blue("Offset:"))
    console.log(off)

    console.log(chalk.yellow("***********"))
    ordenes.findAll({
        where: {
            id_orden: donde[0].id_orden,
        },
        include: {
            model: ofertas,
            include: {
                model: tiendas,
                where: {
                    id_usuario: id_usuario
                }
            }
        }
    }).then(resp => {
        let col = new Object()
        col[req.body.columnas.split("=")[0]] = req.body.columnas.split("=")[1]
        console.log(col)
        ordenes.update(
            col, {
            where: {
                id_orden: donde[0].id_orden,
            }
        }).then(resp1 => {
            //carrito creado con exito
            //console.log(resp1)
            res.status(200).send({ success: "Actualizado exitosamente" })
        }).catch(err => {
            res.status(200).send({ error: err })
        })

    }).catch(err => {
        res.status(200).send({ error: err })
    })
}

exports.ver_transportes = (req, res) => {
    console.log(chalk.red("CONTROLADOR DE VISTA PUBLICA DE TRANSPORTES"))
    let donde = []
    let limite = 10
    let off = 0
    let orden = [req.body.orden.split(" ")[0], req.body.orden.split(" ")[1]]
    //console.log(orden)

    if (req.body.donde == "") {
        //donde["id_usuario"]=id_usuario
        //donde["id_oferta"] = req.body.donde.split("|")[0].split("=")[1]
    } else {
        let obj = new Object()
        obj["estado"] = "Activo"
        if (req.body.donde.split("|").length == 2 && req.body.donde.split("|")[1] == "") {
            obj[req.body.donde.split("|")[0].split("=")[0]] = req.body.donde.split("|")[0].split("=")[1]
            donde.push(obj)
        } else {
            console.log("es una consulta masiva")
            req.body.donde.split("|")
                .map(x => {
                    let a = x.split("=")[0]
                    let b = x.split("=")[1]
                    let obj = new Object()
                    obj[a] = b
                    donde.push(obj)
                })
        }
    }

    if (req.body.limite != "") {
        let limite = req.body.limite.split(",")[1]
        let off = req.body.limite.split(",")[0]
    } else {
        let limite = 10
        let off = 0
    }
    console.log(chalk.yellow("***********"))
    console.log(chalk.blue("Columnas:"))
    console.log(req.body.columnas)
    console.log(chalk.blue("Donde:"))
    console.log(donde)
    console.log(chalk.blue("Limite:"))
    console.log(limite)
    console.log(chalk.blue("Offset:"))
    console.log(off)

    console.log(chalk.yellow("***********"))
    transportes.findAll({
        order: [orden],
        limit: limite,
        offset: off,
        where: donde
    }).then(resp => {
        res.status(200).send({ success: resp })
    })
}