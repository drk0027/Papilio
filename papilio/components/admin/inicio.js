/* next.js head */
import Head from 'next/head';

/* components */
//import NavBar from '../components/navbar'
//import Footer from '../footer/Footer';

import React, { useState, useEffect } from 'react';
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import AuthService from "../../lib/AuthService"


export default function inicio(props) {
    const Auth = new AuthService()

    const [Formulario, SetFormulario] = useState({
        nombre_empresa: "",
        nombres_propietario: "",
        apellidos_propietario: "",
        telefono1: "",
        telefono2: "",
        correo1: "",
        correo2: "",
        direccion: "",
        descripcion: "",
    })

    function NN(valor) {
        console.log(valor)
        if (valor == null) {
            console.log("hay un valor nulo")
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
        console.log(e.currentTarget.name)
        console.log(e.currentTarget.value)
        SetFormulario({
            ...Formulario,
            [e.currentTarget.name]: e.currentTarget.value
        })
        console.log(Formulario)
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

        var columnas = Formulario

        Auth.fetch(//carga la lista de campos para las configuraciones del sistema (solo lo pueden ver los administradores)
            global.server + "api/admin/actualizar_sistema",
            {
                method: 'POST',
                body: JSON.stringify({
                    columnas,
                }),
            }
        ).then(resp => {
            //console.log(resp)
            alert("Actualizado con exito")
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
                <Form.Label>Nombre de la Empresa</Form.Label>
                <Form.Control type="text" placeholder="Nombre de la Empresa" onChange={onChangeHandler} name="nombre_empresa" required value={Formulario["nombre_empresa"]} />
                <Form.Text className="text-muted">
                    Escriba el nombre de su empresa, Esta informacion aparecerá en la esquina superior izquierda de la página y tambien al compartir en redes sociales
                  </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Nombres del Propietario</Form.Label>
                <Form.Control type="text" placeholder="Nombres del Propietario" onChange={onChangeHandler} name="nombres_propietario" value={Formulario["nombres_propietario"]} required />
                <Form.Text className="text-muted">
                    Nombres del Propietario
                  </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Apellidos del Propietario</Form.Label>
                <Form.Control type="text" placeholder="Apellidos del Propietario" onChange={onChangeHandler} name="apellidos_propietario" value={Formulario["apellidos_propietario"]} required />
                <Form.Text className="text-muted">
                    Apellidos del Propietario
                  </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Descripcion del Negocio</Form.Label>
                <Form.Control type="text" placeholder="Descripcion del negocio" onChange={onChangeHandler} name="descripcion" value={Formulario["descripcion"]} required />
                <Form.Text className="text-muted">
                    Una breve descripcion del negocio, Esta informacion aparecerá al compartir en las redes sociales
                  </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Numero de Contacto 1</Form.Label>
                <Form.Control type="text" placeholder="Numero de Contacto" onChange={onChangeHandler} name="telefono1" value={Formulario["telefono1"]} required />
                <Form.Text className="text-muted">
                    El numero telefonico aparecerá en los formularios de contacto
                  </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Numero de Contacto(opcional)</Form.Label>
                <Form.Control type="text" placeholder="Numero de Contacto(opcional)" onChange={onChangeHandler} name="telefono2" value={Formulario["telefono2"]} />
                <Form.Text className="text-muted">
                    El numero telefonico aparecerá en los formularios de contacto
                  </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Direccion del Negocio</Form.Label>
                <Form.Control type="text" placeholder="Direccion del Negocio" onChange={onChangeHandler} name="direccion" value={Formulario["direccion"]} required />
                <Form.Text className="text-muted">
                    La direccion del negocio aparecera en los formularios de contacto
                  </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Correo Electronico 1</Form.Label>
                <Form.Control type="email" placeholder="Correo Electronico" onChange={onChangeHandler} name="correo1" value={Formulario["correo1"]} required />
                <Form.Text className="text-muted">
                    El correo principal destinado para comunicaciones con el cliente.
                  </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Correo Electronico 2</Form.Label>
                <Form.Control type="email" placeholder="Correo Electronico(opcional)" onChange={onChangeHandler} name="correo2" value={Formulario["correo2"]} />
                <Form.Text className="text-muted">
                    Un correo alternativo opcional, para otro tipo de interacciones con el cliente.
                  </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
                Guardar
              </Button>
        </Form>

    )
}