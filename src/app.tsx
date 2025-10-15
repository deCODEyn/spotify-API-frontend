import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { DashboardLayout } from "./layouts/dashboard-layout";
import { AlbumsPage } from "./pages/albums";
import { ArtistisPage } from "./pages/artists";
import { HomePage } from "./pages/home";
import { LoginPage } from "./pages/login-page";
import PlaylistsPage from "./pages/playlists";
import ProfilePage from "./pages/profile";

export default function App() {
  const isAuthenticated = true;

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-spotify-black">
        <Routes>
          <Route element={<LoginPage />} path="/" />

          <Route
            element={
              isAuthenticated ? (
                <Navigate replace to="/home" />
              ) : (
                <div className="flex h-screen items-center justify-center text-spotify-white">
                  <p>Processando o token de acesso...</p>
                </div>
              )
            }
            path="auth/callback"
          />

          <Route element={<DashboardLayout />} path="/">
            {isAuthenticated && (
              <Route element={<Navigate replace to="/home" />} index />
            )}

            <Route element={<HomePage />} path="/home" />
            <Route element={<ArtistisPage />} path="/artists" />
            <Route
              element={<AlbumsPage />}
              path="/artists/:artistId/:artistName/albums"
            />
            <Route element={<PlaylistsPage />} path="/playlists" />
            <Route element={<ProfilePage />} path="/profile" />

            {/* Rotas não encontradas, redireciona para Home caso autenticado */}
            {isAuthenticated && (
              <Route element={<Navigate replace to="/home" />} path="*" />
            )}
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
