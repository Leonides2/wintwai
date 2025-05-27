/**
 * Configuración optimizada para conexión a MongoDB Atlas
 * Uso: importa esta configuración en lugar de configurar la conexión directamente
 */

import { MongoClient, ServerApiVersion } from 'mongodb';
import mongoose from 'mongoose';

// Información de conexión a MongoDB Atlas
// Actualiza estos valores según tu configuración real
const MONGODB_CONFIG = {
  // URI actualizada con el nombre correcto del cluster
  URI: "mongodb+srv://martinguaduz:Lpfbs0eyZfTPhYji@cluster0.pa1c5xm.mongodb.net/miApp?retryWrites=true&w=majority&appName=Cluster0",
  
  // Opciones para cliente MongoDB nativo
  mongoOptions: {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
    connectTimeoutMS: 30000,
    socketTimeoutMS: 45000,
  },
  
  // Opciones para mongoose
  mongooseOptions: {
    bufferCommands: false,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 45000,
  }
};

// Cliente MongoDB nativo
function createMongoClient() {
  return new MongoClient(MONGODB_CONFIG.URI, MONGODB_CONFIG.mongoOptions);
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: { conn: any, promise: any } | undefined;
}

// Conexión Mongoose (conexión con caché)
let cached = global.mongoose || { conn: null, promise: null };

async function connectWithMongoose() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_CONFIG.URI, MONGODB_CONFIG.mongooseOptions);
  }

  cached.conn = await cached.promise;
  global.mongoose = cached; // Guardar en global para evitar reconexiones innecesarias
  return cached.conn;
}

// Función sencilla para verificar la conexión
async function testConnection() {
  const client = createMongoClient();
  
  try {
    console.log("Verificando conexión a MongoDB Atlas...");
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Conexión exitosa a MongoDB Atlas");
    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Error de conexión a MongoDB Atlas:", error.message);
    } else {
      console.error("❌ Error de conexión a MongoDB Atlas:", error);
    }
    return false;
  } finally {
    await client.close();
  }
}

export {
  MONGODB_CONFIG,
  createMongoClient,
  connectWithMongoose,
  testConnection
};
