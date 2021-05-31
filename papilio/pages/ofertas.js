import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Link from 'next/link'
import React, { useState } from 'react';

import Layout from '../components/layout'
import NavBar from '../components/navbar'
import Sidebar from '../components/sidebar'

import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from 'react-bootstrap/Button';
import AuthService from "../lib/AuthService"

//import md from 'markdown-it';
var md = require('markdown-it')();

export async function getServerSideProps(context) {
  const { req } = context;
  const Auth = new AuthService()
  const isLoggedIn = Auth.ServerloggedIn(req)

  var libretas = ""
  console.log(global.server + "/api/libretas/")
  await Auth.ServerFetch(
    global.server + "api/libretas/",
    {
      method: 'GET',
    },
    req
  ).then(res => {
    libretas = res
  }).catch(err => {
    //console.log(err)
    console.log("Ha ocurrido un problema, por favor, intenta de nuevo")
  })

  console.log(libretas)


  return {
    props: {
      isLoggedIn,
      libretas,
    }
  }
}

export default function Home(props) {
  function onChangeHandler() {
    console.log(e.currentTarget)

  }

  if (props.isLoggedIn) {
    //si hay sesion iniciada
    //console.log("Usuario reconocido, mostrando lista de notas")
    return (
      <Layout home>
        <Container fluid>
          <Row>
            <Sidebar libretas={props.libretas}></Sidebar>
            <Col md={8}>
              <button>ocultar mostrar panel izquierdo</button>
              <h3>Selecciona una libreta o una nota </h3>

            </Col>
          </Row>
        </Container>
      </Layout>

    )
  } else {
    //si no hay sesion iniciada
    console.log("Usuario Desconocido, Mostrando Landing Page")
    return (
      <Layout home>
        <h3>Lo mejor para sus muertitos</h3>
      </Layout>
    )
  }

  //return(<h1>sd</h1>)


}
