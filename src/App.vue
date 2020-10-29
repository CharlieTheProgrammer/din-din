<template>
  <component :is="layout">
    <transition name="apparition" mode="out-in">
      <router-view :layout.sync="layout" />
    </transition>
  </component>
</template>

<script>
  export default {
    name: "App",
    data() {
      return {
        layout: "div"
      };
    }
  };
</script>

<style lang="css" scoped>
  .apparition-enter-active,
  .apparition-leave-active {
    transition-duration: 0.3s;
    transition-property: opacity;
    transition-timing-function: ease;
  }

  .apparition-enter,
  .apparition-leave-active {
    opacity: 0;
  }
</style>
