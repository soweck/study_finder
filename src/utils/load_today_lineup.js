import HomeSessionCard from "../component/HomeSessionCard.js";

const timeFormatter = (time) => {
  const twelveHourFormat = false;
  let formattedTime = "";
  const unformattedTime = new Date(time);
  formattedTime = unformattedTime.toLocaleString("en-US", {
    hour: twelveHourFormat ? "numeric" : "2-digit",
    minute: "2-digit",
    hour12: twelveHourFormat,
  });
  return formattedTime;
};

const showTodayLineupData = (data, userMap) => {
  let lineupContentHtml;
  let forYouContentHtml;
  if (data.length <= 0) {
    lineupContentHtml = `
      <div class="text-center flex-col flex items-center gap-2 mx-auto select-none">
        <h3 class="font-semibold text-slate-600">No session today</h3>
        <button
          class="active-button flex items-center px-4 py-2 rounded-lg gap-2 "
        >
          <i data-lucide="globe" class="size-5"></i>
          <p class="font-semibold text-sm">Discover Sessions</p>
        </button>
      </div>
    `;
  } else {
    lineupContentHtml = data
      .map((obj) => {
        const participantsName = obj.participants.map((id) => {
          return userMap.get(id)?.name || "Unknown";
        });
        return HomeSessionCard(
          obj.title,
          timeFormatter(obj.startDate),
          obj.location,
          participantsName,
        );
      })
      .join("");
    forYouContentHtml = data
      .map((obj) => {
        const participantsName = obj.participants.map((id) => {
          return userMap.get(id)?.name || "Unknown";
        });
        return HomeSessionCard(
          obj.title,
          timeFormatter(obj.startDate),
          obj.location,
          participantsName,
          true,
        );
      })
      .join("");
  }
  document.getElementById("lineup-content").innerHTML = lineupContentHtml;
  document.getElementById("for-you-content").innerHTML = forYouContentHtml;
};

export default async function fetchTodayLineupJson(userMap) {
  try {
    const sessionsData = await fetch("/src/data/sessions.json").then((res) => {
      if (!res.ok) throw new Error(`Failed to fetch sessions: ${res.status}`);
      return res.json();
    });

    showTodayLineupData(sessionsData, userMap);
  } catch (error) {
    console.log(error);
  }
}
