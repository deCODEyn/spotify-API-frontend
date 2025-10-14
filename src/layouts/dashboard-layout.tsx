import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/sidebar/sidebar";

export function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-spotify-black">
      <Sidebar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
