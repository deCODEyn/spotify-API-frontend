import {
  type PlaylistsApiResponse,
  playlistsApiResponseSchema,
} from "../../types/playlist";
import { api } from "../api";

export async function getUserPlaylists(): Promise<PlaylistsApiResponse> {
  const response = await api.get("playlists").json<PlaylistsApiResponse>();
  playlistsApiResponseSchema.parse(response);
  return response;
}
