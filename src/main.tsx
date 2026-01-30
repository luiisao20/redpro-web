import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import ReactDOM from "react-dom/client";
import App from "./App";
import { InitScreen } from "./views/InitScreen";
import { LoginScreen } from "./views/LoginScreen";
import { WelcomeScreen } from "./views/WelcomeScreen";
import { RegisterScreen } from "./views/RegisterScreen";
import { DashboardIndex } from "./views/dashboard";
import { DashHome } from "./views/dashboard/DashHome";
import { DashChallenge } from "./views/dashboard/DashChallenge";
import { DashRewards } from "./views/dashboard/DashRewards";
import { DashShop } from "./views/dashboard/DashShop";
import {OnboardingScreen} from "./views/OnboardingScreen";
import {IndexProfile} from "./views/profile";

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
          <Route path="onboarding" element={<OnboardingScreen />} />
          <Route path="profile" element={<IndexProfile />} >
          </Route>
          <Route path="dashboard" element={<DashboardIndex />}>
            <Route path="home" element={<DashHome />} />
            <Route path="challenges" element={<DashChallenge />} />
            <Route path="rewards" element={<DashRewards />} />
            <Route path="shop" element={<DashShop />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>,
);
