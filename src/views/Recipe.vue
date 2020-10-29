<template>
  <default-layout>
    <RecipeListItem :recipe="finalRecipe"></RecipeListItem>
  </default-layout>
</template>

<script>
  import { Recipe } from "../models/Recipe";

  export default {
    props: {
			recipe: {
				type: Object,
				required: false,
				default: () => null
			}
		},
		name: "Recipe",
		data() {
			return {
				finalRecipe: {}
			}
		},
    async mounted() {
			if (!this.recipe)
				this.finalRecipe = await Recipe.find('id', this.$route.params.id);
			else 
				this.finalRecipe = this.recipe
    }
  };
</script>
