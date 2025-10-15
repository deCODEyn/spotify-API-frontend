import { Button } from "../components/button";
import { Image } from "../components/image";

export function ProfilePage() {
  const user = {
    name: "Fulano dos Santos",
    email: "fulano.santos@example.com",
    profileImage: "https://via.placeholder.com/150/57B660/FFFFFF?text=FS",
  };

  const handleLogout = (): void => {
    //  "Usuário deslogado. Lógica de autenticação será implementada aqui."
  };

  return (
    <div className="flex min-h-full flex-col items-center justify-center">
      <div className="mb-6">
        <Image
          alt={`Foto de perfil de ${user.name}`}
          className="h-32 w-32 rounded-full border-4 border-spotify-green object-cover"
          src={user.profileImage}
        />
      </div>
      <h1 className="mb-2 font-bold text-3xl text-spotify-white">
        {user.name}
      </h1>
      <p className="mb-8 text-lg text-spotify-white">{user.email}</p>

      <Button onClickFn={handleLogout}>Sair</Button>
    </div>
  );
}

export default ProfilePage;
