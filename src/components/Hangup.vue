<template>
  <div class="is-flex is-justify-content-flex-end">
    <app-language :innerTitleClass="'has-text-white'"></app-language>
  </div>
  <div class="container px-1" style="max-width: 20rem">
    <div class="columns is-centered">
      <div class="column">
        <nav class="level">
          <div class="level-item">
            <figure class="image is-48x48">
              <img :src="imglogo" alt="Logo" />
            </figure>
            <h1 class="title color-menu-f is-4 mx-2">{{ companyname }}</h1>
          </div>
        </nav>
        <form>
          <h1 class="title color-menu-f is-5 my-4">{{ locale.hungup_title }}</h1>
          <h1 class="subtitle color-menu-f is-6 my-4">{{ locale.hungup_text }}</h1>
          <h1 class="subtitle color-menu-f is-6 my-4">{{ locale.hungup_text1 }}</h1>

          <div class="field has-text-centered">
            <div class="button-submit is-size-6" @click="login">
              <div class="level-item">
                {{ locale.hangup_again }}
              </div>
            </div>
          </div>

          <div class="has-text-centered">
            <routerLink :to="'/'" class="color-menu-f routerlink-f">
              {{ routehome() }}</routerLink
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";
import { AUTH_LOGOUT } from "@/store/actions/user";
import { LANG_SETUP } from "@/store/actions/lang";
import { mapGetters } from "vuex";
import LanguageComponent from "./Language.vue";

export default defineComponent({
  name: "LoginComponent",
  components: {
    "app-language": LanguageComponent,
  },
  data() {
    return {
      imglogo: require(`../assets/images/logo.png`),
    };
  },
  computed: {
    ...mapGetters(["locale", "companyname", "companysite"]),
  },
  created() {
    store.commit(AUTH_LOGOUT);
  },
  methods: {
    slang(e: any) {
      store.dispatch(LANG_SETUP, e.target.value);
    },
    login() {
      this.$router.push("/login");
    },
    routehome() {
      return this.locale.hangup_stepon + " " + this.companysite;
    },
  },
});
</script>

<style scoped>
</style>

