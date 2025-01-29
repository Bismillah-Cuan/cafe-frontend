import { useState } from "react";
import { json, useNavigate } from "react-router-dom";
import { API_LOGIN } from "../constants/URL_API";

type LoginData = {
    username: string;
    password: string;
  };
  
  type LoginResponse = {
    access_token: string;
    division: string;
  };
  

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (values: LoginData): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      console.log(JSON.stringify(values, null, 2));
      const response = await fetch(API_LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const msg = await response.text();

          if ([401, 403, 404].includes(response.status)) {
            // Handle client-side errors (e.g., invalid username/password)
            alert("Invalid username or password");
            throw new Error("Invalid username or password");
          } else {
            // Handle server-side or other errors
            alert("Something went wrong, please try again later");
            throw new Error("Something went wrong, please try again later");
          }
      }

      const data: LoginResponse = await response.json();
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("division", data.division);
      localStorage.setItem("username", values.username);
      if (response.ok) {
        navigate("/");
      }
      
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error };
};
