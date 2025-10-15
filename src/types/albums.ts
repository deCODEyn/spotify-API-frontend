import { z } from "zod";

export const albumSchema = z.object({
  id: z.string(),
  name: z.string(),
  imageUrl: z.string().nullable(),
  totalTracks: z.number(),
  releaseDate: z.string(),
});
export type Album = z.infer<typeof albumSchema>;

export const albumsApiResponseSchema = z.object({
  albums: z.array(albumSchema),
  total: z.number(),
  limit: z.number(),
  offset: z.number(),
});
export type AlbumsApiResponse = z.infer<typeof albumsApiResponseSchema>;
