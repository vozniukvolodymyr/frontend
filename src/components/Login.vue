<template>
  <app-alert></app-alert>
  <div class="is-flex is-justify-content-flex-end">
    <app-language      
      :innerTitleClass="'has-text-white'"
    ></app-language>
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
          <h1 class="title color-menu-f is-5 my-2">
            {{ locale.log_log_title }}
          </h1>
          <h1 class="subtitle color-menu-f is-6 my-4">
            {{ locale.log_log_text }}
          </h1>
          <div class="field">
            <div class="control">
              <input
                class="input"
                type="email"
                :placeholder="locale.log_email"
                v-model="model.email"
                required
              />
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input
                class="input"
                type="password"
                :placeholder="locale.log_pass"
                v-model="model.password"
                required
              />
            </div>
          </div>          
          <div class="field has-text-centered mt-5">
            <div
              class="button-submit is-size-6"
              v-bind:class="{ 'div-disabled': loading === true }"
              @click="login"
            >
              <div class="level-item">
                <span>{{ locale.log_log }}</span>
                <span
                  v-bind:class="{ 'bulma-loader-mixin ml-2': loading === true }"
                ></span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";
import { AUTH_LOGOUT, AUTH_REQUEST } from "@/store/actions/user";
import { LANG_SETUP } from "@/store/actions/lang";
import { ALERT_ERROR } from "@/store/actions/alert";
import { mapGetters } from "vuex";
import { looksLikeMail } from "../_services/func.service";
import AlertComponent from "./Alert.vue";
import LanguageComponent from "./Language.vue";

/*
<div class="field has-text-right">
            <div>
              <a class="routerlink-f color-menu-f">{{
                locale.log_forgotuser
              }}</a>
            </div>
            <a class="routerlink-f color-menu-f">{{ locale.log_forgotpass }}</a>
          </div>*/

export default defineComponent({
  name: "LoginComponent",
  components: {
    "app-alert": AlertComponent,
    "app-language": LanguageComponent,
  },
  data() {
    return {
      loading: false,
      imglogo: require(`../assets/images/logo.png`),
    };
  },
  computed: {
    ...mapGetters(["locale", "companyname"]),
  },
  setup() {
    const model: { email: string; password: string } = JSON.parse(
      localStorage.getItem("session") || "{}"
    );
    return { model };
  },
  created() {
    store.commit(AUTH_LOGOUT);
  },
  methods: {
    slang(e: any) {
      store.dispatch(LANG_SETUP, e.target.value);
    },
    login() {
      if (
        this.model.email &&
        this.model.password &&
        looksLikeMail(this.model.email)
      ) {
        this.loading = true;
        localStorage.setItem("session", JSON.stringify({email: this.model.email}));
        store
          .dispatch(AUTH_REQUEST, this.model)
          .then(() => {
            this.loading = false;
            this.$router.push("/launch/dashboard");
          })
          .catch(() => {
            this.loading = false;
          });
      } else {
        store.commit(ALERT_ERROR, {
          title: this.locale.log_log,
          mess: this.locale.log_er,
        });
      }
    },
  },
});
</script>

<style scoped>
</style>

