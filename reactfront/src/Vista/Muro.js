import React, { useEffect, useRef, useState } from 'react';
import './muro.css';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import { Link } from 'react-router-dom';

mapboxgl.accessToken = 'pk.eyJ1Ijoia2FsbHlmdXUiLCJhIjoiY20ybGRua3h1MGF6MTJqb285MThrcnhyMyJ9.u_9eCXSGqIvNWBXEzxmdbg'; // Asegúrate de usar tu token de acceso

const CompMuro = () => {
    const mapDivRefs = useRef([]);
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
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
                [-72.93619408837313, -41.47232147295274],
                [-41.44695080993002, -72.95668101111457],
                [-72.9467205859915, -41.45772259455789],
            ];

            destinations.forEach((destination, index) => {
                const map = new mapboxgl.Map({
                    container: mapDivRefs.current[index],
                    style: 'mapbox://styles/mapbox/streets-v12',
                    center: userLocation,
                    zoom: 12,
                });

                new mapboxgl.Marker()
                    .setLngLat(userLocation)
                    .addTo(map);

                new mapboxgl.Marker({ color: 'red' })
                    .setLngLat(destination)
                    .addTo(map);

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

    const handleButtonClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="muro-page">
            <h1 className="muro-title">Publicaciones</h1>
            <div className="muro-container">
                <div className="cardmuro">
                    <h5 className="cardmuro-title">Matias De la Cruz</h5>
                    <p className="cardmuro-text">A las 2:30 voy al mall</p>
                    <div ref={el => mapDivRefs.current[0] = el} style={{ height: '200px', width: '100%' }} />
                </div>
                <div className="cardmuro">
                    <h5 className="cardmuro-title">Luis Gonzales</h5>
                    <p className="cardmuro-text">A la 1 voy al Hospital</p>
                    <div ref={el => mapDivRefs.current[1] = el} style={{ height: '200px', width: '100%' }} />
                </div>
                <div className="cardmuro">
                    <h5 className="cardmuro-title">Juan Barra</h5>
                    <p className="cardmuro-text">A las 10:30 voy para valle volcanes</p>
                    <div ref={el => mapDivRefs.current[2] = el} style={{ height: '200px', width: '100%' }} />
                </div>
            </div>
            <Link to="/crear-publicacion" className="floating-button"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
</Link>
        </div>
    );
};

export default CompMuro;
