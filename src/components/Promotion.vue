<template>
  <div class="container p-2">
    <slot v-for="item in promotions" :key="item.index">
      <h1 class="title is-size-5 color-menu-b mb-0">
        {{ item.title }}
      </h1>
      <pre class="has-text-white">
          <div style="margin: -1em">{{ item.comment }}</div>
         </pre>
      <h1 class="title is-size-5 color-menu-b">
        {{ locale.promotiontable }}
      </h1>
      <div class="mx-2">
        <div
          v-for="row in item.data"
          :key="row.index"
          v-bind:class="{
            colorawardyou:
              this.atraninvest && this.atraninvest.account === row.account,
          }"
        >
          <div class="py-2 is-flex">
            <div
              v-if="row.number === 1 || row.number === 2 || row.number === 3"
              style="position: relative"
            >
              <span v-if="row.number === 1" class="icon">
                <font-awesome-icon
                  :icon="['fas', 'award']"
                  size="2x"
                  class="color-award-gold"
                />
              </span>
              <span v-else-if="row.number === 2" class="icon">
                <font-awesome-icon
                  :icon="['fas', 'award']"
                  size="2x"
                  class="color-award-silver"
                />
              </span>
              <span v-else-if="row.number === 3" class="icon">
                <font-awesome-icon
                  :icon="['fas', 'award']"
                  size="2x"
                  class="color-award-bronze"
                />
              </span>
              <span
                class="
                  abscentered
                  has-text-weight-bold
                  is-size-4
                  color-menu-b
                  px-2
                  pb-3
                "
              >
                {{ row.number }}
              </span>
            </div>
            <div v-else
              class="has-text-weight-bold is-size-5 color-menu-b px-2"
            >
              {{ row.number }}
            </div>
            <span class="is-size-5 has-text-white ml-2">
              {{ row.name }}
            </span>
          </div>
        </div>
      </div>
    </slot>
    <p class="has-text-centered title is-size-5 mx-2 color-menu-b" v-if="promotions.length === 0">
      {{ locale.promotionno }}
    </p>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "PromotionComponent",
  computed: {
    ...mapGetters(["locale", "user"]),
  },
  data() {
    const loading = false;
    return {
      loading,
      promotions: [] as any,
      atraninvest: undefined as any,
    };
  },
  created() {
    this.atraninvest = (this.user as any).accounts[0];
    this.loading = true;
    store
      .dispatch("getpromotion")
      .then((res: any) => {
        if (res.data) {
          const length = res.data.promotion.length;
          for (let i = 0; i < length; i += 1) {
            this.promotions.unshift(res.data.promotion[i]);
          }
        }
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });
  },
});
</script>
<style scoped>
pre {
  font-family: "PlayfairDisplayRegular";
  background: #411f99;
  font-size: inherit;
  overflow-x: auto;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
}

.color-award-gold {
  color: #ffd700;
}

.color-award-silver {
  color: #c0c0c0;
}

.color-award-bronze {
  color: #b08d57;
}

.colorawardyou {
  border-top: 1px solid rgb(214, 214, 214);
  border-bottom: 1px solid rgb(214, 214, 214);
}
</style>