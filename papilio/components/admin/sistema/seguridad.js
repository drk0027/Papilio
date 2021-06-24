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
        a_password: "",
        n_password: "",
        r_password: "",
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
            global.server + "api/admin/actualizar_password",
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
        //carga_estado()
        //console.log(Formulario)
    }, []);

    return (
        <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Ingrese la contraseña anterior</Form.Label>
                <Form.Control type="text" placeholder="Contraseña anterior" onChange={onChangeHandler} name="a_password" required value={Formulario["a_password"]} />
                <Form.Text className="text-muted">
                    Escriba la contraseña anterior
                  </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Ingrese la nueva contraseña</Form.Label>
                <Form.Control type="text" placeholder="Nueva contraseña" onChange={onChangeHandler} name="n_password" value={Formulario["n_password"]} required />
                <Form.Text className="text-muted">
                    Escriba una nueva contraseña
                  </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Repita la contraseña</Form.Label>
                <Form.Control type="text" placeholder="Reptia la nueva contraseña" onChange={onChangeHandler} name="r_password" value={Formulario["r_password"]} required />
                <Form.Text className="text-muted">
                    Repita la nueva contraseña para confirmar
                  </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
                Guardar
              </Button>
        </Form>

    )
}