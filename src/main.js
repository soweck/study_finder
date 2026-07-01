import "./styles/style.css"; // Tailwind CSS
import Home from "./pages/home.js";
import Profile from "./pages/profile.js";
import startRouter from "./utils/router.js";

const routes = {
  "/": Home,
  "/profile": Profile,
  "": Home,
};

startRouter(routes);
