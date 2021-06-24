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

import Editar_cuentas from "./editar_cuentas"
import Enviar_mensaje from "./enviar_mensaje"
import Crear_memoria from "./crear_memoria"

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
    const [Columnas, SetColumnas] = useState(["id_usuario", "nombres", "apellidos", "telefono1", "telefono2", "email", "email2", "cedula","direccion1","direccion2", "createdAt"])
    const [Donde, SetDonde] = useState({})
    const [Orden, SetOrden] = useState([["createdAt", "DESC"]])
    const [Limite, SetLimite] = useState([0, 10])
    const [Pagina, SetPagina] = useState(0)
    const [Offset, SetOffset] = useState(0)
    const [Formulario, SetFormulario] = useState({
        nombres: "",
        apellidos: ""
    })

    const [Fila,SetFila] = useState({})

    const [Show, SetShow] = useState(false)
    const [Modalmensaje, SetModalmensaje] = useState(false)
    const [Modalmemoria, SetModalmemoria] = useState(false)
    

    function NN(valor) {
        console.log(valor)
        if (valor == null) {
            console.log("hay un valor nulo")
            return ""
        } else {
            return valor
        }
    }
    function crear_memoria(e) {
        //console.log(e.currentTarget.name)
        console.log(e.currentTarget.name)
        SetFila(Tabla.contenido[e.currentTarget.name])
        abrir_modal_memoria()
        //handleShow()

    }
    function abrir_modal_memoria(to) {
        
        SetModalmemoria(true)
    }
    function cerrar_modal_memoria(to) {
        carga_estado()
        SetModalmemoria(false)
    }
    function enviar_mensaje(e) {
        //console.log(e.currentTarget.name)
        console.log(e.currentTarget.name)
        SetFila(Tabla.contenido[e.currentTarget.name])
        abrir_modal_mensaje()
        //handleShow()

    }
    function cerrar_modal_mensaje(to) {
        carga_estado()
        SetModalmensaje(false)
    }
    function abrir_modal_mensaje(to) {
        
        SetModalmensaje(true)
    }
    function abrir_modal_mensaje(to) {
        
        SetModalmemoria(true)
    }


    function editar(e) {
        //console.log(e.currentTarget.name)
        console.log(e.currentTarget.name)
        SetFila(Tabla.contenido[e.currentTarget.name])

        handleShow()

    }

    function crear(){
        SetFila({})
        handleShow()

    }
    function eliminar(e) {
        console.log(e.currentTarget.name)//obtiene el indice de la entrada actual
        console.log(Tabla.contenido[e.currentTarget.name].id_usuario) // obtiene el id de la entrada segund el indice seleccionado
        //llamar a la api para borrar el registro
        var donde = {
            id_usuario: Tabla.contenido[e.currentTarget.name].id_usuario
        }
        Auth.fetch(//carga la lista de campos para las configuraciones del sistema (solo lo pueden ver los administradores)
            global.server + "api/admin/eliminar_cuenta",
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
        carga_estado()
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
        Auth.fetch(
            global.server + "api/admin/ver_cuentas",
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
            console.log(resp.success)
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
        if (Formulario.nombres != "") {
            if (Formulario.apellidos != "") {
                SetDonde({
                    nombres: Formulario.nombres,
                    apellidos: Formulario.apellidos
                })
            } else {
                SetDonde({
                    nombres: Formulario.nombres,
                })
            }
        } else {
            if (Formulario.apellidos != "") {
                SetDonde({
                    apellidos: Formulario.apellidos
                })
            } else {
                SetDonde({})
            }
        }
        console.log(Formulario)
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
                                        <Form.Label>Buscar por Nombres</Form.Label>
                                        <Form.Control type="text" placeholder="Nombres" name="nombres" value={Formulario.nombres} onChange={onChangeHandler} />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicName">
                                        <Form.Label>Buscar por Apellidos</Form.Label>
                                        <Form.Control type="text" placeholder="Apellidos" name="apellidos" value={Formulario.apellidos} onChange={onChangeHandler} />
                                    </Form.Group>
                                    <Button type="submit">Buscar</Button>
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            <Col><Button onClick={crear}>Crear nuevo perfil</Button></Col>
                        </Row>

                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>
                                        Nombres
                                    </th>
                                    <th>
                                        Apellidos
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
                                                    <Dropdown.Item onClick={editar} name={index} >Editar</Dropdown.Item>
                                                    <Dropdown.Item onClick={eliminar} name={index}>Borrar</Dropdown.Item>
                                                    <Dropdown.Item onClick={enviar_mensaje} name={index}>Enviar Mensaje</Dropdown.Item>
                                                    <Dropdown.Item onClick={crear_memoria} name={index}>Crear Memoria</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </td>
                                        <td >{fila.nombres}</td>
                                        <td >{fila.apellidos}</td>
                                        <td >{fila.email}</td>
                                        <td >{fila.telefono1}</td>
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
                        <Modal.Title>
                            <h3>Crear o editar un perfil</h3>
                            
                            </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <p>Se generará una contraseña aleatoria que se enviará por el correo especificado</p>
                        <Editar_cuentas Fila={Fila}></Editar_cuentas>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancelar
                            </Button>

                    </Modal.Footer>
                </Modal>
                <Modal show={Modalmensaje} onHide={cerrar_modal_mensaje}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <h3>Enviar un mensaje a {Fila.nombres + " " + Fila.apellidos}</h3>
                            </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <p>Los mensajes son notificaciones que sirven de registro para el usuario. En estas, el usuario puede consultar informacion importante y recuperar archivos en el momento que desee</p>
                        <Enviar_mensaje Fila={Fila}></Enviar_mensaje>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={cerrar_modal_mensaje}>
                            Cancelar
                            </Button>

                    </Modal.Footer>
                </Modal>
                <Modal show={Modalmemoria} onHide={cerrar_modal_memoria}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <h3>Crear una memoria para el usuario {Fila.nombres + " " + Fila.apellidos}</h3>
                            </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <p>Las memorias son los registros que dejan los usuarios sobre sus seres queridos fallecidos. En esta pantalla el administrador puede crear el contenido inicial que el usuario podra complementar si asi lo desea</p>
                        <Crear_memoria Fila={Fila}></Crear_memoria>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={cerrar_modal_memoria}>
                            Cancelar
                            </Button>

                    </Modal.Footer>
                </Modal>
            </Row>
        </>

    )
}