import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import { useNavigate } from 'react-router-dom';
import './publicacion.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoia2FsbHlmdXUiLCJhIjoiY20ybGRua3h1MGF6MTJqb285MThrcnhyMyJ9.u_9eCXSGqIvNWBXEzxmdbg';

const CompCrearPublicacion = () => {
    const [descripcion, setDescripcion] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [latitud, setLatitud] = useState(null);
    const [longitud, setLongitud] = useState(null);
    const [error, setError] = useState('');
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-72.9350, -41.4702], // Coordenadas por defecto (Puerto Montt, Chile)
            zoom: 12,
        });
    }, []);

    const buscarUbicacion = async () => {
        try {
            const response = await axios.get(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${ubicacion}.json?access_token=${mapboxgl.accessToken}`
            );

            if (response.data.features.length > 0) {
                const [lng, lat] = response.data.features[0].center;
                setLatitud(lat);
                setLongitud(lng);

                if (markerRef.current) {
                    markerRef.current.remove();
                }

                mapRef.current.flyTo({
                    center: [lng, lat],
                    zoom: 14,
                });

                const newMarker = new mapboxgl.Marker()
                    .setLngLat([lng, lat])
                    .addTo(mapRef.current);

                markerRef.current = newMarker;
            } else {
                setError('No se encontró la ubicación. Inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error al buscar ubicación:', error);
            setError('Error al buscar la ubicación.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!latitud || !longitud) {
            setError('Por favor, busca y selecciona una ubicación.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/publicaciones', {
                descripcion,
                latitud,
                longitud,
            });

            if (response.data) {
                alert('Publicación creada correctamente');
                navigate('/muro');
            }
        } catch (err) {
            console.error('Error al crear publicación:', err);
            setError('Error al crear la publicación. Inténtalo nuevamente.');
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
                            placeholder='Descripción'
                            type="text"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            required
                        />
                    </div>
                    <div className='input-item'>
                        <input
                            placeholder='Buscar ubicación'
                            type="text"
                            value={ubicacion}
                            onChange={(e) => setUbicacion(e.target.value)}
                        />
                        <button type="button" onClick={buscarUbicacion} className="buscar-button">
                            Buscar
                        </button>
                    </div>
                    <div className="map-container" ref={mapContainerRef}></div>
                    <button className='guardar-button' type="submit">Guardar</button>
                </form>
            </div>
        </div>
    );
};

export default CompCrearPublicacion;
