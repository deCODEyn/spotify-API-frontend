import { Loader } from "lucide-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/login-page";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen items-center justify-center bg-spotify-black">
        <Routes>
          <Route element={<LoginPage />} path="/" />
          <Route
            element={
              <div className="text-spotify-white">
                <Loader className="animate-spin text-xl" />
                <p>Processando o token de acesso...</p>
              </div>
            }
            path="auth/callback"
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
