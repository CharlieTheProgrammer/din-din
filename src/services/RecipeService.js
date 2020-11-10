import { db, auth } from "../providers/Fire";
// I could import recipe and then do new Recipe() in createRecipe.
// However, Delaney advises simply leaving unfilled properties missing.
// When searching on Firebase, this will be equivalent to false. Additionally, this
// saves data.

const modelName = "recipe";

const RecipeService = {
  createRecipe: async recipe => {
    const user = await auth.currentUser;
    return db.collection(modelName).add({
      ...recipe,
      uid: user.uid
    });
  },

  getRecipeById: async recipe_id => {
    const doc = await db
      .collection(modelName)
      .doc(recipe_id)
      .get();
    return doc.exists ? doc.data() : false;
  },

  updateRecipe: async (recipe, recipe_id) => {
    return db
      .collection(modelName)
      .doc(recipe_id)
      .set(recipe);
  },

  deleteRecipe: async recipe_id => {
    return db
      .collection(modelName)
      .doc(recipe_id)
      .delete();
  }
};

export default RecipeService;
