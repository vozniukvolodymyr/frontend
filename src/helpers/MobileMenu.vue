<template>
  <div ref="sideNav" class="bm-menu color-back-menu" :class="innerClassMobile" 
     v-click-away="onClickAway" @click="onClickAway">        
    <slot></slot>    
    <span class="bm-cross-button cross-style" @click="closeMenu">
      <span
        v-for="(x, index) in 2"
        :key="x"
        class="bm-cross"
        :style="{
          position: 'absolute',
          width: '3px',
          height: '14px',
          transform: index === 1 ? 'rotate(45deg)' : 'rotate(-45deg)',
        }"
      >
      </span>
    </span>
    
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
export default defineComponent({
  name: "MobileMenu",
  data() {
    return {
      isSideBarOpen: false,
    };
  },
  props: {
    handlerOpen: Function,
    handlerClose: Function,
    btnBurger: Object,
    top: {
      type: [String],
      required: false,
      default: "0",
    },
    classMobile: [String, String],
  },
  methods: {
    openMenu() {
      this.$emit("openMenu");
      this.isSideBarOpen = true;
      this.$nextTick(function () {
        if (this.sideNav) {
          this.sideNav.style.width = "100%"; 
          this.mobileMenuResize();         
        }
      });
    },

    closeMenu() {
      this.$emit("closeMenu", this.btnBurger);
      this.isSideBarOpen = false;
      if (this.sideNav) {
        this.sideNav.style.width = "";
      }
    },
    onClickAway(e: any) {      
      let element = this.btnBurger;
      let target = null;
      if (e && e.target) {
        target = e.target;
      }

      if (
        element &&
        element !== target &&
        !element.contains(target) &&
        !target.closest(".bm-menu") &&
        this.isSideBarOpen
      ) {
        this.closeMenu();
      } else if (element && target.closest("a") && this.isSideBarOpen) {
        this.closeMenu();
      }
    },
    mobileMenuResize() {
      if (this.sideNav && this.sideNav.style.width !== "") {
        var scrollHeight = Math.max(
          document.body.scrollHeight, document.documentElement.scrollHeight,
          document.body.offsetHeight, document.documentElement.offsetHeight,
          document.body.clientHeight, document.documentElement.clientHeight
        );
        this.sideNav.style.height = scrollHeight - this.sideNav.offsetTop + "px";          
        }
    },
  },
  created: function () {
    this.$emit("handlerOpen", this.openMenu);
    this.$emit("handlerClose", this.closeMenu);
  },
  mounted: function () {
    window.addEventListener("resize", this.mobileMenuResize);    
  },
  unmounted: function () {
    window.removeEventListener("resize", this.mobileMenuResize);
  },
  setup(props) {
    const sideNav = ref<HTMLElement>();
    let innerClassMobile = computed(() => {
      let classMobile =
        typeof props.classMobile == "string" ? props.classMobile : "";
      return {
        [classMobile]: !!classMobile,
      };
    });
    return {
      sideNav,
      innerClassMobile,
    };
  },
  watch: {
    top: {
      handler(newValue, oldValue) {
        if (newValue !== oldValue && this.sideNav) {
          this.sideNav.style.top = this.top ? this.top + "px" : "0px";
        }
      },
    },
  }  
});
</script>

<style>
.cross-style {
  position: absolute;
  top: 12px;
  right: 2px;
  cursor: pointer;
}
.bm-cross {
  background: #bdc3c7;
}
.bm-cross-button {
  height: 24px;
  width: 24px;
}

.bm-menu {
  height: 100%; /* 100% Full-height */  
  width: 0; /* 0 width - change this with JavaScript */
  position: fixed; /* Stay in place */
  z-index: 100; /* Stay on top */
  top: 0;
  left: 0;
  overflow-x: hidden; /* Disable horizontal scroll */  
  overflow-y: hidden; /* Disable horizontal scroll */
  padding-top: 1em; /* Place content 60px from the top */
  transition: 0.5s; /*0.5 second transition effect to slide in the sidenav*/
}

@media only screen and (max-height: 650px){
    .bm-menu {
      line-height: 1;
    }
}
</style>

