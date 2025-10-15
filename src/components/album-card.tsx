import type { Album } from "../types/albums";
import { Image } from "./image";

type AlbumCardProps = {
  album: Album;
};

export function AlbumCard({ album }: AlbumCardProps) {
  return (
    <div className="cursor-pointer rounded-lg bg-spotify-dark-gray p-4 shadow-lg transition duration-200 hover:bg-spotify-dark-gray/70">
      <Image
        alt={`Capa do álbum ${album.name}`}
        className="mb-3 aspect-square w-full rounded object-cover shadow-md"
        src={
          album.imageUrl ||
          "https://via.placeholder.com/200/CCCCCC/000000?text=No+Album"
        }
      />
      <h3 className="truncate font-bold text-lg text-spotify-white">
        {album.name}
      </h3>
      <p className="text-sm text-spotify-white opacity-70">
        {album.releaseDate} - {album.totalTracks} faixas
      </p>
    </div>
  );
}
