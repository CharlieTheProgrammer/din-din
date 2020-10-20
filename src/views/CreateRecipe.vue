<template>
	<div>
		<div id="field-wrapper" class="mt-6">
			<label for="recipe" class="block text-sm mb-2 text-gray-800">What are your favorite recipes?</label>
			<input
				type="text"
				name="recipe"
				id="recipe"
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				placeholder="Enter recipe name"
				max="255"
				v-model="name"
				@keyup.enter="saveRecipe"
			/>
		</div>

		<!-- Autocomplete Recipe -->
		<div id="autocomplete">
			<ul class="bg-white py-1" v-show="name.length > 0 && meals.length > 0">
				<li class="py-2 cursor-pointer hover:bg-gray-300 rounded overflow-hidden" v-for="meal in meals" :key="meal.idMeal" @click="selectRecipe(meal)">
					<span class="pl-3">
						{{ meal.strMeal }}
					</span>
				</li>
			</ul>
		</div>

		<div class="flex flex-col items-center">
			<button class="px-4 py-3 bg-green-400 mt-4 rounded-lg text-white" @click="saveRecipe">Add recipe</button>
			<router-link to="/recipes" class="block px-4 py-3 mt-8 rounded-lg bg-blue-400 border border-blue-400 opacity-75 text-white hover:border-blue-500 hover:bg-blue-500 hover:text-white">Done Adding Recipes</router-link>
		</div>

		<div class="mt-10 ">
			<RecipeList :recipes="recipes" />
		</div>
	</div>
</template>

<script>
import { Recipe } from '../models/Recipe';
import { db } from '../providers/Fire';
import axios from '../providers/Http';
import { slice, debounce } from 'lodash';

export default {
	name: 'CreateRecipe',
	data() {
		return {
			name: '',
			isNameDirty: false,
			recipes: [],
			meals: [],
		};
	},
	firebase: {
		recipes: db.ref('recipes'),
	},
	methods: {
		getRecipes() {
			recipes = Recipe.get();
		},
		async saveRecipe() {
			try {
				let recipe = await Recipe.create(this.name);
				this.name = '';
			} catch (error) {
				console.log(error);
			}
		},
		async getMealNames(name) {
			try {
				debounce(
					async () => {
						const results = await axios.get('/search.php', {
							params: {
								s: name,
							},
						});
						if (results) {
							this.meals = slice(results.data.meals, 0, 11);
						} else {
							this.meals = [];
						}
						this.isNameDirty = false;
					},
					1000,
					{
						leading: false,
					}
				)();
			} catch (error) {
				console.log('Error occurred while fetching data:', error);
			}
		},
		selectRecipe(meal) {
			this.isNameDirty = true;
			this.meals = [];
			this.name = meal.strMeal;
		},
	},
	watch: {
		async name(val) {
			if (this.isNameDirty == false) await this.getMealNames(val);
			this.isNameDirty = true;
		},
	},
};
</script>

<style scoped></style>
