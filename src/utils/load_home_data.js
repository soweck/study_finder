import fetchTodayLineupJson from "./load_today_lineup.js";
import fetchFriendsPreview from "./load_friends_preview.js";
import fetchFriendsActivity from "./load_friends_activity.js";
import showDiscoveryFilter from "./load_discover_filter.js";
import showSessionCard from "./load_discover_card.js";
import loadUsers from "./get_users.js";
import { createIcons, icons } from "lucide";

export default async function loadHomePageData() {
  try {
    const users = await loadUsers();
    await Promise.all([
      fetchFriendsPreview(users),
      fetchTodayLineupJson(users),
      fetchFriendsActivity(users),
      showDiscoveryFilter(),
      showSessionCard(),
    ]);
    createIcons({ icons });
  } catch (error) {
    console.error("Error loading home page data:", error);
  }

  document.getElementById("discover-filters").addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-pill");
    if (!btn) return;
    if (btn.classList.contains("active-button")) {
      btn.classList.remove("active-button");
    } else {
      const allPills = document.querySelectorAll(".filter-pill");
      allPills.forEach((p) => p.classList.remove("active-button"));
      btn.classList.add("active-button");
    }
  });

  document.getElementById("discover-cards").addEventListener("click", (e) => {
    const btn = e.target.closest(".discover-like-btn");
    if (!btn) return;

    const isLiked = btn.classList.toggle("liked");
    btn.setAttribute("aria-pressed", isLiked ? "true" : "false");

    btn.classList.add("animate-heart-pop");
    btn.addEventListener(
      "animationend",
      () => btn.classList.remove("animate-heart-pop"),
      { once: true },
    );
  });
}
