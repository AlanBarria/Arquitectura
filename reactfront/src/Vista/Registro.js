import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './muro.css';

const Registro = () => {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [telefono, setTelefono] = useState('');
    const [rol, setRol] = useState('pasajero'); // Valor por defecto
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Validación para asegurarse de que el correo termine con @duocuc.cl
    const validarCorreo = (email) => {
        const dominioPermitido = '@duocuc.cl';
        return email.endsWith(dominioPermitido);  // Verifica si el correo termina con @duocuc.cl
    };

    // Función para manejar el registro
    const handleSubmit = async (e) => {
        e.preventDefault();  // Evita la recarga de la página
        setError('');  // Limpiar errores anteriores

        // Validación del correo
        if (!validarCorreo(correo)) {
            setError('El correo debe terminar con @duocuc.cl');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/usuarios/registro', {
                nombre,
                correo,
                contrasena,
                telefono,
                rol,
            });

            if (response.data && response.data.success) {
                // Si el registro es exitoso, redirigir al login o página de inicio
                alert('Registro exitoso');
                navigate('/');  // Redirigir al login
            } else {
                setError(response.data.message || 'Error durante el registro.');  // Mostrar error si lo hay
            }
        } catch (err) {
            console.error('Error al registrar usuario:', err);
            setError('Error al registrar. Por favor, intente nuevamente.');
        }
    };

    return (
        <div className="cardmuro-container">
    <div className="cardmuro">
        <h3 className="card-title mb-3">Registro</h3>
        <p className="cardmuro-description">
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <input
                        placeholder='Nombre'
                        type="text"
                        class="form-control"
                        id="inputPassword"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div className='mb-3'>
                    <input
                        placeholder='Correo'
                        type="email"
                        class="form-control"
                        id="inputPassword"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        required
                    />
                </div>
                <div className='mb-3'>
                    <input
                        placeholder='Contraseña'
                        type="password"
                        class="form-control"
                        id="inputPassword"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        required
                    />
                </div>
                <div className='mb-3'>
                    <input
                        placeholder='Telefono'
                        type="number"
                        class="form-control"
                        id="inputPassword"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        required
                    />
                </div>
                <div className='mb-3'>
                    <label>Rol:</label>
                    <select value={rol} onChange={(e) => setRol(e.target.value)}>
                        <option value="pasajero">Pasajero</option>
                        <option value="conductor">Conductor</option>
                    </select>
                </div>
                <button className='btn btn-primary' type="submit">Registrarse</button>
            </form>
        </p>
    </div>
</div>
    );
};

export default Registro;


