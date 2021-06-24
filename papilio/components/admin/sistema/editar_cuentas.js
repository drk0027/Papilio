/* next.js head */
import Head from 'next/head';

/* components */
//import NavBar from '../components/navbar'
//import Footer from '../footer/Footer';

import React, { useState, useEffect } from 'react';
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import AuthService from "../../../lib/AuthService"


export default function inicio(props) {
    console.log(props)
    const Auth = new AuthService()
    const [Accion, SetAccion] = useState(0)//0 es crear 1 es actualizar

    const [Formulario, SetFormulario] = useState({
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
            nombre_empresa: NN(props.sistema.nombre_empresa),
            nombres_propietario: NN(props.sistema.nombres_propietario),
            apellidos_propietario: NN(props.sistema.apellidos_propietario),
            telefono1: NN(props.sistema.telefono1),
            telefono2: NN(props.sistema.telefono2),
            correo1: NN(props.sistema.correo1),
            correo2: NN(props.sistema.correo2),
            direccion: NN(props.sistema.direccion),
            descripcion: NN(props.sistema.descripcion),
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
        if (Accion == 0) {
            //crear
            crear()
        } else {
            //actualizar
            actualizar()
        }

        var donde = Formulario



    }
    //Actualizacion de estado inicial
    useEffect(() => {
        //console.log("primera carga")
        //carga_estado()
        //console.log(Formulario)
        //determina si el props esta vacio, es crear, caso contrario, es actualizar
        console.log(props.Fila.id_usuario == undefined)
        if (props.Fila.id_usuario == undefined) {
            SetAccion(0)
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
            SetAccion(1)
            SetFormulario({
                id_usuario: props.Fila.id_usuario,
                nombres: props.Fila.nombres,
                apellidos: props.Fila.apellidos,
                cedula: props.Fila.cedula,
                email: props.Fila.email,
                email2: props.Fila.email2,
                direccion1: props.Fila.direccion1,
                direccion2: props.Fila.direccion2,
                telefono1: props.Fila.telefono1,
                telefono2: props.Fila.telefono2,
            })
        }

    }, []);

    return (
        <Form onSubmit={handleFormSubmit}>
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
                <Form.Label>Cédula</Form.Label>
                <Form.Control type="text" placeholder="Cedula" onChange={onChangeHandler} name="cedula" value={Formulario["cedula"]} required />
                <Form.Text className="text-muted">
                    Cédula
                            </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Correo Principal</Form.Label>
                <Form.Control type="email" placeholder="Correo Principal" onChange={onChangeHandler} name="email" value={Formulario["email"]} required />
                <Form.Text className="text-muted">
                    Direccion principal de correo electronico. Esta direccion sera utilizada como cuenta de usuario y medio de notificacion.
                            </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Correo electronico secundario(opcional)</Form.Label>
                <Form.Control type="email" placeholder="Correo Secundario" onChange={onChangeHandler} name="email2" value={Formulario["email2"]} />
                <Form.Text className="text-muted">
                    Direccion de correo electronico secundario opcional.
                            </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Dirección domiciliaria</Form.Label>
                <Form.Control type="text" placeholder="Direccion domiciliaria" onChange={onChangeHandler} name="direccion1" value={Formulario["direccion1"]} required />
                <Form.Text className="text-muted">
                    Direccion domiciliaria principal.
                            </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Direccion domiciliaria opcional</Form.Label>
                <Form.Control type="text" placeholder="Direccion opcional" onChange={onChangeHandler} name="direccion2" value={Formulario["direccion2"]} />
                <Form.Text className="text-muted">
                    Direccion domiciliaria opcional.
                            </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Telefono Principal</Form.Label>
                <Form.Control type="text" placeholder="Telefono Principal" onChange={onChangeHandler} name="telefono1" value={Formulario["telefono1"]} required />
                <Form.Text className="text-muted">
                    Telefono Principal
                            </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Telefono Secundario</Form.Label>
                <Form.Control type="text" placeholder="Telefono Secundario" onChange={onChangeHandler} name="telefono2" value={Formulario["telefono2"]} />
                <Form.Text className="text-muted">
                    Telefono Secundario.
                            </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
                Guardar
            </Button>
        </Form>

    )
}