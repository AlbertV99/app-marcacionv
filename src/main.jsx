import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
// import Registro from './paginas/Registro'
import MultipleRegistro from "./paginas/MultipleRegistro";
import Principal from "./paginas/Principal";
import CargarHora from "./paginas/CargarHora";
import Historial from "./paginas/Historial";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<Principal />} />
                {/*<Route  path='config' element={<Registro/>} /> */}
                <Route path="config" element={<Principal />} />
                <Route path="historial" element={<Historial />} />
                <Route path="cargarHora" element={<Principal />} />
            </Route>
        </Routes>
    </BrowserRouter>,
);
