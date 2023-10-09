import React,{useState,useEffect,useCallback,useRef} from 'react'
import PropTypes from 'prop-types'
import {useNavigate,NavLink} from "react-router-dom"
import {Container,Navbar,Row,Col,Button,Form} from 'react-bootstrap';
import MenuInferior from '../components/menuInf'
import Webcam from "react-webcam";
import peticiones from '../helpers/peticiones'
import { BiCurrentLocation, BiLogInCircle, BiLogOutCircle,BiAccessibility,BiTime,BiLocationPlus,BiTargetLock,BiPulse } from "react-icons/bi";

const CargarHora = (props) => {
    const {guardarNuevoJson} = peticiones();
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [pulsar,setPulso] = useState(false)
    const [horaActual,setHoraActual] = useState("")
    const [persona,setPersona] = useState({"cedula":""})
    const [estadoUbicacion,setEstadoUbicacion] = useState(false)
    const [ubicacion,setUbicacion] = useState({"latitud":0,"longitud":0})
    const [intervalo,setIntervalo] = useState(null)
    const [msg,setMsg] = useState("")
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
        setMsg("");
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
    // const pulsarEnvios = ()=>{
    //     if(!pulsar){//comenzar pulsaciones
    //         // setIntervalo(setInterval(pulsaciones,60000)) // milisegundos
    //     }else{//parar pulsaciones
    //         clearInterval(intervalo);
    //         setIntervalo(null)
    //     }
    //     setPulso(!pulsar);
    //
    // }
    //
    // const pulsaciones = ()=>{
    //     geolocalizar();
    //     enviarDatos();
    //
    // }

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
        let resp = guardarNuevoJson("/marcador/Parametros/ABMForm.php?opcion="+tipo,data);
        if(resp.cod =='00'){ // OPTIMIZE:  hacer alert con bootstrap
            setMsg("Marcado Correctamente")
        }else{
            setMsg(resp.msg)
        }

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

    const enviarDatos = (foto="") => {
        const data = {
            personal_id: persona.id,
            documento: persona.cedula,
            tipo_marcacion :  "E",
            latitud:ubicacion.latitud,
            longitud:ubicacion.longitud,
            photo: foto,
        };
        console.log(data)
        // Envía la foto y los datos al servidor utilizando fetch
        guardarNuevoJson("/marcador/Parametros/ABMForm.php?opcion="+"E",data);

    }




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
                        <p style={{fontSize:"8pt"}}><BiTime/> {horaActual}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Webcam audio={false} height={250}ref={webcamRef} screenshotFormat="image/jpeg" videoConstraints={videoConstraints} width={250}></Webcam>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h7>{persona.cedula}</h7>
                        <h5>{persona.nombre} </h5>
                        <h7>{persona.dsc_cargo}</h7>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p style={{fontSize:"8pt"}}>{(estadoUbicacion)?<BiTargetLock/>:<BiLocationPlus/>} <span>{ubicacion.latitud} ; {ubicacion.longitud}</span></p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {msg}
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
