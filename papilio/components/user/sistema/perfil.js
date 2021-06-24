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
        nombres: "a",
        apellidos: "",
        cedula: "",
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
        console.log(props.props.nombres)
        SetFormulario({
            nombres: NN(props.props.nombres),
            apellidos: NN(props.props.apellidos),
            cedula: NN(props.props.cedula),
            email: NN(props.props.email),
            email2: NN(props.props.email2),
            direccion1: NN(props.props.direccion1),
            direccion2: NN(props.props.direccion2),
            telefono1: NN(props.props.telefono1),
            telefono2: NN(props.props.telefono2),
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
            global.server + "api/user/actualizar_perfil",
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
                alert("recuerde cerrar y volver a abrir la sesion para continuar usando el sistema")
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
        carga_estado()
        //console.log(Formulario)
    }, []);

    return (
        <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Nombres</Form.Label>
                <Form.Control type="text" placeholder="Nombres" onChange={onChangeHandler} name="nombres" required value={Formulario["nombres"]} />
                <Form.Text className="text-muted">
                    Escriba sus nombres
                  </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control type="text" placeholder="Apellidos" onChange={onChangeHandler} name="apellidos" required value={Formulario["apellidos"]} />
                <Form.Text className="text-muted">
                    Escriba sus apellidos
                  </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Cedula</Form.Label>
                <Form.Control type="text" placeholder="Cedula" onChange={onChangeHandler} name="cedula" required value={Formulario["cedula"]} />
                <Form.Text className="text-muted">
                    Escriba sus nombres
                  </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Correo electronico principal</Form.Label>
                <Form.Control type="text" placeholder="Correo electronico principal" onChange={onChangeHandler} name="email" required value={Formulario["email"]} disabled/>
                <Form.Text className="text-muted">
                    Escriba su correo electronico principal
                  </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Correo electronico secundario</Form.Label>
                <Form.Control type="text" placeholder="Correo electronico secundario" onChange={onChangeHandler} name="email2"  value={Formulario["email2"]} />
                <Form.Text className="text-muted">
                    Escriba su direccion de correo electronico secundario(opcional)
                  </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Telefono principal</Form.Label>
                <Form.Control type="text" placeholder="Telefono principal" onChange={onChangeHandler} name="telefono1" required value={Formulario["telefono1"]} />
                <Form.Text className="text-muted">
                    Escriba su telefono principal
                  </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Telefono secundario</Form.Label>
                <Form.Control type="text" placeholder="Telefono Secundario" onChange={onChangeHandler} name="telefono2" value={Formulario["telefono2"]} />
                <Form.Text className="text-muted">
                    Escriba su telefono secundario(opcional)
                  </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Direccion domiciliaria principal</Form.Label>
                <Form.Control type="text" placeholder="Direccion Domiciliaria Principal" onChange={onChangeHandler} name="direccion1" required value={Formulario["direccion1"]} />
                <Form.Text className="text-muted">
                    Escriba sus nombres
                  </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Direccion domiciliaria secundaria</Form.Label>
                <Form.Control type="text" placeholder="Direccion Domiciliaria Secundaria" onChange={onChangeHandler} name="direccion2"  value={Formulario["direccion2"]} />
                <Form.Text className="text-muted">
                    Escriba su direccion domiciliaria secundaria(opcional)
                  </Form.Text>
            </Form.Group>
            
            <Button variant="primary" type="submit">
                Guardar
              </Button>
        </Form>

    )
}