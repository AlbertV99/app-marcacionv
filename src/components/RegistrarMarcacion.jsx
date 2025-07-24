import React, { useState, useEffect, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { useNavigate, NavLink } from "react-router-dom";
import { Container, Navbar, Row, Col, Button, Form } from "react-bootstrap";
import MenuInferior from "../components/menuInf";
import Webcam from "react-webcam";
import peticiones from "../helpers/peticiones";
import {
    BiCurrentLocation,
    BiLogInCircle,
    BiLogOutCircle,
    BiAccessibility,
    BiTime,
    BiLocationPlus,
    BiTargetLock,
    BiPulse,
} from "react-icons/bi";

const RegistrarMarcacion = ({ persona, ubicacionActual, enviarDatos }) => {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [horaActual, setHoraActual] = useState("");
    const [estadoUbicacion, setEstadoUbicacion] = useState(false);
    const [ubicacion, setUbicacion] = useState({ latitud: 0, longitud: 0 });
    const [msg, setMsg] = useState("");
    const [enviando, setEnviando] = useState(false);

    useEffect(() => {
        setMsg("");
        const intervalo = setInterval(ActualizarReloj, 1000);
        return function cleanup() {
            clearInterval(intervalo);
        };
    }, []);

    useEffect(() => {
        setUbicacion(ubicacionActual);
    }, [ubicacionActual]);

    const ActualizarReloj = () => {
        const hora = new Date();
        setHoraActual(
            hora.toLocaleTimeString("es-PY", {
                timeZone: "America/Argentina/Mendoza",
            }),
        );
    };

    const capturePhoto = async (tipo) => {
        setEnviando(true);
        const photo = webcamRef.current.getScreenshot();
        setImgSrc(photo);

        if (validarDatosCamara(photo)) {
            if (validarUbicacion(ubicacionActual)) {
                try {
                    // let resp = await guardarNuevoJson("/marcador/Parametros/ABMForm.php?opcion="+tipo,data);
                    let resp = await enviarDatos(photo, tipo);
                    console.log(resp);
                    setMsg(resp);
                } catch (e) {
                    setMsg("Ha ocurrido un error al realizar la marcacion");
                }
            } else {
                setMsg(
                    "Debe activar su ubicacion o esperar a que sea obtenida",
                );
            }
        } else {
            setMsg("Debe activar la camara");
        }
        setEnviando(false);
    };

    // Envía la foto y los datos al servidor utilizando fetch
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        console.log(imageSrc);
        setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);
    const videoConstraints = {
        facingMode: "user",
    };

    const validarDatosCamara = (datos) => {
        if (datos == "" || typeof datos == "undefined") {
            return false;
        }
        return true;
    };
    const validarUbicacion = (datos) => {
        if (
            typeof ubicacionActual.latitud == "undefined" ||
            typeof ubicacionActual.longitud == "undefined" ||
            ubicacionActual.longitud == 0 ||
            ubicacionActual.latitud == 0
        ) {
            return false;
        }
        return true;
    };

    return (
        <>
            <Form>
                <Container
                    fluid
                    style={{
                        alignItems: "center",
                        gridGap: "1em",
                        display: "grid",
                        marginTop: "3em",
                    }}
                >
                    <Row>
                        <Col>
                            <h2>Marcación de entrada/salida</h2>
                        </Col>
                        <hr />
                    </Row>
                    <Row>
                        <Col>
                            <p style={{ fontSize: "8pt" }}>
                                <BiTime /> {horaActual}
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Webcam
                                audio={false}
                                height={250}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                videoConstraints={videoConstraints}
                                width={250}
                            ></Webcam>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <span style={{ fontSize: "10pt" }}>
                                {persona.cedula}
                            </span>
                            <h5>{persona.nombre} </h5>
                            <p style={{ fontSize: "8pt" }}>
                                {persona.dsc_cargo}
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p style={{ fontSize: "10pt" }}>{msg}</p>
                            <p style={{ fontSize: "8pt" }}>
                                {estadoUbicacion ? (
                                    <BiTargetLock />
                                ) : (
                                    <BiLocationPlus />
                                )}{" "}
                                <span>
                                    {ubicacion.latitud} ; {ubicacion.longitud}
                                </span>
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={1}></Col>
                        <Col>
                            <Button
                                variant="success"
                                onClick={() => {
                                    capturePhoto("E");
                                }}
                                style={{ width: "100%" }}
                            >
                                <BiLogInCircle />
                                Entrada
                            </Button>
                        </Col>
                        <Col xs={2}>
                            <Button
                                variant="info"
                                onClick={() => {
                                    geolocalizar();
                                }}
                                style={{ width: "100%" }}
                            >
                                <BiCurrentLocation />
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                variant="danger"
                                onClick={() => {
                                    capturePhoto("S");
                                }}
                                style={{ width: "100%" }}
                            >
                                <BiLogOutCircle />
                                Salida
                            </Button>
                        </Col>
                        <Col xs={1}></Col>
                    </Row>
                </Container>
            </Form>
        </>
    );
};

export default RegistrarMarcacion;
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
