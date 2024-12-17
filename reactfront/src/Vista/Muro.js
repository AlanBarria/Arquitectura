import React, { useEffect, useRef, useState } from 'react';
import './muro.css';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import { Link } from 'react-router-dom';

mapboxgl.accessToken = 'pk.eyJ1Ijoia2FsbHlmdXUiLCJhIjoiY20ybGRua3h1MGF6MTJqb285MThrcnhyMyJ9.u_9eCXSGqIvNWBXEzxmdbg';

const CompMuro = () => {
    const mapDivRefs = useRef([]);
    const [publicaciones, setPublicaciones] = useState([]);

    useEffect(() => {
        const fetchPublicaciones = async () => {
            try {
                const response = await axios.get('http://localhost:8000/publicaciones');
                setPublicaciones(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchPublicaciones();
    }, []);

    useEffect(() => {
        if (publicaciones.length > 0) {
            publicaciones.forEach((publicacion, index) => {
                const map = new mapboxgl.Map({
                    container: mapDivRefs.current[index],
                    style: 'mapbox://styles/mapbox/streets-v12',
                    center: [-72.92589346110347, -41.4696395509875],
                    zoom: 12,
                });

                new mapboxgl.Marker()
                    .setLngLat([-72.92589346110347, -41.4696395509875])
                    .addTo(map);

                new mapboxgl.Marker({ color: 'red' })
                    .setLngLat([publicacion.longitud, publicacion.latitud])
                    .addTo(map);

                const getRoute = async () => {
                    try {
                        const response = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${-72.92589346110347},${-41.4696395509875};${publicacion.longitud},${publicacion.latitud}?geometries=geojson&access_token=${mapboxgl.accessToken}`);
                        const data = response.data.routes[0];
                        drawRoute(map, data.geometry.coordinates);
                    } catch (error) {
                        console.error('Error obteniendo la ruta:', error);
                    }
                };

                getRoute();
            });
        }
    }, [publicaciones]);

    const drawRoute = (map, route) => {
        map.addLayer({
            id: 'route',
            type: 'line',
            source: {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'LineString',
                        coordinates: route,
                    },
                },
            },
            layout: {
                'line-join': 'round',
                'line-cap': 'round',
            },
            paint: {
                'line-color': '#888',
                'line-width': 8,
            },
        });
    };

    return (
        <div className="muro-page">
            <h1 className="muro-title">Publicaciones</h1>
            <div className="muro-container">
                {publicaciones.map((publicacion, index) => (
                    <div key={publicacion.id_publicacion} className="cardmuro">
                        <h5 className="cardmuro-title">Publicación {index + 1}</h5>
                        <p className="cardmuro-text">{publicacion.descripcion}</p>
                        <div ref={el => mapDivRefs.current[index] = el} style={{ height: '200px', width: '100%' }} />
                    </div>
                ))}
            </div>
            <Link to="/crear-publicacion" className="floating-button"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg></Link>
        </div>
    );
};

export default CompMuro;
