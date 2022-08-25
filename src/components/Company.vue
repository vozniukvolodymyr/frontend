<template>
  <section class="section">
    <div class="columns is-mobile is-multiline is-centered mb-0">
      <div class="column is-narrow">
        <div
          class="is-size-4 routerlink-f has-text-weight-bold"
          ref="aboutcompany"
          @click="aboutclick"
        >
          {{ locale.about_title }}
        </div>
      </div>
      <div class="column is-narrow">
        <div
          class="is-size-4 routerlink-f has-text-weight-bold"
          ref="aboutmedia"
          @click="aboutclick"
        >
          {{ locale.about_media }}
        </div>
      </div>
    </div>
    <div ref="tababoutcompany" class="container">
      <div class="columns">
        <div class="column">
          <app-about-ru v-if="glname === 'RU'"></app-about-ru>
          <app-about-en v-if="glname === 'EN'"></app-about-en>
        </div>
      </div>
    </div>
    <div ref="tababoutmedia" class="container">
      <div v-if="loading" class="loader"></div>
      <div class="level-item">
        <div v-for="(media, i) in medias" :key="i">
          <a
            @click="clickMediaYear(media.year)"
            class="routerlink-f color-menu-f is-size-4"
            v-bind:class="{ 'ml-2 sep': i > 0 }"
          >
            {{ media.year }}</a
          >
        </div>
      </div>
      <div
        class="cb-fullscreen color-back-button has-text-centered"
        style="height: 50px"
      >
        <h1 class="color-menu-w abscentered has-text-weight-bold is-size-5">
          {{ locale.about_media }}
        </h1>
      </div>
      <div
        v-for="(media, i) in medias"
        :key="i"
        v-bind:id="`year-${media.year}`"
      >
        <p class="color-menu-f is-size-2">
          {{ media.year }}
        </p>
        <div class="columns">
          <div v-for="(day, j) in media.media" :key="j" class="column">
            <p class="has-text-white">
              {{ day.date }}
            </p>
            <a
              @click="clickMediaDay(day.date)"
              class="routerlink-f color-menu-f"
            >
              {{ day.name }}</a
            >
          </div>
        </div>
      </div>
      <div v-if="images || videos" class="mt-2">
        <div v-for="(slide, i) in videos" :key="i">
          <video style="width: 100%; height: 500px" controls>
            <source :src="getVideoUrl(slide)" type="video/webm" />
          </video>
        </div>
        <app-carousel v-bind:slides="images"> </app-carousel>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, ref } from "vue";
import { mapGetters } from "vuex";
import CarouselComponent from "../helpers/Carousel.vue";
import { media } from "../_services/rest.data";
const AboutRuComponent = defineAsyncComponent(() => import('./About/ru.vue'));
const AboutEnComponent = defineAsyncComponent(() => import('./About/en.vue'));

export default defineComponent({
  name: "CompanyComponent",
  components: {
    "app-about-ru": AboutRuComponent,
    "app-about-en": AboutEnComponent,
    "app-carousel": CarouselComponent },
  computed: {
    ...mapGetters(["locale", "glname"]),
  },
  data() {
    const medias: Array<{
      year: string;
      media: [{ date: string; name: string }];
    }> = [];
    return {
      videos: undefined,
      images: undefined,
      curdate: "",
      medias,
      loading: false,
    };
  },
  created() {
    this.loading = true;
    media()
      .then((res: any) => {
        this.medias = res.data.medias;
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });
  },
  setup() {
    const aboutcompany = ref<HTMLElement>();
    const aboutmedia = ref<HTMLElement>();
    const tababoutcompany = ref<HTMLElement>();
    const tababoutmedia = ref<HTMLElement>();
    return {
      aboutcompany,
      aboutmedia,
      tababoutcompany,
      tababoutmedia,
      imgcareer: require(`../assets/images/styles/background_mobile_medium/medias/career_MYTCO_10.jpg`),
    };
  },
  mounted() {
    this.aboutvisible("block", "none");
    this.aboutactive(this.aboutcompany);
  },
  methods: {
    getVideoUrl(slide: any) {
      return slide.src;
    },
    clickMediaYear(year: any) {
      let elmnt = document.getElementById("year-" + year);
      elmnt?.scrollIntoView({ block: "center", behavior: "smooth" });
    },
    clickMediaDay(day: any) {
      if (day !== this.curdate) {
        this.curdate = day;
        this.videos = undefined;
        this.images = undefined;
        media({ date: day })
          .then((res: any) => {
            if (this.curdate === res.data.date) {
              this.images = res.data.images;
              this.videos = res.data.videos;
            }
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          });
      }
    },
    aboutvisible(tababoutcompany: string, tababoutmedia: string): any {
      (this.tababoutcompany as HTMLElement).style.display = tababoutcompany;
      (this.tababoutmedia as HTMLElement).style.display = tababoutmedia;
    },
    aboutactive(target: any): any {
      let el: HTMLElement;
      if (this.aboutcompany === target) {
        el = this.aboutmedia as HTMLElement;
        if (el.className.indexOf("has-text-white") === -1) {
          el.className += " color-menu-f";
        } else {
          el.className = el.className.replace("has-text-white", "color-menu-f");
        }
      } else {
        el = this.aboutcompany as HTMLElement;
        if (el.className.indexOf("has-text-white") === -1) {
          el.className += " color-menu-f";
        } else {
          el.className = el.className.replace("has-text-white", "color-menu-f");
        }
      }
      if (target.className.indexOf("color-menu-f") === -1) {
        target.className += " has-text-white";
      } else {
        target.className = target.className.replace(
          "color-menu-f",
          "has-text-white"
        );
      }
    },
    aboutclick(event: any): any {
      if (event.currentTarget === this.aboutcompany) {
        if (event.currentTarget.className.indexOf("has-text-white") === -1) {
          this.aboutvisible("block", "none");
          this.aboutactive(this.aboutcompany);
        }
      } else if (event.currentTarget === this.aboutmedia) {
        if (event.currentTarget.className.indexOf("has-text-white") === -1) {
          this.aboutvisible("none", "block");
          this.aboutactive(this.aboutmedia);
        }
      }
    },
  },
});
</script>
<style scoped>
</style>

