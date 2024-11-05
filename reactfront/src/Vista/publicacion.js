import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './publicacion.css'; // Importa el nuevo archivo CSS

const CompCrearPublicacion = () => {
    const [direccion, setDireccion] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [latitud, setLatitud] = useState(null);
    const [longitud, setLongitud] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Función para obtener latitud y longitud de la dirección
    const obtenerCoordenadas = async (direccion) => {
        try {
            // Aquí se usa la API de geocodificación de Google Maps
            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${direccion}&key=YOUR_API_KEY`);//cambiar YOUR_API_KEY por la key correspondiente a usar
            const { results } = response.data;

            if (results.length > 0) {
                const { lat, lng } = results[0].geometry.location;
                setLatitud(lat);
                setLongitud(lng);
                return { lat, lng };
            } else {
                throw new Error('No se encontraron resultados.');
            }
        } catch (error) {
            console.error('Error al obtener coordenadas:', error);
            setError('No se pudieron obtener las coordenadas. Por favor, verifica la dirección.');
            return null;
        }
    };

    // Función para manejar la creación de la publicación
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita la recarga de la página
        setError(''); // Limpiar errores anteriores

        const coords = await obtenerCoordenadas(direccion);
        if (!coords) return; // Si no se obtienen coordenadas, no continuar

        try {
            const id_usuario = 1; // Aquí puedes establecer el ID del usuario que estás utilizando para crear la publicación

            const response = await axios.post('http://localhost:8000/publicaciones', {
                direccion,
                latitud: coords.lat,
                longitud: coords.lng,
                descripcion,
                id_usuario,
            });

            if (response.data) {
                alert('Publicación creada correctamente');
                navigate('/muro'); // Redirigir al muro
            }
        } catch (err) {
            console.error('Error al crear publicación:', err);
            setError('Error al crear la publicación. Por favor, intente nuevamente.');
        }
    };

    return (
        <div className="publicacion-content">
            <div className="publicacion-container">
                <h3 className="publicacion-title">Crear Publicación</h3>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <form onSubmit={handleSubmit} className="publicacion-form">
                    <div className='input-item'>
                        <input
                            placeholder='Dirección'
                            type="text"
                            value={direccion}
                            onChange={(e) => setDireccion(e.target.value)}
                            required
                        />
                    </div>
                    <div className='input-item'>
                        <input
                            placeholder='Descripción'
                            type="text"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            required
                        />
                    </div>
                    <button className='guardar-button' type="submit">Guardar</button>
                </form>
            </div>
        </div>
    );
};

export default CompCrearPublicacion;
