import SessionCard from "../component/SessionCard.js";

export default function showSessionCard() {
  let discoveryFilterHtml;
  discoveryFilterHtml = SessionCard() + SessionCard();
  document.getElementById("discover-cards").innerHTML = discoveryFilterHtml;
}
