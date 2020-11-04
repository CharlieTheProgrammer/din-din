<template>
  <default-layout :loading="loading">
    <div class="mt-2 flex-1 flex flex-col p-2">
      <div>
        <h1 class="text-3xl font-semibold italic">Menu of the Week</h1>
      </div>

      <div class="flex flex-col mt-2 flex-1">
        <div class="-my-2 overflow-x-auto">
          <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <p v-if="recipes" class="px-4 md:px-6 py-3 text-sm text-gray-500">
              Based on the {{ recipes.length }} recipes you currently have.
            </p>
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th
                      class="px-4 md:px-6 py-3 bg-white text-left text-xs leading-4 font-medium uppercase tracking-wider"
                    >
                      Day
                    </th>
                    <th
                      class="px-4 md:px-6 py-3 bg-white text-left text-xs leading-4 font-medium uppercase tracking-wider"
                    >
                      Dinner
                    </th>
                    <th class="px-4 md:px-6 py-3 bg-white"></th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <template v-if="weeklyMenu.items && weeklyMenu.items.length > 0">
                    <tr
                      v-for="(weeklyMenuItem, index) in weeklyMenu.items"
                      :key="weeklyMenuItem.dayOfTheWeekId"
                      :class="{ 'opacity-50': index < todaysDayId - 1 }"
                    >
                      <td class="px-4 md:px-6 py-4 whitespace-no-wrap align-top">
                        <div class="flex items-center justify-start">
                          <div>
                            <div class="text-sm leading-5 font-medium text-gray-900">
                              {{ weeklyMenuItem.dayOfTheWeek }}:
                            </div>
                            <div class="text-sm leading-5 text-gray-500">
                              <!-- jane.cooper@example.com -->
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        class="px-4 md:px-6 md:whitespace-no-wrap"
                        v-if="editableMap[index] || Object.keys(weeklyMenuItem.recipe).length === 0"
                      >
                        <select
                          id="meal"
                          class="mt-1 block form-select w-full py-2 px-02 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                          v-model="weeklyMenuItem.recipe"
                          @input="$set(editableMap, index, false)"
                        >
                          <option :value="{}"></option>
                          <option
                            v-for="recipe in recipes"
                            :key="`${recipe.name}-index`"
                            :value="recipe"
                            class="py-0"
                            >{{ recipe.name }}</option
                          >
                        </select>
                      </td>
                      <td class="px-4 md:px-6 py-4 md:whitespace-no-wrap" v-else>
                        <div class="text-sm leading-5 text-teal-500">
                          <div v-if="weeklyMenuItem.recipe">
                            <router-link
                              :to="{
                                name: 'recipe',
                                params: {
                                  id: weeklyMenuItem.recipe['.key'],
                                  recipe: weeklyMenuItem.recipe
                                }
                              }"
                              >{{ weeklyMenuItem.recipe.name | startCase }}</router-link
                            >
                          </div>
                        </div>
                        <!-- <div class="text-sm leading-5 text-gray-500">Some minor detail</div> -->
                      </td>

                      <td class="px-4 md:px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                        <a
                          href="#"
                          class="text-indigo-600 hover:text-indigo-900"
                          @click="$set(editableMap, index, !editableMap[index])"
                          >Edit</a
                        >
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
        <router-link :to="{ name: 'create-recipe' }" class="btn btn-sm text-xs bg-teal-600 text-white px-8">
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
          <!-- <button
            type="button"
            class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            @click="showModal = false"
          >
            Cancel
          </button> -->
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

  export default {
    name: "MenuOfTheWeek",
    data() {
      return {
        showModal: false,
        dayNameLookupById: {
          0: "Sunday",
          1: "Monday",
          2: "Tuesday",
          3: "Wednesday",
          4: "Thursday",
          5: "Friday",
          6: "Saturday"
        },
        weeklyMenuItemsTemplate: [
          {
            dayOfTheWeekId: 1,
            dayOfTheWeek: "Monday",
            weekOfTheYear: 0,
            recipe: {}
          },
          {
            dayOfTheWeekId: 2,
            dayOfTheWeek: "Tuesday",
            weekOfTheYear: 0,
            recipe: {}
          },
          {
            dayOfTheWeekId: 3,
            dayOfTheWeek: "Wednesday",
            weekOfTheYear: 0,
            recipe: {}
          },
          {
            dayOfTheWeekId: 4,
            dayOfTheWeek: "Thursday",
            weekOfTheYear: 0,
            recipe: {}
          },
          {
            dayOfTheWeekId: 5,
            dayOfTheWeek: "Friday",
            weekOfTheYear: 0,
            recipe: {}
          },
          {
            dayOfTheWeekId: 6,
            dayOfTheWeek: "Saturday",
            weekOfTheYear: 0,
            recipe: {}
          },
          {
            dayOfTheWeekId: 0,
            dayOfTheWeek: "Sunday",
            weekOfTheYear: 0,
            recipe: {}
          }
        ],
        weeklyMenu: {
          user_id: null,
          items: [],
          weekOfTheYear: null,
          created_at: null
        },
        recipes: [],
        editableMap: [false, false, false, false, false, false, false],
        weeklyMenus: [],
        loading: true
      };
    },
    async created() {
      await this.$bind("recipes", db.collection("recipe").where("user_id", "==", window.user && window.user.id));
      await this.$bind(
        "weeklyMenus",
        db
          .collection("weeklymenu")
          .where("user_id", "==", window.user && window.user.id)
          .orderBy("created_at", "desc")
      );

      if (this.weeklyMenus.length === 0 || DateTime().week() > this.latestWeeklyMenu.weekOfTheYear) {
        console.log("No menus found, creating a new one");
        let weeklyMenu = new WeeklyMenu({ items: [...this.weeklyMenuItemsTemplate] });
        await weeklyMenu.save();
        this.weeklyMenu = this.latestWeeklyMenu;
      } else {
        console.log("Weekly menus found, selecting last one");
        this.weeklyMenu = this.latestWeeklyMenu;
      }
      this.loading = false;
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
          if (weeklyMenu[".key"]) {
            await db
              .collection("weeklymenu")
              .doc(weeklyMenu[".key"])
              .set(db.serialize(weeklyMenu));
          } else {
            const menu = new WeeklyMenu({ items: weeklyMenu });
            await db.collection("weeklymenu").add(db.serialize(menu));
            this.weeklyMenu = this.latestWeeklyMenu;
          }
        } catch (error) {
          console.log(error);
        }
      },
      getRandomMenu() {
        if (this.areRecipesEmpty()) return;
        // Get 7 recipes at random, or get all recipes and then randomize them.
        let recipes = [...this.recipes];

        const numberOfDaysInWeek = 7;
        for (let index = 0; index < Math.min(numberOfDaysInWeek, this.recipes.length); index++) {
          const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];

          // Do not show the same recipe twice!
          recipes = recipes.filter(recipe => recipe[".key"] !== randomRecipe[".key"]);

          // Adjusting for the fact that Sunday is day 0, but I want week to start on Monday.
          if (index == 6)
            this.$set(this.weeklyMenu.items, 6, {
              dayOfTheWeekId: 0,
              dayOfTheWeek: this.dayNameLookupById[0],
              recipe: randomRecipe
            });
          else
            this.$set(this.weeklyMenu.items, index, {
              dayOfTheWeekId: index + 1,
              dayOfTheWeek: this.dayNameLookupById[index + 1],
              recipe: randomRecipe
            });
        }

        this.saveWeeklyMenu(this.weeklyMenu);
      },
      areRecipesEmpty() {
        if (this.recipes.length === 0) {
          this.showModal = true;
          return true;
        }
        return false;
      }
    },
    computed: {
      todaysDayId() {
        return new Date().getDay();
      },
      latestWeeklyMenu() {
        if (this.weeklyMenus.length > 0) {
          // weeklyMenus are sorted by created_at desc.
          this.weeklyMenu = this.weeklyMenus[0];
          return this.weeklyMenus[0];
        }
        return [];
      }
    },
    watch: {
      weeklyMenu: {
        handler: async function(menu) {
          if (menu && menu[".key"]) {
            await db
              .collection("weeklymenu")
              .doc(menu[".key"])
              .set(db.serialize(menu));
          }
        },
        immediate: false,
        deep: true
      }
    }
  };
</script>

<style lang="scss" scoped></style>
