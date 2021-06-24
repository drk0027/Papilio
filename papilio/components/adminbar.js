import Router, { useRouter } from 'next/router';

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import NavDropdown from "react-bootstrap/NavDropdown"
import Form from "react-bootstrap/Form"
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"
import NavItem from "react-bootstrap/NavItem"
import NavLink from "react-bootstrap/NavLink"
import Dropdown from "react-bootstrap/Dropdown"
import Link from 'next/link'

//import AuthService from "../lib/AuthService"


export default function NavBar(props) {
    //Esta barra solo muestra los menues del dashboard del administrador

    //console.log(props.login)
    //console.log(props.login +" el usuario no ha iniciado la sesion")
    return (<>
        <Nav justify variant="tabs" defaultActiveKey="1">
            <Dropdown as={NavItem}>
                <Dropdown.Toggle as={NavLink}>Sistema</Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item><Link href="/">Configuracion</Link></Dropdown.Item>
                    <Dropdown.Item><Link href="/Sistema/seguridad">Seguridad</Link></Dropdown.Item>
                    <Dropdown.Item><Link href="/Sistema/confsendmail">Configurar envio de E-Mail</Link></Dropdown.Item>
                    <Dropdown.Item><Link href="/Formularios/ver_formularios">Solicitudes de informacion </Link></Dropdown.Item>
                    <Dropdown.Item><Link href="/Sistema/archivos">Administrar Archivos </Link></Dropdown.Item>
                    <Dropdown.Item><Link href="/Sistema/galerias">Administrar Galerias </Link></Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown as={NavItem}>
                <Dropdown.Toggle as={NavLink}>Usuarios</Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item><Link href="/Sistema/cuentas">Cuentas de Usuario</Link></Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown as={NavItem}>
                <Dropdown.Toggle as={NavLink}>Memorial</Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item><Link href="/Memorial/ver_memorias">Ver Entradas</Link></Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Nav>
    </>
    )

}