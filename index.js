import express from 'express';
import cors from 'cors';

// Cargar las variables de entorno
import dotenv from 'dotenv';
dotenv.config();

// Importar las rutas
import ahorroRouter from './routes/ahorro/ahorroRoutes.js';
import gastosRouter from './routes/gastos/gastosRoutes.js'; // Import the gastos router
import miembrosRouter from './routes/miembros/miembrosRoutes.js'; // Import the miembros router

// Crear la app de express
const app = express();

// Habilitar la captura de datos mediante post / formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar CORS
const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    exposedHeaders: 'Content-Length,X-Knowledge',
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204 
};

// Aplicar CORS middleware globalmente
app.use(cors(corsOptions));

// Configurar el puerto
const port = 3000;

// Usar las rutas
app.use('/ahorros', ahorroRouter); // Rutas para Ahorros
app.use('/gastos', gastosRouter); // Rutas para Gastos
app.use('/miembros', miembrosRouter); // Rutas para Miembros

// Levantar el servidor en el puerto 3000
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
