<template>
	<default-layout>
		<section class="flex-1 p-2">
			<p class="text-sm font-semibold text-gray-600 tracking-wide mt-6">Tired of Asking</p>
			<h2 class="text-2xl mt-2">'What's for Dinner This Week?'</h2>
			<p class="mt-2 font-semibold text-sm">Simply enter your favorite recipes and let fate decide.</p>

			<CreateRecipe />
		</section>
	</default-layout>
</template>

<script>

export default {
	name: 'dashboard',
};
</script>
