import React,{useState,useEffect,useCallback,useRef} from 'react'
import PropTypes from 'prop-types'
import {useNavigate,NavLink} from "react-router-dom"
import {Container,Navbar,Row,Col,Button,Form} from 'react-bootstrap';
import MenuInferior from '../components/menuInf'
import Webcam from "react-webcam";
const CargarHora = (props) => {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [horaActual,setHoraActual] = useState("")
    const [persona,setPersona] = useState({"cedula":""})
    const navg = useNavigate()


    useEffect(()=>{
        const persona =localStorage.getItem('persona');
        let cedula = "";
        if( persona ){
            cedula = JSON.parse(persona);
            if(cedula.cedula){
                setPersona(cedula)
            }else{
                navg('/config')
            }
        }else{
            navg('/config')
        }
        const intervalo = setInterval(ActualizarReloj, 1000);
        return function cleanup() {
            clearInterval(intervalo);
        }
    },[])

    const ActualizarReloj=()=>{
        const hora = new Date();
        setHoraActual(hora.toLocaleTimeString('es-PY'))

    }

    const capture = useCallback(
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
            <Container fluid style={{alignItems:"center",gridGap:"1em",display:"grid",marginTop:"3em"}}>
                <Row>
                    <Col>
                        <h2>Marcación de entrada/salida</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Webcam audio={false} height={300}ref={webcamRef} screenshotFormat="image/jpeg" videoConstraints={videoConstraints} width={300}></Webcam>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h2>{persona.nombre +' '+persona.apellido +'-'+persona.dsc_cargo} </h2>
                        <h3>{persona.cedula}</h3>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>{horaActual}</Form.Label>
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
            <Navbar fixed='bottom' style={{position:'fixed',bottom:"100px",width:"100%",justifyContent:"center"}}>
                <Button variant="primary" onClick={capture}>
                    Marcar
                </Button>
            </Navbar>
        </Form>

        </>
)
}

export default CargarHora
