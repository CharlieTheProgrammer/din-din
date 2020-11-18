const _axios = require("axios").default;

// Configure axios here
let axios = _axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3"
});

// Adding apiKey to all requests since this API couldn't have bothered to
// allow this to be in the header like 99% of everyone else.
axios.interceptors.request.use(
  function(config) {
    config.params = {
      ...config.params,
      part: "snippet",
      key: process.env.VUE_APP_YOUTUBE_API_KEY,
      videoEmbeddable: true,
      type: "video", // this is required if videoEmbeddable is included in request
      channelId: "UC4tAgeVdaNB5vD_mBoxg50w" // all recipes.com channel
    };
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

const YoutubeApi = {
  search: async input => {
    return await axios
      .get("/search", {
        params: {
          q: input,
          maxResults: 10
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

export default YoutubeApi;
