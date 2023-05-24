import React,{useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import {Container,Navbar,Row,Col,Button,Form} from 'react-bootstrap';
import MenuInferior from '../components/menuInf'
import Peticiones from '../helpers/peticiones.js'
import { BiUserCircle } from "react-icons/bi";


const MultipleRegistro = (props) => {
    const [datos, setDatos] = useState([]);
    const [msg, setMsg] = useState("");
    // const [,,,,,,endpointLibre,obtenerPersona,registrarMarcacion,obtenerHistorial] = Peticiones();
    const {endpointLibre,obtenerPersona,registrarMarcacion,obtenerHistorial,obtenerPersonales} = Peticiones();
    useEffect(() => {
      const items = JSON.parse(localStorage.getItem('persona'));
      if (items) {
       setDatos(items);
      }
    }, []);

    const actualizarBD = async ()=>{
        await obtenerPersonales();
    }

    const guardarInfo = async (evento)=>{
        evento.preventDefault();
        const cedula = evento.target.cedula.value;
        try {
            const listaPersonales = JSON.parse(localStorage.getItem('personales')) ;
            const personal = listaPersonales.find((elemento)=>{ return elemento.nro_docum == cedula });

            if(cedula =="123456"){
                localStorage.setItem('persona',JSON.stringify({'cedula':cedula,"nombre":"Invitado","apellido":"Prueba","dsc_cargo":"QA"}));
                setMsg("Registrado correctamente");

            }else if(typeof personal != 'undefined'){
                    setMsg("Registrado correctamente")
                    localStorage.setItem('persona',JSON.stringify({'cedula':personal.nro_docum,"nombre":personal.nombres,"apellido":personal.apellidos,"dsc_cargo":personal.dsc_cargo,"id":personal.id}));
            }else{
                localStorage.setItem('persona',JSON.stringify({}));
                setMsg("Usuario no existe en el registro");
            }

        } catch (e) {
            console.error(e);
            setMsg("Ha ocurrido un error, comuniquese con el administrador")
        } finally {

        }

    }

    return (
        <>
            <Form onSubmit={guardarInfo}>
                <Container fluid style={{alignItems:"center",gridGap:"1em",display:"grid",marginTop:"3em"}}>
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
                        <Col>
                            <Form.Control type="text" placeholder="Ingrese su Cédula" id="cedula" name="cedula"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button variant="primary" type="submit" style={{width:"100%"}}>
                                Buscar
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button variant="success" style={{width:"100%"}} onClick={()=>actualizarBD()}>
                                ActualizarBD
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h3>{msg}</h3>
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
