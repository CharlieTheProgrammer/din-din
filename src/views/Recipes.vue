<template>
	<default-layout>
		<h1 class="text-2xl font-semibold text-center mt-6">My Recipes</h1>
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
	firebase: {
		recipes: db.ref('recipes'),
	}
};
</script>
