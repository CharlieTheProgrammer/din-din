<template>
	<default-layout>
		<div id="recipe-card">
			<div class="px-6 mt-4">
				<div class="bg-white p-6 rounded-lg shadow-lg">
					<!-- Recipe metadata: stuff like food genre like Italian, Mexican, French, whether it's new or not -->
					<div class="flex items-center justify-between">
						<span class="bg-teal-200 text-teal-700 text-xs px-3 py-1 rounded-full inline-block uppercase font-semibold tracking-wider" v-if="false">
							Tag
						</span>
						<img src="../assets/img/photo-camera.svg" alt="Photo Camera Icon" class="h-4 w-4 cursor-pointer ml-auto" v-if="false"/>

						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							class="h-6 w-6 ml-4 cursor-pointer text-red-600 ml-auto"
							title="Delete Recipe"
							@click="deleteRecipe(recipe)"
						>
							<path
								fill-rule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
								clip-rule="evenodd"
							/>
						</svg>
					</div>

					<h4 class="font-semibold text-xl leading-tight truncate mt-1">
						{{ recipe.name }}
					</h4>

					<p class="text-gray-700 mt-2">
						Recipe Description. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis saepe vero quos recusandae quam quod necessitatibus maxime aliquid sunt est at
						cum eligendi nihil dolore, distinctio sit? Amet, voluptatem expedita.
					</p>
				</div>
			</div>
		</div>
	</default-layout>
</template>

<script>
export default {
	props: ['recipe'],
	name: 'Recipe',
};
</script>
