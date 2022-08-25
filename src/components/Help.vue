<template>
  <section class="section">
    <h1 class="title has-text-white">{{ locale.header_help }}</h1>
    <div class="columns">
      <div v-for="(page, i) in pages" :key="i" class="column">
        <a @click="clickPage(page.page)" class="routerlink-f color-menu-f">
          {{ page.name }}</a
        >
      </div>
    </div>
    <div v-if="loading" class="loader"></div>
    <div v-if="videos" class="mt-2">
      <div v-for="(slide, i) in videos" :key="i">
        <p class="has-text-white mb-1">
          {{ slide.name }}
        </p>
        <video style="width: 100%; height: 500px m-0" controls>
          <source :src="getVideoUrl(slide)" type="video/webm" />
        </video>
      </div>
    </div>
    <div v-if="faqs" class="mt-2">
      <div class="block" v-for="(slide, i) in faqs" :key="i">
        <p class="color-menu-b mb-1">
          {{ slide.question }}
        </p>
        <div v-for="(txt, j) in slide.answer" :key="j">
          <p class="has-text-white py-2">
            {{ txt }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import store from "@/store";
import { defineComponent, ref } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "HelpComponent",
  computed: {
    ...mapGetters(["locale"]),
  },
  data() {
    const pages: Array<{
      name: string;
      page: string;
    }> = [];
    return {
      pages,
      videos: undefined,
      faqs: undefined,
      curpage: "",
      loading: false,
    };
  },
  created() {
    store
      .dispatch("gethelp", { lang: store.getters.glname })
      .then((res: any) => {
        if (res.data) {
          this.pages = res.data.pages;
        }
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });
  },
  methods: {
    getVideoUrl(slide: any) {
      return slide.src;
    },
    clickPage(page: any) {
      if (page !== this.curpage) {
        this.curpage = page;
        this.videos = undefined;
        this.faqs = undefined;
        this.loading = true;
        store
          .dispatch("gethelp", { lang: store.getters.glname, page: page })
          .then((res: any) => {
            if (res.data) {
              if (res.data.page === "faq") {
                this.faqs = res.data.videos;
              } else {
                this.videos = res.data.videos;
              }
            }
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          });
      }
    },
  },
});
</script>
