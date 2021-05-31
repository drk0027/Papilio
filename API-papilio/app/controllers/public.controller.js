const db = require("../models");
const chalk = require('chalk');

const usuarios = db.usuarios;
//MODELOS DE SISTEMA
const sistemas = db.sistemas;
const contactos = db.contactos;

const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
var fs = require('fs');

//Informacion publica del sistema

exports.ver_sistema = (req, res) => {
    console.log(chalk.blue("Consulta de configuraciones del sistema para vision publica"))

    /*
        Este controlador permite obtener al administrador la lista de variables del entorno, se utiliza para actualizar las configuraciones del sistema
    */
    //res.status(200).send({ success: "exito" })
    sistemas.findOne({
        attributes: [
            "nombre_empresa",
            "nombres_propietario",
            "apellidos_propietario",
            "telefono1",
            "telefono2",
            "correo1",
            "correo2",
            "direccion",
            "descripcion",
        ]
        ,
        where: {
            id_sistema: "1"
        }
    }).then(resp => {
        res.status(200).send({ success: resp })
    }).catch(err => {
        res.status(200).send({ error: err })
    })

};

exports.agregar_contacto = (req, res) => {
    console.log(chalk.blue("Agregar informacion de contacto"))

    /*
        Este controlador permite agregar la solicitud de informacion de las personas interesadas
    */
    //res.status(200).send({ success: "exito" })
    //res.status(200).send({ success: req.body })

    contactos.create({
        ...req.body.columnas,
        ip:req.ip
    }).then(resp => {
        res.status(200).send({ success: req.body })
    }).catch(err => {
        console.log(err)
        res.status(200).send({ error: err })
    })
};