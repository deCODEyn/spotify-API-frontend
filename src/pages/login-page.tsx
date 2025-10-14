import spotifyLogo from "../assets/spotify-logo.svg";
import { Image } from "../components/image";

export function LoginPage() {
  const handleLogin = (): void => {
    console.log(
      "Login iniciado. Esta função será conectada ao backend com uma função Hook."
    );
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
        <button
          aria-label="Entrar com sua conta Spotify"
          className="transform rounded-full bg-spotify-green px-12 py-2.5 font-bold text-lg text-spotify-black shadow-lg transition duration-300 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-spotify-green focus:ring-opacity-50"
          onClick={handleLogin}
          type="button"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
