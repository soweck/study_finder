import { currentPage } from "../utils/router.js";

export default function BottomNavigation() {
  const isHome = currentPage === "/" || currentPage === "";
  const isDiscover = currentPage === "/discover";
  const isExplore = currentPage === "/explore";
  const isUpdates = currentPage === "/notifications";
  const hasNewUpdates = true;
  return `
    <nav
      class="bg-white backdrop-blur-xl border-t border-slate-200 w-full h-16 fixed bottom-0 left-0 right-0 select-nones z-50"
    >
      <ul class="grid grid-cols-5 h-full items-center">

        <!-- Home Button -->
        <li class="justify-self-center">
          <a href="/" data-nav class="flex flex-col items-center gap-1">
            <i
              data-lucide="home"
              class="${isHome ? "text-indigo-500" : "text-slate-500"}"
            ></i>
            <span
              class="${
                isHome ? "text-indigo-500" : "text-slate-500"
              } font-sans text-xs font-semibold"
              >Home</span
            >
          </a>
        </li>

        <!-- Explore Button -->
        <li class="justify-self-center">
          <a href="/explore" data-nav class="flex flex-col items-center gap-1">
            <i
              data-lucide="search"
              class="${isExplore ? "text-indigo-500" : "text-slate-500"}"
            ></i>
            <span
              class="${
                isExplore ? "text-indigo-500" : "text-slate-500"
              } font-sans text-xs font-semibold"
              >Find</span
            >
          </a>
        </li>

        <!-- Create Button -->
        <li class="justify-self-center relative">
          <a href="/create" data-nav class="flex items-center">
            <div
              class="absolute left-1/2 -top-7 transform -translate-1/2 rounded-full size-19 bg-indigo-700 flex items-center 
                justify-center z-20 ring-5 ring-white/70 shadow-[0_8px_20px_rgba(99,102,241,0.4)]"
            >
              <i data-lucide="plus" class="text-white size-10"></i>
            </div>
          </a>
        </li>

        <!-- Discover Button -->
        <li class="justify-self-center">
          <a href="/discover" data-nav class="flex flex-col items-center gap-1">
            <i
              data-lucide="compass"
              class="${isDiscover ? "text-indigo-500" : "text-slate-500"}"
            ></i>
            <span
              class="${
                isDiscover ? "text-indigo-500" : "text-slate-500"
              } font-sans text-xs font-semibold"
              >Discover</span
            >
          </a>
        </li>

        <!-- Notification Button -->
        <li class="justify-self-center">
          <a
            href="/notifications"
            data-nav
            class="flex flex-col items-center gap-1 relative"
          >
            <i
              data-lucide="bell"
              class="${isUpdates ? "text-indigo-500" : "text-slate-500"}"
            ></i>
            <span
              class="${
                isUpdates ? "text-indigo-500" : "text-slate-500"
              } font-sans text-xs font-semibold"
              >Updates</span
            >
            
            <!-- New Update Badge -->
            <span
              class="rounded-full size-3 border-[1.5px] border-white bg-red-500 absolute top-0 right-3 -translate-y-0.5 translate-x-0.5 ${
                hasNewUpdates ? "" : "hidden"
              }"
            ></span>
          </a>
        </li>
      </ul>
    </nav>
  `;
}
