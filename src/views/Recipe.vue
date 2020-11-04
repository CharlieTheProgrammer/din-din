<template>
  <default-layout :loading="loading">
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
        finalRecipe: {},
        loading: false
      };
    },
    async mounted() {
      if (!this.recipe) {
        this.loading = true;
        this.finalRecipe = await Recipe.where("id", "==", this.$route.params.id);
        this.loading = false;
      } else this.finalRecipe = this.recipe;
    }
  };
</script>
