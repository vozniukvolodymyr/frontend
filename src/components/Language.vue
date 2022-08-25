<template>
  <div class="dropdown" :class="{ 'is-active': isLangActive }">
    <div class="dropdown-trigger">
      <div
        class="button btn-b0 has-text-weight-bold"        
        @click="isLangActive = !isLangActive"        
        aria-controls="ddm-lang"
        style="background: transparent"
      >
        <span v-bind:class="innerTitleClass"
        >                  
          {{ glname }}
        </span>
        <span class="icon is-small">
          <font-awesome-icon
            :icon="['fas', iActive]"
            v-bind:class="innerTitleClass"
          />
        </span>
      </div>
    </div>
    <div class="dropdown-menu" id="ddm-lang" role="menu">
      <div class="dropdown-content" style="width: 4em">
        <div
          class="dropdown-item routerlink-w color-menu-w"
          @click="slang($event)"
          v-for="lang in languages"
          :key="lang.value"
        >
          {{ lang.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import { LANG_SETUP } from "@/store/actions/lang";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "LanguageComponent",
  props: {
    width: {
      type: [String],
      required: false,
      default: "4",
    },
    innerTitleClass: {
      type: [String],
      required: false,
      default: "",
    },
  },
  computed: {
    ...mapGetters(["languages", "glname"]),
    iActive(): any{
          if (this.isLangActive){
            return 'angle-up';
          }
          return 'angle-down';
        }            
  },
  data () {
    return {
      isLangActive: false
    }
  },
  methods: {
    slang(e: any) {
      store.dispatch(LANG_SETUP, e.target.textContent);  
      this.isLangActive = false;
    }
  },  
});
</script>

