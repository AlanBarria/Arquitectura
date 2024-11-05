import React, { useEffect, useRef, useState } from 'react';
import './muro.css';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';

mapboxgl.accessToken = 'pk.eyJ1Ijoia2FsbHlmdXUiLCJhIjoiY20ybGRua3h1MGF6MTJqb285MThrcnhyMyJ9.u_9eCXSGqIvNWBXEzxmdbg'; // Asegúrate de usar tu token de acceso

const CompMuro = () => {
    const mapDivRefs = useRef([]);
    const [userLocation, setUserLocation] = useState(null);
    
    useEffect(() => {
        // Obtener ubicación del usuario
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation([longitude, latitude]);
        }, (error) => {
            console.error('Error obteniendo la ubicación', error);
        });
    }, []);

    useEffect(() => {
        if (userLocation) {
            const destinations = [
                [-72.93619408837313, -41.47232147295274], // Primer destino
                [-41.44695080993002, -72.95668101111457], // Segundo destino
                [-72.9467205859915, -41.45772259455789],  // Tercer destino
            ];

            destinations.forEach((destination, index) => {
                // Crear mapa
                const map = new mapboxgl.Map({
                    container: mapDivRefs.current[index],
                    style: 'mapbox://styles/mapbox/streets-v12',
                    center: userLocation,
                    zoom: 12,
                });

                // Crear marcador de usuario
                new mapboxgl.Marker()
                    .setLngLat(userLocation)
                    .addTo(map);

                // Crear marcador de destino
                new mapboxgl.Marker({ color: 'red' })
                    .setLngLat(destination)
                    .addTo(map);

                // Llamar a la API de Directions para crear la ruta
                const getRoute = async () => {
                    try {
                        const response = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${userLocation[0]},${userLocation[1]};${destination[0]},${destination[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`);
                        const data = response.data.routes[0];
                        drawRoute(map, data.geometry.coordinates);
                    } catch (error) {
                        console.error('Error obteniendo la ruta:', error);
                    }
                };

                getRoute();
            });
        }
    }, [userLocation]);

    const drawRoute = (map, route) => {
        // Añadir la ruta al mapa
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
                <div className="cardmuro">
                    <h5 className="cardmuro-title">Matias De la Cruz</h5>
                    <p className="cardmuro-text">A  las 2:30 voy a ir al mall</p>
                    <div ref={el => mapDivRefs.current[0] = el} style={{ height: '200px', width: '100%' }} />
                </div>

                <div className="cardmuro">
                    <h5 className="cardmuro-title">Luis Gonzales</h5>
                    <p className="cardmuro-text">A la 1 voy al Hospital </p>
                    <div ref={el => mapDivRefs.current[1] = el} style={{ height: '200px', width: '100%' }} />
                </div>

                <div className="cardmuro">
                    <h5 className="cardmuro-title">Juan Barra</h5>
                    <p className="cardmuro-text">A las 10:30 voy para valle volcanes</p>
                    <div ref={el => mapDivRefs.current[2] = el} style={{ height: '200px', width: '100%' }} />
                </div>
            </div>
        </div>
    );
};

export default CompMuro;
