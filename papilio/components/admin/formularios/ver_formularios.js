/* next.js head */
import Head from 'next/head';

/* components */
//import NavBar from '../components/navbar'
//import Footer from '../footer/Footer';

import React, { useState, useEffect } from 'react';
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Table from "react-bootstrap/Table"
import Dropdown from "react-bootstrap/Dropdown"
import Modal from "react-bootstrap/Modal"
import Image from "react-bootstrap/Image"
import Breadcrumb from "react-bootstrap/Breadcrumb"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Pagination from "react-bootstrap/Pagination"

import AuthService from "../../../lib/AuthService"
import { set } from 'js-cookie';


export default function inicio(props) {
    const Auth = new AuthService()
    const [Tabla, SetTabla] = useState({
        contenido: [[]],
        Paginacion: {
            Paginas: 1,
            Pagina: 0,
            Pag: [
                [0, "active"],
            ]
        }
    })
    const [Columnas, SetColumnas] = useState(["id_contacto", "nombre", "correo", "telefono", "createdAt", "estado", "mensaje"])
    const [Donde, SetDonde] = useState({})
    const [Orden, SetOrden] = useState([["createdAt", "DESC"]])
    const [Limite, SetLimite] = useState([0, 10])
    const [Pagina, SetPagina] = useState(0)
    const [Offset, SetOffset] = useState(0)
    const [Formulario, SetFormulario] = useState({
        nombre: "",
        correo: ""
    })


    const [Show, SetShow] = useState(false)
    const [ModalData, SetModalData] = useState({
        nombre: "",
        correo: "",
        telefono: "",
        createdAt: "",
        estado: "",
        mensaje: ""
    })

    function NN(valor) {
        console.log(valor)
        if (valor == null) {
            console.log("hay un valor nulo")
            return ""
        } else {
            return valor
        }
    }
    function leer(e) {
        //console.log(e.currentTarget.name)
        SetModalData({
            nombre: Tabla.contenido[e.currentTarget.name].nombre,
            correo: Tabla.contenido[e.currentTarget.name].correo,
            telefono: Tabla.contenido[e.currentTarget.name].telefono,
            createdAt: Tabla.contenido[e.currentTarget.name].createdAt,
            estado: Tabla.contenido[e.currentTarget.name].estado,
            mensaje: Tabla.contenido[e.currentTarget.name].mensaje
        })
        handleShow()

    }
    function eliminar(e){
        console.log(e.currentTarget.name)//obtiene el indice de la entrada actual
        console.log(Tabla.contenido[e.currentTarget.name].id_contacto) // obtiene el id de la entrada segund el indice seleccionado
        //llamar a la api para borrar el registro
        var donde={
            id_contacto:Tabla.contenido[e.currentTarget.name].id_contacto
        }
        Auth.fetch(//carga la lista de campos para las configuraciones del sistema (solo lo pueden ver los administradores)
            global.server + "api/admin/eliminar_solicitud_contacto",
            {
                method: 'POST',
                body: JSON.stringify({
                    donde,
                }),
            }
        ).then(resp => {
            console.log(resp)
            carga_estado()
        }).catch(err => {
            console.log(err)
            alert("Ha ocurrido un problema, por favor, intenta de nuevo")
        })


        //actualizar el estado Tabla

    }

    function handleClose(to) {
        SetShow(false)
    }
    function handleShow(to) {
        SetShow(true)
    }
    function carga_pagina(e) {
        if (e.currentTarget.name != undefined) {
            console.log("pagina seleciconada" + e.currentTarget.name)
            console.log("Resultado de la operacion" + (e.currentTarget.name) * 10)
            SetLimite([(e.currentTarget.name) * 10, 10])
            SetPagina(e.currentTarget.name)
            console.log(Pagina)
            console.log(Offset)
        }
    }

    function carga_estado() {
        Auth.fetch(//carga la lista de campos para las configuraciones del sistema (solo lo pueden ver los administradores)
            global.server + "api/admin/ver_solicitud_contacto",
            {
                method: 'POST',
                body: JSON.stringify({
                    Columnas,
                    Donde,
                    Orden,
                    Limite
                }),
            }
        ).then(resp => {
            var paginas = 1
            if (resp.success.cantidad % 10 > 0) {
                paginas = parseInt(resp.success.cantidad / 10) + 1
            } else {
                paginas = parseInt(resp.success.cantidad / 10)
            }
            var pag = []

            for (var i = 0; i < paginas; i++) {
                //console.log(i)
                if (i == Pagina) {
                    pag.push([i, "active"])
                } else {
                    pag.push([i])
                }
            }
            /*console.log("hay " + resp.success.cantidad + " registros")
            console.log("hay " + paginas + " Paginas")
            console.log("estamos en la pagina " + Pagina + " ")
            console.log("estamos en la pagina " + Tabla.Paginacion.Pag + " ")
            console.log(pag)*/

            SetTabla({
                ...Tabla,
                contenido: resp.success.solicitud_contacto,
                Paginacion: {
                    Paginas: paginas,
                    Pagina: Pagina,
                    Pag: pag
                }

            })
        }).catch(err => {
            console.log(err)
            alert("Ha ocurrido un problema, por favor, intenta de nuevo")
        })

    }

    //control de cambio en los formularios
    function onChangeHandler(e) {
        //console.log(e.currentTarget.name)
        //console.log(e.currentTarget.value)
        SetFormulario({
            ...Formulario,
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    //control de envio cuando se hace submit
    function handleFormSubmit(e) {
        e.preventDefault();
        //aqui se debe realizar la busqueda de campos segun nombre o correo
        if (Formulario.nombre != "") {
            if (Formulario.correo != "") {
                SetDonde({
                    nombre: Formulario.nombre,
                    correo: Formulario.correo
                })
            } else {
                SetDonde({
                    nombre: Formulario.nombre,
                })
            }
        } else {
            if (Formulario.correo != "") {
                SetDonde({
                    correo: Formulario.correo
                })
            } else {
                SetDonde({})
            }
        }
    }
    //Actualizacion de estado inicial
    useEffect(() => {
        carga_estado()
    }, [Donde, Limite]);

    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Row>
                            <Col>
                                <Form className="col-lg-12 col-md-12 col-sm-12" onSubmit={handleFormSubmit}>
                                    <Form.Group controlId="formBasicName">
                                        <Form.Label>Buscar por Nombre</Form.Label>
                                        <Form.Control type="text" placeholder="Nombre del Negocio" name="nombre" value={Formulario.nombre} onChange={onChangeHandler} />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicName">
                                        <Form.Label>Buscar por Correo electronico</Form.Label>
                                        <Form.Control type="text" placeholder="Nombre del Negocio" name="correo" value={Formulario.correo} onChange={onChangeHandler} />
                                    </Form.Group>
                                    <Button type="submit">Buscar</Button>
                                </Form>
                            </Col>
                        </Row>

                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>
                                        Nombre
                                    </th>
                                    <th>
                                        Correo Electronico
                                    </th>
                                    <th>
                                        Telefono
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Tabla.contenido.map((fila, index) => (
                                    <tr >
                                        <td >
                                            <Dropdown >
                                                <Dropdown.Toggle variant="success" id="dropdown-basic">

                                                </Dropdown.Toggle>
                                                <Dropdown.Menu >
                                                    <Dropdown.Item onClick={leer} name={index} >Leer</Dropdown.Item>
                                                    <Dropdown.Item onClick={eliminar} name={index}>Borrar</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </td>
                                        <td >{fila.nombre}</td>
                                        <td >{fila.correo}</td>
                                        <td >{fila.telefono}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </Table>
                        <Pagination>
                            {
                                Tabla.Paginacion.Pag.map(pg => (
                                    <Pagination.Item key={pg[0]} active={pg[1]} onClick={carga_pagina} name={pg[0]}>
                                        {pg[0]}
                                    </Pagination.Item>
                                ))
                            }
                        </Pagination>
                    </Card>
                </Col>
                <Modal show={Show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Leer Solicitud de Contacto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h3>Nombre</h3>
                        <p>{ModalData.nombre}</p>
                        <h3>Correo Electronico</h3>
                        <p>{ModalData.correo}</p>
                        <h3>Telefono</h3>
                        <p>{ModalData.telefono}</p>
                        <h3>Mensaje</h3>
                        <p>{ModalData.mensaje}</p>
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            No
                            </Button>

                    </Modal.Footer>
                </Modal>
            </Row>
        </>

    )
}