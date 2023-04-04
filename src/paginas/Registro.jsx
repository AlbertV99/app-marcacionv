import React from 'react'
import PropTypes from 'prop-types'
import {Container,Navbar,Row,Col,Button,Form} from 'react-bootstrap';
import MenuInferior from '../components/menuInf'

const RegistroApp = (props) => {
    return (
        <>
            <Form>
                <Container fluid>
                    <Row>
                        <Col>
                            <h2>Registro de Persona</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Cedula</Form.Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Control type="text" placeholder="Ingrese su Cedula" id="cedula"/>
                        </Col>
                    </Row>
                </Container>
                <Navbar fixed='bottom' style={{position:'fixed',bottom:"100px",width:"100%"}}>
                    <Button variant="primary">
                        Guardar
                    </Button>
                </Navbar>
            </Form>

        </>
    )
}

export default RegistroApp
