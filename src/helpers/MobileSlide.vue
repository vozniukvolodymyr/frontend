<template>
  <div>
    <app-mobile v-bind="this.$attrs">
      <slot></slot>
    </app-mobile>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MobileMenu from "./MobileMenu.vue";

export default defineComponent({
  name: "MobileSlide",
  components: {
    "app-mobile": MobileMenu,
  }
});
</script>


