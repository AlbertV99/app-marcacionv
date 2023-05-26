import React,{useState,useEffect,useCallback,useRef} from 'react'
import PropTypes from 'prop-types'
import {useNavigate,NavLink} from "react-router-dom"
import {Container,Navbar,Row,Col,Button,Form} from 'react-bootstrap';
import MenuInferior from '../components/menuInf'
import Webcam from "react-webcam";
import peticiones from '../helpers/peticiones'
import { BiCurrentLocation, BiLogInCircle, BiLogOutCircle,BiAccessibility,BiTime,BiLocationPlus,BiTargetLock } from "react-icons/bi";

const CargarHora = (props) => {
    const {guardarNuevoJson} = peticiones();
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [horaActual,setHoraActual] = useState("")
    const [persona,setPersona] = useState({"cedula":""})
    const [estadoUbicacion,setEstadoUbicacion] = useState(false)
    const [ubicacion,setUbicacion] = useState({"latitud":0,"longitud":0})
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
        geolocalizar();
        const intervalo = setInterval(ActualizarReloj, 1000);
        return function cleanup() {
            clearInterval(intervalo);
        }
    },[])

    const ActualizarReloj=()=>{
        const hora = new Date();
        setHoraActual(hora.toLocaleTimeString('es-PY'))

    }
    const geolocalizar = async ()=>{
          navigator.geolocation.getCurrentPosition(
              (a) => {
                  console.log(a);

                  setUbicacion({"latitud":a.coords.latitude,"longitud":a.coords.longitude});
                  setEstadoUbicacion(true);
              },
              (error)=>{
                console.log("No activo la geolocalizacion",error);
                setEstadoUbicacion(false);

              }
          )
    }
    const capturePhoto = (tipo) => {
        const photo = webcamRef.current.getScreenshot();
        setImgSrc(photo);

        const data = {
            personal_id: persona.id,
            documento: persona.cedula,
            tipo_marcacion : tipo,
            latitud:ubicacion.latitud,
            longitud:ubicacion.longitud,
            photo: photo,
        };
        console.log(data)
        // Envía la foto y los datos al servidor utilizando fetch
        // guardarNuevoJson("/marcacion/Parametros/ABMForm.php",data);

      };
    const capture = useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            console.log(imageSrc)
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
                    <hr/>
                </Row>
                <Row>
                    <Col>
                        <h5><BiTime/> {horaActual}</h5>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Webcam audio={false} height={250}ref={webcamRef} screenshotFormat="image/jpeg" videoConstraints={videoConstraints} width={250}></Webcam>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h4>{persona.cedula}</h4>
                        <h2>{persona.nombre +' '+persona.apellido} </h2>
                        <h6>{persona.dsc_cargo}</h6>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3>{(estadoUbicacion)?<BiTargetLock/>:<BiLocationPlus/>}</h3>
                        <span style={{fontSize:"10pt"}}>{ubicacion.latitud} ; {ubicacion.longitud}</span>
                    </Col>
                </Row>


            </Container>
            <Navbar fixed='bottom' style={{position:'fixed',bottom:"100px",width:"100%",justifyContent:"center"}}>
                <Col xs={1}>
                </Col>
                <Col>
                    <Button variant="success" onClick={()=>{capturePhoto("E")}} style={{width:"100%"}}>
                        <BiLogInCircle/>
                        Entrada
                    </Button>
                </Col>
                <Col>
                    <Button variant="primary" onClick={()=>{geolocalizar()}}>
                        <BiAccessibility/>
                    </Button>
                </Col>
                <Col>
                    <Button variant="danger" onClick={()=>{capturePhoto("S")}} style={{width:"100%"}}>
                        <BiLogOutCircle/>
                        Salida
                    </Button>
                </Col>
                <Col xs={1}>
                </Col>
            </Navbar>
        </Form>

        </>
)
}

export default CargarHora
/*
// <Row>
//     <Col>
//         {imgSrc && (
//             <img
//               src={imgSrc}
//             />
//           )}
//     </Col>
// </Row>
 */
