<template>
  <div v-if="side === 'left'" v-bind:class="innerBlockClass" class="level-item">
    <div class="column is-hidden-mobile">
      <span
        class="
          hometitle
          has-text-weight-bold
          color-menu-f
          color-back-menu-transp
          p-2
        "
      >
        <span class="hometitle1">{{ titlen }}</span
        >{{ titlet }}
      </span>
    </div>

    <div class="column has-text-centered is-mobile-back">
      <font-awesome-icon
        :icon="['fas', image]"
        size="10x"
        class="has-text-white font-awesome-icon"
        style="float: right"
      />
      <p class="is-hidden-tablet is-hidden-desktop color-menu-f hometitle1">
        {{ titlen }}
      </p>
      <p
        class="
          is-hidden-tablet is-hidden-desktop
          hometitle
          has-text-weight-bold
          color-menu-f
          p-2
        "
      >
        {{ titlet }}
      </p>
    </div>
  </div>

  <div
    v-if="side === 'right'"
    v-bind:class="innerBlockClass"
    class="level-item"
  >
    <div class="column has-text-centered is-mobile-back">
      <font-awesome-icon
        :icon="['fas', image]"
        size="10x"
        class="has-text-white font-awesome-icon"
        style="float: left"
      />
      <p
        class="
          is-hidden-tablet is-hidden-desktop
          color-menu-f
          hometitle1
        "
      >
        {{ titlen }}
      </p>
      <p
        class="
          is-hidden-tablet is-hidden-desktop
          hometitle
          has-text-weight-bold
          color-menu-f
          p-2
        "
      >
        {{ titlet }}
      </p>
    </div>
    <div class="column is-hidden-mobile">
      <span
        class="
          hometitle
          has-text-weight-bold
          color-menu-f
          color-back-menu-transp
          p-2
        "
      >
        <span class="hometitle1">{{ titlen }}</span
        >{{ titlet }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "HomeTitle",
  props: {
    titlen: {
      type: [String],
      required: true,
    },
    titlet: {
      type: [String],
      required: true,
    },
    image: {
      type: [String],
      required: true,
    },
    side: {
      type: [String],
      required: false,
      default: "left",
    },
    innerBlockClass: {
      type: [String],
      required: false,
      default: "",
    },
  },
});
</script>

<style scoped>
</style>
