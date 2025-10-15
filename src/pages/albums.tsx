/** biome-ignore-all lint/style/noMagicNumbers: <dev> */
import { ArrowLeft, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AlbumCard } from "../components/album-card";
import { Button } from "../components/button";
import { Image } from "../components/image";
import {
  type Album,
  type AlbumsApiResponse,
  albumsApiResponseSchema,
} from "../types/albums";
import type { Artist } from "../types/artist";

const mockArtists: Artist[] = [
  {
    id: "art1",
    name: "Black Alien",
    imageUrl: "https://i.ibb.co/Jz5vX2h/black-alien-profile.jpg",
    genres: ["POP"],
    followers: 200_000,
  },
];

export const fetchArtistDetails = async (
  artistId: string
): Promise<Artist | null> => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockArtists.find((artist) => artist.id === artistId) || null;
};

export const fetchArtistAlbums = async (
  artistId: string,
  limit: number,
  offset: number
): Promise<AlbumsApiResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  let allMockAlbums: Album[] = [];
  if (artistId === "art1") {
    allMockAlbums = Array.from({ length: 60 }, (_, i) => ({
      id: `a${i + 1}`,
      name: `Album ${i + 1}`,
      imageUrl: `https://picsum.photos/id/${100 + i}/200/200`,
      totalTracks: 8 + (i % 8),
      releaseDate: `195${7 + Math.floor(i / 10)}-${(i % 12) + 1}-01`,
    }));
  } else {
    allMockAlbums = [];
  }

  const totalMockedAlbums = allMockAlbums.length;
  const paginatedAlbums = allMockAlbums.slice(offset, offset + limit);

  return {
    albums: paginatedAlbums,
    total: totalMockedAlbums,
    limit,
    offset,
  };
};

export function AlbumsPage() {
  const { artistId } = useParams<{ artistId: string }>();
  const navigate = useNavigate();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loadingAlbums, setLoadingAlbums] = useState(false);
  const [loadingArtist, setLoadingArtist] = useState(false);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [totalAlbums, setTotalAlbums] = useState(-1);
  const limit = 10;

  const loadArtistData = async () => {
    if (!artistId) {
      navigate("/artists");
      return;
    }
    setLoadingArtist(true);
    const fetchedArtist = await fetchArtistDetails(artistId);
    setArtist(fetchedArtist);
    setLoadingArtist(false);
  };

  const loadAlbumsData = async (offsetToLoad: number) => {
    if (loadingAlbums || !artistId) {
      navigate("/artists");
      return;
    }
    setLoadingAlbums(true);
    const response = await fetchArtistAlbums(artistId, limit, offsetToLoad);
    albumsApiResponseSchema.parse(response);
    setAlbums(response.albums);
    setCurrentOffset(offsetToLoad);
    setTotalAlbums(response.total);
    setLoadingAlbums(false);
  };

  useEffect(() => {
    setAlbums([]);
    setCurrentOffset(0);
    setTotalAlbums(-1);
    setLoadingAlbums(false);
    setArtist(null);
    setLoadingArtist(false);
    loadArtistData();
    loadAlbumsData(0);
  }, []);

  const handleNextPage = () => {
    const nextOffset = currentOffset + limit;
    if (nextOffset < totalAlbums && !loadingAlbums) {
      loadAlbumsData(nextOffset);
    }
  };

  const handlePrevPage = () => {
    const prevOffset = currentOffset - limit;
    if (prevOffset >= 0 && !loadingAlbums) {
      loadAlbumsData(prevOffset);
    }
  };

  const displayArtistName = artist ? artist.name : "Artista Desconhecido";
  const displayArtistImageUrl = artist
    ? artist.imageUrl
    : "https://via.placeholder.com/50/CCCCCC/000000?text=NA";

  const isFirstPage = currentOffset === 0;
  const isLastPage = currentOffset + limit >= totalAlbums;

  let message: React.ReactNode;
  if (loadingArtist || (loadingAlbums && albums.length === 0)) {
    message = (
      <p className="animate-pulse text-lg text-spotify-green">Carregando...</p>
    );
  } else if (
    albums.length === 0 &&
    !loadingAlbums &&
    totalAlbums !== -1 &&
    totalAlbums === 0
  ) {
    message = (
      <p className="text-lg text-spotify-white opacity-60">
        Nenhum álbum encontrado para {displayArtistName}.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-spotify-black p-4">
      <div className="mb-8 flex items-center space-x-4">
        <button
          aria-label="Voltar"
          className="text-spotify-white transition duration-200 hover:text-spotify-green"
          onClick={() => navigate(-1)}
          type="button"
        >
          <ArrowLeft className="h-8 w-8" />
        </button>
        {loadingArtist ? (
          <Loader2 className="animate-spin" />
        ) : (
          <h1 className="font-bold text-3xl text-spotify-white">
            {displayArtistName}
          </h1>
        )}
        {artist && (
          <Image
            alt={`Foto de perfil de ${displayArtistName}`}
            className="ml-auto h-20 w-20 rounded-full border-2 border-spotify-green object-cover"
            src={
              displayArtistImageUrl ??
              "https://via.placeholder.com/50/CCCCCC/000000?text=NA"
            }
          />
        )}
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loadingAlbums && albums.length === 0 ? (
          <Loader2 className="animate-spin" />
        ) : (
          albums.map((album) => <AlbumCard album={album} key={album.id} />)
        )}
      </div>
      console.log({isFirstPage || loadingAlbums})
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
      <div className="flex justify-center py-8">{message}</div>
    </div>
  );
}

export default AlbumsPage;
