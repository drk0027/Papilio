import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Link from 'next/link'
import React, { useState } from 'react';

import Layout from '../../components/layout'

import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from 'react-bootstrap/Button';
import AuthService from "../../lib/AuthService"

//import md from 'markdown-it';
var md = require('markdown-it')();

export async function getServerSideProps(context) {
  console.log(context.params.nombre)
  const { req } = context;
  const Auth = new AuthService()
  const isLoggedIn = Auth.ServerloggedIn(req)
  //en el inicio siempre muestra la lista de todas las libretas y la lista de notas pertenecientes a la libreta predeterminada 
  //la pagina inicial recupera todas las libretas y notas desde el inicio, ademas de consultar si el usuario ha iniciado sesion y eso
  //libretas
  var libretas = ""
  var notas = ""
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
  //selecciona las notas de la libreta seleccionada 
  await Auth.ServerFetch(
    global.server + "api/libretas/"+context.params.nombre,
    {
      method: 'GET',
    },
    req
  ).then(res => {
    //console.log(res)
    notas = res
  }).catch(err => {
    //console.log(err)
    console.log("Ha ocurrido un problema, por favor, intenta de nuevo")
  })

  return {
    props: {
      isLoggedIn,
      libretas,
      notas
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
            <Col md={4}>
              <Row><button>Ocultar</button></Row>
              <Row>

                <Col md={6}>
                  <p>Libretas</p>
                  <ul>
                    {
                      props.libretas.map((resp) => (
                        <li key={resp.id_libreta}><Link href={"/libreta/"+resp.id_libreta}>{resp.nombre}</Link></li>
                      ))
                    }
                  </ul>
                </Col>
                <Col md={6}>
                  <p>Notas</p>
                  <ul>
                  {
                    props.notas.map((resp)=>(
                      <li key={resp.id_nota}><Link href={"/notas/"+resp.id_nota}>{resp.nombre}</Link></li>
                    ))
                  }
                  </ul>
                </Col>
              </Row>

            </Col>
            <Col md={8}>
              <button>ocultar mostrar panel izquierdo</button>
              <h3>Selecciona una nota para editar</h3>
              <p>Cosas random sobre la libreta seleccionada</p>
              <p>Configurtaciones random sobre la libreta</p>
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
        <p>Si no hay sesion iniciada, deberia redirigir a la pagina de inicio, dar un error 404 o yo que se</p>
      </Layout>
    )
  }



}
