export default function HomeHeader(title, child = "") {
  return `
    <header class="flex items-center justify-between select-none">
      <h2 class="text-slate-900 font-semibold  text-lg tracking-wide">${title}</h2>
      ${child}
    </header>
  `;
}
