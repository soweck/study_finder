import FriendsPreview from "../component/FriendsPreview.js";
import { createIcons, icons } from "lucide";
const CURRENT_USER_ID = 1;

const showFriendsPreview = (data, userMap) => {
  const container = document.getElementById("friends-preview");
  const parentWidth = container.getBoundingClientRect().width;
  const ITEM_WIDTH = 67;
  const MAX_FRIENDS_SHOWN = Math.floor((parentWidth - 60) / ITEM_WIDTH);
  let friendsPreviewHtml;
  if (data.length <= 0) {
    friendsPreviewHtml = `
      <div class="text-center flex-col flex items-center gap-2 select-none">
        <header>
          <h3 class="font-semibold text-slate-600">No friends yet?</h3>
          <p class="text-slate-500">Add your first friend!</p>
        </header>

        <button
          class="active-button flex items-center px-4 py-2 rounded-lg  gap-2 "
        >
          <i data-lucide="user-round-plus" class="text-white size-5"></i>
          <p class="text-white font-semibold text-sm">Add Friends</p>
        </button>
      </div>
    `;
  } else {
    const friendsToShow = data.slice(0, MAX_FRIENDS_SHOWN);
    friendsPreviewHtml = friendsToShow.map((obj) => {
      const name = userMap.get(obj.userid)?.name || "Unknown";
      return FriendsPreview(name, obj.status, obj.activity, obj.note);
    });
    if (data.length > MAX_FRIENDS_SHOWN) {
      friendsPreviewHtml.push(`
        <div class="flex flex-col gap-1 items-center select-none group">
          <div class="border shadow-sm border-gray-200 text-indigo-400 size-12 flex items-center justify-center rounded-full transition duration-200 group-hover:scale-110">
            <i data-lucide="arrow-right" class=""></i>
          </div>
          <div class="text-center pt-2">
            <p
              class="text-[10px] text-more"
            >
              View All
            </p>
          </div>
        </div>
      `);
    }
    friendsPreviewHtml = friendsPreviewHtml.join("");
  }
  document.getElementById("friends-preview").innerHTML = friendsPreviewHtml;
};

export default async function fetchFriendsPreview(usersMap) {
  try {
    const statusData = await fetch("/src/data/users_status.json").then(
      (res) => {
        if (!res.ok)
          throw new Error(`Failed to fetch user_status: ${res.status}`);
        return res.json();
      },
    );
    const userFriendSet = new Set(usersMap.get(CURRENT_USER_ID)?.friends);
    const userStatusData = statusData.filter((status) => {
      return userFriendSet.has(status.userid);
    });
    showFriendsPreview(userStatusData, usersMap);

    let timeout;
    window.addEventListener("resize", () => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        showFriendsPreview(userStatusData, usersMap);
        createIcons({ icons });
      }, 200);
    });
  } catch (error) {
    console.log(error);
  }
}
