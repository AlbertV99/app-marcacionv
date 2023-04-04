import React from 'react'
import PropTypes from 'prop-types'
import {Container,Navbar,Row,Col,Button,Form} from 'react-bootstrap';
import MenuInferior from '../components/menuInf'
import Webcam from "react-webcam";
const CargarHora = (props) => {
    const videoConstraints = {
      facingMode: "left"
    };

    return (
        <>
            <Form>
                <Container fluid>
                    <Row>
                        <Col>
                            <h2>Registro de Horas</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Webcam audio={false} height={200} videoConstraints={videoConstraints} width={200}></Webcam>
                        </Col>
                    </Row>
                </Container>
                <Navbar fixed='bottom' style={{position:'fixed',bottom:"100px",width:"100%"}}>
                    <Button variant="primary">
                        Entrada
                    </Button>
                    <Button variant="primary">
                        Salida
                    </Button>
                </Navbar>
            </Form>

        </>
    )
}

export default CargarHora
