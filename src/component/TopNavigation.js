import AvatarContainer from "./AvatarContainer.js";

export default function TopNavigation() {
  let avatarUrl = localStorage.getItem("avatarUrl");
  if (!avatarUrl) {
    avatarUrl = `https://api.dicebear.com/9.x/personas/svg?seed=${Math.random()}}`;
    localStorage.setItem("avatarUrl", avatarUrl);
  }
  const hasNewChat = true;
  return `
    <header
      class="bg-indigo-600 text-white w-full h-14 z-50 select-none sticky top-0"
    >
      <ul class="grid grid-cols-3 h-full items-center px-4">
        <!-- Profile Picture -->
        <li class="justify-self-start">
          <a href="/profile" data-nav class="flex items-center">
            ${AvatarContainer({
              src: avatarUrl,
              borderColor: "ring-white",
              bgColor: "bg-inherit",
              size: "size-8",
            })}
          </a>
        </li>

        <!-- Logo -->
        <li class="justify-self-center">
          <a href="/" data-nav class="flex items-center gap-1">
            <i data-lucide="graduation-cap" class="text-slate-200"></i>
            <span class="font-semibold text-xl tracking-tight text-slate-200"
              >StudyFinder</span
            >
          </a>
        </li>
        
        <!-- Chat -->
        <li class="justify-self-end">
          <a href="/friends" data-nav class="flex items-center relative">
            <i data-lucide="message-circle"></i>

            <!-- New Chat badge -->
            <span
              class="rounded-full size-3 border-[1.5px] border-white bg-red-500 absolute top-0 right-0 -translate-y-0.5 translate-x-0.5${
                hasNewChat ? "" : "hidden"
              }"
            ></span>
          </a>
        </li>
      </ul>
    </header>
  `;
}
