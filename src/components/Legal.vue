<template>
  <div class="container is-fluid">
    <app-legal-ru v-if="glname === 'RU'"></app-legal-ru>
    <app-legal-en v-if="glname === 'EN'"></app-legal-en>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from "vue";
import { mapGetters } from "vuex";

const LegalRuComponent = defineAsyncComponent(() => import('./Legal/ru.vue'));
const LegalEnComponent = defineAsyncComponent(() => import('./Legal/en.vue'));

export default defineComponent({
  name: "LegalComponent",
  components: {
    "app-legal-ru": LegalRuComponent,
    "app-legal-en": LegalEnComponent
  },
  computed: {
    ...mapGetters(["locale", "glname"]),
  }  
});
</script>