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
    const Auth = new AuthService()

    const [Formulario, SetFormulario] = useState({
        host: "",
        port: "",
        user: "",
        pass: "",
        mensaje_registro: "",
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
            host: NN(props.sistema.host),
            port: NN(props.sistema.port),
            user: NN(props.sistema.user),
            pass: NN(props.sistema.pass),
            mensaje_registro: NN(props.sistema.mensaje_registro),
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

        var donde = Formulario

        Auth.fetch(//carga la lista de campos para las configuraciones del sistema (solo lo pueden ver los administradores)
            global.server + "api/admin/actualizar_confsendmail",
            {
                method: 'POST',
                body: JSON.stringify({
                    donde,
                }),
            }
        ).then(resp => {
            //console.log(resp)
            //alert("Actualizado con exito")
            if(resp.success!=undefined){
                alert(resp.success)
                //alert("recuerde cerrar y volver a abrir la sesion para continuar usando el sistema")
            }else{
                alert(resp.error)
            }
        }).catch(err => {
            console.log(err)
            alert("Ha ocurrido un problema, por favor, intenta de nuevo")
        })

    }
    //Actualizacion de estado inicial
    useEffect(() => {
        //console.log("primera carga")
        console.log(props.sistema)
        carga_estado()
        //console.log(Formulario)
    }, []);

    return (
        <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Direccion url del servidor SMTP</Form.Label>
                <Form.Control type="text" placeholder="Direccion url del servidor SMTP" onChange={onChangeHandler} name="host" required value={Formulario["host"]} />
                <Form.Text className="text-muted">
                    Direccion url del servidor SMTP
                  </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Puerto SMTP</Form.Label>
                <Form.Control type="text" placeholder="Puerto SMTP" onChange={onChangeHandler} name="port" value={Formulario["port"]} required />
                <Form.Text className="text-muted">
                Puerto SMTP
                  </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Nombre de Usuario</Form.Label>
                <Form.Control type="text" placeholder="Nombre de Usuario" onChange={onChangeHandler} name="user" value={Formulario["user"]} required />
                <Form.Text className="text-muted">
                Nombre de Usuario
                  </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Contraseña" onChange={onChangeHandler} name="pass" value={Formulario["pass"]} required />
                <Form.Text className="text-muted">
                Contraseña
                  </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Mensaje predeterminado para registro de usuarios</Form.Label>
                <Form.Control type="textarea" as="textarea" placeholder="Contraseña" onChange={onChangeHandler} name="mensaje_registro" value={Formulario["mensaje_registro"]} required />
                <Form.Text className="text-muted">
                Mensaje predeterminado para registro de usuarios
                  </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
                Guardar
              </Button>
        </Form>

    )
}