<template>
  <agile>
    <div v-for="(slide, i) in slides" :key="i" class="slide">
      <div style="margin: 0 auto; text-align: center">
        <img :src="slide.img" />
      </div>
    </div>
  </agile>
</template>
<script>
import { defineComponent } from "vue";
import { VueAgile } from "vue-agile";

export default defineComponent({
  name: "CarouselComponent",
  components: {
    agile: VueAgile,
  },
  props: {
    slides: Array,
  },
});
</script>
<style lang="sass">
.agile

  &__nav-button
    background: transparent
    border: none
    color: #fff
    cursor: pointer
    font-size: 24px
    height: 100%
    position: absolute
    top: 0
    transition-duration: .3s
    width: 60px

    &:hover
      background-color: rgba(#000, .5)
      opacity: 1

    &--prev
      left: 0

    &--next
      right: 0

  &__dots
    bottom: 10px
    left: 50%
    position: absolute
    transform: translateX(-50%)

  &__dot
    margin: 0 10px

    button
      background-color: transparent
      border: 1px solid #fff
      border-radius: 50%
      cursor: pointer
      display: block
      height: 10px
      font-size: 0
      line-height: 0
      margin: 0
      padding: 0
      transition-duration: .3s
      width: 10px

    &--current,
    &:hover
      button
        background-color: #fff

.slide
  display: block
  height: 500px
  object-fit: cover
  width: 100%
</style>