<template>
  <default-layout>
    <div class="p-3 mt-2">
      <p class=" text-gray-700 font-semibold uppercase">Tired of asking...</p>
      <h1 class="text-4xl mt-2">What's for dinner this week?</h1>
      <p class="mt-5 font-semibold leading-snug">
        Save a list of your favorite meals. Then, make a schedule or better yet, let
        <span class="font-serif">DinDin</span> make one for you!
      </p>
      <div class="flex justify-center mt-4">
        <router-link
          to="/login"
          class="block px-6 py-3 my-6 bg-teal-600 text-white text-sm font-semibold rounded-xl tracking-wide text-center hover:bg-teal-500"
          >Sign Up / Log In</router-link
        >
      </div>
    </div>
  </default-layout>
</template>

<script>
  import { firebase } from "../providers/Fire";

  export default {
    name: "Landing",
    async created() {
      if (await firebase.getCurrentUser()) {
        this.$router.push("/dashboard");
      }
    }
  };
</script>
