import { Navigate, Outlet } from "react-router-dom";

type ProtectedRouteProps = {
  isAuthenticated: boolean;
  redirectPath?: string;
};

export function ProtectedRoute({
  isAuthenticated,
  redirectPath = "/",
}: ProtectedRouteProps) {
  if (!isAuthenticated) {
    return <Navigate replace to={redirectPath} />;
  }

  return <Outlet />;
}
