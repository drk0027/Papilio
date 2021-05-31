/* next.js head */
import Head from 'next/head';

/* components */
import React, { useState, useEffect } from 'react';
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import AuthService from "../../lib/AuthService"
import Jumbotron from "react-bootstrap/Jumbotron"
import Carousel from "react-bootstrap/Carousel"
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Nav from "react-bootstrap/Nav"
import NavItem from "react-bootstrap/NavItem"
import NavLink from "react-bootstrap/NavLink"
import Dropdown from "react-bootstrap/Dropdown"


export default function inicio(props) {
    const Auth = new AuthService()

    const [Formulario, SetFormulario] = useState({
        nombre: "",
        correo: "",
        telefono: "",
        mensaje: "",
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

    //control de cambio en los formularios
    function onChangeHandler(e) {
        SetFormulario({
            ...Formulario,
            [e.currentTarget.name]: e.currentTarget.value
        })
        console.log(Formulario)
        //setNombre_empresa()

    }

    //control de envio cuando se hace submit
    function handleFormSubmit(e) {
        e.preventDefault();
        /*
            Formato:
            var columnas = ["sdff", "asdf", "asdf", "asdf", "sdfg"]
            var donde = []
            donde.push(["col","=","val"])
            donde.push(["col2","=","val2"])
            var orden=["id_sistema","DESC"] //columna -> ASC/DESC
            var grupo = ["col"]; //columna por la que se agrupará
            var limite = ["0","10"]; //combinacion entre valor valor inicial y offset
        */

        var columnas = Formulario

        Auth.fetch(//carga la lista de campos para las configuraciones del sistema (solo lo pueden ver los administradores)
            global.server + "api/public/agregar_contacto",
            {
                method: 'POST',
                body: JSON.stringify({
                    columnas,
                }),
            }
        ).then(resp => {
            //console.log(resp)
            alert("Actualizado con exito")
        }).catch(err => {
            console.log(err)
            alert("Ha ocurrido un problema, por favor, intenta de nuevo")
        })

        SetFormulario({
            nombre: "",
            correo: "",
            telefono: "",
            mensaje: "",
        })

    }
    //Actualizacion de estado inicial
    useEffect(() => {

    }, []);
    return (
        <>
            <Jumbotron>
                <h3>Contacta con nosotros</h3>
                <p>Estaremos felices de servirte</p>
            </Jumbotron>
            <Container>
                <Row>

                    <Col>
                        <Form onSubmit={handleFormSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" placeholder="Nombre" onChange={onChangeHandler} name="nombre" required value={Formulario["nombre"]} />
                                <Form.Text className="text-muted">
                                    Escriba Su nombre
                            </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Correo Electronico</Form.Label>
                                <Form.Control type="text" placeholder="Correo Electronico" onChange={onChangeHandler} name="correo" value={Formulario["correo"]} required />
                                <Form.Text className="text-muted">
                                    Correo Electronico
                            </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Telefono</Form.Label>
                                <Form.Control type="text" placeholder="Telefono" onChange={onChangeHandler} name="telefono" value={Formulario["telefono"]} required />
                                <Form.Text className="text-muted">
                                    Telefono
                            </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Mensaje</Form.Label>
                                <Form.Control as="textarea" type="textarea" placeholder="Mensaje" onChange={onChangeHandler} name="mensaje" value={Formulario["mensaje"]} rows={3} />

                                <Form.Text className="text-muted">
                                    Mensaje de texto
                            </Form.Text>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Guardar
                        </Button>
                        </Form>
                    </Col>
                    <Col>

                        <Carousel>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="/img1.svg"
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3>First slide label</h3>
                                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="img1.svg"
                                    alt="Second slide"
                                />

                                <Carousel.Caption>
                                    <h3>Second slide label</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="img1.svg"
                                    alt="Third slide"
                                />

                                <Carousel.Caption>
                                    <h3>Third slide label</h3>
                                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                        <h3>Contacta con nosotros</h3>
                        <p>{props.info_sistema.descripcion}</p>
                        <hr></hr>

                        <p><b>Telefono 1:</b> {props.info_sistema.telefono1}</p>
                        <p><b>Telefono 2:</b> {props.info_sistema.telefono2}</p>
                        <p><b>Correo1:</b> {props.info_sistema.correo1}</p>
                        <p><b>Correo2:</b> {props.info_sistema.correo2}</p>
                        <p><b>Direccion:</b> {props.info_sistema.direccion}</p>
                    </Col>

                </Row>
            </Container>
        </>
    )
}
