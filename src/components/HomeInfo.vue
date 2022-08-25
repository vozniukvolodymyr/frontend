<template>
  <section class="section back-home-image back-home-img">
    <div class="container">
      <div class="has-text-centered">
        <span class="title2 color-menu-f color-back-menu-transp">
          {{ locale.home_title }} {{ companyname }}
        </span>
      </div>
      <app-home-title
        :titlen="titlen1"
        :titlet="locale.home_title1"
        :image="image1"
      />
      <div class="level-item">
        <div class="column has-text-centered is-mobile-back">
          <div style="float: left">
            <font-awesome-icon
              :icon="['fas', 'euro-sign']"
              size="5x"
              class="has-text-white stack-icons font-awesome-icon-sub"
              style="left: 1em"
            />
            <font-awesome-icon
              :icon="['fas', 'hand-holding']"
              size="10x"
              class="has-text-white font-awesome-icon"
            />
          </div>
          <p class="is-hidden-tablet is-hidden-desktop color-menu-f hometitle1">
            2.
          </p>
          <p
            class="
              is-hidden-tablet is-hidden-desktop
              hometitle
              has-text-weight-bold
              color-menu-f
            "
          >
            {{ locale.home_title2 }}
          </p>
        </div>
        <div class="column is-hidden-mobile">
          <span
            class="
              hometitle
              has-text-weight-bold
              color-menu-f color-back-menu-transp
              p-2
            "
          >
            <span class="hometitle1">2.</span> {{ locale.home_title2 }}
          </span>
        </div>
      </div>
      <app-home-title
        :titlen="titlen3"
        :titlet="locale.home_title3"
        :image="image3"
      />

      <app-home-title
        :side="side4"
        :titlen="titlen4"
        :titlet="locale.home_title4"
        :image="image4"
      />
      <app-home-title
        :titlen="titlen5"
        :titlet="locale.home_title5"
        :image="image5"
      />
      <app-home-title
        :side="side6"
        :titlen="titlen6"
        :titlet="locale.home_title6"
        :image="image6"
      />
      <app-home-title
        :titlen="titlen7"
        :titlet="locale.home_title7"
        :image="image7"
      />
      <app-home-title
        :side="side8"
        :titlen="titlen8"
        :titlet="locale.home_title8"
        :image="image8"
      />
      <app-home-title
        :titlen="titlen9"
        :titlet="locale.home_title9"
        :image="image9"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent} from "vue";
import { mapGetters } from "vuex";
import HomeTitleComponent from "./HomeTitle.vue";

export default defineComponent({
  name: "HomeInfoComponent",
  components: {
    "app-home-title": HomeTitleComponent
  },
  setup() {    
    return {
      titlen1: "1.",
      image1: "chess-rook",
      titlen3: "3.",
      image3: "clock",
      side4: "right",
      titlen4: "4.",
      image4: "piggy-bank",
      titlen5: "5.",
      image5: "chart-line",
      side6: "right",
      titlen6: "6.",
      image6: "globe",
      titlen7: "7.",
      image7: "plane-departure",
      side8: "right",
      titlen8: "8.",
      image8: "dove",
      titlen9: "9.",
      image9: "award",
    };
  },
  computed: {
    ...mapGetters(["locale", "companyname"]),
  }  
});
</script>

<style scoped>
.stack-icons {
  position: absolute;
}

.back-home-image {
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

@media only screen and (min-width: 0px) {
  .back-home-img {
    background-image: url("../assets/images/styles/background_mobile_small/medias/wall-480x640.jpg");
  }
  font-awesome-icon {
    font-size: 5em;
  }
}

@media only screen and (min-width: 480px) {
  .back-home-img {
    background-image: url("../assets/images/styles/background_mobile_medium/medias/wall-768x1080.jpg");
  }
}

@media only screen and (min-width: 768px) {
  .back-home-img {
    background-image: url("../assets/images/styles/background_mobile_large/medias/wall-1024x1024.jpg");
  }
}

@media only screen and (min-width: 1024px) {
  .back-home-img {
    background-image: url("../assets/images/styles/background_desktop_small/medias/wall-1440x900.jpg");
  }
}

@media only screen and (min-width: 1440px) {
  .back-home-img {
    background-image: url("../assets/images/styles/background_desktop_medium/medias/wall-1920x1440.jpg");
  }
}

@media only screen and (min-width: 1920px) {
  .back-home-img {
    background-image: url("../assets/images/styles/background_desktop_large/medias/wall-3200x1800.jpg");
  }
}
</style>