import AvatarContainer from "./AvatarContainer";

export default function HomeSessionCard(
  title,
  startTime,
  location,
  participants,
  isJoinable = false,
) {
  let participantsHTML = "";
  const MAX_PARTICIPANTS_SHOWN = 2;

  /* Participants Overflow */
  if (participants.length > MAX_PARTICIPANTS_SHOWN) {
    participantsHTML += ` 
    <li class="-mr-2 z-10 list-none">
      <div
        class="bg-slate-300 border-3 border-white rounded-full size-8 flex items-center justify-center"
      >
        <span class="text-[10px]"> +${
          participants.length - MAX_PARTICIPANTS_SHOWN
        }</span>
      </div>
    </li>`;
  }

  /* Participants Load*/
  const participantsToShow = participants.slice(0, MAX_PARTICIPANTS_SHOWN);
  participantsToShow.forEach((participant) => {
    participantsHTML += ` 
    <li class="-mr-2 z-10 list-none">
      ${AvatarContainer({
        src: `https://api.dicebear.com/9.x/personas/svg?seed=${participant}`,
        borderColor: "ring-white",
        bgColor: "bg-slate-300",
        size: "size-7",
      })}
    </li>`;
  });

  return `
    <div
      class="bg-white border border-slate-100 flex-none flex-col py-3 px-5 snap-center rounded-xl w-57 min-h-35 shadow-md"
    >
      <!-- Title -->
      <h1 class="capitalize font-semibold text-lg truncate">
        ${title}
      </h1>

      <!-- Time -->
      <span class="inline-flex items-center gap-1 text-sm text-slate-500">
        <i data-lucide="clock" class="w-4 h-4" aria-hidden="true"></i>
        <span>${startTime} Start</span>
      </span>

      <!-- Location -->
      <span class="inline-flex items-center gap-1 text-sm text-slate-500">
        <i data-lucide="map-pin" class="w-4 h-4" aria-hidden="true"></i>
        <span>${location}</span>
      </span>

      <!-- Participants -->
      <div class="flex justify-between items-center mt-auto">
        <ul class="flex flex-row-reverse justify-end items-center">
          ${participantsHTML}
        </ul>
        <button class="active-button rounded-full p-2">
          <i data-lucide=${isJoinable ? "plus" : "arrow-right"} class="size-4"></i>
        </button>
      </div>
    </div>
  `;
}
