import React from 'react'
import PropTypes from 'prop-types'
import {Container,Navbar,Row,Col,Button,Form} from 'react-bootstrap';
import MenuInferior from '../components/menuInf'

const RegistroApp = (props) => {
    const [datos, setDatos] = useState([]);
    useEffect(() => {
      const items = JSON.parse(localStorage.getItem('persona'));
      if (items) {
       setDatos(items);
      }
    }, []);
    const guardarInfo = (evento)=>{
        evento.preventDefault();
        const cedula = evento.target.cedula.value;


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
