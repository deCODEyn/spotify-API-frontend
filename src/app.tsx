import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/auth-context";
import { DashboardLayout } from "./layouts/dashboard-layout";
import { ProtectedRoute } from "./layouts/protected-route";
import { AlbumsPage } from "./pages/albums";
import { ArtistisPage } from "./pages/artists";
import { CallbackPage } from "./pages/auth-callback";
import { HomePage } from "./pages/home";
import { LoginPage } from "./pages/login-page";
import PlaylistsPage from "./pages/playlists";
import ProfilePage from "./pages/profile";

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-spotify-black">
        <Routes>
          <Route element={<LoginPage />} path="/login" />

          <Route element={<CallbackPage />} path="/auth/callback" />

          <Route
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                redirectPath="/login"
              />
            }
          >
            <Route element={<DashboardLayout />} path="/">
              <Route element={<Navigate replace to="/home" />} index />
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
          </Route>
          {/* Rotas não encontradas, redireciona para Login caso não autenticado */}
          <Route element={<Navigate replace to="/" />} path="*" />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
