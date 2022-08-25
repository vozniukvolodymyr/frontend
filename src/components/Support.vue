<template>
  <div class="container px-2">
    <div
      class="cb-fullscreen back-support has-text-centered"
      style="height: 200px"
    >
      <h1 class="title1 has-text-white abscentered">
        {{ locale.support_page }}
      </h1>
    </div>
    <h1 class="title is-5 color-menu-f has-text-centered">
      {{ locale.support_title }}
    </h1>
    <div class="columns is-centered">
      <div class="column">
        <h1 class="title is-4 has-text-white">
          {{ locale.support_legal }}
        </h1>

        <div>
          <router-link
            to="/policy"
            class="has-text-weight-bold routerlink-f color-menu-f"
          >
            {{ locale.mainm_policy }}</router-link
          >
        </div>
        <div>
          <router-link
            to="/legal"
            class="has-text-weight-bold routerlink-f color-menu-f"
          >
            {{ locale.mainm_lowinfo }}</router-link
          >
        </div>
        <div class="level-right">
          <div class="box pl-1 color-menu-w">
            <h1 class="title is-4">{{ locale.support_compinfo }}</h1>
            <div class="block">
              <h1 class="is-6 has-text-weight-bold">
                {{ locale.support_compinfo_email }}
              </h1>
              <h2 class="is-6">{{ companysemail }}</h2>
            </div>
            <h1 class="is-6 has-text-weight-bold">
              {{ locale.support_compinfo_time_title }}
            </h1>
            <h2 class="is-6">{{ locale.support_compinfo_time_text }}</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "LegalComponent",
  computed: {
    ...mapGetters(["locale", "companyphone", "companysemail"]),
  },
});
</script>

<style scoped>
.back-support {
  background-repeat: no-repeat;
  background-image: url("../assets/images/support.jpg");
  background-size: cover;
}
</style>
