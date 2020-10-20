<template>
	<div class="border-teal-300 block">
		<div id="recipe-card" v-for="recipe in recipes" :key="recipe['.key']">
			<RecipeListItem :recipe="recipe"></RecipeListItem>
		</div>
	</div>
</template>

<script>

export default {
	name: 'RecipeList',
	props: {
		recipes: Array,
	}
};
</script>
