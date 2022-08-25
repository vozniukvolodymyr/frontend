<template>
  <div class="observer"/>
</template>

<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  name: "ObserveComponent",  
  props: {
      intersect: Function,
      options: Object
  },
  emits: ['intersect'],
  data() {
    const observer: any = null;  
    return {observer}
  },
  mounted() {
    const options = this.options || {};
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        this.$emit("intersect");
      }
    }, options);
    this.observer.observe(this.$el);
  },
  unmounted() {
    this.observer.disconnect();
  }
})
</script>