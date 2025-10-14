type ButtonProps = {
  children: React.ReactNode;
  onClickFn: () => void;
};

export function Button({ children, onClickFn }: ButtonProps) {
  return (
    <button
      aria-label="Entrar com sua conta Spotify"
      className="transform cursor-pointer rounded-full bg-spotify-green px-12 py-2.5 font-bold text-lg text-spotify-black shadow-lg transition duration-300 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-spotify-green focus:ring-opacity-50"
      onClick={onClickFn}
      type="button"
    >
      {children}
    </button>
  );
}
