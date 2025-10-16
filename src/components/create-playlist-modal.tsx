import { X } from "lucide-react";
import { useRef, useState } from "react";
import { useClickOutside } from "../hooks/use-click-outside";
import {
  type CreatePlaylistBody,
  createPlaylistBodySchema,
} from "../types/playlist";

type CreatePlaylistModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onPlaylistCreated: (newPlaylistData: CreatePlaylistBody) => Promise<void>;
};

export function CreatePlaylistModal({
  isOpen,
  onClose,
  onPlaylistCreated,
}: CreatePlaylistModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalContentRef, onClose);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    const playlistData: CreatePlaylistBody = {
      name,
      description: description || undefined,
      public: isPublic,
    };
    try {
      createPlaylistBodySchema.parse(playlistData);
      await onPlaylistCreated(playlistData);

      setName("");
      setDescription("");
      setIsPublic(false);
      onClose();
    } catch {
      setError("Falha ao criar playlist. Tente novamente.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div
        className="relative w-full max-w-md rounded-lg bg-spotify-dark-gray p-6 shadow-xl"
        ref={modalContentRef}
      >
        <X
          className="absolute top-4 right-4 h-8 w-8 cursor-pointer text-spotify-white/70 hover:text-spotify-white"
          onClick={onClose}
        />
        <h2 className="mb-4 font-bold text-spotify-white text-xl md:text-2xl">
          Sua nova coleção de músicas
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="mb-2 block text-spotify-white"
              htmlFor="playlistName"
            >
              Nome da Playlist *
            </label>
            <input
              className="w-full rounded bg-spotify-gray-light p-3 text-spotify-white placeholder-spotify-white/50 focus:outline-none focus:ring-2 focus:ring-spotify-green"
              id="playlistName"
              onChange={(e) => setName(e.target.value)}
              placeholder="Minha playlist"
              required
              type="text"
              value={name}
            />
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-spotify-white"
              htmlFor="playlistDescription"
            >
              Descrição (Opcional)
            </label>
            <textarea
              className="w-full rounded bg-spotify-gray-light p-3 text-spotify-white placeholder-spotify-white/50 focus:outline-none focus:ring-2 focus:ring-spotify-green"
              id="playlistDescription"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Uma breve descrição da sua playlist"
              rows={2}
              value={description}
            />
          </div>
          <div className="mb-6 flex items-center">
            <input
              checked={isPublic}
              className="h-5 w-5 rounded border-gray-300 bg-spotify-gray-light text-spotify-green focus:ring-spotify-green"
              id="playlistPublic"
              onChange={(e) => setIsPublic(e.target.checked)}
              type="checkbox"
            />
            <label className="ml-2 text-spotify-white" htmlFor="playlistPublic">
              Tornar pública
              <span className="ml-1 text-sm text-spotify-white/60">
                (Visível para todos)
              </span>
            </label>
          </div>
          {error && <p className="mb-4 text-center text-red-400">{error}</p>}
          <button
            aria-label="Criar playlist"
            className="w-full transform cursor-pointer rounded-full bg-spotify-green px-6 py-1 font-bold text-sm text-spotify-black shadow-lg transition duration-300 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-spotify-green focus:ring-opacity-50 sm:px-8 sm:text-lg md:px-12 md:py-2.5"
            type="submit"
          >
            Criar
          </button>
        </form>
      </div>
    </div>
  );
}
