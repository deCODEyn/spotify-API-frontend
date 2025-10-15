import { ArrowLeft } from "lucide-react";

type BackButtonProps = {
  onClickFn: () => void;
};
export function BackButton({ onClickFn }: BackButtonProps) {
  return (
    <button
      aria-label="Voltar"
      className="cursor-pointer text-spotify-white transition duration-200 hover:text-spotify-green"
      onClick={onClickFn}
      type="button"
    >
      <ArrowLeft className="h-8 w-8" />
    </button>
  );
}
