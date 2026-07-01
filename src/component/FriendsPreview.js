import AvatarContainer from "./AvatarContainer.js";

const ACTIVITY_CONFIG = {
  Math: {
    borderColor: "ring-red-500",
    icon: "pi",
    iconColor: "text-red-500",
  },
  Programing: {
    borderColor: "ring-blue-500",
    icon: "code",
    iconColor: "text-blue-500",
  },
  Exam: {
    borderColor: "ring-orange-500",
    icon: "flame",
    iconColor: "text-orange-500",
  },
  Online: {
    borderColor: "ring-green-500",
    icon: "circle",
    iconColor: "text-green-500",
  },
  Offline: {
    borderColor: "ring-gray-400",
    icon: "moon",
    iconColor: "text-gray-400",
  },
  Focus: {
    borderColor: "ring-red-500",
    icon: "ban",
    iconColor: "text-red-500",
  },
};

export default function FriendsPreview(name, status, activity, note) {
  const displayedActivity = activity ? activity : status;
  const activityConfig = ACTIVITY_CONFIG[displayedActivity]
    ? ACTIVITY_CONFIG[displayedActivity]
    : ACTIVITY_CONFIG["Online"];
  return `
    <div class="flex flex-col gap-1 items-center w-15">
      <div class="relative">
        <div class="ring-4 ${activityConfig.borderColor} rounded-full">
          ${AvatarContainer({
            src: `https://api.dicebear.com/9.x/personas/svg?seed=${name}`,
            borderColor: "ring-white",
            bgColor: "bg-white",
            size: "size-13",
          })}
        </div>
        <div
          class="absolute -bottom-1 -right-1 bg-white rounded-full p-1.5 shadow-sm"
        >
          <i data-lucide="${activityConfig.icon}" class="size-3 ${
            activityConfig.iconColor
          }"></i>
        </div>
      </div>
      <div class="text-center w-full">
        <p class="text-xs font-semibold text-slate-800">${name}</p>
        <p class="text-xs font-medium text-slate-500 truncate">${displayedActivity}</p>
      </div>
    </div>
  `;
}
