import express from 'express';
import cors from 'cors';
import db from './database/db.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import publicacionRoutes from './routes/publicacionRoutes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/usuarios', usuarioRoutes);
app.use('/publicaciones', publicacionRoutes);

// Conexión a la base de datos
try {
    await db.authenticate();
    console.log('Conexión exitosa a la DB');
} catch (error) {
    console.log(`El error de conexión es: ${error}`);
}

// Ruta básica para verificar el servidor
app.get('/', (req, res) => {
    res.send('Hola Mundo');
});

// Levantar el servidor en el puerto 8000
app.listen(8000, () => {
    console.log('Server UP running in http://localhost:8000/');
});
