<template>
	<default-layout :loading="loading">
		<div class="mt-2 flex-1 flex flex-col p-2">
			<h1 class="text-2xl font-semibold italic ml-4">My Recipes</h1>
			<div class="mt-2" v-for="recipe in recipes" :key="recipe['.key']">
				<RecipeListItem :recipe="recipe"></RecipeListItem>
			</div>
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
		await this.$rtdbBind(
			'recipes',
			db
				.ref('recipe')
				.orderByChild('user_id')
				.equalTo(window.user && window.user.id)
		);
		this.loading = false;
	},
};
</script>
