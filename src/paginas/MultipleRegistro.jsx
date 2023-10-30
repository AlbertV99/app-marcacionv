import React,{useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import {Container,Navbar,Row,Col,Button,Form} from 'react-bootstrap';
import MenuInferior from '../components/menuInf'
import Peticiones from '../helpers/peticiones.js'
import { BiUserCircle } from "react-icons/bi";


const MultipleRegistro = (props) => {
    const [datos, setDatos] = useState([]);
    const [msg, setMsg] = useState("");
    const [msg2, setMsg2] = useState("");
    const [cantEmp, setCantEmp] = useState(0);
    const [cantPend, setCantPend] = useState(0);
    // const [,,,,,,endpointLibre,obtenerPersona,registrarMarcacion,obtenerHistorial] = Peticiones();
    const {endpointLibre,obtenerPersona,registrarMarcacion,obtenerHistorial,obtenerPersonales,obtenerListaEnviar,enviarLista} = Peticiones();
    useEffect(() => {
        const items = localStorage.getItem('personales');
        let listaPers = []
        if(items != "undefined"){
            listaPers = JSON.parse(items)
        }
        if (listaPers) {
          setDatos(listaPers);
          setCantEmp(listaPers.length);
        }
      actualizarCantLista()
    }, []);

    const actualizarCantLista = ()=>{
        const listaEnviar = obtenerListaEnviar()
        setCantPend(listaEnviar.length);

    }
    const actualizarBD = async ()=>{
        await obtenerPersonales();
        let listaPersonales = localStorage.getItem('personales');
        listaPersonales = JSON.parse(listaPersonales);
        setCantEmp(listaPersonales.length);
        try {
            console.log("A")
            await enviarLista();
            console.log("E")
            actualizarCantLista()
        } catch (e) {
            console.log(e.message)
            // setMsg2("Error al enviar datos al servidor")
            setMsg2(e.message)
        }
    }

    const guardarInfo = async (evento)=>{
        evento.preventDefault();
        const cedula = evento.target.cedula.value;
        try {
            let listaPersonales = localStorage.getItem('personales');
            listaPersonales = JSON.parse(listaPersonales);
            console.log(listaPersonales,'test');

            const personal = listaPersonales.find((elemento)=>{ return elemento.nro_docum == cedula });
            if(typeof personal != 'undefined'){
                    localStorage.setItem('persona',JSON.stringify({'cedula':personal.nro_docum,"nombre":personal.nombre,"apellido":personal.apellidos,"dsc_cargo":personal.dsc_cargo,"id":personal.id}));
                    setMsg("Registrado correctamente")
            }else{
                localStorage.setItem('persona',JSON.stringify({}));
                setMsg("Usuario no existe en el registro");
            }

        } catch (e) {
            console.error(e);
            setMsg("Ha ocurrido un error, comuniquese con el administrador")
        }
        try {
            enviarLista();
            actualizarCantLista()
        } catch (e) {
            setMsg2("Error al enviar datos al servidor")
        }

    }

    return (
        <>
            <Form onSubmit={guardarInfo}>
                <Container fluid style={{alignItems:"center",gridGap:"1em",display:"grid",marginTop:"3em"}}>
                    <Row>
                        <Col>
                            <p style={{fontSize:'8pt',color:'#787878'}}>{cantEmp}</p>
                        </Col>
                        <Col>
                        </Col>
                        <Col>
                            <p style={{fontSize:'8pt',color:'#787878'}}>{cantPend}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h2 style={{fontSize:"8em"}}><BiUserCircle/></h2>
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
                        <Col xs={2}>
                        </Col>
                        <Col>
                            <Form.Control type="text" placeholder="Ingrese su Cédula" id="cedula" name="cedula"/>
                        </Col>
                        <Col xs={2}>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={2}>
                        </Col>
                        <Col>
                            <Button variant="primary" type="submit" style={{width:"100%"}}>
                                Buscar
                            </Button>
                        </Col>
                        <Col xs={2}>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={2}>
                        </Col>
                        <Col>
                            <Button variant="success" style={{width:"100%"}} onClick={()=>actualizarBD()}>
                                ActualizarBD
                            </Button>
                        </Col>
                        <Col xs={2}>
                        </Col>
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
                <Navbar fixed='bottom' style={{position:'fixed',bottom:"100px",width:"100%",justifyContent:"center"}}>

                </Navbar>
            </Form>

        </>
    )
}

export default MultipleRegistro
