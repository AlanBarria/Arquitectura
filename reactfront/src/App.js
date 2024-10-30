import logo from './logo.svg';
import './App.css';
import CompMostarUsuarios from './Admin/MostarUsuarios.js';
import CompCrearUsuario from './Admin/CrearUsuario.js';
import CompEditarUsuario from './Admin/EditarUsuario.js';
import Registro from './Vista/Registro.js';
import Login from './Vista/Login.js';
import MapView from './mapa/MapaMapbox.js'; // Cambiado a importación por defecto
import CompMuro from './Vista/Muro.js';
import CompCrearPublicacion from "./Vista/publicacion.js";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path='admin/' element= { <CompMostarUsuarios></CompMostarUsuarios>} />
          <Route path='crear' element= { <CompCrearUsuario></CompCrearUsuario>} />
          <Route path='edit/:id' element= { <CompEditarUsuario></CompEditarUsuario> } />
          <Route path="registro" element={<Registro />} />
          <Route path="/" element={<Login />} />
          <Route path='muro/' element={ <CompMuro></CompMuro> } />
          <Route path="/crear-publicacion" element={<CompCrearPublicacion />} />
          <Route path="mapa" element={<MapView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
