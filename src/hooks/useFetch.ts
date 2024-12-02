import { useState } from "react";
import { useNavigate } from "react-router-dom";

type LoginData = {
    username: string;
    password: string;
  };
  
  type LoginResponse = {
    access_token: string;
  };
  

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (values: LoginData): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://127.0.0.1:5000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        alert("Invalid credentials or server error");
        throw new Error("Invalid credentials or server error");
      }

      const data: LoginResponse = await response.json();
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("username", values.username);
      navigate("/");
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
