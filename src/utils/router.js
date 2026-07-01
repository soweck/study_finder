export let currentPage = "";
import { createIcons, icons } from "lucide";
import loadHomePageData from "./load_home_data.js";
function router(routesMap, mount) {
  const path = window.location.pathname;
  const page = routesMap[path] || routesMap["/"];
  currentPage = path;
  document.getElementById(mount).innerHTML = page();
  if (currentPage == "/" || currentPage == "") {
    loadHomePageData();
  }
  createIcons({ icons });
}

function navigateTo(url, routesMap, mount) {
  if (window.location.pathname != url) {
    window.history.pushState({}, "", url);
    router(routesMap, mount);
  }
}

export default function startRouter(routesMap, mount = "app") {
  document.addEventListener("click", (e) => {
    const anchor = e.target.closest("a[data-nav]");
    if (anchor) {
      e.preventDefault();
      navigateTo(anchor.getAttribute("href"), routesMap, mount);
    }
  });
  window.addEventListener("popstate", () => router(routesMap, mount));
  window.addEventListener("load", () => router(routesMap, mount));
}
