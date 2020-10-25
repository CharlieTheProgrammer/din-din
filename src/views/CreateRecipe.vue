<template>
	<div>
		<div class="rounded-xl shadow-xl p-4 mt-6 bg-primary-light">
			<div id="field-wrapper" class="mt-6">
				<label for="recipe" class="block text-2xl mb-2 text-gray-800">What are your favorite recipes?</label>
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
			<div id="autocomplete">
				<ul class="bg-white py-1" v-show="name.length > 0 && meals.length > 0">
					<li class="py-2 cursor-pointer hover:bg-gray-300 rounded overflow-hidden" v-for="meal in meals" :key="meal.idMeal" @click="selectRecipe(meal)">
						<span class="pl-3">
							{{ meal.strMeal }}
						</span>
					</li>
				</ul>
			</div>

			<div class="flex items-center mt-4 justify-around">
				<button class="btn bg-secondary text-white" @click="saveRecipe">Add recipe</button>
				<router-link
					to="/recipes"
					class="block px-4 py-3 rounded-lg border text-primary border-secondary-light bg-secondary-light hover:border-primary hover:bg-primary-light hover:text-primary"
					>Done Adding Recipes</router-link
				>
			</div>
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
	async mounted() {
		await this.$rtdbBind(
			'recipes',
			db
				.ref('recipe')
				.orderByChild('user_id')
				.equalTo(window.user && window.user.id)
		);
	},
	methods: {
		async saveRecipe() {
			try {
				new Recipe(this.name).save();
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
