import React from 'react'
import PropTypes from 'prop-types'
import {Container,Row,Col,Button,Form} from 'react-bootstrap';
import {useNavigate,NavLink} from "react-router-dom"

const MenuInferior = (props) => {
    // let navigate = useNavigate()
    return (
        <Container fluid style={{padding:"0px",justifyContent: "center"}} >
            <Row style={{width:"100%",justifyContent:"center"}}>
                <Col xs={4}>
                    <NavLink to={`/historial`}>
                        <Button  >
                            Histor
                        </Button>
                    </NavLink>

                </Col>
                <Col xs={4}>
                    <NavLink to={`/cargarHora`}>
                        <Button>
                            Marcar
                        </Button>
                    </NavLink>
                </Col>
                <Col xs={4}>
                    <NavLink to={`/config`}>
                        <Button>
                            Config
                        </Button>
                    </NavLink>

                </Col>
            </Row>

        </Container>
    )
}

export default MenuInferior;
