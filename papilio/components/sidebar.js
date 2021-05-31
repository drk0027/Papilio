import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Accordion from "react-bootstrap/Accordion"
import Nav from "react-bootstrap/Nav"
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button';
import Link from 'next/link'



export default function Sidebar(props) {
    return (
        <Col md={4}>
            <Accordion defaultActiveKey={props.libretas[0].id_libreta}>
                {props.libretas.map((libreta) => (
                    <Card key={libreta.id_libreta}>
                        <Accordion.Toggle as={Card.Header} eventKey={libreta.id_libreta}>
                            {libreta.nombre}
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={libreta.id_libreta}>
                            <Card.Body>
                                <Row>
                                    <button>1</button>
                                    <button>2</button>
                                    <button>3</button>
                                </Row>
                                <ul>
                                    {libreta.notas.map((nota) => (
                                        <li key={nota.id_nota} title={nota.nombre}>
                                            <Link href={"/nota/"+ nota.id_nota}>
                                                {nota.nombre}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>

                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>

                ))}
            </Accordion>



        </Col>
    )
}