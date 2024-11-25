import { createContext } from "react";

interface UserContextType {
    user: string;

  }
export const UserContext = createContext< UserContextType >({
    user: "",
});

