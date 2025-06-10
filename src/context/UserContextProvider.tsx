'use client'

import { ReactNode, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { MovieBooksCollectionItem } from "@/lib/models/Movie";

const UserProvider = ({ children }: { children: ReactNode }) => {

  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [user, setUser] = useState<{

    nombre: string,
    email: string,
    history: MovieBooksCollectionItem[]
  }
  >({
    nombre: "",
    email: "",
    history: []
  });


  useEffect(() => {
    if(token != "") localStorage.setItem("token", token);
  },[token])

  return (
    <UserContext.Provider value={{ isLogin, setIsLogin, user, setUser, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;