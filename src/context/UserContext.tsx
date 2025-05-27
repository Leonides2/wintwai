'use client'

import { MovieBooksCollectionItem } from "@/lib/models/Movie";
import { createContext } from "react";

interface UserContextProps {
    isLogin: boolean;
    setIsLogin: (isLogin: boolean) => void;
    user: {
        nombre: string,
        email: string,
        history: MovieBooksCollectionItem[]
    }
    setUser: (user: { nombre: string, email: string, history: MovieBooksCollectionItem[] }) => void;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

export default UserContextProps;