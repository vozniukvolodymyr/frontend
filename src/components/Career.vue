<template>
  <section class="section">
    <div class="level-item">
      <figure class="image">
        <img :src="imgcareer1" alt="Career MYTCO" />
      </figure>
    </div>
    <div class="level-item">
      <figure class="image">
        <img :src="imgcareer2" alt="Career MYTCO" />
      </figure>
    </div>
    <div class="level-item">
      <figure class="image">
        <img :src="imgcareer3" alt="Career MYTCO" />
      </figure>
    </div>
    <div class="level-item">
      <figure class="image">
        <img :src="imgcareer4" alt="Career MYTCO" />
      </figure>
    </div>
    <div class="level-item">
      <figure class="image">
        <img :src="imgcareer5" alt="Career MYTCO" />
      </figure>
    </div>
    <div class="level-item">
      <figure class="image">
        <img :src="imgcareer6" alt="Career MYTCO" />
      </figure>
    </div>
    <div class="level-item">
      <figure class="image">
        <img :src="imgcareer7" alt="Career MYTCO" />
      </figure>
    </div>
    <div class="level-item">
      <figure class="image">
        <img :src="imgcareer8" alt="Career MYTCO" />
      </figure>
    </div>
    <div class="level-item">
      <figure class="image">
        <img :src="imgcareer9" alt="Career MYTCO" />
      </figure>
    </div>
    <div class="level-item">
      <figure class="image">
        <img :src="imgcareer10" alt="Career MYTCO" />
      </figure>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "CareerComponent",
    computed: {
        ...mapGetters(["locale"]),
    },
    setup() {
    return {
      imgcareer1: require(`../assets/images/styles/background_mobile_medium/medias/career_MYTCO_1.jpg`),
      imgcareer2: require(`../assets/images/styles/background_mobile_medium/medias/career_MYTCO_2.jpg`),
      imgcareer3: require(`../assets/images/styles/background_mobile_medium/medias/career_MYTCO_3.jpg`),
      imgcareer4: require(`../assets/images/styles/background_mobile_medium/medias/career_MYTCO_4.jpg`),
      imgcareer5: require(`../assets/images/styles/background_mobile_medium/medias/career_MYTCO_5.jpg`),
      imgcareer6: require(`../assets/images/styles/background_mobile_medium/medias/career_MYTCO_6.jpg`),
      imgcareer7: require(`../assets/images/styles/background_mobile_medium/medias/career_MYTCO_7.jpg`),
      imgcareer8: require(`../assets/images/styles/background_mobile_medium/medias/career_MYTCO_8.jpg`),
      imgcareer9: require(`../assets/images/styles/background_mobile_medium/medias/career_MYTCO_9.jpg`),
      imgcareer10: require(`../assets/images/styles/background_mobile_medium/medias/career_MYTCO_10.jpg`)
    };
  },
});
</script>
