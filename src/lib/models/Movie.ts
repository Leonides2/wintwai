import { Book } from "./Book";


export type Movie = {
    title: string;
    description: string;
    release_year: number;
    tags: string[];
    image: string;
    link: string;
}


export type MovieBooksCollectionItem = {
  movies: Movie[];
  books: Book[];
  date: Date;
};