<template>
  <default-layout :loading="loading">
    <RecipeListItem :recipe="finalRecipe" :showEditor="true"></RecipeListItem>
  </default-layout>
</template>

<script>
  import { db } from "../providers/Fire";
  import { Recipe } from "../models/Recipe";
  import isEmpty from "lodash/isEmpty";

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
      if (isEmpty(this.recipe)) {
        this.loading = true;
        await this.$bind('finalRecipe', db.collection('recipe').doc(this.$route.params.id));
        this.loading = false;
      } else this.finalRecipe = this.recipe;
    }
  };
</script>
