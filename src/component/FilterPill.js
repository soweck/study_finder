export default function FilterPill(text = "") {
  return `
    <button data-id="${text}" class="filter-pill border border-slate-200 text-slate-500 transition-all duration-200 ease-in-out rounded-full shadow-md py-1 px-3">
      <span class="text-xs tracking-wide">${text}</span>
    </button>
  `;
}
