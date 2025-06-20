import { Navbar, Container, Nav, Badge, Row, Col } from "react-bootstrap";
import { FaWifi, FaMapMarkerAlt } from "react-icons/fa";
import { MdStorage } from "react-icons/md";
import { useState, useEffect } from "react";

export default function NavbarEstado({ hasLocation = false, cant = 0 }) {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);
        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);
        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    return (
        <Navbar bg="light" expand="lg" className="shadow-sm">
            <Container>
                <Row>
                    <Navbar.Brand>Solución</Navbar.Brand>
                </Row>
                <Row>
                    <Col>
                        {/* Icono de red */}
                        <FaWifi
                            color={isOnline ? "blue" : "gray"}
                            size={20}
                            title={isOnline ? "Conectado" : "Sin conexión"}
                        />
                    </Col>
                    <Col>
                        {/* Cantidad de registros */}
                        <div className="position-relative">
                            <MdStorage size={22} color="black" />
                            <Badge
                                bg="primary"
                                pill
                                className="position-absolute top-0 start-100 translate-middle"
                            >
                                {cant}
                            </Badge>
                        </div>
                    </Col>
                    <Col>
                        {/* Icono de ubicación */}
                        <FaMapMarkerAlt
                            color={hasLocation ? "blue" : "gray"}
                            size={20}
                            title={
                                hasLocation
                                    ? "Ubicación obtenida"
                                    : "Sin ubicación"
                            }
                        />
                    </Col>
                </Row>
            </Container>
        </Navbar>
    );
}
