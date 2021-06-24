import 'bootstrap/dist/css/bootstrap.min.css';

import Link from 'next/link'
import React, { useState, useEffect } from 'react';

import Layout from '../components/layout'
import AdminBar from '../components/adminbar'
import Inicio_admin from '../components/admin/inicio'
import Inicio_public from '../components/public/inicio'
import Contacto from '../components/public/contacto'
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import AuthService from "../lib/AuthService"
//import ServerAuthService from "../lib/ServerAuthService"

export async function getServerSideProps(context) {
  /*
    Para obtener informacion de la API, es necesario hacer una llamada mediante el metodo AuthService.
    Este metodo almacena informacion en LocalStorage y en la Cookie, hay que mejorar eso, o al menos, decidir si todo se queda en en LocalStorage o las Cookies

    Cualquier llamado desde getServerSideProps, debe realizarse desde el ServerAuthService
  */
  const { req } = context;
  const Auth = new AuthService()
  //las consultas que se hagan al auth aqui se realizan desde el servidor, por lo que se deben usar las llamadas con prefijo "Server" o Cookie
  const isLoggedIn = Auth.ServerloggedIn(req)
  const token = Auth.getCookieToken(req)
  var info_sistema = ""
  await Auth.ServerFetch(//carga la lista de campos para las configuraciones del sistema (solo lo pueden ver los administradores)
    global.server + "api/public/ver_sistema",
    {
      method: 'POST',
      body: JSON.stringify(),
    },
    req
  ).then(resp => {
    //console.log(resp)
    info_sistema = resp.success
  }).catch(err => {
    console.log("Ha ocurrido un problema, por favor, intenta de nuevo")
  })
  //console.log(info_sistema)

  /*
    Formato:
    var columnas = ["sdff", "asdf", "asdf", "asdf", "sdfg"]
    var donde = []
    donde.push(["col","=","val"])
    donde.push(["col2","=","val2"])
    var orden=["id_sistema","DESC"] //columna -> ASC/DESC
    var grupo = ["col"]; //columna por la que se agrupará
    var limite = ["0","10"]; //combinacion entre valor valor inicial y offset

    En las llamadas de API no es necesario indicar los nombres de las columnas, se cargaran a consideracion del backend
  */

  //si el usuario ha iniciado sesion y es admin, entonces realizar esta consulta:

  if (isLoggedIn == true) {//si el usuario ha iniciado sesion
    if (Auth.getPerfil(token).roles == 1) {//si el usuario es administrador
      var sistema = []
      await Auth.ServerFetch(//carga la lista de campos para las configuraciones del sistema (solo lo pueden ver los administradores)
        global.server + "api/admin/ver_sistema",
        {
          method: 'POST',
          body: JSON.stringify(),
        },
        req
      ).then(resp => {
        //console.log(resp)
        sistema = resp.success
      }).catch(err => {
        console.log("Ha ocurrido un problema, por favor, intenta de nuevo")
      })

      //consulta de datos del formulario


      return {
        props: {
          isLoggedIn,
          sistema,
          info_sistema,
          token
        }
      }
    }
  }

  return {
    props: {
      isLoggedIn,
      info_sistema,
      token
    }
  }
}

export default function Home(props) {
  const Auth = new AuthService()

  //este es el mapa de funciones para los formularios, controlara los estados de los campos y actualizara en caso de ser necesario
  //console.log(props.sistema.nombre_empresa)

  //console.log(props.isLoggedIn)
  //console.log(Auth.getPerfil(props.token).roles)

  //control de cambio en los formularios
  function onChangeHandler() {
    //console.log(e.currentTarget)

  }

  //control de envio cuando se hace submit
  function handleFormSubmit(e) {
    e.preventDefault();

  }
  /*
    Las rutas que contienen parametros y navegan dentro de si mismas no actualizan el DOM automaticamente. Para hacer esto, se usa UseEffect() que es equivalente a
    ComponentDidMount cuando se usan clases.
    Para la proxima, estudiar que rayos son los hooks y no las clases, que eso esta pasado de moda.
  */
  useEffect(() => {

  });

  /*
    Props:
      isLoggedIn: true -> El usuario ha iniciado sesion, obtener informacion relacionada al mismo de otros props
                  false -> El usuario no ha iniciado sesion, presentar informacion publica no confidencial
      
    Auth.getPerfil(props.token).roles: 1 -> Admin
                                        2 -> User
  */
  if (props.isLoggedIn) { // True
    if (Auth.getPerfil(props.token).roles == 1) {//Es admin
      /*return (
        <Inicio_admin props={props.sistema}/>
      )*/
      return (// panel para usuarios admin
        <Layout home login={props.isLoggedIn} token={props.token} info_sistema={props.info_sistema}>
          <Contacto info_sistema={props.info_sistema}></Contacto>
        </Layout>
      )
    }
    if (Auth.getPerfil(props.token).roles == 2) {  //panel para usuarios normales
      return (
        <Layout home login={props.isLoggedIn} token={props.token} info_sistema={props.info_sistema}>
          <Contacto info_sistema={props.info_sistema}></Contacto>
        </Layout>
      )
    }
    //console.log(Auth.getPerfil(props.token).roles)


  } else { // False
    return ( //
      <Layout home login={props.isLoggedIn} token={props.token} info_sistema={props.info_sistema}>
        <Contacto info_sistema={props.info_sistema}></Contacto>

      </Layout>
    )
  }
}


