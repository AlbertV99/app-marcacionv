import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter,Routes,Route } from "react-router-dom"
import App from './App'
import Registro from './paginas/Registro'
import CargarHora from './paginas/CargarHora'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App/>}>
                <Route index element={<Registro />} />
                <Route  path='config' element={<Registro/>} />
                <Route  path='cargarHora' element={<CargarHora/>} />
            </Route>
        </Routes>
    </BrowserRouter>,
)
