import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Container, Navbar, Row, Col, Button, Form } from "react-bootstrap";
import MenuInferior from "../components/menuInf";
import Peticiones from "../helpers/peticiones.js";
import { BiUserCircle } from "react-icons/bi";

const RegistroPersonal = ({ setPersonal, actualizarBDTop, listaPersonal }) => {
    const [datos, setDatos] = useState([]);
    const [msg, setMsg] = useState("");
    const [msg2, setMsg2] = useState("");
    const [cantEmp, setCantEmp] = useState(0);
    const [cantPend, setCantPend] = useState(0);
    const [listaPersLocal, setListaPersLocal] = useState([]);
    // const [,,,,,,endpointLibre,obtenerPersona,registrarMarcacion,obtenerHistorial] = Peticiones();
    const {
        endpointLibre,
        obtenerPersona,
        registrarMarcacion,
        obtenerHistorial,
        obtenerPersonales,
        obtenerListaEnviar,
        enviarLista,
    } = Peticiones();
    useEffect(() => {
        setListaPersLocal(listaPersonal);
    }, [listaPersonal]);
    const actualizarBD = async () => {
        let temp = await actualizarBDTop();
        setMsg2(temp);
    };

    const guardarInfo = async (evento) => {
        evento.preventDefault();
        const cedula = evento.target.cedula.value;
        try {
            let listaPersonales = listaPersLocal;
            console.log(listaPersonales, "test");

            const personal = listaPersonales.find((elemento) => {
                return elemento.nro_docum == cedula;
            });
            if (typeof personal != "undefined") {
                setPersonal({
                    cedula: personal.nro_docum,
                    nombre: personal.nombre,
                    apellido: personal.apellidos,
                    dsc_cargo: personal.dsc_cargo,
                    id: personal.id,
                });
                setMsg("Registrado correctamente");
            } else {
                localStorage.setItem("persona", JSON.stringify({}));
                setMsg("Usuario no existe en el registro");
            }
        } catch (e) {
            console.error(e);
            setMsg("Ha ocurrido un error, comuniquese con el administrador");
        }
        try {
            enviarLista();
            actualizarCantLista();
        } catch (e) {
            setMsg2("Error al enviar datos al servidor");
        }
    };

    return (
        <>
            <Form onSubmit={guardarInfo}>
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
                            <h2 style={{ fontSize: "8em" }}>
                                <BiUserCircle />
                            </h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h2>Registro de Persona</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Cédula de Identidad</Form.Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={2}></Col>
                        <Col>
                            <Form.Control
                                type="number"
                                placeholder="Ingrese su Cédula"
                                id="cedula"
                                name="cedula"
                            />
                        </Col>
                        <Col xs={2}></Col>
                    </Row>
                    <Row>
                        <Col xs={2}></Col>
                        <Col>
                            <Button
                                variant="primary"
                                type="submit"
                                style={{ width: "100%" }}
                            >
                                Buscar
                            </Button>
                        </Col>
                        <Col xs={2}></Col>
                    </Row>
                    <Row>
                        <Col xs={2}></Col>
                        <Col>
                            <Button
                                variant="success"
                                style={{ width: "100%" }}
                                onClick={() => actualizarBD()}
                            >
                                ActualizarBD
                            </Button>
                        </Col>
                        <Col xs={2}></Col>
                    </Row>
                    <Row>
                        <Col>
                            <h3>{msg}</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h3>{msg2}</h3>
                        </Col>
                    </Row>
                </Container>
                <Navbar
                    fixed="bottom"
                    style={{
                        position: "fixed",
                        bottom: "100px",
                        width: "100%",
                        justifyContent: "center",
                    }}
                ></Navbar>
            </Form>
        </>
    );
};

export default RegistroPersonal;
