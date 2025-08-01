# 🚀 TidlaTask Backend

Backend API para gestión de tareas desarrollado con **Node.js**, **TypeScript**, **Express** y **MongoDB**.

## 📋 Descripción

TidlaTask Backend para gestor de proyectos y tareas MVP.

## 🛠️ Tecnologías Utilizadas

- **Node.js** - Runtime de JavaScript
- **TypeScript** - Tipado estático para JavaScript
- **Express.js** - Framework web para Node.js
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **dotenv** - Gestión de variables de entorno
- **ts-node-dev** - Desarrollo con hot reload

## 📦 Instalación

### Prerrequisitos

- Node.js (versión 16 o superior)
- MongoDB instalado y corriendo localmente
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd tidlatask_backend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   
   Crear archivo `.env` en la raíz del proyecto:
   ```env
   PORT=4000
   MONGODB_URI=mongodb://localhost:27017/tidlatask_backend
   NODE_ENV=development
   ```

4. **Iniciar MongoDB**
   ```bash
   # En Windows (si MongoDB está instalado como servicio)
   net start MongoDB
   
   # O iniciar manualmente
   mongod
   ```

5. **Ejecutar el proyecto**
   ```bash
   npm run dev
   ```

## 🚀 Uso

### Scripts disponibles

- `npm run dev` - Inicia el servidor en modo desarrollo con hot reload

### Endpoints disponibles

#### Tareas (Tasks)

- `GET /tasks` - Obtener todas las tareas
- `POST /tasks` - Crear una nueva tarea
- `GET /tasks/:id` - Obtener una tarea específica
- `PUT /tasks/:id` - Actualizar una tarea
- `DELETE /tasks/:id` - Eliminar una tarea

### Ejemplo de uso

```bash
# Obtener todas las tareas
curl http://localhost:4000/tasks

# Crear una nueva tarea
curl -X POST http://localhost:4000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mi primera tarea",
    "description": "Descripción de la tarea",
    "tags": ["importante", "urgente"]
  }'
```

## 📁 Estructura del Proyecto

```
tidlatask_backend/
├── src/
│   ├── config/
│   │   └── database.ts          # Configuración de MongoDB
│   ├── controllers/
│   │   └── taskController.ts    # Lógica de negocio
│   ├── models/
│   │   └── Task.ts             # Modelo de datos
│   ├── routes/
│   │   └── task.ts             # Definición de rutas
│   ├── services/
│   │   └── taskService.ts      # Servicios de datos
│   ├── middlewares/
│   │   └── (middlewares)       # Middlewares personalizados
│   ├── utils/
│   │   └── (utilidades)        # Funciones auxiliares
│   └── index.ts                # Punto de entrada
├── .env                        # Variables de entorno
├── .gitignore                  # Archivos ignorados por Git
├── package.json                # Dependencias y scripts
├── tsconfig.json              # Configuración de TypeScript
└── README.MD                  # Este archivo
```

## 🗄️ Modelo de Datos

### Task (Tarea)

```typescript
interface ITask {
  _id: ObjectId;           // ID único (automático)
  title: string;           // Título de la tarea
  description?: string;    // Descripción (opcional)
  completed: boolean;      // Estado de completado
  tags: string[];         // Array de etiquetas
  createdAt: Date;        // Fecha de creación (automático)
  updatedAt: Date;        // Fecha de actualización (automático)
}
```

## 🔧 Configuración

### Variables de Entorno

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `PORT` | Puerto del servidor | `4000` |
| `MONGODB_URI` | URI de conexión a MongoDB | `mongodb://localhost:27017/tidlatask_backend` |
| `NODE_ENV` | Entorno de ejecución | `development` |

### Base de Datos

El proyecto utiliza **MongoDB** como base de datos principal. Asegúrate de tener MongoDB instalado y corriendo antes de iniciar la aplicación.

## 🚀 Despliegue

### Desarrollo Local
```bash
npm run dev
```

### Producción
```bash
npm run build
npm start
```