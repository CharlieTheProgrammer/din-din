const axios = require("axios").default;

// Configure axios here
axios.defaults.baseURL = "https://api.spoonacular.com";

// Adding apiKey to all requests since this API couldn't have bothered to
// allow this to be in the header like 99% of everyone else.
axios.interceptors.request.use(
  function(config) {
    config.params = {
      ...config.params,
      apiKey: process.env.VUE_APP_SPOONACULAR_API_KEY
    };
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

const SpoonacularApi = {
  autocomplete: async input => {
    return await axios
      .get("/recipes/autocomplete", {
        params: {
          query: input
        }
      })
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
        console.log(error);
        return error;
      });
  }
};

export default SpoonacularApi;
