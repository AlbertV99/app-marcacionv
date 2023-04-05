import React from 'react'
import PropTypes from 'prop-types'
import {Container,Navbar,Row,Col,Button,Form} from 'react-bootstrap';
import MenuInferior from '../components/menuInf'
import Webcam from "react-webcam";
const CargarHora = (props) => {
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);
    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            setImgSrc(imageSrc);
        },
        [webcamRef,setImgSrc]
    )
    const videoConstraints = {
        facingMode: "user"
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
                        <Webcam audio={false} height={300}ref={webcamRef} screenshotFormat="image/jpeg" videoConstraints={videoConstraints} width={300}></Webcam>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {imgSrc && (
                            <img
                              src={imgSrc}
                            />
                          )}
                    </Col>
                </Row>
            </Container>
            <Navbar fixed='bottom' style={{position:'fixed',bottom:"100px",width:"100%"}}>
                <Button variant="primary" onClick={capture}>
                    Marcar
                </Button>
            </Navbar>
        </Form>

        </>
)
}

export default CargarHora
