
import { OpenAIRequest } from "@/app/api/openAI/route";
import { Item } from "../models/Item";
import { Book } from "../models/Book";

export interface OpenAIResponse {
    movies: Item[];
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
        console.log(data)

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

        return parseData.cover.large;

    }catch(error){
        console.error("Error fetching data from API", error)
        throw error;
    }
}