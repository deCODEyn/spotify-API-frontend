import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AlbumCard } from "../components/album-card";
import { BackButton } from "../components/back-button";
import { Button } from "../components/button";
import { Image } from "../components/image";
import { fetchArtistAlbumsFromApi } from "../http/api/albums";
import type { Album } from "../types/albums";
import type { Artist } from "../types/artist";

type LocationState = {
  artist?: Artist;
};

const ALBUM_LIMIT = 10;

export function AlbumsPage() {
  const { artistId } = useParams<{ artistId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const [artist, setArtist] = useState<Artist | null>(null);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loadingAlbums, setLoadingAlbums] = useState(false);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [totalAlbums, setTotalAlbums] = useState(-1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (state?.artist && state.artist.id === artistId) {
      setArtist(state.artist);
      setAlbums([]);
      setCurrentOffset(0);
      setTotalAlbums(-1);
    } else {
      navigate("/artists");
    }
  }, [artistId, state?.artist, navigate]);

  useEffect(() => {
    const loadAlbums = async () => {
      if (!artistId) {
        return;
      }
      setLoadingAlbums(true);
      try {
        const response = await fetchArtistAlbumsFromApi(
          artistId,
          ALBUM_LIMIT,
          currentOffset
        );
        setAlbums(response.albums);
        setTotalAlbums(response.total);
      } catch {
        setError("Falha ao carregar álbuns do artista.");
      } finally {
        setLoadingAlbums(false);
      }
    };
    loadAlbums();
  }, [artistId, currentOffset]);

  const handleNextPage = () => {
    const nextOffset = currentOffset + ALBUM_LIMIT;
    if (!loadingAlbums && nextOffset < totalAlbums) {
      setCurrentOffset(nextOffset);
    }
  };

  const handlePrevPage = () => {
    const prevOffset = currentOffset - ALBUM_LIMIT;
    if (!loadingAlbums && prevOffset >= 0) {
      setCurrentOffset(prevOffset);
    }
  };

  const isFirstPage = currentOffset === 0;
  const isLastPage =
    totalAlbums === -1 || currentOffset + ALBUM_LIMIT >= totalAlbums;

  const shouldRenderLoader = loadingAlbums && albums.length === 0 && artistId;
  const shouldRenderEmptyState =
    !loadingAlbums && albums.length === 0 && totalAlbums === 0 && artistId;

  return (
    <div className="min-h-screen bg-spotify-black p-4">
      <div className="mb-8 flex items-center space-x-4">
        <BackButton onClickFn={() => navigate(-1)} />
        <h1 className="font-bold text-3xl text-spotify-white">
          {artist?.name}
        </h1>
        {artist?.imageUrl && (
          <Image
            alt={`Foto de perfil de ${artist?.name}`}
            className="ml-auto h-20 w-20 rounded-full border-2 border-spotify-green object-cover"
            src={artist.imageUrl}
          />
        )}
      </div>

      <div className="flex justify-center py-8">
        {error && <p className="text-lg text-red-400">{error}</p>}

        {shouldRenderLoader && (
          <div className="flex flex-col items-center">
            <Loader2 className="mb-2 h-10 w-10 animate-spin text-spotify-green" />
            <p className="text-spotify-green">Carregando álbuns...</p>
          </div>
        )}

        {shouldRenderEmptyState && (
          <p className="text-lg text-spotify-white opacity-60">
            Nenhum álbum encontrado para {artist?.name}.
          </p>
        )}
      </div>

      {albums.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {albums.map((album) => (
            <AlbumCard album={album} key={album.id} />
          ))}
        </div>
      )}

      {totalAlbums > ALBUM_LIMIT && (
        <div className="mt-8 flex justify-center space-x-4">
          <Button
            disabled={isFirstPage || loadingAlbums}
            onClickFn={handlePrevPage}
          >
            Anterior
          </Button>
          <Button
            disabled={isLastPage || loadingAlbums}
            onClickFn={handleNextPage}
          >
            Próxima
          </Button>
        </div>
      )}
    </div>
  );
}
