const db = require("../models");
const chalk = require('chalk');

const usuarios = db.usuarios;
//MODELOS DE SISTEMA
const sistemas = db.sistemas;
const contactos = db.contactos;
const memorias = db.memorias;
const fotos = db.fotos;
const galerias = db.galerias;

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

exports.ver_memoria = (req, res) => {
    console.log(chalk.blue("Ver memoria unica"))

    /*
        Este controlador permite ver las memorias publicadas
    */
    //res.status(200).send({ success: "exito" })
    //res.status(200).send({ success: req.body })
    console.log(req.body)
    memorias.findOne({
        where: req.body.Donde,
        include:[{
            model:fotos
        },{
            model:galerias
        },{
            model:usuarios
        }],
    }).then(resp=>{
        res.status(200).send({ success: resp })
    }).catch(err=>{
        res.status(200).send({ error: err })
    })
};

exports.ver_memorias = (req, res) => {
    console.log(chalk.blue("Ver memorias multiples"))

    /*
        Este controlador permite ver las memorias publicadas
    */
    //res.status(200).send({ success: "exito" })
    //res.status(200).send({ success: req.body })
    console.log(req.body)
    var donde={}
    if(req.body.Donde.nombres!=undefined){
        donde={
            ...donde,
            nombres:{
                [Op.substring]:req.body.Donde.nombres
            }
        }
    }
    if(req.body.Donde.apellidos!=undefined){
        donde={
            ...donde,
            apellidos:{
                [Op.substring]:req.body.Donde.apellidos
            }
        }
    }
    memorias.findAll({
        attributes: req.body.Columnas,
        limit: req.body.Limite,
        order: req.body.Orden,
        where: donde,
        include:[{
            model:fotos
        }],
    }).then(resp=>{
        memorias.count({
            limit: req.body.Limite,
            order: req.body.Orden,
            where: req.body.Donde
        }).then(resp1 => {
            res.status(200).send({ success: { solicitud_contacto: resp, cantidad: resp1 } })
        }).catch(err=>{
            res.status(200).send({ error: err })
        })
        
    }).catch(err=>{
        res.status(200).send({ error: err })
    })
};

exports.ver_foto = (req, res) => {
    console.log(chalk.blue("Ver foto"))

    /*
        Este controlador permite ver las memorias publicadas
    */
    //res.status(200).send({ success: "exito" })
    //res.status(200).send({ success: req.body })
    console.log(req.params)
    res.sendFile(process.cwd()+"/uploads/"+req.params.nombre)
};