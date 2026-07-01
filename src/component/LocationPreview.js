export default function LocationPreview() {
  const imgData = {
    src: "https://images.unsplash.com/photo-1719954327185-53c8d1b08ffe?q=80&w=735&auto=format&fit=crop",
    alt: "Victoria_State_Library",
  };
  return `
    <div class="relative rounded-4xl min-w-70 h-90 overflow-hidden group shadow-lg shadow-slate-200">
      <div class="absolute rounded-4xl inset-0 bg-slate-900">
        <img
          src=${imgData.src}
          alt=${imgData.alt}
          class="w-full h-full rounded-4xl object-fit opacity-80 group-hover:opacity-70 transition-all duration-700 group-hover:scale-108"
        />
        <div class="absolute rounded-4xl inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent"></div>
      </div>
    </div>
  `;
}
