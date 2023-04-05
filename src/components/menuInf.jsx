import React from 'react'
import PropTypes from 'prop-types'
import {Container,Row,Col,Button,Form} from 'react-bootstrap';

const MenuInferior = (props) => {

    return (
        <Container fluid>
            <Row>
                <Button variant="secondary">
                    Historial
                </Button>
                <Button>
                    Marcar
                </Button>
                <Button>
                    Perfil
                </Button>
                <Button>
                    Config
                </Button>
            </Row>

        </Container>
    )
}

export default MenuInferior;
