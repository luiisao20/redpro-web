import "./assets/main.css";
import "./assets/fonts.css";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useAuthStore } from "./presentation/core/useAuthStore";
import { useEffect } from "react";
import { LoaderComponent } from "./components/LoaderComponent";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { status, checkStatus } = useAuthStore();

  useEffect(() => {
    checkStatus();
  }, []);

  useEffect(() => {
    console.log(location.pathname);
    if (
      !["/", "/welcome", "/login", "/register"].includes(location.pathname) &&
      status === "unauthenticated"
    )
      navigate("/");
  }, [status, navigate]);

  return (
    <div className="md:w-1/2 mx-auto">
      {status === "checking" ? <LoaderComponent /> : <Outlet />}
    </div>
  );
}

export default App;
