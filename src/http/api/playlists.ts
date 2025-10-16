import {
  type CreatePlaylistBody,
  createPlaylistBodySchema,
  type PlaylistsApiResponse,
  playlistsApiResponseSchema,
  type SimplifiedPlaylist,
  simplifiedPlaylistSchema,
} from "../../types/playlist";
import { api } from "../api";

export async function getUserPlaylists(): Promise<PlaylistsApiResponse> {
  const response = await api.get("playlists").json<PlaylistsApiResponse>();
  playlistsApiResponseSchema.parse(response);
  return response;
}

export async function createPlaylist(
  body: CreatePlaylistBody
): Promise<SimplifiedPlaylist> {
  createPlaylistBodySchema.parse(body);
  const response = await api.post("playlists", { json: body }).json();
  const validatedNewPlaylist = simplifiedPlaylistSchema.parse(response);
  return validatedNewPlaylist;
}
