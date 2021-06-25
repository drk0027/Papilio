/* next.js head */
import Head from 'next/head';
import Link from "next/link"

/* components */
import React, { useState, useEffect } from 'react';
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import AuthService from "../../lib/AuthService"
import Jumbotron from "react-bootstrap/Jumbotron"
import Carousel from "react-bootstrap/Carousel"
import Container from 'react-bootstrap/Container';
import Card from "react-bootstrap/Card"
import Image from 'react-bootstrap/Image';
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Nav from "react-bootstrap/Nav"
import NavItem from "react-bootstrap/NavItem"
import NavLink from "react-bootstrap/NavLink"
import Dropdown from "react-bootstrap/Dropdown"
import Pagination from "react-bootstrap/Pagination"

export default function inicio(props) {
    const Auth = new AuthService()
    const [Tabla, SetTabla] = useState({
        contenido: props.sistema.solicitud_contacto,
        Paginacion: {
            Paginas: 1,
            Pagina: 0,
            Pag: [
                [0, "active"],
            ]
        }
    })
    const [Columnas, SetColumnas] = useState(["id_usuario", "nombres", "apellidos","fecha_nacimiento","fecha_muerte","slug", "createdAt"])
    const [Donde, SetDonde] = useState({})
    const [Orden, SetOrden] = useState([["createdAt", "DESC"]])
    const [Limite, SetLimite] = useState([0, 10])
    const [Pagina, SetPagina] = useState(0)
    const [Offset, SetOffset] = useState(0)
    const [Formulario, SetFormulario] = useState({
        nombres: "",
        apellidos: ""
    })

    const [Fila, SetFila] = useState({})

    function NN(valor) {
        console.log(valor)
        if (valor == null) {
            console.log("hay un valor nulo")
            return ""
        } else {
            return valor
        }
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

    //control de cambio en los formularios
    function onChangeHandler(e) {
        SetFormulario({
            ...Formulario,
            [e.currentTarget.name]: e.currentTarget.value
        })

    }

    //control de envio cuando se hace submit
    function handleFormSubmit(e) {
        e.preventDefault();
        if (Formulario.nombres != "") {
            if (Formulario.apellidos != "") {
                SetDonde({
                    nombres: Formulario.nombres,
                    apellidos: Formulario.apellidos
                })
            } else {
                SetDonde({
                    nombres: Formulario.nombres
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

    }

    function carga_estado() {
        Auth.fetch(
            global.server + "api/public/ver_memorias",
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
            console.log(resp)
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
    //Actualizacion de estado inicial
    useEffect(() => {
        carga_estado()
    }, [Donde]);
    //console.log(props)
    return (
        <>
            <Container>
                <Row>
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
                    </Form>                </Row>
                <Row>
                    <Row>
                        {Tabla.contenido.map(resp => (
                            <Col >
                                <Card className={"tarjeta_centrada"}>
                                    <Link href={"/Memorial/"+resp.slug}><Card.Img variant="top" src={global.server+"api/public/ver_foto/" + resp.foto.nombre_original} className={"imagen_pequeña"} /></Link>
                                    <Card.Body>
                                        <Card.Text className={"text-center"}>
                                            <>
                                                <h3>{resp.nombres + " " + resp.apellidos} </h3>
                                            </>
                                            <br />
                                            <small>{resp.fecha_nacimiento.slice(0, 10) + " - " + resp.fecha_muerte.slice(0, 10)}</small>
                                            <br />
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>


                </Row>
                <hr></hr>
                <Row>
                    <Col>
                        <Pagination>
                            {
                                Tabla.Paginacion.Pag.map(pg => (
                                    <Pagination.Item key={pg[0]} active={pg[1]} onClick={carga_pagina} name={pg[0]}>
                                        {pg[0]}
                                    </Pagination.Item>
                                ))
                            }
                        </Pagination>
                    </Col>

                </Row>
            </Container>
        </>
    )
}
