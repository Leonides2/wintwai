'use client'

import { ReactNode, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { MovieBooksCollectionItem } from "@/lib/models/Movie";
import { updateHistory } from "@/lib/api/client";

const UserProvider = ({ children }: { children: ReactNode }) => {

  const [isLogin, setIsLogin] = useState<boolean>(false);
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
    console.log(user)
  },[user])

  return (
    <UserContext.Provider value={{ isLogin, setIsLogin, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;