<template>
  <div v-if="alertText !== ''" v-bind:class="'is-active'" class="modal">
    <div class="modal-background"></div>
    <div class="modal-card" style="max-width: 30rem">
      <header
        class="modal-card-head"
        v-bind:class="{
          'has-background-success':
            alertType === 'success' || alertType === 'confirm',
          'has-background-danger': alertType === 'error',
        }"
      >
        <p class="modal-card-title">{{alertTitle}}</p>
        <button class="delete" aria-label="close" @click="close"></button>
      </header>
      <section class="modal-card-body">        
        {{ alertText }}
      </section>
      <footer class="modal-card-foot">
        <button class="button" @click="close" style="margin-left: auto">OK</button>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import { defineComponent } from "vue";
import { ALERT_CLOSE } from "@/store/actions/alert";
import { mapGetters } from "vuex";
import { AUTH_LOGOUT } from "@/store/actions/user";

export default defineComponent({
  name: "AlertComponent",
  computed: {
    ...mapGetters(["alertText", "alertType", "alertTitle"]),
  },
  methods: {
    close() {
      if (this.alertType === "confirm") {
        store.commit(ALERT_CLOSE);
        store.dispatch(AUTH_LOGOUT);
        this.$router.push("/login");
      } else {
        store.commit(ALERT_CLOSE);
      }
    },
  },
});
</script>

