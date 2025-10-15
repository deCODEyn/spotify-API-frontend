import { useState } from "react";
import spotifyLogo from "../assets/spotify-logo.svg";
import { Button } from "../components/button";
import { Image } from "../components/image";
import { getSpotifyAuthUrl } from "../http/api/auth";

export function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    const { spotifyUrl } = await getSpotifyAuthUrl();
    if (spotifyUrl) {
      window.location.href = spotifyUrl;
    } else {
      setError(
        "Falha ao iniciar autenticação com Spotify. Verifique sua conexão ou tente novamente."
      );
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-6 text-center md:space-y-8">
        <div>
          <Image alt="Logo Spotify" src={spotifyLogo} />
        </div>
        <p className="text-lg text-spotify-white md:text-xl">
          Entra com sua conta Spotify clicando no botão abaixo
        </p>
        {error && (
          <div className="mb-4 rounded bg-red-800 p-3 text-sm text-white">
            {error}
          </div>
        )}
        <Button disabled={loading} onClickFn={handleLogin}>
          {loading ? "Redirecionando..." : "Entrar"}
        </Button>
      </div>
    </div>
  );
}
