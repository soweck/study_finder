import "../styles/style.css";

export default function Profile() {
  return `
    <main class="p-8 font-sans">
      <h1 class="text-3xl font-bold mb-4">Profile</h1>
      <p class="text-base text-gray-700">
        Welcome to your profile page. This is a simple HTML export from a React
        component.
      </p>
      <a href="/" data-nav class="text-blue-500 underline">Go to Home</a>
    </main>
  `;
}
