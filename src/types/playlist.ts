import { z } from "zod";

export const simplifiedPlaylistSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  imageUrl: z.string().nullable(),
  tracks: z.number(),
});
export type SimplifiedPlaylist = z.infer<typeof simplifiedPlaylistSchema>;

export const playlistsApiResponseSchema = z.object({
  playlists: z.array(simplifiedPlaylistSchema),
  total: z.number(),
  limit: z.number(),
  offset: z.number(),
});
export type PlaylistsApiResponse = z.infer<typeof playlistsApiResponseSchema>;

export const createPlaylistBodySchema = z.object({
  name: z.string().min(1, "Name não pode ser vazio"),
  description: z.string().optional(),
  public: z.boolean().optional(),
});
export type CreatePlaylistBody = z.infer<typeof createPlaylistBodySchema>;
