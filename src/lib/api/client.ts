
import { OpenAIRequest } from "@/app/api/openAI/route";
import { Movie, MovieBooksCollectionItem } from "../models/Movie";
import { Book } from "../models/Book";



export interface OpenAIResponse {
    movies: Movie[];
    books: Book[];
}

export interface ImageMoviesRequest{
    title: string
}

export const getIAReponse = async (request: OpenAIRequest): Promise<OpenAIResponse> => {
    try {
        const res = await fetch('/api/openAI', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        // Verificar si la respuesta es exitosa
        if (!res.ok) {
            throw new Error(`API error: ${res.status} ${res.statusText}`);
        }

        // Procesar la respuesta
        const data = await res.json();

        // Validar la estructura de la respuesta
        if (!data || !Array.isArray(data.movies) || !Array.isArray(data.books)) {
            throw new Error("Invalid response format from API");
        }

        return data as OpenAIResponse;
    } catch (error) {
        console.error("Error fetching data from API:", error);
        throw error; // Re-lanzar el error para que el llamador lo maneje
    }
};

export const getMoviePoster = async (request: ImageMoviesRequest): Promise<string> => {

    try {
        const response = await fetch (`/api/imageMovies`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if(!response.ok){
            throw new Error (`API error ${response.status} ${response.statusText}`)
        }

        const data =  await response.json();

        return data.poster;

    }
    catch(error){
        console.error("Error fetching data from API:", error);
        throw error; // Re-lanzar el error para que el llamador lo maneje
    }
}

export const getBookCover = async(isbn: number) => {

    try{

        const response = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`)
        if(!response.ok){
            throw new Error (`API error ${response.status} ${response.statusText}`)
        }
        const data =  await response.json();
        const parseData = data[`ISBN:${isbn}`];

        if(!parseData.cover){ 
          return undefined;
        }
        else{

            if(parseData.cover.large){
              return parseData.cover.large;
            }
            else if(parseData.cover.medium){
              return parseData.cover.medium;
            }
            else if(parseData.cover.small){
              return parseData.cover.small;
            }
        }
        

    }catch(error){
        console.error("Error fetching data from API", error)
        throw error;
    }
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  nombre: string;
  email: string;
  password: string;
}

export const login = async (request: LoginRequest) => {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error en login');
    }


    return await response.json();
  } catch (error) {
    console.error('Error en login:', error);
    throw error;
  }
};

export const register = async (request: RegisterRequest) => {
  try {
    const response = await fetch('/api/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error en registro');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en registro:', error);
    throw error;
  }
};

export const updateUser = async (request: RegisterRequest) => {
  try {
    const response = await fetch('/api/usuarios', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al actualizar usuario');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    throw error;
  }
};

export const updateHistory = async (email: string, history: MovieBooksCollectionItem[]) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch('/api/history', {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json' ,
        'Authorization' : `Bearer ${token}` ,
      },
      body: JSON.stringify({ email, history }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al actualizar historial');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al actualizar historial:', error);
    throw error;
  }
};