<template>
	<default-layout>
		<h1 class="text-2xl font-semibold italic text-center mt-6">My Recipes</h1>
		<div class="mt-6" v-for="recipe in recipes" :key="recipe['.key']">
			<RecipeListItem :recipe="recipe"></RecipeListItem>
		</div>
	</default-layout>
</template>

<script>
import { db } from '../providers/Fire';

export default {
	name: 'Recipes',
	data() {
		return {
			recipes: [],
			loading: true,
		};
	},
	async created() {
		let recipes = await this.$rtdbBind(
			'recipes',
			db
				.ref('recipe')
				.orderByChild('user_id')
				.equalTo(window.user && window.user.id)
		);
	},
};
</script>
