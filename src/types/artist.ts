import { z } from "zod";

export const artistSchema = z.object({
  id: z.string(),
  name: z.string(),
  genres: z.array(z.string()),
  imageUrl: z.string().nullable(),
  followers: z.number(),
});
export type Artist = z.infer<typeof artistSchema>;

export const topArtistsResponseSchema = z.array(artistSchema);
export type TopArtists = z.infer<typeof topArtistsResponseSchema>;
