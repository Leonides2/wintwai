import OpenAI from "openai";

export interface OpenAIRequest {
    tags: string[];
    filter: string;
}
const apiKey = process.env.OPENAI_API_KEY;

export async function POST(req: Request) {
    try {
        // Extraer y validar el cuerpo del request
        const body: OpenAIRequest = await req.json();
        const { tags, filter } = body;

        if (!tags || !Array.isArray(tags) || tags.length === 0) {
            return new Response(JSON.stringify({ error: "Tags are required and must be an array." }), { status: 400 });
        }

        if (!filter || typeof filter !== "string") {
            return new Response(JSON.stringify({ error: "Filter is required and must be a string." }), { status: 400 });
        }

        // Crear cliente de OpenAI
        const client = new OpenAI({
            apiKey: apiKey
        });

        // Llamar a la API de OpenAI
        const response = await client.responses.create({
            model: "gpt-4.1",
            instructions: `
                Generate a list of movies or books based on the given tags. You only need to return the list of movies or books.

                [Important]
                Don't add another text, just the list

                Remenber open and close the JSON.

                Return the list in JSON format with the following format:
                {
                    "movies": [
                        { "title": "Movie Title", "description": "Movie Description", "release_year": 2023 , "tags": ["tag1", "tag2", {...}], image: "https://moviecoverimage.com/image.*", link: "http://movielink.example.com"},
                        {...}
                    ],
                    "books": [
                        { "title": "Book Title", "description": "Book Description", "release_year": 2023, "tags": ["tag1", "tag2", {...}], image: "https://bookcoverimage.com/image.*", link: "https://booklink.example.com", isbn:1234567890 },
                        {...}
                    ]
                }
                    
                [Important]
                where the array of movies and books can be empty. And the count of movies and books can be different.
                between 0 and 10 movies and between 0 and 10 books.

                Return at least 3 books/movies if exists, and if possible, up to 10
                
                The movies and books should be related to the tags provided and the "tags" property in the json are the more near tags based in the provided tags in [tags].
                
                The image attribute, will be a movie or book cover (respecfully), you can get it from any web, just need to be the the cover.
                The link attribute will be get by truthfully sources as "www.imdb.com", amazon and others.

                The atribute isbn in books, is the isbn of the book

                only return movies if in the input there is after [filter] tag the word "movie" or "film"
                only return books if in the input there is after [filter] tag the word "book" or "novel"
                if there is the word "both" in the input after [filter] tag return both movies and books
                the tags for the movies or books are in the input after [tags] tag
            `,
            input: `[tags] ${tags.join(", ")} [filter] ${filter}`,
            tools: [{ type: "web_search_preview" }],
            temperature: 0

        });

        // Extraer y validar la respuesta
        const output = response.output_text;
        if (!output) {
            throw new Error("No output from OpenAI.");
        }

        const parsedOutput = output.replace(`json`, "").replaceAll(`\`\`\``, "");

        return new Response(parsedOutput, {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error }), { status: 500 });
    }
}