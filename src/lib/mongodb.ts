import mongoose from 'mongoose';

const MONGODB_URI = "mongodb+srv://martinguaduz:Lpfbs0eyZfTPhYji@cluster0.pa1c5xm.mongodb.net/miApp?retryWrites=true&w=majority&appName=Cluster0";

if (!MONGODB_URI) {
  throw new Error('⚠️ URI de MongoDB no definida');
}

// Definir un tipo para el caché global
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Usar 'const' en lugar de 'let' ya que no se reasigna
const cached: MongooseCache = ((global as unknown as { mongoose?: MongooseCache }).mongoose) || 
  { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
