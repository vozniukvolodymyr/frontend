<template>
  <router-view></router-view>
  <a class="btntopscroll button" ref="btnTopScroll" @click="topscrollclick">
        <span class="icon mt-1">
          <font-awesome-icon
            :icon="['fas', 'chevron-up']"
            size="2x"
            class="color-menu-w" /></span
      ></a>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { LANG_SETUP } from "@/store/actions/lang";
import store from "./store";
import { scrolltopshow, scrolltop } from "./_services/func.service";

export default defineComponent({
  name: "App",
  setup() {
    const btnTopScroll = ref<HTMLElement>();
    const name = localStorage.getItem("language");
    if (name) {
      store.dispatch(LANG_SETUP, name);
    } else {
      store.dispatch(LANG_SETUP, "RU");
    }
    return {btnTopScroll};
  },
  mounted() {
    window.addEventListener("scroll", this.topscroll, true);
  },
  unmounted() {
    window.removeEventListener("scroll", this.topscroll, true);
  },
  methods: {
    topscrollclick() {
      scrolltop();
    },
    topscroll() {
      scrolltopshow((this.btnTopScroll as any).style);
    },
  }
});
</script>
