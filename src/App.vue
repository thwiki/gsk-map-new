<template>
  <div id="app">
    <gsk-loading v-if="loading" />
    <gsk-map></gsk-map>
  </div>
</template>
<script>
import gskLoading from "./components/Loading.vue";
import gskMap from "./components/Map.vue";
export default {
  name: "app-map",
  components: {
    gskLoading,
    gskMap,
  },
  data() {
    return {
      loading: true,
      background: new Image(),
      logo: new Image(),
      bgm: new Audio(),
      mapList: [],
    };
  },
  created() {},
  methods: {
    loadResources(background, logo, bgm, mapList) {
      if (background) {
        this.background = background;
      }
      if (logo) {
        this.logo = logo;
      }
      if (bgm) {
        this.bgm = bgm;
      }
      if (mapList) {
        this.mapList = mapList;
      }
      this.loading = false;
    },
  },
};
</script>
<style></style>
