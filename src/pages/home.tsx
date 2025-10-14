const MORNING = 12;
const AFFTERNOON = 18;

const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < MORNING) {
    return "Bom dia";
  }
  if (hour < AFFTERNOON) {
    return "Boa tarde";
  }
  return "Boa noite";
};

export function HomePage() {
  const userName = "Fulano da Silva";
  const greeting = getGreeting();

  return (
    <div className="flex min-h-full flex-col items-center justify-center p-4 text-center">
      <div>
        <p className="mb-1 font-bold text-spotify-white text-xl opacity-80 md:text-3xl">
          {greeting}
        </p>
        <h1 className="font-extrabold text-4xl text-spotify-white tracking-tighter md:text-6xl">
          {userName}
        </h1>
        <p className="mt-4 text-base text-spotify-white opacity-60 md:text-xl">
          Bem-vindo(a) de volta ao seu centro de música.
        </p>
      </div>
      <div className="mt-12" />
    </div>
  );
}
