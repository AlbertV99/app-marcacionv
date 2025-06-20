import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Container, Navbar, Row, Col, Button, Form } from "react-bootstrap";
import MenuInferior from "../components/menuInf";
import { useNavigate } from "react-router-dom";
import Peticiones from "../helpers/peticiones.js";
import { BiUserCircle } from "react-icons/bi";
import NavbarEstado from "../components/NavbarEstado.jsx";
import RegistroPersonal from "../components/RegistroPersonal.jsx";
import RegistrarMarcacion from "../components/RegistrarMarcacion.jsx";

const Principal = (props) => {
    const [listaPersonal, setListaPersonal] = useState([]);
    const [msg, setMsg] = useState("");
    const [estadoUbicacion, setEstadoUbicacion] = useState(false);
    const [ubicacion, setUbicacion] = useState({ latitud: 0, longitud: 0 });
    const [cant, setCant] = useState(0);
    const [cantPend, setCantPend] = useState(0);
    const navg = useNavigate();

    const [personalSeleccionado, setPersonalSeleccionado] = useState(null);

    const {
        obtenerPersona,
        registrarMarcacion,
        obtenerPersonales,
        obtenerListaEnviar,
        enviarLista,
        fechaActual,
        procesoDeEnvio,
    } = Peticiones();

    useEffect(() => {
        const items = localStorage.getItem("personales");
        let listaPers = [];
        if (items != "undefined") {
            listaPers = JSON.parse(items);
        } else {
            actualizarBD(false);
        }
        if (listaPers) {
            setListaPersonal(listaPers);
            setCant(listaPers.length);
        }
        actualizarCantLista();
        geolocalizar();
    }, []);

    const actualizarBD = async (mostrar = true) => {
        await obtenerPersonales();
        let listaPersonales = localStorage.getItem("personales");
        listaPersonales = JSON.parse(listaPersonales);
        setListaPersonal(listaPersonales);
        setCant(listaPersonales.length);
        localStorage.setItem("persona", JSON.stringify({}));
        if (mostrar) {
            return "Actualizado correctamente";
        }
        try {
            console.log("A");
            await enviarLista();
            console.log("E");
            actualizarCantLista();
        } catch (e) {
            console.log(e.message);
            // setMsg2("Error al enviar datos al servidor")
            return e.message;
        }
    };
    const actualizarCantLista = () => {
        const listaEnviar = obtenerListaEnviar();
        setCantPend(listaEnviar.length);
    };

    const geolocalizar = async () => {
        navigator.geolocation.getCurrentPosition(
            (a) => {
                console.log(a);

                setUbicacion({
                    latitud: a.coords.latitude,
                    longitud: a.coords.longitude,
                });
                setEstadoUbicacion(true);
            },
            (error) => {
                console.log("No activo la geolocalizacion", error);
                setEstadoUbicacion(false);
            },
        );
    };
    const enviarDatos = async (foto = "", tipo = "E") => {
        const data = {
            personal_id: personalSeleccionado.id,
            documento: personalSeleccionado.cedula,
            fecha: fechaActual(),
            tipo_marcacion: tipo,
            latitud: ubicacion.latitud,
            longitud: ubicacion.longitud,
            photo: foto,
        };
        console.log(data);
        let resp = await procesoDeEnvio(data);
        console.log("Respuesta procesoDeEnvio", resp);
        if (resp.cod == "00") {
            // OPTIMIZE:  hacer alert con bootstrap

            return "Marcado Correctamente";
            setTimeout(restablecerPersonal, 5000);
        } else {
            if (typeof resp.msg == "undefined") {
                return "Error inesperado por parte del servidor";
            } else {
                return resp.msg;
            }
        }
    };
    const restablecerPersonal = () => {
        setPersonalSeleccionado(null);
        navg("/config");
    };

    return (
        <Container>
            <Row>
                <NavbarEstado hasLocation={estadoUbicacion} cant={cantPend} />
            </Row>
            <Row>
                {personalSeleccionado != null ? (
                    <RegistrarMarcacion
                        ubicacionActual={ubicacion}
                        persona={personalSeleccionado}
                        enviarDatos={enviarDatos}
                    ></RegistrarMarcacion>
                ) : (
                    // <h1>En proceso</h1>
                    <RegistroPersonal
                        setPersonal={setPersonalSeleccionado}
                        actualizarBDTop={actualizarBD}
                        listaPersonal={listaPersonal}
                    />
                )}
            </Row>
        </Container>
    );
};
export default Principal;
