import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import { Image } from "../components/image";
import { fetchUserPlaylists } from "../hooks/mock-api";
import {
  playlistsApiResponseSchema,
  type SimplifiedPlaylist,
} from "../types/playlist";

export function PlaylistsPage() {
  const navigate = useNavigate();

  const [playlists, setPlaylists] = useState<SimplifiedPlaylist[]>([]);
  const [loadingPlaylists, setLoadingPlaylists] = useState(false);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [totalPlaylists, setTotalPlaylists] = useState(-1);
  const limit = 10;

  const loadPlaylistsData = async (offsetToLoad: number) => {
    if (loadingPlaylists) {
      return;
    }
    setLoadingPlaylists(true);
    const response = await fetchUserPlaylists(limit, offsetToLoad);
    playlistsApiResponseSchema.parse(response); // Valida com zod
    setPlaylists(response.playlists);
    setCurrentOffset(offsetToLoad);
    setTotalPlaylists(response.total);
    setLoadingPlaylists(false);
  };

  useEffect(() => {
    setPlaylists([]);
    setCurrentOffset(0);
    setTotalPlaylists(-1);
    setLoadingPlaylists(false);

    loadPlaylistsData(0);
  }, []);

  const handleNextPage = () => {
    const nextOffset = currentOffset + limit;
    if (nextOffset < totalPlaylists && !loadingPlaylists) {
      loadPlaylistsData(nextOffset);
    }
  };

  const handlePrevPage = () => {
    const prevOffset = currentOffset - limit;
    if (prevOffset >= 0 && !loadingPlaylists) {
      loadPlaylistsData(prevOffset);
    }
  };

  const isFirstPage = currentOffset === 0;
  const isLastPage = currentOffset + limit >= totalPlaylists;

  let message: React.ReactNode;
  if (loadingPlaylists && playlists.length === 0) {
    message = (
      <p className="animate-pulse text-lg text-spotify-green">
        Carregando playlists...
      </p>
    );
  } else if (
    playlists.length === 0 &&
    !loadingPlaylists &&
    totalPlaylists !== -1 &&
    totalPlaylists === 0
  ) {
    message = (
      <p className="text-lg text-spotify-white opacity-60">
        Nenhuma playlist encontrada.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-spotify-black p-4">
      <div className="mb-8 flex items-center space-x-4">
        <h1 className="font-bold text-3xl text-spotify-white">
          Minhas Playlists
        </h1>
        <Button
          aria-label="Criar nova playlist"
          className="ml-auto"
          onClickFn={() => console.log("Criar nova playlist!")}
        >
          Criar playlist
        </Button>
      </div>

      <h2 className="mb-6 text-spotify-white text-xl opacity-80">
        Sua coleção pessoal de playlists (Total:{" "}
        {totalPlaylists === -1 ? "..." : totalPlaylists})
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
        {loadingPlaylists && playlists.length === 0 ? (
          <Loader2 className="animate-spin" />
        ) : (
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
          ))
        )}
      </div>

      <div className="mt-8 flex justify-center space-x-4">
        <Button
          aria-label="Página anterior de playlists"
          disabled={isFirstPage || loadingPlaylists}
          onClickFn={handlePrevPage}
        >
          Anterior
        </Button>
        <Button
          aria-label="Próxima página de playlists"
          disabled={isLastPage || loadingPlaylists}
          onClickFn={handleNextPage}
        >
          Próxima
        </Button>
      </div>

      <div className="flex justify-center py-8">{message}</div>
    </div>
  );
}

export default PlaylistsPage;
