<template>
  <div class="container mt-4" style="max-width: 20rem">
    <div class="columns is-centered">
      <div class="column">
        <h1 class="is-4 mx-2 has-text-white">
          {{ locale.agreement_ic }}
        </h1>
        <div class="document">
          <figure class="image is-256x512">
            <img
              v-if="glname === 'RU'"
              :src="imgagreementic_ru"
              alt="Agreement consulting"
            />

            <img
              v-if="glname === 'EN'"
              :src="imgagreementic_en"
              alt="Agreement consulting"
            />

            <div class="field has-text-centered mt-5">
              <div v-if="glname === 'RU'">
                <a
                  class="button-submit is-size-6 color-menu-f"
                  href="../assets/documents/agreement_consulting_ru.docx"
                  download
                  >{{ locale.download }}</a
                >
              </div>
              <div v-if="glname === 'EN'">
                <a
                  class="button-submit is-size-6 color-menu-f"
                  href="../assets/documents/agreement_consulting_en.docx"
                  download
                  >{{ locale.download }}</a
                >
              </div>
            </div>
          </figure>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "AgreementComponent",
  computed: {
    ...mapGetters(["locale", "glname"]),
  },
  data() {
    const loading = false;
    const model: any = {};
    return {
      loading,
      model,
    };
  },
  setup() {
    return {
      imgagreementic_ru: require(`../assets/images/agreement-consulting-ru.png`),
      imgagreementic_en: require(`../assets/images/agreement-consulting-en.png`),
    };
  },
});
</script>
<style scoped>
.is-256x512 {
  width: 256px;
  height: 512px;
}
</style>