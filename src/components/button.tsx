type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClickFn: () => void;
};

export function Button({
  children,
  onClickFn,
  className,
  disabled = false,
}: ButtonProps) {
  const baseClass =
    "transform cursor-pointer rounded-full bg-spotify-green px-6 py-1 md:px-12 md:py-2.5 sm:px-10 sm:px-2 font-bold text-sm sm:text-lg text-spotify-black shadow-lg transition duration-300 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-spotify-green focus:ring-opacity-50 disabled:cursor-not-allowed disabled:opacity-50";
  return (
    <button
      aria-label="Entrar com sua conta Spotify"
      className={`${baseClass} ${className}`}
      disabled={disabled}
      onClick={onClickFn}
      type="button"
    >
      {children}
    </button>
  );
}
