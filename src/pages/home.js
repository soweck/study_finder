import BottomNavigation from "../component/BottomNavigation.js";
import TopNavigation from "../component/TopNavigation.js";
import HomeContent from "../component/HomeContent.js";
export default function Home() {
  return `
    ${TopNavigation()}
    ${HomeContent()}
    ${BottomNavigation()}
  `;
}
