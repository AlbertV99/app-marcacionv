import React from 'react'
import PropTypes from 'prop-types'
import {Container,Row,Col,Button,Form} from 'react-bootstrap';
import {useNavigate,NavLink} from "react-router-dom"

const MenuInferior = (props) => {
    // let navigate = useNavigate()
    return (
        <Container fluid>
            <Row>
                <Button variant="secondary">
                    Historial
                </Button>
                <NavLink to={`/cargarHora`}>
                    <Button>
                        Marcar
                    </Button>
                </NavLink>
                <NavLink to={`/config`}>
                    <Button>
                        Config
                    </Button>
                </NavLink>
            </Row>

        </Container>
    )
}

export default MenuInferior;
