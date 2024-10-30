import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './muro.css';

const CompCrearPublicacion = () => {
    const [destino, setDestino] = useState('');
    const [salida, setSalida] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Función para manejar la creación de la publicación
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita la recarga de la página
        setError(''); // Limpiar errores anteriores

        try {
            const id_usuario = 1; // Aquí puedes establecer el ID del usuario que estás utilizando para crear la publicación

            const response = await axios.post('http://localhost:8000/publicaciones', {
                destino,
                salida,
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
        <div className="cardmuro-container">
            <div className="cardmuro">
                <h3 className="card-title mb-3">Crear Publicación</h3>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <input
                            placeholder='Destino'
                            type="text"
                            className="form-control"
                            value={destino}
                            onChange={(e) => setDestino(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <input
                            placeholder='Salida'
                            type="text"
                            className="form-control"
                            value={salida}
                            onChange={(e) => setSalida(e.target.value)}
                            required
                        />
                    </div>
                    <button className='btn btn-primary' type="submit">Guardar</button>
                </form>
            </div>
        </div>
    );
};

export default CompCrearPublicacion;
    