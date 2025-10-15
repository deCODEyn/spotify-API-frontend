import { Button } from "../components/button";
import { Image } from "../components/image";
import { useAuth } from "../context/auth-context";

export function ProfilePage() {
  const { logout, user } = useAuth();

  const handleLogout = (): void => {
    logout();
  };

  return (
    <div className="flex min-h-full flex-col items-center justify-center">
      <div className="mb-6">
        <Image
          alt={`Foto de perfil de ${user?.display_name}`}
          className="h-32 w-32 rounded-full border-4 border-spotify-green object-cover"
          src={user?.imageUrl ?? ""}
        />
      </div>
      <h1 className="mb-2 font-bold text-3xl text-spotify-white">
        {user?.display_name}
      </h1>
      <p className="mb-8 text-lg text-spotify-white">{user?.email}</p>

      <Button onClickFn={handleLogout}>Sair</Button>
    </div>
  );
}
