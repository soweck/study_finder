const HEADER_CONFIG = {
  ActiveFriends: {
    icon: "users",
    text: "8 Friends Active",
  },
};

const BODY_CONFIG = {
  Capacity: {
    icon: "users",
    text: "92% Full",
  },
  Distance: {
    icon: "map-pin",
    text: "0.3km away",
  },
};
function pill(icon, text) {
  return `
    <span class="flex items-center py-1 px-2 bg-white/10 border-white/10 rounded-full backdrop-blur-sm text-white">
      <p class="flex flex-row items-center">
        <i data-lucide="${icon}" class="size-5 pr-1"></i>
        <span class="font-medium text-[10px]">${text}</span>
      </p>
    </span>
  `;
}
export default function SessionCard() {
  const headerData = HEADER_CONFIG["ActiveFriends"];
  const bgImg =
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1600&auto=format&fit=crop";
  return `
    <div class="flex-none w-75 h-95 relative rounded-4xl bg-slate-600 overflow-hidden shadow-lg shadow-slate-200 border border-slate-100">
      <img
        src=${bgImg}
        class="absolute inset-0 w-full h-full opacity-70 object-cover">
      <div class="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent"></div>

      <!-- Card Content -->
      <header class="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
        ${pill(headerData.icon, headerData.text)}
        <button class="discover-like-btn p-1.5 flex items-center bg-white/40 rounded-full text-white">
          <i data-lucide="heart" class="size-6"></i>
        </button>
      </header>

      <div class="absolute p-6 bottom-0 left-0 right-0 z-10">
        <div class="flex flex-col gap-1">
          <h3 class="text-white font-bold text-2xl">RMIT Campus</h3>
          <div class="flex flex-row gap-1">
            ${pill(BODY_CONFIG["Capacity"].icon, BODY_CONFIG["Capacity"].text)}
            ${pill(BODY_CONFIG["Distance"].icon, BODY_CONFIG["Distance"].text)}
          </div>
          <button class="w-full active-button border-none uppercase rounded-xl p-2 mt-2 shadow-xl">
            <span class="text-sm tracking-wide font-semibold">View Active Sessions</span>
          </button>
        </div>
      </div>
    </div>
  `;
}
