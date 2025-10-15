import { z } from "zod";
import { type Artist, artistSchema } from "../../types/artist";
import { api } from "../api";

const topArtistsResponseSchema = z.array(artistSchema);

export async function getTopArtists(): Promise<Artist[]> {
  const artists = await api.get("artists").json<Artist[]>();
  topArtistsResponseSchema.parse(artists);
  return artists;
}
