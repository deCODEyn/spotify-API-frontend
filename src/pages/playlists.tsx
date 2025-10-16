import { useCallback, useEffect, useState } from "react";
import { Button } from "../components/button";
import { CreatePlaylistModal } from "../components/create-playlist-modal";
import { Image } from "../components/image";
import { getUserPlaylists } from "../http/api/playlists";
import type { CreatePlaylistBody, SimplifiedPlaylist } from "../types/playlist";

export function PlaylistsPage() {
  const [showCreatePlaylistModal, setShowCreatePlaylistModal] = useState(false);
  const [playlists, setPlaylists] = useState<SimplifiedPlaylist[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchPlaylists = useCallback(async () => {
    setError(null);
    try {
      const response = await getUserPlaylists();
      setPlaylists(response);
    } catch {
      setError("Erro ao carregar as playlists. Tente novamente mais tarde.");
    }
  }, []);

  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  const handlePlaylistCreated = (_newPlaylistData: CreatePlaylistBody) => {
    fetchPlaylists();
    setShowCreatePlaylistModal(false);
  };

  return (
    <div className="min-h-screen bg-spotify-black p-4">
      <div className="mb-8 flex items-center space-x-4">
        <h1 className="font-bold text-3xl text-spotify-white">
          Minhas Playlists
        </h1>
        <Button
          aria-label="Criar nova playlist"
          className="ml-auto"
          onClickFn={() => setShowCreatePlaylistModal(true)}
        >
          Criar playlist
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
        {error && (
          <div className="flex h-40 items-center justify-center">
            <p className="text-lg text-red-400">{error}</p>
          </div>
        )}

        {!error &&
          playlists.length > 0 &&
          playlists.map((playlist) => (
            <div
              className="flex items-center space-x-4 rounded-lg border border-spotify-green p-4 shadow-lg transition duration-200"
              key={playlist.id}
            >
              <Image
                alt={`Capa da playlist ${playlist.name}`}
                className="h-16 w-16 flex-shrink-0 rounded object-cover shadow-md"
                src={
                  playlist.imageUrl ||
                  "https://via.placeholder.com/150/CCCCCC/000000?text=No+Cover"
                }
              />
              <div className="flex-grow">
                <h3 className="font-bold text-lg text-spotify-white">
                  {playlist.name}
                </h3>
                <div className="flex flex-col justify-between md:flex-row">
                  <p className="text-sm text-spotify-white opacity-70">
                    {`${playlist.tracks} músicas`}
                  </p>
                  <p className="text-sm text-spotify-white opacity-70">
                    {playlist.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        {!error && playlists.length === 0 && (
          <div className="flex h-40 items-center justify-center">
            <p className="text-lg text-spotify-white opacity-60">
              Nenhuma playlist encontrada.
            </p>
          </div>
        )}
      </div>

      <CreatePlaylistModal
        isOpen={showCreatePlaylistModal}
        onClose={() => setShowCreatePlaylistModal(false)}
        onPlaylistCreated={handlePlaylistCreated}
      />
    </div>
  );
}
