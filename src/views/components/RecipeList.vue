<template>
	<div class="border-teal-300 block">
		<div id="recipe-card" v-for="(recipe, index) in recipes" :key="index">
			<div class="px-6 mt-4">
				<div class="bg-white p-6 rounded-lg shadow-lg">

					<!-- Recipe metadata: stuff like food genre like Italian, Mexican, French, whether it's new or not -->
					<div class="flex items-center justify-between">
						<span class="bg-teal-200 text-teal-700 text-xs px-3 py-1 rounded-full inline-block uppercase font-semibold tracking-wider" v-if="recipe.genre">
							{{ recipe.genre }}
						</span>
						<img src="../../assets/img/photo-camera.svg" alt="Photo Camera Icon" class="h-4 w-4 cursor-pointer ml-auto" @click="showModal = true" />
					</div>

					<h4 class="font-semibold text-xl leading-tight truncate mt-1">{{ recipe.name }}</h4>
					<!-- In the future we can also put more info, date last on menu -->
					<!-- <div>$1,900.00 <span class="text-gray-600 text-sm">/wk</span></div> -->
				</div>
			</div>

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
	</div>
</template>

<script>
export default {
	name: 'RecipeList',
	props: {
		recipes: Array,
	},
	data() {
		return {
			showModal: false,
		};
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
