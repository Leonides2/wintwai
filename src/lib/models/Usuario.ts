
import mongoose, { Schema } from 'mongoose';
import { MovieBooksCollectionItem } from './Movie';

export type Usuario = {
  nombre: string;
  email: string;
  password: string;
  history: MovieBooksCollectionItem[];
}

export interface IUsuario extends Document {
  nombre: string;
  email: string;
  password: string;
  history: MovieBooksCollectionItem[];
}

// Define el subesquema para MovieBooksCollectionItem
const MovieBooksCollectionItemSchema = new Schema<MovieBooksCollectionItem>({
  movies: [{ 
    title: String,
    description: String,
    release_year: Number,
    tags: [String],
    image: String,
    link: String
  }],
  books: [{
    title: String,
    description: String,
    release_year: Number,
    tags: [String],
    image: String,
    isbn: Number,
    link: String

  }],
  date: { type: Date, default: Date.now }
});

const UsuarioSchema = new Schema<IUsuario>({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  history: { type: [MovieBooksCollectionItemSchema], default: [] }
});

export default mongoose.models.Usuario || mongoose.model('Usuario', UsuarioSchema);