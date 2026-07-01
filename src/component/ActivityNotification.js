import AvatarContainer from "./AvatarContainer.js";

const timeDiff = (timestamp) => {
  let ts = Number(timestamp);
  if (ts < 1e12) ts *= 1000;
  const diffMs = Math.max(0, Date.now() - ts);
  const sec = Math.floor(diffMs / 1000);
  if (sec < 1) return "1s";
  if (sec < 60) return `${sec}s`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m`;
  const hours = Math.floor(min / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;
  const weeks = Math.floor(days / 7);
  return `${weeks}w`;
};

export default function ActivityNotification(name, type, title, timestamp) {
  const activityTemplates = {
    session_created: {
      descriptionHtml: ` 
      <p class="text-sm text-ellipsis overflow-hidden text-pretty">
        <span class="font-semibold">${name}</span> created a
        <span class="font-semibold truncate">${title}</span> session
        <span class="text-xs text-slate-500"> ${timeDiff(timestamp)} ago</span>
      </p>`,
      activityIcon: "book-open",
      ctaHtml: `
      <button class="active-button px-3 py-1 rounded-xl select-none font-semibold">
        <span class="text-xs">Join</span>
      </button>`,
    },
  };
  const currTemplate = activityTemplates[type] || {
    descriptionHtml: "",
    activityIcon: "",
  };
  return `
    <div class="flex flex-3 gap-3 p-5 border-b border-slate-100 items-center">
      <div class="relative">
        ${AvatarContainer({
          src: `https://api.dicebear.com/9.x/personas/svg?seed=${name}`,
          bgColor: "bg-white",
          borderColor: "ring-slate-100",
          size: "size-13",
        })}
        <div
          class="absolute -bottom-1 -right-1 bg-white rounded-full p-1.5 shadow-sm"
        >
          <i data-lucide="${currTemplate.activityIcon}" class="size-2.5"></i>
        </div>
      </div>
      <div class="overflow-hidden">
        ${currTemplate.descriptionHtml}
      </div>
      ${currTemplate.ctaHtml}
    </div>
  `;
}
