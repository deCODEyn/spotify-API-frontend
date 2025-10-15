import { HTTPError } from "ky";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { exchangeSpotifyCode } from "../http/api/auth";

const TIMEOUT = 2000;
type ApiErrorMessage = {
  message?: string;
};

async function getHttpErrorMessage(
  error: HTTPError
): Promise<string | undefined> {
  try {
    const errorBody = (await error.response.json()) as ApiErrorMessage;
    return errorBody?.message;
  } catch {
    return;
  }
}

export function CallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [statusMessage, setStatusMessage] = useState(
    "Processando autenticação..."
  );
  const [hasProcessed, setHasProcessed] = useState(false);
  const { login, isAuthenticated } = useAuth();

  const redirectToLogin = useCallback(
    (message: string) => {
      setStatusMessage(message);
      setTimeout(() => navigate("/login", { replace: true }), TIMEOUT);
    },
    [navigate]
  );

  const handleSetToken = useCallback(
    async (code: string) => {
      try {
        const { jwtToken } = await exchangeSpotifyCode(code);
        await login(jwtToken);
        setStatusMessage("Autenticação bem-sucedida! Redirecionando...");
      } catch (e) {
        let errorMessage =
          "Falha ao autenticar. Redirecionando para o login...";

        if (e instanceof HTTPError) {
          const apiMessage = await getHttpErrorMessage(e);
          if (apiMessage) {
            errorMessage = `Erro da API: ${apiMessage}. Redirecionando para o login...`;
          }
        }
        redirectToLogin(errorMessage);
      }
    },
    [redirectToLogin, login]
  );

  useEffect(() => {
    const handleCallback = () => {
      if (hasProcessed) {
        return;
      }
      setHasProcessed(true);
      const code = searchParams.get("code");
      const errorFromSpotify = searchParams.get("error");

      if (errorFromSpotify) {
        redirectToLogin(
          `Erro do Spotify: ${errorFromSpotify}. Redirecionando para o login...`
        );
        return;
      }
      if (!code) {
        redirectToLogin(
          "Código de autenticação não encontrado. Redirecionando para o login..."
        );
        return;
      }

      handleSetToken(code);
    };
    handleCallback();
  }, [searchParams, hasProcessed, handleSetToken, redirectToLogin]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex h-screen items-center justify-center bg-spotify-black p-4 text-spotify-white">
      <div className="text-center">
        <h1 className="mb-4 font-bold text-3xl">Autenticação Spotify</h1>
        <p className="text-lg">{statusMessage}</p>
        {statusMessage.includes("Processando") && (
          <div className="mx-auto mt-4 h-8 w-8 animate-spin rounded-full border-spotify-green border-t-2 border-b-2" />
        )}
      </div>
    </div>
  );
}
