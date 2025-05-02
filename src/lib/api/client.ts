import { OpenAIRequest } from "@/app/api/openAI/route";

export interface OpenAIResponse {
    movies: {
        title: string;
        description: string;
        release_year: number;
    }[];
    books: {
        title: string;
        description: string;
        release_year: number;
    }[];
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