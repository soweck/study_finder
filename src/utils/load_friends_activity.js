import ActivityNotification from "../component/ActivityNotification.js";

const showFriendsActivity = (data, usersMap, sessionMap) => {
  const MAX_ACTIVITY_SHOWN = 3;
  let friendsActivityHtml;
  if (data.length <= 0) {
    friendsActivityHtml = `<div
      class="flex-col flex items-center py-4 gap-4 border-b text-slate-600 border-slate-100 select-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="80"
        height="80"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-rocking-chair-icon lucide-rocking-chair"
      >
        <polyline points="3.5 2 6.5 12.5 18 12.5" />
        <line x1="9.5" x2="5.5" y1="12.5" y2="20" />
        <line x1="15" x2="18.5" y1="12.5" y2="20" />
        <path d="M2.75 18a13 13 0 0 0 18.5 0" />
      </svg>
      <div class="text-center">
        <h3 class="capitalize font-semibold">It's empty here</h3>
        <p class="text-slate-500 px-10">
          Your friends’ sessions and achievements will appear here.
        </p>
      </div>
    </div>`;
  } else {
    const sortedData = data
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, MAX_ACTIVITY_SHOWN);
    friendsActivityHtml = sortedData
      .map((activity) => {
        const ownerName = usersMap.get(activity.ownerid)?.name;
        const sessionTitle = sessionMap.get(activity.sessionid)?.title;
        return ActivityNotification(
          ownerName,
          activity.type,
          sessionTitle,
          activity.timestamp,
        );
      })
      .join("");
  }
  document.getElementById("friends-activity").innerHTML = friendsActivityHtml;
};

export default async function fetchFriendsActivity(usersMap) {
  try {
    const [activityData, sessionData] = await Promise.all([
      fetch("/src/data/user_activities.json").then((res) => {
        if (!res.ok)
          throw new Error(`Failed to fetch activities: ${res.status}`);
        return res.json();
      }),
      fetch("/src/data/sessions.json").then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch sessions: ${res.status}`);
        return res.json();
      }),
    ]);
    const sessionMap = new Map(
      sessionData.map((session) => [session.id, session]),
    );
    showFriendsActivity(activityData, usersMap, sessionMap);
  } catch (error) {
    console.log(error);
  }
}
