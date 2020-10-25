<template>
  <default-layout>
    <div class="mt-2 flex-1 flex flex-col p-2">
      <div>
        <h1 class="text-3xl font-semibold">Menu of the Week</h1>
      </div>

      <div class="flex flex-col mt-2 flex-1">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <p v-if="recipes" class="px-4 md:px-6 py-3 text-sm text-gray-500">
              Based on the {{ recipes.length }} recipes you currently have.
            </p>
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th
                      class="px-4 md:px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium uppercase tracking-wider"
                    >
                      Day
                    </th>
                    <th
                      class="px-4 md:px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium uppercase tracking-wider"
                    >
                      Dinner
                    </th>
                    <th class="px-4 md:px-6 py-3 bg-gray-50"></th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <template v-if="latestWeeklyMenu && latestWeeklyMenu.meals">
                    <tr
                      v-for="meal in latestWeeklyMenu.meals"
                      :key="meal.dayOfTheWeekId"
                      :class="{ 'opacity-50': meal.dayOfTheWeekId < todaysDayId - 1 }"
                    >
                      <td class="px-4 md:px-6 py-4 whitespace-no-wrap align-top">
                        <div class="flex items-center justify-start">
                          <div>
                            <div class="text-sm leading-5 font-medium text-gray-900">{{ meal.dayOfTheWeek }}:</div>
                            <div class="text-sm leading-5 text-gray-500">
                              <!-- jane.cooper@example.com -->
                            </div>
                          </div>
                        </div>
                      </td>
                      <!-- <td>
                        <autocomplete
                          :search="search"
                          :get-result-value="getResultValue"
                          @submit="handleSearchSubmit"
                        ></autocomplete>
                      </td> -->
                      <td class="px-4 md:px-6 py-4 md:whitespace-no-wrap">
                        <div class="text-sm leading-5 text-gray-900">
                          <div v-if="weeklyMenu.length > 0">
                            <router-link
                              :to="{
                                name: 'recipe',
                                params: {
                                  id: meal.recipe['.key'],
                                  recipe: meal.recipe
                                }
                              }"
                              >{{ meal.recipe.name | startCase }}</router-link
                            >
                          </div>
                        </div>
                        <!-- <div class="text-sm leading-5 text-gray-500">Some minor detail</div> -->
                      </td>

                      <td class="px-4 md:px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                        <!-- <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a> -->
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-between mt-4">
        <router-link :to="{ name: 'dashboard' }" class="btn btn-sm text-xs bg-teal-600 text-white">
          Add Recipes</router-link
        >
        <button type="button" class="btn btn-sm text-xs bg-teal-600 text-white" @click="getRandomMenu">
          Create a Random Menu
        </button>
      </div>
    </div>

    <!-- Modal used for when user has no recipes -->
    <Modal v-if="showModal" @close="showModal = false">
      <template v-slot:header>
        Oh oh!
      </template>
      <template v-slot:body>
        <p>Looks like you don't have any recipes yet. Please add new recipes before creating a menu.</p>
      </template>
      <template v-slot:footer>
        <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
          <button
            type="button"
            class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            @click="$router.push({ name: 'dashboard' })"
          >
            Add New Recipes
          </button>
        </span>
        <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
          <button
            type="button"
            class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            @click="showModal = false"
          >
            Cancel
          </button>
        </span>
      </template>
    </Modal>
  </default-layout>
</template>

<script>
  import { db } from "../../providers/Fire";
  import { Recipe } from "../../models/Recipe";
  import { WeeklyMenu } from "../../models/WeeklyMenu";
  import { DateTime } from "../../providers/DateTime";
  import startCase from "lodash/startCase";
  import filter from "lodash/filter";
  import indexOf from "lodash/indexOf";

  export default {
    name: "MenuOfTheWeek",
    data() {
      return {
        showModal: false,
        dayMap: [
          { 1: "Monday" },
          { 2: "Tuesday" },
          { 3: "Wednesday" },
          { 4: "Thursday" },
          { 5: "Friday" },
          { 6: "Saturday" },
          { 0: "Sunday" }
        ],
        dayNameLookupById: {
          0: "Sunday",
          1: "Monday",
          2: "Tuesday",
          3: "Wednesday",
          4: "Thursday",
          5: "Friday",
          6: "Saturday"
        },
        weeklyMenu: [{}],
        // weeklyMenu: [
        // 	{
        // 		dayOfTheWeekId: 1,
        // 		dayOfTheWeek: 'Monday',
        //		weekOfTheYear: // there should only be one weeklymenu per week of the the year. This is a pk.
        // 		recipe: {
        // 			name: 'Big Mac',
        // 			id: 'f983rh323d',
        // 		},
        // 	},
        // ],
        recipes: [],
        randomMenu: {}
      };
    },
    async mounted() {
      this.recipes = await Recipe.find();
      await this.$rtdbBind(
        "weeklyMenu",
        db
          .ref("weeklymenu")
          .orderByChild("user_id")
          .equalTo(window.user && window.user.id)
          .limitToLast(2)
      );
      this.areRecipesEmpty();
    },
    filters: {
      startCase(val) {
        return startCase(val);
      }
    },
    methods: {
      async saveWeeklyMenu(weeklyMenu) {
        try {
          await new WeeklyMenu(weeklyMenu).save();
        } catch (error) {
          console.log(error);
        }
      },
      getRandomMenu() {
        if (this.areRecipesEmpty()) return;
        // Get 7 recipes at random, or get all recipes and then randomize them.
        let recipes = [...this.recipes];

        const numberOfDaysInWeek = 7;
        let weeklyMenu = [];
        for (let index = 1; index < Math.min(numberOfDaysInWeek, this.recipes.length); index++) {
          let randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];

          // Do not show the same recipe twice!
          recipes = recipes.filter(recipe => recipe[".key"] !== randomRecipe[".key"]);

          weeklyMenu.push({
            dayOfTheWeekId: index,
            dayOfTheWeek: this.dayNameLookupById[index],
            recipe: randomRecipe
          });
        }

        this.saveWeeklyMenu(weeklyMenu);
      },
      areRecipesEmpty() {
        if (this.recipes.length === 0) {
          this.showModal = true;
          return true;
        }
        return false;
      },
      search(input) {
        return filter(this.recipes, recipe => recipe.name.includes(input));
        // return filter(this.latestWeeklyMenu.meals, meal => meal.recipe.name.includes(input));
      },
      getResultValue(result) {
        return result.name;
      },
      handleSearchSubmit(val) {
        console.log(val);
        // latestweeklymenu is a computed value so we have to get the latest weekly menu item split out the and splice in the new meal, then save.
        const dayOfTheWeekId = val.recipe.dayOfTheWeekId;
        let mealIndex = indexOf(this.latestWeeklyMenu.meals, { dayOfTheWeekId });
        console.log(mealIndex);
        // if (this.weeklyMenu.length > 0) {
        //   this.weeklyMenu[this.weeklyMenu.length - 1] = this.weeklyMenu[this.weeklyMenu.length - 1].splice() ;
        // }
      }
    },
    computed: {
      todaysDayId() {
        return new Date().getDay();
      },
      latestWeeklyMenu() {
        if (this.weeklyMenu.length > 0) return this.weeklyMenu[this.weeklyMenu.length - 1];
        return [];
      }
    }
  };
</script>

<style lang="scss" scoped></style>
