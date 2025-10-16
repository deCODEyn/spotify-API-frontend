import { type Artist, topArtistsResponseSchema } from "../../types/artist";
import { api } from "../api";

export async function getTopArtists(): Promise<Artist[]> {
  const artists = await api.get("artists").json<Artist[]>();
  topArtistsResponseSchema.parse(artists);
  return artists;
}
