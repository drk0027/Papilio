import Router, { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';


import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import NavDropdown from "react-bootstrap/NavDropdown"
import Form from "react-bootstrap/Form"
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"
import Pagination from "react-bootstrap/Pagination"
import AuthService from "../lib/AuthService"


export default function NavBar(props) {
    /*
        valores necesarios:
        total registros: la cantidad de entradas con las que ha respondido el sistema
        pagina activa: el numero de la pagina en el paginador que se encuentra seleccionado

    */
    var pag = [
        [1, "active"],
    ]
    var total_registros=100
    var paginas=0
    useEffect(() => {
        //determinar la cantidad de paginas
        if(total_registros%10>0){
            paginas=parseInt(total_registros/10)+1
        }else{
            paginas=parseInt(total_registros/10)
        }

    }, []);

    //console.log(props)
    return (
        <>
            <Pagination>
                {
                    pag.map(pg => (
                        <Pagination.Item key={pg[0]} active={pg[1]}>
                            {pg[0]}
                        </Pagination.Item>
                    ))
                }
            </Pagination>
        </>
    )
}