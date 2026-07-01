const searchRecommendations = [
  "Melbourne University",
  "RMIT University",
  "Physics",
  "Math",
  "Monash University",
  "Cafe",
  "Focus",
  "Creative",
  "Near Me",
];

export default function generate_phrases() {
  const randNum = Math.floor(Math.random() * searchRecommendations.length);
  return searchRecommendations[randNum];
}
