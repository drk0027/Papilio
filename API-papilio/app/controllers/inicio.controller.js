const db = require("../models");
const chalk = require('chalk');

const usuarios = db.usuarios;
//MODELOS DE TIENDAS
const tiendas = db.tiendas;
const tipos_tienda = db.tipos_tienda;
const carritos = db.carritos;
const ordenes = db.ordenes;
const transportes = db.transportes;

//MODELOS DE OFERTA
const ofertas = db.ofertas;

const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
var fs = require('fs');

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
        where:{
            id_orden: donde[0].id_orden,
        },
        include: {
            model: ofertas,
            include:{
                model:tiendas,
                where: {
                    id_usuario: id_usuario
                }
            }
        }
    }).then(resp => {
        let col = new Object()
        col[req.body.columnas.split("=")[0]]=req.body.columnas.split("=")[1]
        console.log(col)
        ordenes.update(
            col,{
            where: {
                id_orden: donde[0].id_orden,
            }
        }).then(resp1 => {
            //carrito creado con exito
            //console.log(resp1)
            res.status(200).send({ success: "Actualizado exitosamente" })
        }).catch(err=>{
            res.status(200).send({ error: err })
        })
            
    }).catch(err=>{
        res.status(200).send({error:err})
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