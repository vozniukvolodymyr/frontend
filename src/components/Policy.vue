<template>
  <div class="container is-fluid">
    <div class="columns is-centered">
      <div class="column">
        <h1 class="title is-3 mx-2 color-menu-f ">{{ locale.policytext }}</h1>        
      </div>
      <div class="column">
        <div class="container">  
          <app-policy-ru v-if="glname === 'RU'"></app-policy-ru>            
          <app-policy-en v-if="glname === 'EN'"></app-policy-en>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from "vue";
import { mapGetters } from "vuex";
const PolicyRuComponent = defineAsyncComponent(() => import('./Policy/ru.vue'));
const PolicyEnComponent = defineAsyncComponent(() => import('./Policy/en.vue'));

export default defineComponent({
  name: "PolicyComponent",
  components: {
    "app-policy-ru": PolicyRuComponent,
    "app-policy-en": PolicyEnComponent
  },
  computed: {
    ...mapGetters(["locale", "glname"]),
  }  
});
</script>
