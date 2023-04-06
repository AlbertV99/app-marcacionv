import React,{useState} from 'react'
import PropTypes from 'prop-types'
import {Container,Row,Col,Button,Form} from 'react-bootstrap';
import {useNavigate,NavLink} from "react-router-dom"

const MenuInferior = (props) => {
    const base = {"historial":"","hora":"","config":""};
    const [dir,setDir] = useState({"historial":"","hora":"","config":""});
    const cambiar = (direccion)=>{
        let temp = base;
        temp[direccion]=true
        setDir(temp);
    }
    return (
        <Container fluid style={{padding:"0px",justifyContent: "center"}} >
            <Row style={{width:"100%",justifyContent:"center"}}>
                <Col xs={4}>
                    <NavLink to={`/historial`}>
                        <Button size="lg" onClick={()=>(cambiar("historial"))} active={dir.historial} >
                            Histor
                        </Button>
                    </NavLink>

                </Col>
                <Col xs={4}>
                    <NavLink to={`/cargarHora`}>
                        <Button size="lg"  onClick={()=>(cambiar("hora"))} active={dir.hora}>
                            Marcar
                        </Button>
                    </NavLink>
                </Col>
                <Col xs={4}>
                    <NavLink to={`/config`}>
                        <Button size="lg" onClick={()=>(cambiar("config"))} active={dir.config}>
                            Config
                        </Button>
                    </NavLink>

                </Col>
            </Row>

        </Container>
    )
}

export default MenuInferior;
