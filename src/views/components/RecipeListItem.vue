<template>
	<div>
		<div class="px-6 mt-4">
			<div class="bg-white border-2 border-teal-600 p-4 rounded-lg shadow-md hover:text-white hover:bg-teal-600">
				<!-- Recipe metadata: stuff like food genre like Italian, Mexican, French, whether it's new or not -->
				<div class="flex items-center justify-between">
					<span class="bg-teal-200 text-teal-700 text-xs px-3 py-1 rounded-full inline-block uppercase font-semibold tracking-wider" v-if="recipe.genre">
						{{ recipe.genre }}
					</span>
				</div>

				<div class="flex items-baseline">
					<h4 class="font-semibold text-xl leading-tight truncate mt-1 pr-4">
						<router-link :to="{ name: 'recipe', params: { id: recipe['.key'], recipe }}" :href="`/recipes/${recipe['.key']}`">
							{{ recipe.name }}
						</router-link>
					</h4>

					<!-- Feature not ready yet -->
					<img src="../../assets/img/photo-camera.svg" alt="Photo Camera Icon" class="h-4 w-4 cursor-pointer ml-auto" @click="showModal = true" v-if="false" />

					<!-- Red circle with x -->
					<div class="self-end ml-auto">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							class="h-6 w-6 ml-4 cursor-pointer text-red-600"
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
				</div>
			</div>
		</div>

		<!-- Modal used for camera -->
		<Modal v-if="showModal" @close="showModal = false">
			<template v-slot:header>
				<div class="">
					Take a Snap!
				</div>
			</template>
			<template v-slot:body>
				<Camera />
			</template>
			<template v-slot:footer>
				<div></div>
			</template>
		</Modal>
	</div>
</template>

<script>
import { Recipe } from '../../models/Recipe';

export default {
	name: 'RecipeListItem',
	props: {
		recipe: {
			type: Object,
			required: true,
			default: () => {}
		},
	},
	data() {
		return {
			showModal: false,
		};
	},
	methods: {
		async deleteRecipe(recipe) {
			try {
				await recipe.delete();
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>
