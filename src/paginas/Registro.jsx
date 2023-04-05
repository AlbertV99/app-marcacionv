import React,{useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import {Container,Navbar,Row,Col,Button,Form} from 'react-bootstrap';
import MenuInferior from '../components/menuInf'
import Peticiones from '../helpers/peticiones.js'


const RegistroApp = (props) => {
    const [datos, setDatos] = useState([]);
    const [msg, setMsg] = useState("");
    const [,,,,,,endpointLibre,obtenerPersona,registrarMarcacion,obtenerHistorial] = Peticiones();
    useEffect(() => {
      const items = JSON.parse(localStorage.getItem('persona'));
      if (items) {
       setDatos(items);
      }
    }, []);
    const guardarInfo = async (evento)=>{
        evento.preventDefault();
        const cedula = evento.target.cedula.value;
        console.log(cedula)
        try {
            let temp = await obtenerPersona(cedula);
            if(temp.length > 0){
                console.log(temp)
                temp = temp [0];
                setMsg("Registrado correctamente")
                localStorage.setItem('persona',JSON.stringify({'cedula':cedula,"nombre":temp.nombres,"apellido":temp.apellidos,"dsc_cargo":temp.dsc_cargo}));
            }else{
                setMsg("Usuario no existe en el registro")
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
                <Container fluid>
                    <Row>
                        <Col>
                            <h2>Registro de Persona</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Cedula</Form.Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Control type="text" placeholder="Ingrese su Cedula" id="cedula" name="cedula"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h3>{msg}</h3>
                        </Col>
                    </Row>
                </Container>
                <Navbar fixed='bottom' style={{position:'fixed',bottom:"100px",width:"100%"}}>
                    <Button variant="primary" type="submit">
                        Guardar
                    </Button>
                </Navbar>
            </Form>

        </>
    )
}

export default RegistroApp
