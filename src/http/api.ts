import Cookies from "js-cookie";
import ky from "ky";

const API_URL = import.meta.env.VITE_API_URL;

export const api = ky.create({
  prefixUrl: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  hooks: {
    beforeRequest: [
      (request) => {
        const token = Cookies.get("token");
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
  },
});

export const publicApi = ky.create({
  prefixUrl: API_URL,
});
