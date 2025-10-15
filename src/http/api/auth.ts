import {
  type CallbackResponse,
  callbackResponseSchema,
  type SpotifyAuthUrlResponse,
  spotifyAuthUrlResponseSchema,
  type User,
  userSchema,
} from "../../types/auth";
import { api, publicApi } from "../api";

export async function getSpotifyAuthUrl(): Promise<SpotifyAuthUrlResponse> {
  const response = await publicApi
    .get("auth/login")
    .json<SpotifyAuthUrlResponse>();
  spotifyAuthUrlResponseSchema.parse(response);
  return response;
}

export async function exchangeSpotifyCode(
  code: string
): Promise<CallbackResponse> {
  const response = await publicApi
    .post(`auth/callback?code=${code}`)
    .json<CallbackResponse>();
  callbackResponseSchema.parse(response);
  return response;
}

export async function getMe(): Promise<User> {
  const user = await api.get("auth/me").json<User>();
  userSchema.parse(user);

  return user;
}
