import { ImageMoviesRequest } from "@/lib/api/client";

        
const OMDB_API_KEY = process.env.OMDB_KEY

export async function POST(req: Request) {
    try {
        // Extraer y validar el cuerpo del request
        const body: ImageMoviesRequest = await req.json();
        const {title} = body

        if (!body) {
            return new Response(JSON.stringify({ error: "body are required and must be an string." }), { status: 400 });
        }

        const response = await fetch (`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${title.toLowerCase()}`)
        
        if(!response.ok){
            throw new Error (`API error ${response.status} ${response.statusText}`)
        }
        
        const data = await response.json();

         return new Response(JSON.stringify({ poster: data.Poster }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error }), { status: 500 });
    }
}