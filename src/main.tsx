import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import ReactDOM from "react-dom/client";
import App from "./App";
import { InitScreen } from "./views/InitScreen";
import { LoginScreen } from "./views/LoginScreen";
import { WelcomeScreen } from "./views/WelcomeScreen";
import { RegisterScreen } from "./views/RegisterScreen";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<InitScreen />} />
          <Route path="welcome" element={<WelcomeScreen />} />
          <Route path="login" element={<LoginScreen />} />
          <Route path="register" element={<RegisterScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>,
);
