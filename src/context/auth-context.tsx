import Cookies from "js-cookie";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getMe } from "../http/api/auth";
import type { User } from "../types/auth";

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | undefined;
  login: (jwtToken: string) => Promise<void>;
  logout: () => void;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = useCallback(async (jwtToken: string) => {
    Cookies.set("token", jwtToken, {
      expires: 7,
      secure: import.meta.env.PROD,
    });
    try {
      const userData = await getMe();
      setUser(userData);
      setIsAuthenticated(true);
    } catch {
      Cookies.remove("token");
      setUser(undefined);
      setIsAuthenticated(false);
    }
  }, []);

  const logout = useCallback(() => {
    Cookies.remove("token");
    setUser(undefined);
    setIsAuthenticated(false);
  }, []);

  useEffect(() => {
    const validateTokenAndSetState = async () => {
      const storedToken = Cookies.get("token");
      if (!storedToken) {
        setUser(undefined);
        setIsAuthenticated(false);
        return;
      }
      try {
        const userData = await getMe();
        setUser(userData);
        setIsAuthenticated(true);
      } catch {
        Cookies.remove("token");
        setUser(undefined);
        setIsAuthenticated(false);
      }
    };
    validateTokenAndSetState();
  }, []);

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      user,
      login,
      logout,
    }),
    [isAuthenticated, user, login, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
