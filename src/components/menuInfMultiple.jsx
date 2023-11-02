import React,{useState} from 'react'
import PropTypes from 'prop-types'
import {Container,Row,Col,Button,Form} from 'react-bootstrap';
import {useNavigate,NavLink} from "react-router-dom"
import { BiHistory,BiCalendarCheck,BiCog } from "react-icons/bi";

const MenuInferiorMultiple = (props) => {
    const base = {"historial":"","hora":"","config":""};
    const [dir,setDir] = useState({"historial":"","hora":"","config":""});
    const cambiar = (direccion)=>{
        let temp = base;
        temp[direccion]="activo"
        setDir(temp);
    }
    /*
    historial  BiHistory
    marcar BiCalendarCheck | BiUserCheck
    ajustes BiCog
    // registro BiUserCircle
    */
    return (
        <Container fluid style={{padding:"0px",justifyContent: "center",backgroundColor:'white'}} >
            <Row style={{width:"100%",justifyContent:"center"}} id="opciones">
                <p style={{fontSize:'8pt',color:'#787878'}}>version: 0.1-alpha.15</p>
                <Col xs={6}>
                    <NavLink to={`/cargarHora`}>
                            <h2><BiCalendarCheck/></h2>
                            Marcar
                    </NavLink>
                </Col>
                <Col xs={6} >
                    <NavLink to={`/config`}>
                        <h2><BiCog/></h2>
                        Ajustes
                    </NavLink>

                </Col>
                {/*
                    <Col xs={4}>

                    <NavLink to={`/historial`} >
                            <h2><BiHistory/></h2>
                            Historial
                    </NavLink>
                    </Col>
                    */
                }
            </Row>

        </Container>
    )
}

export default MenuInferiorMultiple;
