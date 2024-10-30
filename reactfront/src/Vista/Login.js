import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './muro.css';

const Login = () => {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');  // Limpiar el estado de error

        try {
            const response = await axios.post('http://localhost:8000/usuarios/login', {
                correo,
                contrasena
            });

            if (response.data.success) {
                // Si el login es exitoso, redirigir a la página principal o dashboard
                alert('Inicio de sesión exitoso');
                navigate('muro/');  // Redirige a la página principal
            } else {
                setError(response.data.message);  // Mostrar error si las credenciales son incorrectas
            }
        } catch (err) {
            console.error('Error al iniciar sesión:', err);
            setError('Error al iniciar sesión. Por favor, intente de nuevo.');
        }
    };

    return (
        <div className="cardmuro-container">
            <div className="cardmuro">
                <h3 className="card-title">Inicio de sesion</h3>
                <p className="cardmuro-description">
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <input
                        type="email"
                        class="form-control"
                        id="inputPassword"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        required
                        placeholder='Correo'
                    />
                </div>
                <div className='mb-3'>
                    <input
                        type="password"
                        class="form-control"
                        id="inputPassword"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        required
                        placeholder='Contraseña'
                    />
                </div>
                <div className='mb-3'>
                <button className='btn btn-primary' type="submit">Ingresar</button>
                </div>
                <div className='mb-3'>
                    <Link to="/registro" className='btn btn-primary'>
                        <i className="fas fa-user-plus me-2"></i>Registrarse
                    </Link>
                </div>
            </form>
                </p>
            </div>
        </div>
    );
};

export default Login;
