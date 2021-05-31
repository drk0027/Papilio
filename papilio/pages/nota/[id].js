import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Link from 'next/link'
import React, { useState,useEffect } from 'react';

import Layout from '../../components/layout'
import Sidebar from '../../components/sidebar'

import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Accordion from "react-bootstrap/Accordion"
import Nav from "react-bootstrap/Nav"
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button';
import AuthService from "../../lib/AuthService"
//import md from 'mardown-it';

var md = require('markdown-it')();
import MDEditor from "react-smde";
import ReactMarkdown from "react-markdown";

export async function getServerSideProps(context) {
  const { req } = context;
  const Auth = new AuthService()
  const isLoggedIn = Auth.ServerloggedIn(req)

  var libretas = ""
  var nota = ""
  //console.log(global.server + "/api/libretas/")
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

  console.log(context.params.id)
  await Auth.ServerFetch(
    global.server + "api/notas/" + context.params.id,
    {
      method: 'GET',
    },
    req
  ).then(res => {
    nota = res
  }).catch(err => {
    //console.log(err)
    console.log("Ha ocurrido un problema, por favor, intenta de nuevo")
  })

  console.log(nota)


  return {
    props: {
      isLoggedIn,
      libretas,
      nota
    }
  }
}

export default function Home(props) {
  //console.log(props.nota)
  const [Nombre, setNombre] = useState(props.nota.nombre);
  const [Contenido,setContenido]=useState(props.nota.contenido)

  function onChangeHandler(e) {
    e.preventDefault()

  }
  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    //document.title = `You clicked times`;
    //console.log(props)
    setNombre(props.nota.nombre)
    setContenido(props.nota.contenido)
  });

  if (props.isLoggedIn) {
    //si hay sesion iniciada
    //console.log("Usuario reconocido, mostrando lista de notas")
    return (
      <Layout home>
        <Container fluid>
          <Row>
            <Sidebar libretas={props.libretas}></Sidebar>
            <Col md={8}>
              <Row>
                <button> mostrar/ocultar </button>
                <button>guardar nueva version</button>
                <select>
                  <option>Version 1</option>
                  <option>Version 2</option>
                  <option>Version 3</option>
                  </select>
              </Row>

              <Row>
                <input
                  onChange={e=> {setNombre(e.target.value);console.log(e.target.value);}}
                  type="text"
                  value={Nombre}
                  className="txt_titulo"
                  name="nombre"
                />
              </Row>

              <label>Contenido</label>
              <Row>
                <textarea
                  className="txtarea_contenido"
                  value={Contenido}
                  onChange={e=> {setContenido(e.target.value);console.log(e.target.value);}} 
                />
              </Row>
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
