import Cookies from "js-cookie";
import { HTTPError } from "ky";
import { useCallback, useEffect, useState } from "react";
import { getMe } from "../http/api/auth";
import type { User } from "../types/auth";

const RESPONSE_UNAUTHORIZED = 401;

export function useAuthStatus() {
  const [token, setToken] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [hasValidated, setHasValidated] = useState<boolean>(false);

  const setAuthToken = useCallback((newToken: string) => {
    Cookies.set("token", newToken, {
      expires: 7,
      secure: import.meta.env.PROD,
    });
    setToken(newToken);
    setHasValidated(false);
  }, []);

  const removeAuthToken = useCallback(() => {
    Cookies.remove("token");
    setToken(undefined);
    setUser(undefined);
    setIsAuthenticated(false);
    setHasValidated(true);
  }, []);

  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken && !hasValidated) {
      const validateToken = async () => {
        try {
          const userData = await getMe();
          setToken(storedToken);
          setUser(userData);
          setIsAuthenticated(true);
        } catch (e) {
          if (
            e instanceof HTTPError &&
            e.response.status === RESPONSE_UNAUTHORIZED
          ) {
            removeAuthToken();
          } else {
            setToken(undefined);
            setUser(undefined);
            setIsAuthenticated(false);
          }
        } finally {
          setHasValidated(true);
        }
      };
      validateToken();
    } else if (!(storedToken || hasValidated)) {
      setToken(undefined);
      setUser(undefined);
      setIsAuthenticated(false);
      setHasValidated(true);
    }
  }, [removeAuthToken, hasValidated]);

  return {
    isAuthenticated,
    token,
    user,
    setAuthToken,
    removeAuthToken,
  };
}
