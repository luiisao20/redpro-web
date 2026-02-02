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
import { OnboardingScreen } from "./views/OnboardingScreen";
import { IndexProfile } from "./views/profile";
import { ChallengeIndex } from "./views/challenge";
import { RewardIndex } from "./views/reward";
import { ConfirmChallenge } from "./views/challenge/ConfirmChallenge";
import { AcceptChallenge } from "./views/challenge/AcceptChallenge";
import { TransactionsScreen } from "./views/profile/TransactionsScreen";

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
          <Route path="profile" element={<IndexProfile />} />
          <Route path="profile/transactions" element={<TransactionsScreen />} />
          <Route path="dashboard" element={<DashboardIndex />}>
            <Route path="home" element={<DashHome />} />
            <Route path="challenges" element={<DashChallenge />} />
            <Route path="rewards" element={<DashRewards />} />
            <Route path="shop" element={<DashShop />} />
          </Route>
          <Route path="challenge/:id" element={<ChallengeIndex />} />
          <Route path="confirm/challenge/:id" element={<ConfirmChallenge />} />
          <Route path="accepted/challenge/:id" element={<AcceptChallenge />} />
          <Route path="reward/:id" element={<RewardIndex />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>,
);
