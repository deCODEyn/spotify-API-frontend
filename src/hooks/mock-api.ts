/** biome-ignore-all lint/style/noMagicNumbers: <dev> */
import type { AlbumsApiResponse } from "../types/albums";
import type { Artist } from "../types/artist";
import type {
  PlaylistsApiResponse,
  SimplifiedPlaylist,
} from "../types/playlist";

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

export const allMockPlaylists: SimplifiedPlaylist[] = Array.from(
  { length: 45 },
  (_, i) => ({
    id: `pl${i + 1}`,
    name: `Minha Playlist ${i + 1}`,
    description:
      i % 3 === 0 ? "Para relaxar e curtir" : "Mix variado para o dia a dia",
    imageUrl: `https://picsum.photos/id/${300 + i}/200/200`,
    tracks: 15 + (i % 10),
  })
);

export const fetchUserPlaylists = async (
  limit: number,
  offset: number
): Promise<PlaylistsApiResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const totalMockedPlaylists = allMockPlaylists.length;
  const paginatedPlaylists = allMockPlaylists.slice(offset, offset + limit);

  return {
    playlists: paginatedPlaylists,
    total: totalMockedPlaylists,
    limit,
    offset,
  };
};
