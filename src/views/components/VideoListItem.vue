<template>
  <div class="bg-gray-500 rounded-md mb-4 p-3 md:max-w-md lg:max-w-xs">
    <div class="bg-gray-500 mb-2 relative pt-40">
      <iframe
        class="absolute top-0 left-0 w-full h-full"
        :src="`https://www.youtube.com/embed/${video.id.videoId}`"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        v-show="true"
      ></iframe>
    </div>
    <h2 class="px-1">
      <!-- View Article: -->
      <span class="flex justify-items-center">
        <a class="hover:text-secondary" :href="video.article_url" target="_blank">{{ video.snippet.title }}</a>
        <div class="ml-2 self-start cursor-pointer">
          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
        </div>
      </span>
    </h2>
  </div>
</template>

<script>
  export default {
    name: "video-list-item",
    props: ["video"]
  };
</script>

<style lang="scss" scoped></style>
