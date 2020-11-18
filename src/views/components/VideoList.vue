<template>
  <transition name="apparition" mode="out-in">
    <div id="video_list" v-show="showVideos" class="flex flex-wrap mt-2">
      <video-list-item
        class="w-full md:w-1/2 lg:w-1/4"
        v-for="video in videoList"
        :key="video.id.videoId"
        :video="video"
      ></video-list-item>
    </div>
  </transition>
</template>

<script>
  // This will be a smart component that fetches Youtube videos by recipe name.
  import YoutubeApi from "../../providers/Youtube";
  import VideoListItem from "./VideoListItem.vue";
  import take from "lodash/take";

  export default {
    components: { VideoListItem },
    name: "video-list",
    props: ["recipeName", "showVideos"],
    data() {
      return {
        videoList: [],
        MAX_VIDEO_RESULTS: 6
      };
    },
    methods: {
      async getYoutubeVideoList() {
        const data = await YoutubeApi.search(this.recipeName);
        // This could go in a helper, but leaving it here for now.
        const urlExtractor = str => {
          const urlDetector = RegExp(
            /(http|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/
          );
          let urlStartIndex = str.lastIndexOf("http");
          if (urlStartIndex < 0) return false;
          const url = str.slice(urlStartIndex, str.indexOf(" ", urlStartIndex));
          return urlDetector.test(url) ? url : false;
        };

        this.videoList = take(
          data.items
            .filter(item => {
              return urlExtractor(item.snippet.description);
            })
            .map(item => {
              item.article_url = urlExtractor(item.snippet.description);
              return item;
            }),
          this.MAX_VIDEO_RESULTS
        );
      }
    },
    watch: {
      recipeName(val) {
        this.getYoutubeVideoList(val);
      }
    }
  };
</script>

<style lang="scss" scoped></style>
