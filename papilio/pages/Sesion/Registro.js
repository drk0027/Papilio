import React, { useState } from 'react';
import Router, { useRouter } from 'next/router';

import styles from '../../styles/Home.module.css'
import Link from 'next/link'
//import { getSortedPostsData } from '../lib/posts'
import Layout from '../../components/layout'
import AuthService from "../../lib/AuthService"
import Form from "react-bootstrap/Form"



export async function getServerSideProps(context) {
    /*
        Se cargan los servicios de Backend
        Se establece si el usuario ha iniciado sesion o no
        Se envia al FrontEnd los resultados de la consulta
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

    //si la consulta determina que el usuario ha iniciado sesion, entonces redirige a la pagina de inicio
    //si la consulta determina que el usuario no ha iniciado sesion, entonces no hace nada?
    if (isLoggedIn) {
        return {
            redirect: {
                permanent: false,
                destination: "/",
            },
            props: {
                info_sistema,
            },
        };
    } else {
        return {
            props: {
                isLoggedIn,
                info_sistema,
            }
        }
    }
}

export default function Registro(props) {
    const Auth = new AuthService()
    const router = useRouter()

    function handleFormSubmit(e) {
        e.preventDefault()
        //console.log(e)
        //const isLoggedIn = Auth.loggedIn()
        //alert(isLoggedIn)
        //alert(stateFormData.email.value)
        Auth.register(stateFormData.username.value, stateFormData.email.value, stateFormData.password.value, stateFormData.cpassword.value)
            .then(resp => {
                //si el resultado es un registro exitoso, entonces redirigir a la pagina de inicio de sesion pa que inicie sesion pue
                //console.log(resp)
                if (resp.success != undefined) {
                    alert("Registro exitoso, por favor inicie sesion")
                    router.push('/Sesion/Inicio_sesion')
                }
                if (resp.error != undefined) {
                    if (resp.error.username != undefined) {
                        alert("Error: " + resp.error.username)
                    }
                    if (resp.error.password != undefined) {
                        alert("Error: " + resp.error.password)
                    }
                    if (resp.error.email != undefined) {
                        alert("Error: " + resp.error.email)
                    }

                    //router.push('/Sesion/Inicio_sesion')
                }
            })
            .catch(err => {
                console.log(err)
                alert(err)
            })

    }
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,2|3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const FORM_DATA_LOGIN = {
        username: {
            value: '',
            label: 'username',
            min: 6,
            max: 36,
            required: true,
            validator: {
                regEx: /^[a-z\sA-Z0-9\W\w]+$/,
                error: 'Por favor ingrese un nombre de usuario valido',
            },
        },
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
        cpassword: {
            value: '',
            label: 'Password',
            min: 6,
            max: 36,
            required: true,
            validator: {
                regEx: /^[a-z\sA-Z0-9\W\w]+$/,
                error: 'Las contraseñas no coinciden',
            },
        },
    };
    //const { baseApiUrl, profile } = props;
    const [stateFormData, setStateFormData] = useState(FORM_DATA_LOGIN);
    /* const [stateFormError, setStateFormError] = useState([]);
    const [stateFormValid, setStateFormValid] = useState(false);
    const [loading, setLoading] = useState(false);
    const [stateFormMessage, setStateFormMessage] = useState({}); */

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
                <h1>Para utilizar nuestros servicios, cree una cuenta primero.</h1>

                <main>
                    <form onSubmit={handleFormSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Nombre de usuario</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nombre de Usuario"
                                required
                                value={stateFormData.username.value}
                                onChange={onChangeHandler}
                                name="username"
                            />
                            <Form.Text className="text-muted">
                                Ingrese su nombre con el cual quiere ser identificado. Luego podra cambiar los detalles de su perfil
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Correo Electronico</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="email"
                                required
                                value={stateFormData.email.value}
                                onChange={onChangeHandler}
                                name="email"
                            />
                            <Form.Text className="text-muted">
                                Podrá iniciar sesion usando su nombre de usuario
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
                                Una contraseña segura contiene una mezcla de caracteres mayuscula, minuscula y numeros
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Repita la contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Repita la contraseña"
                                required
                                value={stateFormData.email.cpassword}
                                onChange={onChangeHandler}
                                name="cpassword"
                            />
                            <Form.Text className="text-muted">
                                Al repetir la contraseña el sistema validará si coincide y usted podra recordar si la escribió correctamente
                            </Form.Text>
                        </Form.Group>
                        <input type="submit" />
                    </form>

                </main>

            </div>
        </Layout>
    )
}
