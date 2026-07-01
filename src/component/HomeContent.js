import generate_phrases from "../utils/random_text_generator.js";
import SessionCard from "./SessionCard.js";
import HomeHeader from "./HomeHeader.js";
import HomeCardContainer from "./HomeCardContainer.js";
/*
  TODO:
      - Stale social data is a "vibe killer." If I see a 2-day-old session with a "Join" button, and that session is already over, the app feels broken.
      - According to current activity change border (not perfect brainstorm for better solution)
      - Friends preview use detect viewwidth to fit amount of friends preview
*/
export default function HomeContent() {
  return `
    <main
      class="p-5 pb-28 overflow-y-auto no-scrollbar flex flex-col"
    >
      <header class="flex flex-col gap-y-2">
        <!-- Welcome Text -->
        <h1 class="text-3xl font-semibold tracking-tight leading-8">
          Hello Andrew,
          <br />
          <span
            class="text-2xl font-semibold bg-linear-to-r from-indigo-500 via-sky-400 to-indigo-500 
              bg-clip-text text-transparent"
          >
            What are we doing today?
          </span>
        </h1>

        <!-- Search Bar -->
        <div
          class="w-full h-10 flex px-2 border-2 border-indigo-500 rounded-md items-center select-none"
        >
          <i data-lucide="search" class="size-5 text-slate-600"></i>
          <p class="font-medium pl-2 pr-1 text-slate-600/80">Search
            <p class="text-nowrap overflow-hidden animate-typing text-slate-600/80 max-w-fit">"${generate_phrases()}"</p>
          </p>
        </div>
      </header>

      <div class="flex flex-col gap-y-6 mt-5">
        <!-- Today's Lineup -->
        <section>
          <!-- Today's Lineup Header -->
          ${HomeHeader("Today's Lineup", "<button class='text-xs text-more hover:border-b-2 hover:border-sky-400'>See All</button>")}
          <!-- Today's Lineup Content -->
          ${HomeCardContainer("lineup-content")}
        </section>

        <!-- Friends Activity -->
        <section>
          <!-- Friends Activity Header -->
          ${HomeHeader("Friends Activity")}
          <!-- Friends Profile  -->      
          <div id="friends-preview" class="flex flex-row py-4 gap-4">
          </div>
          <!-- Friends Activity --> 
          <div class="rounded-md bg-white border border-slate-100 shadow-lg">
            <div id="friends-activity">
            </div>
            <div class="flex h-9 justify-center items-center select-none group">
              <p class="text-xs text-more">View Notification</p>
              <i data-lucide="arrow-right" class="size-4 ml-1 text-sky-400 transition duration-200 group-hover:translate-x-2"></i>
            </div>
          </div>
        </section>
        <!-- For You Session -->
        <section>
          ${HomeHeader("Picks For You")}
          <!-- For You Content -->
          ${HomeCardContainer("for-you-content")}
        </section>
        <!-- Discover -->
        <section>
          <!-- Discover Header -->
          ${HomeHeader("Find a Session")}
          <!-- Discover Content -->
          <div class="flex flex-col gap-2 -mx-5 px-5 py-2 bg-white">
            <!-- Discover filters -->
            <div id="discover-filters" class="flex flex-row gap-3 overflow-x-auto no-scrollbar pb-2"></div>
            <!-- Discover Cards -->
            ${HomeCardContainer("discover-cards")}
          </div> 
        </section>
      </div>
    </main>
  `;
}
