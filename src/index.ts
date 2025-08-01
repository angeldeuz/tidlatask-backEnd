import express from 'express';
import dotenv from 'dotenv';
import tasksRouter from './routes/task';
import { connectDB } from './config/database';
//simpre antes de usar las variables de entorno
dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || '';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
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