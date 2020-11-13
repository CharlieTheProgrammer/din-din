<template>
  <div>
    <div class="px-6 mt-4">
      <div
        class="bg-white border-2 border-teal-600 p-4 rounded-lg shadow-md hover:text-white hover:bg-teal-600"
        :class="{ 'bg-teal-600': showEditor, 'text-white': showEditor }"
      >
        <!-- Recipe metadata: stuff like food genre like Italian, Mexican, French, whether it's new or not -->
        <div class="flex items-center justify-between">
          <span
            class="bg-teal-200 text-teal-700 text-xs px-3 py-1 rounded-full inline-block uppercase font-semibold tracking-wider"
            v-if="recipe.genre"
          >
            {{ recipe.genre }}
          </span>
        </div>

        <div class="flex items-baseline">
          <h4 class="font-semibold text-xl leading-tight truncate mt-1 pr-4">
            <router-link
              :to="{ name: 'recipe', params: { id: recipe['.key'], recipe } }"
              :href="`/recipes/${recipe['.key']}`"
            >
              {{ recipe.name }}
            </router-link>
          </h4>

          <!-- Feature not ready yet -->
          <img
            src="../../assets/img/photo-camera.svg"
            alt="Photo Camera Icon"
            class="h-4 w-4 cursor-pointer ml-auto"
            @click="showModal = true"
            v-if="false"
          />

          <!-- Red circle with x -->
          <div class="self-end ml-auto" v-if="!showEditor">
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
          <div class="self-end ml-auto" v-else>
            <router-link :to="{ name: 'recipes' }">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="h-6 w-6 ml-4 cursor-pointer text-secondary"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
                  clip-rule="evenodd"
                />
              </svg>
            </router-link>
          </div>
        </div>

        <div class="mt-4" v-if="showEditor">
          <span class="text-red-500 text-xs" v-show="length_error">Note is too long.</span>
          <div class="mt-2">
            <tiny-editor
              :id="`tiny-editor-${recipe['.key']}`"
              :init="editor_config"
              type="text"
              api-key="wd2sk0yf3fbbvavk1rinphfikvlv1ubesrnyv4q0u153nl4z"
              v-model="internal_recipe.note"
            />
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
  import RecipeService from "../../services/RecipeService";
  import tinymce from "vue-tinymce-editor";
  import Editor from "@tinymce/tinymce-vue";
  import debounce from "lodash/debounce";

  export default {
    name: "RecipeListItem",
    components: {
      editor: tinymce,
      "tiny-editor": Editor
    },
    props: {
      recipe: {
        type: Object,
        required: true,
        default: () => {}
      },
      showEditor: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        showModal: false,
        note: "",
        options: {
          toolbar: "",
          toolbar1: "",
          toolbar2: ""
        },
        internal_recipe: {},
        editor_config: {
          height: 250,
          menubar: false,
          plugins: ["advlist autolink lists link"],
          toolbar:
            "undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat"
        },
        isNoteDirty: false,
        length_error: false,
        MAX_LENGTH: 500
      };
    },
    methods: {
      async deleteRecipe(recipe) {
        try {
          await RecipeService.deleteRecipe(recipe[".key"]);
        } catch (error) {
          console.log(error);
        }
      },
      async saveRecipe() {
        try {
          debounce(
            async () => {
              const results = await RecipeService.updateRecipe(this.internal_recipe, this.recipe[".key"]);
              this.isNoteDirty = false;
            },
            1000,
            {
              leading: false
            }
          )();
        } catch (error) {
          console.log(error);
        }
      },
      isLengthValid(input) {
        if (input.length > this.MAX_LENGTH) return false;
        return true;
      }
    },
    watch: {
      async "internal_recipe.note"(val) {
        if (val.length === 0) return;

        if (!this.isLengthValid(this.internal_recipe.note)) {
          this.length_error = true;
          return;
        }

        this.length_error = false;
        if (this.isNoteDirty == false) await this.saveRecipe();
        this.isNoteDirty = true;
      },
      recipe(val) {
        this.internal_recipe = val;
      }
    }
  };
</script>
