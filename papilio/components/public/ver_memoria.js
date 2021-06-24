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
import Card from "react-bootstrap/Card"
import Image from 'react-bootstrap/Image';
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Nav from "react-bootstrap/Nav"
import NavItem from "react-bootstrap/NavItem"
import NavLink from "react-bootstrap/NavLink"
import Dropdown from "react-bootstrap/Dropdown"


export default function inicio(props) {
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

    }

    //control de envio cuando se hace submit
    function handleFormSubmit(e) {
        e.preventDefault();

    }
    //Actualizacion de estado inicial
    useEffect(() => {

    }, []);

    return (
        <>
            <Card className={"tarjeta_centrada"}>
                <Card.Img variant="top" src={global.server+"api/public/ver_foto/"+ props.sistema.foto.nombre_original} className={"imagen_pequeña"} />
                <Card.Body>
                    <Card.Text className={"text-center"}>
                        <Container>
                            {props.sistema.nombres+" "+ props.sistema.apellidos}
                        </Container>
                        <small>{props.sistema.fecha_nacimiento.slice("0","10") + " - " + props.sistema.fecha_muerte.slice("0","10")}</small>
                    </Card.Text>
                </Card.Body>
            </Card>

            <Container>
                <Row>
                    <Col>
                        {props.sistema.contenido.split("\n").map((resp,index)=><p key={index}>{resp}</p>)}
                    </Col>
                </Row>
            </Container>
        </>
    )
}
