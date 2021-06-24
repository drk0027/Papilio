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
import Alert from "react-bootstrap/Alert"


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
                <h3>Quienes somos</h3>
                <p>Duis in adipisicing proident id labore sunt nostrud. Ut consectetur exercitation anim veniam eiusmod tempor minim qui cillum eu voluptate in ut. Incididunt ipsum incididunt reprehenderit exercitation veniam excepteur consectetur cillum in sit est enim deserunt. Duis aute nisi ut qui consectetur excepteur. Ut Lorem excepteur officia ea nulla sunt occaecat Lorem. Ex labore cupidatat consequat ut cupidatat mollit nisi. Dolore consequat consectetur voluptate anim.</p>
            </Jumbotron>

            <Container>
                <Row>
                    <Col>
                        <h2>Quienes Somos</h2>
                        <hr></hr>
                        <p>
                            Aute aute dolor excepteur tempor aute incididunt irure esse tempor quis nulla exercitation ipsum nostrud. Ipsum labore magna dolore reprehenderit anim amet amet pariatur eiusmod ullamco nisi culpa dolor. Eu qui aliqua deserunt eu anim. Eiusmod pariatur amet pariatur excepteur officia minim nisi nostrud officia et laboris consequat tempor. Commodo voluptate eu minim duis culpa do fugiat ad laborum id. Veniam do irure sunt deserunt laboris nostrud velit voluptate labore amet non nulla dolore. Sit eiusmod deserunt pariatur magna quis occaecat consectetur dolore incididunt.
              </p>
                    </Col>
                    <Col>
                        <h2>Que hacemos</h2>
                        <p>Tempor nostrud velit incididunt exercitation officia Lorem velit laboris dolore Lorem eu eiusmod. Do occaecat esse fugiat amet nulla. Duis sit aliqua aute fugiat reprehenderit deserunt esse enim est aute labore veniam velit. Deserunt laborum ut qui labore.</p>
                    </Col>
                </Row>
                <hr></hr>
                <Row>
                    <Col>
                        <h3>Confianza y Eficiencia</h3>
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
                    Nuestros Valores Corporativos
                </h1>
                <p>
                    Irure aliqua velit laborum nostrud anim in officia velit esse cillum. Veniam amet irure reprehenderit proident qui qui duis do eiusmod irure. Dolor eu incididunt nostrud mollit adipisicing aute non exercitation laboris. Occaecat cupidatat minim qui reprehenderit sunt qui labore minim.
                </p>
            </Jumbotron>
            <Container>
                <Row>
                    <Col>
                        <Alert variant="success">
                            <Alert.Heading>Vision</Alert.Heading>
                            <p>
                                Fugiat velit nisi enim qui et dolor mollit deserunt ut eiusmod ullamco consectetur tempor. Cillum veniam dolor occaecat fugiat adipisicing. Proident aute consequat voluptate nostrud. Fugiat veniam nostrud officia exercitation consequat commodo culpa.
                            </p>
                        </Alert>
                    </Col>
                    <Col>
                    <Alert variant="success">
                            <Alert.Heading>Mision</Alert.Heading>
                            <p>
                                Fugiat velit nisi enim qui et dolor mollit deserunt ut eiusmod ullamco consectetur tempor. Cillum veniam dolor occaecat fugiat adipisicing. Proident aute consequat voluptate nostrud. Fugiat veniam nostrud officia exercitation consequat commodo culpa.
                            </p>
                        </Alert>
                    </Col>
                    
                </Row>
            </Container>
        </>
    )
}