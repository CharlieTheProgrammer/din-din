<template>
  <default-layout :loading="loading">
    <div class="p-2">
      <div class="rounded-xl shadow-xl p-5 md:p-8 bg-teal-600 border-teal-600 mt-4">
        <div id="field-wrapper" class="mt-3">
          <label for="recipe" class="block text-2xl mb-3 text-white italic">What are your favorite recipes?</label>
          <input
            type="text"
            name="recipe"
            id="recipe"
            class="shadow-sm appearance-none border rounded w-full py-2 px-3 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter recipe name"
            max="255"
            v-model="name"
            @keyup.enter="saveRecipe"
          />
        </div>

        <!-- Autocomplete Recipe -->
        <!-- Disabling for now since the API data sucks. Need to find a new provider. -->
        <div id="autocomplete">
          <ul class="bg-white py-1" v-show="name.length > 0 && meals.length > 0">
            <li
              class="py-2 cursor-pointer hover:bg-gray-300 rounded overflow-hidden"
              v-for="meal in meals"
              :key="meal.id"
              @click="selectRecipe(meal)"
            >
              <span class="pl-3">
                {{ meal.title | startCase }}
              </span>
            </li>
          </ul>
        </div>

        <div class="flex items-center mt-6 justify-around">
          <router-link
            to="/recipes"
            class="block btn btn-sm border border-teal-400 text-white px-6 tracking-wider bg-teal-400 hover:bg-teal-800 hover:border-teal-600"
            >Done</router-link
          >
          <button
            class="btn bg-secondary-light border border-secondary text-gray-800 hover:bg-secondary hover:text-white"
            @click="saveRecipe"
          >
            Add recipe
          </button>
        </div>
      </div>

      <div class="mt-10 ">
        <RecipeList :recipes="recipes" />
      </div>
    </div>
  </default-layout>
</template>

<script>
  import RecipeService from "../services/RecipeService";
  import { Recipe } from "../models/Recipe";
  import SpoonacularApi  from "../providers/Recipes/Spoonacular";
  import { db } from "../providers/Fire";
  import { slice, debounce, startCase } from "lodash";

  export default {
    name: "create-recipe",
    data() {
      return {
        name: "",
        isNameDirty: false,
        recipes: [],
        meals: [],
        loading: true
      };
    },
    async mounted() {
      await this.$bind(
        "recipes",
        db
          .collection("recipe")
          .where("user_id", "==", window.user && window.user.id)
          .orderBy("created_at", "desc")
      );
    },
    methods: {
      async saveRecipe() {
        try {
          if (this.name === "") return;
          await RecipeService.createRecipe(new Recipe(this.name));
          this.name = "";
        } catch (error) {
          console.log(error);
        }
      },
      async getMealNames() {
        try {
          debounce(
            async () => {
              const results = await SpoonacularApi.autocomplete(this.name);
              if (results) {
                this.meals = results;
              } else {
                this.meals = [];
              }
              this.isNameDirty = false;
            },
            2000,
            {
              leading: false,
            }
          )();
        } catch (error) {
          console.log("Error occurred while fetching data:", error);
        }
      },
      selectRecipe(meal) {
        this.isNameDirty = true;
        this.meals = [];
        this.name = startCase(meal.title);
      }
    },
    filters: {
      startCase(input) {
        return startCase(input);
      }
    },
    watch: {
      async name(val) {
        if (this.isNameDirty == false) await this.getMealNames();
        this.isNameDirty = true;
      },
      recipes() {
        this.loading = false;
      }
    }
  };
</script>

<style scoped></style>
