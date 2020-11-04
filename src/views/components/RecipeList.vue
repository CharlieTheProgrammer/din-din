<template>
  <div>
    <div id="recipe-card" v-for="recipe in recipes" :key="recipe['.key']">
      <RecipeListItem :recipe="recipe"></RecipeListItem>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecipeList",
    props: {
      recipes: Array
    }
  };
</script>
