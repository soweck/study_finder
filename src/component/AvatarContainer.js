export default function AvatarContainer({
  src = "https://api.dicebear.com/9.x/personas/svg?seed=default",
  borderColor = "ring-white",
  bgColor = "bg-slate-100",
  size = "size-10",
} = {}) {
  return `
    <div
      class=" rounded-full flex items-center justify-center ring-2 ${size} ${borderColor} ${bgColor} overflow-hidden select-none"
    >
      <img
        src="${src}"
        alt="User avatar"
        class="h-full w-full object-cover"
        loading="lazy"
      />
    </div>
  `;
}
