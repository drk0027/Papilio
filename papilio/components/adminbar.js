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
                    <Dropdown.Item><Link href="/">Seguridad</Link></Dropdown.Item>
                    <Dropdown.Item><Link href="/">Pagina de Inicio</Link></Dropdown.Item>
                    <Dropdown.Item><Link href="/">Pagina de Ofertas</Link></Dropdown.Item>
                    <Dropdown.Item><Link href="/">Pagina de Contacto</Link></Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown as={NavItem}>
                <Dropdown.Toggle as={NavLink}>Usuarios</Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item><Link href="/">Cuentas de Usuario</Link></Dropdown.Item>
                    <Dropdown.Item><Link href="/">Archivos de Usuario</Link></Dropdown.Item>
                    
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown as={NavItem}>
                <Dropdown.Toggle as={NavLink}>Ofertas</Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item><Link href="/">Crear Ofertas</Link></Dropdown.Item>
                    <Dropdown.Item><Link href="/">Ver Pedidos</Link></Dropdown.Item>
                    <Dropdown.Item><Link href="/">Ver algo mas que se me ocurra</Link></Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown as={NavItem}>
                <Dropdown.Toggle as={NavLink}>Transporte</Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item><Link href="/Perfil/transporte">Transporte</Link></Dropdown.Item>
                    <Dropdown.Item>Historial</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown as={NavItem}>
                <Dropdown.Toggle as={NavLink}>Social</Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item><Link href="/Perfil/social">Solicitudes</Link></Dropdown.Item>
                    <Dropdown.Item>Respuestas</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown as={NavItem}>
                <Dropdown.Toggle as={NavLink}>Mensajeria</Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item>Bandeja de entrada</Dropdown.Item>
                    <Dropdown.Item>Bandeja de salida</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Nav>
    </>
    )

}