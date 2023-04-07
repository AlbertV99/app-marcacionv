import React,{useState} from 'react'
import PropTypes from 'prop-types'
import {Container,Row,Col,Button,Form} from 'react-bootstrap';
import {useNavigate,NavLink} from "react-router-dom"
import { BiHistory,BiCalendarCheck,BiCog } from "react-icons/bi";

const MenuInferior = (props) => {
    const base = {"historial":"","hora":"","config":""};
    const [dir,setDir] = useState({"historial":"","hora":"","config":""});
    const cambiar = (direccion)=>{
        let temp = base;
        temp[direccion]=true
        setDir(temp);
    }
    /*
    historial  BiHistory
    marcar BiCalendarCheck | BiUserCheck
    ajustes BiCog
    // registro BiUserCircle
    */
    return (
        <Container fluid style={{padding:"0px",justifyContent: "center"}} >
            <Row style={{width:"100%",justifyContent:"center"}}>
                <Col xs={4} >
                    <NavLink to={`/historial`}>
                            <h2><BiHistory/></h2>
                            Historial
                    </NavLink>

                </Col>
                <Col xs={4}>
                    <NavLink to={`/cargarHora`}>
                            <h2><BiCalendarCheck/></h2>
                            Marcar
                    </NavLink>
                </Col>
                <Col xs={4}>
                    <NavLink to={`/config`}>

                            <h2><BiCog/></h2>
                            Ajustes

                    </NavLink>

                </Col>
            </Row>

        </Container>
    )
}

export default MenuInferior;
