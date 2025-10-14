import { CircleDot, Download, HomeIcon, Play, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import spotifyLogo from "../../assets/spotify-logo.svg";
import { Image } from "../image";

export function Sidebar() {
  return (
    <aside className="flex min-h-screen w-16 flex-col justify-between border-spotify-dark-gray border-r bg-spotify-black p-2 text-spotify-white md:w-64 md:p-6">
      <div>
        <div className="mb-8 flex justify-center pl-2 md:pl-0 lg:justify-start">
          <Image
            alt="Logo Spotify"
            className="hidden w-auto md:block md:h-8 lg:h-12"
            src={spotifyLogo}
          />
        </div>
        <nav className="space-y-5 md:text-xl">
          <NavLink
            className={({ isActive }) =>
              `flex items-center space-x-3 rounded-lg p-2 transition duration-200 ${isActive ? "bg-spotify-green font-bold text-black" : "hover:bg-spotify-dark-gray"} justify-center md:justify-start`
            }
            to="/home"
          >
            <HomeIcon className="h-5 w-5 flex-shrink-0" />
            <span className="hidden md:inline">Home</span>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center justify-center space-x-3 rounded-lg p-2 transition duration-200 md:justify-start ${isActive ? "bg-spotify-green font-bold text-black" : "hover:bg-spotify-dark-gray"}`
            }
            to="/artists"
          >
            <CircleDot className="h-5 w-5 flex-shrink-0" />
            <span className="hidden md:inline">Artistas</span>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center justify-center space-x-3 rounded-lg p-2 transition duration-200 md:justify-start ${isActive ? "bg-spotify-green font-bold text-black" : "hover:bg-spotify-dark-gray"}`
            }
            to="/playlists"
          >
            <Play className="h-5 w-5 flex-shrink-0" />
            <span className="hidden md:inline">Playlists</span>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center justify-center space-x-3 rounded-lg p-2 transition duration-200 md:justify-start ${isActive ? "bg-spotify-green font-bold text-black" : "hover:bg-spotify-dark-gray"}`
            }
            to="/profile"
          >
            <User className="h-5 w-5 flex-shrink-0" />
            <span className="hidden md:inline">Perfil</span>
          </NavLink>
        </nav>
      </div>
      <div className="pb-4 pl-2 md:text-xl">
        <button
          className="flex w-full cursor-pointer items-center justify-center space-x-3 rounded-lg p-2 text-left transition duration-200 hover:bg-spotify-dark-gray md:justify-start"
          type="button"
        >
          <Download className="h-6 w-6 flex-shrink-0" />
          <span className="hidden md:inline">Instalar PWA</span>
        </button>
      </div>
    </aside>
  );
}
