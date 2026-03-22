import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import type { SignInForm } from "@/features/auth/ui/login-form";
import { useEffect, useState, type SubmitEvent } from "react";
import type { LoggedUser } from "@/features/auth/model/auth.types";

const baseURL = "https://dummyjson.com";

function getCookie(cookieName: string) {
  return document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${cookieName}=`))
    ?.split("=")[1];
}

export function useAuth() {
  const [loggedUser, setLoggedUser] = useState<LoggedUser | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const navigate = useNavigate();

  // Função para validar token do cookie
  const validateToken = async (token: string) => {
    try {
      const response = await fetch(`${baseURL}/auth/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        return null;
      }

      return await response.json();
    } catch {
      return null;
    }
  };

  useEffect(() => {
    async function getAuthenticatedUser() {
      const token = getCookie("@pitang/accessToken");
      
      if (!token) {
        setLoggedUser(null);
        setIsInitialized(true);
        return;
      }

      const user = await validateToken(token);
      setLoggedUser(user);
      setIsInitialized(true);
    }

    getAuthenticatedUser();
  }, []);

  async function handleLogout() {
    document.cookie = "@pitang/accessToken=; path=/; Max-Age=0";
    setLoggedUser(null);
    navigate({ to: "/login" });
  }

  async function handleLogin(
    event: SubmitEvent<HTMLFormElement>,
    data: SignInForm,
  ): Promise<void> {
    event.preventDefault();

    const response = await fetch(`${baseURL}/auth/login`, {
      body: JSON.stringify({
        expiresInMins: 30,
        username: data.username,
        password: data.password,
      }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    const json = await response.json();

    if (!response.ok) {
      toast.error(json.message);
      return;
    }

    toast.success("Welcome...");

    // Seta o cookie
    document.cookie = `@pitang/accessToken=${json.accessToken}; path=/; Max-Age=86400`;

    // Valida imediatamente e atualiza estado local
    const user = await validateToken(json.accessToken);
    if (user) {
      setLoggedUser(user);
      navigate({ to: "/dashboard" });
    } else {
      toast.error("Failed to authenticate");
    }
  }

  return {
    loggedUser,
    handleLogin,
    handleLogout,
    isInitialized,
  };
}

