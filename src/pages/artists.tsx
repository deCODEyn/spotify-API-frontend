import { Link } from "react-router-dom";
import { Image } from "../components/image";
import type { Artist } from "../types/artist";

const artists: Artist[] = [
  {
    id: "art1",
    name: "Black Alien",
    genres: ["Hip Hop", "Rap", "Brazilian"],
    imageUrl: "https://via.placeholder.com/150/4B0082/FFFFFF?text=BA",
    followers: 500_000,
  },
];

export function ArtistisPage() {
  return (
    <div className="p-4">
      <h1 className="mb-2 font-bold text-3xl text-spotify-white">
        Top Artistas
      </h1>
      <p className="mb-8 text-lg text-spotify-white opacity-80">
        Aqui você encontra seus artistas preferidos
      </p>

      <div className="space-y-4">
        {artists.map((artist) => (
          <Link
            className="flex cursor-pointer items-center space-x-4 rounded-lg bg-spotify-dark p-3"
            key={artist.id}
            to={`/artists/${artist.id}/${encodeURIComponent(artist.name)}/albums`}
          >
            <Image
              alt={`Foto de ${artist.name}`}
              className="h-20 w-20 flex-shrink-0 rounded-full object-cover"
              src={
                artist.imageUrl ||
                "https://via.placeholder.com/150/CCCCCC/000000?text=No+Img"
              }
            />
            <span className="font-semibold text-2xl text-spotify-white hover:text-spotify-green/90">
              {artist.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
