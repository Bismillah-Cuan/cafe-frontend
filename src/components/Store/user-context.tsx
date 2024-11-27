import { createContext } from "react";

interface UserContextType {
    user: string;
    updateCurrentUser: (user: string) => void
  }
export const UserContext = createContext< UserContextType >({
    user: "",
    updateCurrentUser: () => {}
});

