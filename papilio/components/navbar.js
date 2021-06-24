import Router, { useRouter } from 'next/router';

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import NavDropdown from "react-bootstrap/NavDropdown"
import Form from "react-bootstrap/Form"
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"
import AuthService from "../lib/AuthService"


export default function NavBar(props) {
    /*
        Cuando la barra de navegacion detecte si el usuario esta o no registrado, debe cambiar el boton de inicio sesion a Cerrar Sesion
        La lista de menues se debe generar automaticamente, por lo que los datos se obtienen de la base de datos en una tabla llamada menues

    */
    const router = useRouter()
    const Auth = new AuthService()

    function cerrar_sesion(e) {
        Auth.logout()
        router.push('/')
    }
    //console.log(props.login)
    //console.log(props.login +" el usuario no ha iniciado la sesion")
    if (props.login == false) {
        //Este es el menu para personas que no han iniciado sesion
        return (<>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">{props.titulo}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="quienesomos">Sobre Nosotros</Nav.Link>
                        <Nav.Link href="contacto">Contactenos</Nav.Link>
                        <Nav.Link href="/Memorial/ver_memorias">Memorial</Nav.Link>
                    </Nav>
                    <Form inline>
                        <Nav.Link href="/Sesion/Inicio_sesion">Iniciar Sesion</Nav.Link>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </>
        )
    } else {
        //Este es el menu para personas que si han iniciado sesion
        if (Auth.getPerfil(props.token).roles == 1) {
            //Si el usuario es administrador, mostrar este menu
            return (<>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/">{props.titulo}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Inicio</Nav.Link>
                        </Nav>
                        <Form inline>
                            <Button onClick={cerrar_sesion}>Cerrar Sesion</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
            </>
            )
        }
        if (Auth.getPerfil(props.token).roles == 2) {
            //Si el usuario es un usuario normal, mostrar este menu
            return (<>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/">{props.titulo}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Inicio</Nav.Link>
                            <Nav.Link href="quienesomos">Sobre Nosotros</Nav.Link>
                            <Nav.Link href="contacto">Contactenos</Nav.Link>
                            <Nav.Link href="/Memorial/ver_memorias">Memorial</Nav.Link>
                        </Nav>
                        <Form inline>
                            <Button onClick={cerrar_sesion}>Cerrar Sesion</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
            </>
            )
        }
    }

}