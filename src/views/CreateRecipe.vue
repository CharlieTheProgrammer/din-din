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
		<div class="flex flex-col items-center">
			<button class="px-4 py-3 bg-green-400 mt-4 rounded-lg text-white" @click="saveRecipe">Add recipe</button>
			<button class="px-4 py-3 border mt-4 rounded-lg text-gray-500 hover:border-blue-500 hover:bg-blue-500 hover:text-white" @click="saveRecipe">
				Generate Menu for the Week
			</button>
		</div>
		<hr class="my-5" />
		<div class="mt-10 ">
			<RecipeList :recipes="recipes" />
		</div>
	</div>
</template>

<script>
import { Recipe } from '../models/Recipe';
import { db } from '../providers/Fire';

export default {
	name: 'CreateRecipe',
	data() {
		return {
			name: '',
			showModal: false,
			recipes: [],
		};
	},
	firebase: {
		recipes: db.ref('recipes'),
	},
	methods: {
		getRecipes() {
			recipes = Recipe.get();
		},
		saveRecipe() {
			let recipe = new Recipe(this.name);
			// recipe.genre = 'Changed';
			// this.recipes.push(recipe);
			db.ref('recipes')
				.push(recipe)
				.then(() => {
					console.log('Saved!');
				})
				.catch((err) => {
					console.log(error);
				});
			this.name = '';
			console.log(this.recipes);
		},
	},
};
</script>

<style scoped></style>
