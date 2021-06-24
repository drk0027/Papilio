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


export default function inicio() {

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
        <Jumbotron>
          <h1>Sistema de Gestion Funeraria "Papilio"</h1>
          <p>Papilio es un sistema de gestion funerario que tiene como meta incrementar la presencia digital de las empresas y mejorar su contacto con los clientes</p>
        </Jumbotron>
        <Container>
          <Row>
            <Col>
              <h2>Optimizacion SEO</h2>
              <p>
                Papilio ofrece una presencia optimizada en SEO mediante la implementacion de un FrontEnd confeccionado en NextJS, con el fin de disfrutar de todas las ventajas que ofrece ReactJS, renderizando desde el servidor, de tal manera que los WebCrawler, sean capaces de localizar facilmente la implementacion y sean indexados para su posterior aparicion en los buscadores mas importantes de la red
              </p>
            </Col>
            <Col>
              <h2>Gestion de autoridades</h2>
              <p>Utilizando tecnologias modernas, la autenticacion de los usuarios, la gestion de tokens y demas servicios de seguridad se han desarrollado con el fin de ofrecer la maxima seguridad</p>
            </Col>
          </Row>
          <hr></hr>
          <Row>
            <Col>
            <h3>Sistema de gestion de Paginas Web</h3>
            </Col>
          </Row>
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
        </Container>
        <hr></hr>
        <Jumbotron>
          <h1>
            Amable con el usuario
          </h1>
          <p>
            Papilio esta pensado tambien para la atencion al usuario
          </p>
        </Jumbotron>
        <Container>
          <Row>
            <Col>
              <h2>Gestion de datos de usuario</h2>
              <p>Papilio pone al alance del usuario una lista de archivos que comparte con la empresa, pudiendo consultaros en cualquier momento usando sus credenciales</p>
            </Col>
            <Col>
              <h2>Gestion de Contacto</h2>
              <p>Papilio tambien permite a los dueños del negocio crear formularios que le permiten entrar en contacto directo con los usuarios</p>
            </Col>
            <Col>
            <h2>
              Cementerio Virtual
            </h2>
            <p>Permita a sus Clientes tener un recuerdo de sus seres queridos en la red.</p>
            <p>Papilio dispone de una seccion especializada para que los usuarios puedan visitar un perfil de sus seres queridos, el cual se puede acceder mediante un codigo QR en la lapida, que al escanearse, permite a cualquier persona visitar y tener mas informacion sobre el difunto que se encuentra en su lapida.</p>
            </Col>
          </Row>
        </Container>
        </>
    )
}