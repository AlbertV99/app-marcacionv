import React,{useState,useEffect} from 'react'

import PropTypes from 'prop-types'
import {Container,Navbar,Row,Col,Button,Table} from 'react-bootstrap';
import MenuInferior from '../components/menuInf'
import Peticiones from '../helpers/peticiones.js'


const Historial = (props) => {
    const [datos, setDatos] = useState([]);
    const [historial,setHistorial] = useState([])
    const [persona,setPersona] = useState({"cedula":""})
    const [msg, setMsg] = useState("");
    const [,,,,,,endpointLibre,obtenerPersona,registrarMarcacion,obtenerHistorial] = Peticiones();

    useEffect(() => {
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
        Historial(cedula.cedula)

    }, []);

    const Historial = async (ci)=> {
        let datos = await obtenerHistorial(ci);
        console.log(datos)
        setHistorial(datos)
    }

    return (
        <>
                <Container fluid>
                    <Row>
                        <Col>
                            <h2>Historial de Marcacion</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Table striped hover variant="dark">
                                <thead>
                                    <tr>
                                        <th>Fecha</th>
                                        <th>Personal</th>
                                        <th>Entrada</th>
                                        <th>Salida</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        historial.map((fila)=>{
                                            return <tr key={`hist=${fila.id}`}>
                                                <td>{fila.fecha}</td>
                                                <td>{fila.personal}</td>
                                                <td>{fila.hs_entrada}</td>
                                                <td>{fila.hs_salida}</td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h3>{msg}</h3>
                        </Col>
                    </Row>
                </Container>

        </>
    )
}

export default Historial
