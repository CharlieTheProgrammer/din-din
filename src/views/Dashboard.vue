<template>
  <default-layout>
    <section class="flex-1 p-2">
      <!-- <p class="text-sm font-semibold text-gray-600 tracking-wide mt-6">Tired of Asking</p> -->
      <!-- <h2 class="text-2xl mt-2">'What's for Dinner This Week?'</h2> -->
      <h2 class="text-2xl mt-2 font-bold italic">Welcome to DinDin!</h2>
      <!-- <p class="mt-2 font-semibold text-sm">Simply enter your favorite recipes and let fate decide.</p> -->
      <p class="mt-2 font-semibold text-sm text-gray-600">Click on a button below to get started</p>

      <div class="flex flex-wrap mt-4 md:justify-around">
        <div class="w-1/2 md:w-1/6">
          <div
            class="p-4 h-32 rounded-lg bg-white border-2 border-teal-600 mr-4 text-teal-900 hover:bg-teal-600 hover:text-white"
          >
            <router-link :to="{ name: 'create-recipe' }" class="flex flex-col items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="h-16 w-16 "
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <div class="mt-2 text-center font-semibold tracking-wide">
                Add Recipes
              </div>
            </router-link>
          </div>
        </div>
        <div class="w-1/2 md:w-1/6">
          <div
            class="p-4 h-32 rounded-lg bg-white border-2 border-teal-600 mr-4 text-teal-900 hover:bg-teal-600 hover:text-white"
          >
            <router-link :to="{ name: 'weekly-menu' }" class="flex flex-col items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="h-16 w-16 "
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <div class="text-center font-semibold tracking-wide">
                Create A <br />
                Weekly Menu
              </div>
            </router-link>
          </div>
        </div>
        <div class="w-1/2 md:w-1/6 mt-4 md:mt-0">
          <div
            class="p-4 h-32 rounded-lg bg-white border-2 border-teal-600 mr-4 text-teal-900 hover:bg-teal-600 hover:text-white"
          >
            <router-link :to="{ name: 'recipes' }" class="flex flex-col items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="h-16 w-16"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>

              <div class="mt-2 text-center font-semibold tracking-wide">
                View Recipes
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </default-layout>
</template>

<script>
  export default {
    name: "dashboard"
  };
</script>
