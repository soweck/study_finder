import FilterPill from "../component/FilterPill.js";

export default function showDiscoveryFilter() {
  const filtersName = ["Today", "Tomorrow"];
  let discoveryFilterHtml;
  discoveryFilterHtml = filtersName
    .map((name) => {
      return FilterPill(name);
    })
    .join("");
  document.getElementById("discover-filters").innerHTML = discoveryFilterHtml;
}
