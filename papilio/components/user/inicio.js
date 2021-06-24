/* next.js head */
import Head from 'next/head';
import Link from 'next/link'
import { createRef } from 'react'



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

import AuthService from "../../lib/AuthService"
import { set } from 'js-cookie';
//const link = React.createRef()
//const link = createRef()

export default function inicio(props) {
    const link = React.useRef(90)

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
    const [Columnas, SetColumnas] = useState(["id_mensaje", "asunto", "contenido", "adjuntos", "createdAt"])
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
        archivo: "",
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

    function descargar_archivo(e) {
        console.log(e.currentTarget.name)




        Auth.fetch_file(//carga la lista de campos para las configuraciones del sistema (solo lo pueden ver los administradores)
            global.server + "api/user/descargar_archivo/" + e.currentTarget.name,
            {
                method: 'GET',
            }
        ).then(resp => {
            resp.blob().then(blb => {
                const href = window.URL.createObjectURL(blb)
                const link = document.createElement('a');
                link.href = href;
                link.download= ModalData.adjuntos
                document.body.appendChild(link);
                link.click();
            })


            //carga_estado()
        }).catch(err => {
            console.log(err)
            alert("Ha ocurrido un problema, por favor, intenta de nuevo")
        })

    }

    function leer(e) {
        //console.log(e.currentTarget.name)
        console.log(Tabla)
        SetModalData({
            asunto: Tabla.contenido[e.currentTarget.name].asunto,
            contenido: Tabla.contenido[e.currentTarget.name].contenido,
            createdAt: Tabla.contenido[e.currentTarget.name].createdAt,
            adjuntos: Tabla.contenido[e.currentTarget.name].adjuntos,
            archivo: Tabla.contenido[e.currentTarget.name].archivo,
        })
        handleShow()

    }
    function eliminar(e) {
        console.log(e.currentTarget.name)//obtiene el indice de la entrada actual
        console.log(Tabla.contenido[e.currentTarget.name].id_contacto) // obtiene el id de la entrada segund el indice seleccionado
        //llamar a la api para borrar el registro
        var donde = {
            id_contacto: Tabla.contenido[e.currentTarget.name].id_contacto
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
            global.server + "api/user/ver_mensajes",
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
        //console.log(link)
        carga_estado()
    }, [Donde, Limite]);

    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>
                                        Asunto
                                    </th>
                                    <th>
                                        Contenido
                                    </th>
                                    <th>
                                        Fecha
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
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </td>
                                        <td >{fila.asunto ? fila.asunto.slice(0, 25) + " ..." : "a"}</td>
                                        <td >{fila.contenido ? fila.contenido.replace(/<[^>]+>/g, '').slice(0, 50) + " ..." : "a"}</td>
                                        <td >{
                                            Date(fila.createdAt)
                                        }</td>
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
                        <h3>Asunto</h3>
                        <p>{ModalData.asunto}</p>
                        <h3>Contenido</h3>
                        <hr></hr>
                        <div dangerouslySetInnerHTML={{ __html: ModalData.contenido }} />
                        <hr></hr>
                        <p>{ModalData.createdAt}</p>
                        <h3>Adjuntos</h3>
                        <p><Button onClick={descargar_archivo} name={ModalData.archivo.nombre_original}>{ModalData.adjuntos}</Button></p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                            </Button>

                    </Modal.Footer>
                </Modal>
            </Row>
        </>

    )
}