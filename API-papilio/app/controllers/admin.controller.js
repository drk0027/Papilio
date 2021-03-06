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

//SISTEMA
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
        //comparo si las contrase??as coinciden
        console.log(bcrypt.compareSync(req.body.donde.a_password, resp.dataValues.password))
        if (bcrypt.compareSync(req.body.donde.a_password, resp.dataValues.password) == true) {
            console.log("las contrase??as coinciden")
            //confirmo si las nuevas coinciden
            if (req.body.donde.n_password == req.body.donde.r_password) {
                //si se cumple todo esto, actualizo la contrase??a

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
                res.status(200).send({ error: "La contrase??a nueva y repetida no coinciden" })
            }
        } else {
            res.status(200).send({ error: "Las contrase??as no coinciden" })
        }

    }).catch(err => {

    })

    //en caso de coincidir, registrar la nueva contrase??a, siempre y cuando coincida con la repeticion

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
    var contrase??a = Math.random().toString(36).slice(2) //generada automaticamente
    console.log(contrase??a)
    //agregar una funcion sendmail para enviar la notificacion de usuario creado con su contrase??a temporal

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
        password: bcrypt.hashSync(contrase??a, 8)
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
                    html: resp1.dataValues.mensaje_registro + "<hr><h3>Credenciales:</h3><p><b>Nombre de usuario/Correo Electronico:</b>" + req.body.donde.email + "</p><p><b>Contrase??a:</b>" + contrase??a + "</p><p><b>Importante!</b></p><p>Cambie la contrase??a lo mas pronto posible</p>" // Plain text body
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
