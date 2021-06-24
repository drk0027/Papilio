/* next.js head */
import Head from 'next/head';

/* components */
//import NavBar from '../components/navbar'
//import Footer from '../footer/Footer';

import React, { useState, useEffect } from 'react';
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import AuthService from "../../../lib/AuthService"
import QRCode from "react-qr-code";


export default function inicio(props) {
    console.log(props.Fila)
    const Auth = new AuthService()
    const [Accion, SetAccion] = useState(0)//0 es crear 1 es actualizar
    const [Archivos, SetArchivos] = useState(null)

    const [Formulario, SetFormulario] = useState({
        id_usuario: props.Fila.usuario.id_usuario,
        id_memoria: props.Fila.id_memoria,
        nombres: props.Fila.nombres,
        apellidos: props.Fila.apellidos,
        contenido: props.Fila.contenido,
        slug: props.Fila.slug,
        fecha_nacimiento: props.Fila.fecha_nacimiento,
        fecha_muerte: props.Fila.fecha_muerte,
    })

    function NN(valor) {
        //console.log(valor)
        if (valor == null) {
            //console.log("hay un valor nulo")
            return ""
        } else {
            return valor
        }
    }

    function carga_estado() {
        SetFormulario({
            id_usuario: NN(props.Fila.usuario.id_usuario),
            id_memoria: NN(props.Fila.id_memoria),
            nombres: NN(props.Fila.nombres),
            apellidos: NN(props.Fila.apellidos),
            contenido: NN(props.Fila.contenido),
            slug: NN(props.Fila.slug),
            fecha_nacimiento: NN(props.Fila.fecha_nacimiento),
            fecha_muerte: NN(props.Fila.fecha_muerte),
        })

    }

    //control de cambio en los formularios
    function onChangeHandler(e) {
        //console.log(e.currentTarget.name)
        //console.log(e.currentTarget.value)
        SetFormulario({
            ...Formulario,
            [e.currentTarget.name]: e.currentTarget.value
        })
        //console.log(Formulario)
        //setNombre_empresa()


    }
    function crear() {
        var donde = Formulario
        Auth.fetch(//Crea un nuevo registro
            global.server + "api/admin/crear_cuenta",
            {
                method: 'POST',
                body: JSON.stringify({
                    donde,
                }),
            }
        ).then(resp => {
            //console.log(resp)
            //alert("Actualizado con exito")
            if (resp.success != undefined) {
                alert(resp.success)
                SetFormulario({
                    id_usuario: "",
                    nombres: "",
                    apellidos: "",
                    cedula: "",
                    email: "",
                    email2: "",
                    direccion1: "",
                    direccion2: "",
                    telefono1: "",
                    telefono2: "",
                })
            } else {
                alert(resp.error)
            }
        }).catch(err => {
            console.log(err)
            alert("Ha ocurrido un problema, por favor, intenta de nuevo")
        })
        //limpiar el formulario una vez terminado

    }

    function actualizar() {
        var donde = Formulario
        Auth.fetch(//Crea un nuevo registro
            global.server + "api/admin/actualizar_cuenta",
            {
                method: 'POST',
                body: JSON.stringify({
                    donde,
                }),
            }
        ).then(resp => {
            //console.log(resp)
            //alert("Actualizado con exito")
            if (resp.success != undefined) {
                alert(resp.success)
                SetFormulario({
                    id_usuario: "",
                    nombres: "",
                    apellidos: "",
                    cedula: "",
                    email: "",
                    email2: "",
                    direccion1: "",
                    direccion2: "",
                    telefono1: "",
                    telefono2: "",
                })
            } else {
                alert(resp.error)
            }
        }).catch(err => {
            console.log(err)
            alert("Ha ocurrido un problema, por favor, intenta de nuevo")
        })

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
            if (Archivos != null) {
                var formData = new FormData()
                //si no hay imagen que subir, subir el formulario normalmente
                formData.append("archivos", Archivos)
                formData.append("id_usuario", Formulario.id_usuario)
                console.log(Formulario)
                Auth.fetch_img(
                    global.server + "api/admin/guardar_foto",
                    {
                        method: 'POST',
                        body: formData
                    }
                ).then(resp => {
                    //si el envio de archivos es exitoso, adjuntar estos datos a la consulta
                    if (resp.error == undefined) {
                        var donde = Formulario
                        //console.log(donde)
                        donde = {
                            ...donde,
                            id_foto: resp.success.id_foto,
                            adjuntos: resp.success.nombre,
                        }
                        Auth.fetch(//Crea un nuevo registro
                            global.server + "api/admin/actualizar_memoria",
                            {
                                method: 'POST',
                                body: JSON.stringify({
                                    donde,
                                }),
                            }
                        ).then(resp => {
                            //console.log(resp)
                            //alert("Actualizado con exito")
                            if (resp.success != undefined) {
                                alert(resp.success)
                            } else {
                                alert(resp.error)
                            }
                        }).catch(err => {
                            console.log(err)
                            alert("Ha ocurrido un problema, por favor, intenta de nuevo")
                        })
                    }
                }).catch(err => {
                    //console.log(err)
                    alert("Ha ocurrido un problema, por favor, intenta de nuevo")
                })
    
            } else {
                //solo envia el formulario para almacenar sin archivo adjunto
                var donde = Formulario
    
                Auth.fetch(//Crea un nuevo registro
                    global.server + "api/admin/crear_memoria",
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            donde,
                        }),
                    }
                ).then(resp => {
                    //console.log(resp)
                    //alert("Actualizado con exito")
                    if (resp.success != undefined) {
                        alert(resp.success)
                    } else {
                        alert(resp.error)
                    }
                }).catch(err => {
                    console.log(err)
                    alert("Ha ocurrido un problema, por favor, intenta de nuevo")
                })
            }



    }
    //Actualizacion de estado inicial
    useEffect(() => {
        //console.log("primera carga")
        carga_estado()
        //console.log(Formulario)
        //determina si el props esta vacio, es crear, caso contrario, es actualizar
        

    }, []);

    return (
        <Form onSubmit={handleFormSubmit}>
            <Container>
                <QRCode value={global.base_url+"Memorial/"+Formulario.slug} />
            </Container>
            {console.log(Formulario.fecha_muerte.slice(0,19))}
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Nombres</Form.Label>
                <Form.Control type="text" placeholder="Nombres" onChange={onChangeHandler} name="nombres" required value={Formulario["nombres"]} />
                <Form.Text className="text-muted">
                    Nombres
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control type="text" placeholder="Apellidos" onChange={onChangeHandler} name="apellidos" value={Formulario["apellidos"]} required />
                <Form.Text className="text-muted">
                    Apellidos
                            </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Contenido</Form.Label>
                <Form.Control type="textarea" as ="textarea" placeholder="Contenido" onChange={onChangeHandler} name="contenido" value={Formulario["contenido"]} required />
                <Form.Text className="text-muted">
                    Contenido
                            </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Fecha de Nacimiento</Form.Label>
                <Form.Control type="datetime-local" placeholder="Fecha de Nacimiento" onChange={onChangeHandler} name="fecha_nacimiento" value={Formulario["fecha_nacimiento"].slice(0,19)} required />
                <Form.Text className="text-muted">
                    Fecha de Nacimiento
                            </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Fecha de Defunción</Form.Label>
                <Form.Control type="datetime-local" placeholder="Fecha de Defunción" onChange={onChangeHandler} name="fecha_muerte" value={Formulario["fecha_muerte"].slice(0,19)} />
                <Form.Text className="text-muted">
                Fecha de Defunción
                            </Form.Text>
            </Form.Group>
            <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>Seleccionar Foto principal</Form.Label>
                <Form.Control type="file" onChange={e => { SetArchivos(e.target.files[0]) }} />
            </Form.Group>
            
            <Button variant="primary" type="submit">
                Guardar
            </Button>
        </Form>

    )
}