import {
  type AlbumsApiResponse,
  albumsApiResponseSchema,
} from "../../types/albums";
import { api } from "../api";

export async function fetchArtistAlbumsFromApi(
  artistId: string,
  limit: number,
  offset: number
): Promise<AlbumsApiResponse> {
  const response = await api
    .get(`artists/${artistId}/albums`, {
      searchParams: { limit: String(limit), offset: String(offset) },
    })
    .json<AlbumsApiResponse>();

  albumsApiResponseSchema.parse(response);
  return response;
}
