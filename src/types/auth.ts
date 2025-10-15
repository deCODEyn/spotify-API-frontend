import { z } from "zod";

export const spotifyAuthUrlResponseSchema = z.object({
  spotifyUrl: z.url(),
});

export type SpotifyAuthUrlResponse = z.infer<
  typeof spotifyAuthUrlResponseSchema
>;

export const callbackResponseSchema = z.object({
  jwtToken: z.string(),
});

export type CallbackResponse = z.infer<typeof callbackResponseSchema>;

export const userSchema = z.object({
  id: z.string(),
  display_name: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  imageUrl: z.string().nullable(),
});

export type User = z.infer<typeof userSchema>;
