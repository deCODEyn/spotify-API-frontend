import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app.tsx";
import { AuthProvider } from "./context/auth-context.tsx";

/** biome-ignore lint/style/noNonNullAssertion: mandatory by React */
createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
