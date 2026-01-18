import "./assets/main.css";
import "./assets/fonts.css";
import { Outlet } from "react-router";

function App() {
  return (
    <div className="md:w-1/2 mx-auto">
      <Outlet />
    </div>
  );
}

export default App;
