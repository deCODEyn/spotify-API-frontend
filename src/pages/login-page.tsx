import spotifyLogo from "../assets/spotify-logo.svg";
import { Button } from "../components/button";
import { Image } from "../components/image";

export function LoginPage() {
  const handleLogin = (): void => {
    //  "Login iniciado. Esta função será conectada ao backend com uma função Hook."
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
        <Button onClickFn={handleLogin}>Entrar</Button>
      </div>
    </div>
  );
}
