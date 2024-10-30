import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './muro.css'; // Asegúrate de tener estilos en este archivo

const URI = 'http://localhost:8000/publicacion'; // Asegúrate de que esta URL sea correcta

const CompMuro = () => {
    const [publicaciones, setPublicaciones] = useState([]);

    useEffect(() => {
        const fetchPublicaciones = async () => {
            try {
                const response = await axios.get(URI);
                setPublicaciones(response.data);
            } catch (error) {
                console.error("Error al obtener las publicaciones:", error);
            }
        };

        fetchPublicaciones();
    }, []);

    return (
        <div className="container mt-5">
            <div className="row">
                {publicaciones.map(publicacion => (
                    <div key={publicacion.id_publicacion} className="col-md-4 mb-4">
                        <div className="card shadow">
                            <div className="cardmuro-body">
                                <h5 className="cardmuro-title">{publicacion.destino}</h5>
                                <p className="cardmuro-text">Salida: {publicacion.salida}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='mb-3'>
                <div className='mb-3'>
                    <Link to="/crear-publicacion" className='btn btn-primary'>
                        <i className="fas fa-plus me-2"></i>Nueva Publicación
                    </Link>
                </div>
                <div className='mb-3'>
                    <Link to="/mapa" className='btn btn-primary'>
                        <i className="fas fa-plus me-2"></i>Mapa
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CompMuro;
