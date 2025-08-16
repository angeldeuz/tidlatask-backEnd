import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import tasksRouter from './routes/task';
import rateLimit from 'express-rate-limit';
import { connectDB } from './config/database';
import helmet from 'helmet';

//simpre antes de usar las variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGODB_URI || '';

//Configurar CORS
const rawOrigins = process.env.CORS_ALLOWED_ORIGINS || '';
const allowList = rawOrigins.split(',').map(o => o.trim()).filter(Boolean);

//Lee de env
const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000);
const max = Number(process.env.RATE_LIMIT_MAX || 100);

//Crea el limiter global
const apiLimiter = rateLimit({
  windowMs,
  max,
  standardHeaders: 'draft-7', // X-RateLimit-* modernos
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' }, // JSON claro
});

// Dile a express que confíe en el proxy solo si estás en producción
if (process.env.NODE_ENV === 'PROD') {
  app.set('trust proxy', 1);
}

app.use(
  helmet({
    contentSecurityPolicy: false, // a veces rompe apps con React/Vue/Angular
    crossOriginEmbedderPolicy: false, // si necesitas cargar recursos externos
  })
);       // 1. Cabeceras de seguridad
// Aplica globalmente (toda la API)
app.use(apiLimiter);  // 2. Rate Limiting

// Código para limitar los intentos de login en la ruta /auth (previene ataques de fuerza bruta).
// Se debe descomentar y usar cuando se implemente el sistema de autenticación y el router de auth esté disponible.
// Ejemplo de uso futuro:
// const authLimiter = rateLimit({
//   windowMs: 60 * 1000, // 1 min
//   max: 5,
//   message: { error: 'Demasiados intentos de login, inténtalo más tarde' },
// });
// app.use('/auth', authLimiter, authRouter);

app.use(cors({ // 3. CORS
  origin: (origin, callback) => {
    if (!origin) return  callback(null, true);// permite Postman u otras herramientas
    return callback(null, allowList.includes(origin));
  },
  credentials: false, // pon true si usas cookies/sesiones
}))

//Middleware para leer JSON
app.use(express.json());

//Rutas
app.use('/tasks', tasksRouter);

app.get('/', (_req, res) => {
  res.send('Hello, backend with TS 🚀');
});

// Conectar a la base de datos // asegura que el servidor se inicie solo cuando la conexión a la base de datos sea exitosa
connectDB(MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo y BD conectada en http://localhost:${PORT}`);
  });
});