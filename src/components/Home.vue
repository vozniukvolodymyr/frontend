<template>
  <app-alert></app-alert>  
  <section class="hero">
    <div ref="menuMobile" class="hero-head sticky has-background-white">
      <nav class="level is-hidden-mobile mb-0 p-1 color-back-menu">
        <div class="level-left">
          <div class="level-item">
            <router-link to="/" class="routerlink-f color-menu-f has-text-weight-bold"
              >{{ locale.mainm_home }}
            </router-link>
          </div>
          <div class="level-item">
            <router-link to="/company" class="routerlink-f color-menu-f has-text-weight-bold"
              >{{ locale.mainm_about }}
            </router-link>
          </div>
          <div class="level-item">
            <router-link to="/support" class="routerlink-f color-menu-f has-text-weight-bold"
              >{{ locale.mainm_support }}
            </router-link>
          </div>
        </div>
      </nav>
      <div class="is-flex is-flex-wrap-wrap">
        <div class="level-item mb-0 is-flex-shrink-1" style="margin-right: auto">
          <figure class="image is-48x48">
            <img :src="imglogo" alt="Logo" />
          </figure>
          <h1 class="title is-4 mx-2">{{ companyname }}</h1>
        </div>
        <div class="level-item pl-1">
          <router-link to="/login" class="routerlink-w color-menu-w has-text-weight-bold"
            >{{ locale.log_log }}
          </router-link>
          <app-language  :innerTitleClass="'color-menu-w'" />
          <div class="navbar-brand is-hidden-desktop is-hidden-tablet" style="min-height: auto">
            <span
              ref="btnHomeBurger"
              class="navbar-burger size-2-5"                            
              @click="clickHomeMobile($event)"
            >
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <app-slide
      @handlerOpen="menuHomeOpen"
      @handlerClose="menuHomeClose"
      :btnBurger="btnHomeBurger"
      @closeMenu="closeHomeBurger"
      :top="topMobile"
      :classMobile="classMobile"
    >
      <aside class="menu">
        <ul class="menu-mobile">
          <li>
            <router-link to="/">{{ locale.mainm_home }} </router-link>
          </li>
          <li>
            <router-link to="/company">{{ locale.mainm_about }} </router-link>
          </li>
          <li>
            <router-link to="/support">{{ locale.mainm_support }} </router-link>
          </li>
        </ul>
      </aside>
    </app-slide>
    <router-view></router-view>
    <div class="footer color-back-menu">
      <div class="content has-text-centered">
        <p class="has-text-white">
          © {{ companyname }} 2022. All rights reserved.
          <router-link to="/policy" class="routerlink-f color-menu-f">
            {{ locale.mainm_policy }}</router-link
          >
          <router-link to="/legal" class="sep routerlink-f color-menu-f">
            {{ locale.mainm_lowinfo }}</router-link
          >
        </p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapGetters } from "vuex";
import LanguageComponent from "./Language.vue";
import AlertComponent from "./Alert.vue";
import MobileSlide from "../helpers/MobileSlide.vue";

export default defineComponent({
  name: "HomeComponent",
  components: {
    "app-language": LanguageComponent,
    "app-alert": AlertComponent,
    "app-slide": MobileSlide,
  },
  data() {
    const hHomeOpen: any = undefined;
    const hHomeClose: any = undefined;
    return {
      hHomeOpen,
      hHomeClose,
      topMobile: "0",
    };
  },
  setup() {
    const menuMobile = ref<HTMLElement>();
    const btnHomeBurger = ref<HTMLElement>();
    return {
      classMobile: "is-hidden-desktop is-hidden-tablet",
      menuMobile,
      btnHomeBurger,
      imglogo: require(`../assets/images/logo.png`)
    };
  },
  mounted: function () {
    window.addEventListener("resize", this.mobileResize);
    this.mobileResize();
  },
  unmounted: function () {
    window.removeEventListener("resize", this.mobileResize);
  },
  computed: {
    ...mapGetters(["locale", "companyname"]),
  },
  methods: {
    mobileResize() {
      this.topMobile = this.menuMobile
        ? String(this.menuMobile.offsetHeight)
        : "0";
    },
    menuHomeOpen: function (fn: any) {
      this.hHomeOpen = fn;
    },
    menuHomeClose: function (fn: any) {
      this.hHomeClose = fn;
    },
    clickHomeMobile(e: any) {
      const target = e.currentTarget;
      if (target.className.indexOf("is-active") === -1) {
        target.classList.toggle("is-active");
        this.hHomeOpen();
      } else {
        this.hHomeClose();
      }
    },
    closeHomeBurger(e: any) {
      e.classList.toggle("is-active");
    },
  },
});
</script>