<template>
	<default-layout>
		<section class="flex-1">
			<p class="text-sm font-semibold text-gray-500 tracking-wide mt-6">Tired of Asking</p>
			<h2 class="text-2xl mt-2">'What's for Dinner This Week?'</h2>
			<p class="mt-2 font-semibold text-sm">Simply enter your favorite recipes and let fate decide.</p>

			<CreateRecipe />

			<hr class="my-8" />

			<div class="flex items-center justify-center mb-6">
				<button class="border border-green-500 px-4 py-3 bg-blue-500 text-white rounded-lg">View Recipes</button>
			</div>
		</section>
	</default-layout>
</template>

<script>
export default {
	name: 'dashboard',
};
</script>
