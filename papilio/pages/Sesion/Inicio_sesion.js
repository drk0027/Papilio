import React, { useState } from 'react';
import Router , {useRouter}  from 'next/router';

import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'
import Layout from '../../components/layout'
import AuthService from "../../lib/AuthService"
import Form from "react-bootstrap/Form"


export async function getServerSideProps(context) {
    /*
        Se cargan los servicios de Backend
        Se establece si el usuario ha iniciado sesion o no
        Se envia al FrontEnd los resultados de la consulta

        Todas las consultas aqui dependen del servidor, asi que incluso el rol del usuario, se debe almacenar aqui
    */

        
    const { req } = context;
    const Auth = new AuthService()
    const isLoggedIn = Auth.ServerloggedIn(req)

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

    
    //console.log(isLoggedIn)
    if(isLoggedIn){
        return {
            redirect: {
              permanent: false,
              destination: "/",
            },
            props:{
                info_sistema,
            },
          };
    }else{
        return {
            props: {
                isLoggedIn,
                info_sistema,
            }
        }
    }
    
}

export default function Inicio_sesion(props) {
    const Auth = new AuthService()
    const router = useRouter()
    //const isLoggedIn = Auth.ServerloggedIn()

    function handleFormSubmit(e) {
        e.preventDefault()
        //console.log(e)

        
        //alert(isLoggedIn)
        //alert(stateFormData.email.value)
        Auth.login(stateFormData.email.value, stateFormData.password.value)
            .then(resp => {
                //console.log(resp)
                if(resp.success!=undefined){
                    alert("Inicio de sesion Exitoso")
                    router.push('/')
                }
                if(resp.error!=undefined){
                    if(resp.error.username!=undefined){
                        alert("Error: " + resp.error.username)
                    }
                    if(resp.error.password!=undefined){
                        alert("Error: " + resp.error.password)
                    }
                    if(resp.error.email!=undefined){
                        alert("Error: " + resp.error.email)
                    }
                    if(resp.error="El usuario no existe"){
                        alert("El usuario no existe")
                    }
                    
                    //router.push('/Sesion/Inicio_sesion')
                }
            })
            .catch(err => {
                console.log(err)
            })

    }
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,2|3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const FORM_DATA_LOGIN = {
        email: {
            value: '',
            label: 'Email',
            min: 10,
            max: 36,
            required: true,
            validator: {
                regEx: emailRegEx,
                error: 'Por favor, ingrese un correo valido',
            },
        },
        password: {
            value: '',
            label: 'Password',
            min: 6,
            max: 36,
            required: true,
            validator: {
                regEx: /^[a-z\sA-Z0-9\W\w]+$/,
                error: 'Por favor, ingrese una contraseña valida',
            },
        },

    };
    const [stateFormData, setStateFormData] = useState(FORM_DATA_LOGIN);

    function onChangeHandler(e) {
        //console.log(e.currentTarget)
        const { name, value } = e.currentTarget;
        setStateFormData({
            ...stateFormData,
            [name]: {
                ...stateFormData[name],
                value,
            },
        });
        //console.log(stateFormData)
        /* validation handler */
        //validationHandler(stateFormData, e);
    }


    return (
        <Layout home login={props.isLoggedIn} info_sistema={props.info_sistema}>
            <div className={styles.container}>
                <Head>
                    <title>Papilio</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <main>
                    <h1>Iniciar Sesion</h1>
                    <form onSubmit={handleFormSubmit}>
                        <div>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Nombre de usuario</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="email"
                                required
                                value={stateFormData.email.value}
                                onChange={onChangeHandler}
                                name="email"
                            />
                            <Form.Text className="text-muted">
                                Ingrese el correo electronico con el que se registró
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="password"
                                required
                                value={stateFormData.email.password}
                                onChange={onChangeHandler}
                                name="password"
                            />
                            <Form.Text className="text-muted">
                                Ingrese su contraseña
                            </Form.Text>
                        </Form.Group>
                            <p>O <Link href="/Sesion/Registro">Registrarse en la Plataforma</Link></p>
                            <input type="submit" />
                        </div>
                    </form>

                </main>

            </div>
        </Layout>
    )
}
