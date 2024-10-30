import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';

mapboxgl.accessToken = 'pk.eyJ1Ijoia2FsbHlmdXUiLCJhIjoiY20ybGRua3h1MGF6MTJqb285MThrcnhyMyJ9.u_9eCXSGqIvNWBXEzxmdbg'; // Asegúrate de usar tu token de acceso

const MapView = () => {
  const mapDiv = useRef(null);
  const [userLocation, setUserLocation] = useState([0, 0]);
  const [route, setRoute] = useState(null);
  const destination = [-72.93619408837313, -41.47232147295274]; // [lng, lat]

  useEffect(() => {
    const getUserLocation = () => {
      if (!navigator.geolocation) {
        console.error('Geolocation is not supported by your browser');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([longitude, latitude]);
        },
        (error) => {
          console.error('Error obteniendo la ubicación', error);
        }
      );
    };

    getUserLocation();
  }, []);

  useEffect(() => {
    if (mapDiv.current && userLocation[0] !== 0 && userLocation[1] !== 0) {
      const map = new mapboxgl.Map({
        container: mapDiv.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: userLocation,
        zoom: 14,
      });

      // Crear un marcador en la ubicación del usuario
      const userMarker = new mapboxgl.Marker()
        .setLngLat(userLocation)
        .addTo(map);

      const destinationMarker = new mapboxgl.Marker({ color: 'red' })
        .setLngLat(destination)
        .addTo(map);

      // Opcional: Centrar el mapa en el marcador del usuario
      map.flyTo({
        center: userLocation,
        essential: true,
      });

      // Llamar a la API de Directions
      const getRoute = async () => {
        try {
          const response = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${userLocation[0]},${userLocation[1]};${destination[0]},${destination[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`);
          const data = response.data.routes[0];
          setRoute(data.geometry.coordinates);
          drawRoute(map, data.geometry.coordinates);
        } catch (error) {
          console.error('Error obteniendo la ruta:', error);
        }
      };

      getRoute();
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
    <div
      ref={mapDiv}
      style={{
        backgroundColor: 'orange',
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
      }}
    >
      {userLocation ? `Lat: ${userLocation[1]}, Lng: ${userLocation[0]}` : 'Cargando...'}
    </div>
  );
};

export default MapView;
