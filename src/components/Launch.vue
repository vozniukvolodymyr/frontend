<template>
  <app-alert></app-alert>
  <section class="hero">
    <div ref="menuMobile" class="hero-head sticky has-background-white">
      <nav class="level is-hidden-mobile mb-0 p-1 color-back-menu">
        <div class="level-left">
          <div class="level-item">
            <router-link
              to="/"
              class="routerlink-f color-menu-f has-text-weight-bold"
              >{{ locale.mainm_home }}
            </router-link>
          </div>
          <div class="level-item">
            <router-link
              to="/company"
              class="routerlink-f color-menu-f has-text-weight-bold"
              >{{ locale.mainm_about }}
            </router-link>
          </div>
          <div class="level-item">
            <router-link
              to="/support"
              class="routerlink-f color-menu-f has-text-weight-bold"
              >{{ locale.mainm_support }}
            </router-link>
          </div>
        </div>
        <div class="level-right pr-2">
          <div class="level-item">
            <div
              class="dropdown is-right"
              :class="{ 'is-active': isMessageActive }"
            >
              <div class="dropdown-trigger">
                <div
                  class="button back-transparent btn-b0"
                  aria-haspopup="true"
                  aria-controls="ddm-message"
                  @click="clickMessage"
                  v-click-away="onClickMessageAway"
                >
                  <span class="icon">
                    <font-awesome-icon
                      class="fa-lg color-menu-f"
                      :icon="['fas', 'bell']"
                    />
                    <div v-if="usernotify() === true" class="icon-unread"></div>
                  </span>
                </div>
              </div>
              <div class="dropdown-menu" id="ddm-message" role="menu">
                <div class="dropdown-content color-back-menu-transp">
                  <routerLink
                    :to="'/launch/messages/unread'"
                    class="
                      dropdown-item
                      routerlink-f
                      color-menu-f
                      has-text-weight-bold
                    "
                  >
                    <span class="icon is-small is-left mr-1">
                      <font-awesome-icon :icon="['fas', 'envelope']" />
                    </span>

                    {{ messageunread() }}</routerLink
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="level-item">
            <div
              class="dropdown is-right"
              :class="{ 'is-active': isProfileActive }"
            >
              <div class="dropdown-trigger">
                <div
                  class="button back-transparent btn-b0"
                  aria-haspopup="true"
                  aria-controls="ddm-profile"
                  @click="clickProfile"
                >
                  <figure class="image is-32x32">
                    <img class="is-rounded" :src="avatar" alt="Avatar" />
                  </figure>
                  <span class="color-menu-f has-text-weight-bold">{{
                    user.fullusername()
                  }}</span>
                </div>
              </div>
              <div class="dropdown-menu" id="ddm-profile" role="menu">
                <div class="dropdown-content color-back-menu-transp">
                  <a
                    @click="clickProfileProfile"
                    class="
                      dropdown-item
                      routerlink-f
                      color-menu-f
                      has-text-weight-bold
                    "
                  >
                    <span class="icon is-small is-left mr-1">
                      <font-awesome-icon :icon="['fas', 'address-card']" />
                    </span>

                    {{ locale.header_profile }}</a
                  >
                  <a
                    v-if="!user.refer && user.status === 1"
                    @click="clickProfilePartnerbecome"
                    class="
                      dropdown-item
                      routerlink-f
                      color-menu-f
                      has-text-weight-bold
                    "
                  >
                    <span class="icon is-small is-left mr-1">
                      <font-awesome-icon :icon="['fas', 'user-friends']" />
                    </span>

                    {{ locale.header_partnerbecome }}</a
                  >
                  <a
                    v-if="user.status === 1"
                    @click="clickAgreement"
                    class="
                      dropdown-item
                      routerlink-f
                      color-menu-f
                      has-text-weight-bold
                    "
                  >
                    <span class="icon is-small is-left mr-1">
                      <font-awesome-icon :icon="['fas', 'file-signature']" />
                    </span>

                    {{ locale.header_agreement }}</a
                  >
                  <a
                    v-if="user.refer && user.status === 1"
                    @click="clickRoomPartner"
                    class="
                      dropdown-item
                      routerlink-f
                      color-menu-f
                      has-text-weight-bold
                    "
                  >
                    <span class="icon is-small is-left mr-1">
                      <font-awesome-icon :icon="['fas', 'user-friends']" />
                    </span>

                    {{ locale.menu_structurs }}</a
                  >
                  <a
                    @click="clickProfileChangepass"
                    class="
                      dropdown-item
                      routerlink-f
                      color-menu-f
                      has-text-weight-bold
                    "
                  >
                    <span class="icon is-small is-left mr-1">
                      <font-awesome-icon :icon="['fas', 'lock']" />
                    </span>

                    {{ locale.header_changepassword }}</a
                  >
                  <a
                    @click="clickHelp"
                    class="
                      dropdown-item
                      routerlink-f
                      color-menu-f
                      has-text-weight-bold
                    "
                  >
                    <span class="icon is-small is-left mr-1">
                      <font-awesome-icon :icon="['fas', 'question']" />
                    </span>

                    {{ locale.header_help }}</a
                  >
                  <span
                    class="dropdown-divider has-background-grey-light"
                  ></span>
                  <div class="dropdown-item">
                    <span
                      class="
                        routerlink-f
                        color-menu-f
                        mr-6
                        has-text-weight-bold
                      "
                      @click="slang($event)"
                      v-for="lang in languages"
                      :key="lang.value"
                    >
                      {{ lang.name }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="level-item">
            <routerLink
              :to="'/hangup'"
              class="routerlink-f color-menu-f has-text-weight-bold"
            >
              {{ locale.header_exit }}</routerLink
            >
          </div>
        </div>
      </nav>
      <div class="is-flex is-flex-wrap-wrap py-0">
        <div class="level-item m-0 is-flex-shrink-1" style="margin-right: auto">
          <figure class="image is-48x48">
            <img :src="imglogo" alt="Logo" />
          </figure>
          <h1 class="title is-4 mx-2">{{ companyname }}</h1>
        </div>
        <div
          class="level-right is-hidden-mobile pr-2"
          style="margin-left: auto"
        >
          <div class="level-item">
            <routerLink
              class="routerlink-w color-menu-w has-text-weight-bold"
              :to="'/launch/dashboard'"
            >
              {{ locale.menu_dashboard }}
            </routerLink>
          </div>
          <div class="level-item">
            <routerLink
              class="routerlink-w color-menu-w has-text-weight-bold"
              :to="'/launch/promotion'"
            >
              {{ locale.menu_promotion}}
            </routerLink>
          </div>
          <div class="level-item">
            <routerLink
              class="routerlink-w color-menu-w has-text-weight-bold"
              :to="'/launch/career'"
            >
              {{ locale.menu_career }}
            </routerLink>
          </div>
          <div v-if="user.status === 1" class="level-item">
            <routerLink
              class="routerlink-w color-menu-w has-text-weight-bold"
              :to="'/launch/pay'"
            >
              {{ locale.menu_pays }}
            </routerLink>
          </div>
          <div class="level-item">
            <routerLink
              class="routerlink-w color-menu-w has-text-weight-bold"
              :to="'/launch/messages'"
              :class="{ routerlinkactive: isPathMessageActive }"
            >
              {{ locale.menu_messages }}
            </routerLink>
          </div>
        </div>
        <div
          class="level-item is-hidden-desktop is-hidden-tablet"
          style="margin-left: auto"
        >
          <div
            ref="btnMessageBurger"
            class="button btn-b0 mr-1"
            aria-haspopup="true"
            aria-controls="ddm-message"
            @click="clickMessageMobile"
          >
            <span class="icon">
              <font-awesome-icon class="fa-lg" :icon="['fas', 'bell']" />
              <div v-if="usernotify() === true" class="icon-unread"></div>
            </span>
          </div>
          <div
            ref="btnProfileBurger"
            class="button btn-b0"
            aria-haspopup="true"
            aria-controls="ddm-profile"
            @click="clickProfileMobile"
          >
            <figure class="image is-32x32">
              <img class="is-rounded" :src="avatar" alt="Avatar" />
            </figure>
          </div>
          <div class="navbar-brand" style="min-height: auto">
            <span
              ref="btnHomeBurger"
              class="navbar-burger size-2-5"
              @click="clickHomeMobile($event)"
            >
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <app-slide
      @handlerOpen="menuMessageOpen"
      :btnBurger="btnMessageBurger"
      :top="topMobile"
      :classMobile="classMobile"
    >
      <aside class="menu">
        <ul class="menu-mobile">
          <div>
            {{ locale.menu_messages?.toUpperCase() }}
          </div>
          <li>
            <routerLink :to="'/launch/messages/unread'">
              <span class="icon is-small is-left mr-1">
                <font-awesome-icon :icon="['fas', 'envelope']" />
              </span>
              {{ messageunread() }}</routerLink
            >
          </li>
        </ul>
      </aside>
    </app-slide>
    <app-slide
      @handlerOpen="menuProfileOpen"
      :btnBurger="btnProfileBurger"
      :top="topMobile"
      :classMobile="classMobile"
    >
      <aside class="menu">
        <ul class="menu-mobile">
          <li>
            <routerLink :to="'/launch/profile'">
              <span class="icon is-small is-left mr-1">
                <font-awesome-icon :icon="['fas', 'address-card']" />
              </span>
              {{ locale.header_profile }}</routerLink
            >
          </li>
          <li>
            <routerLink v-if="user.refer && user.status === 1" :to="'/launch/structure'">
              <span class="icon is-small is-left mr-1">
                <font-awesome-icon :icon="['fas', 'user-friends']" /> </span
              >{{ locale.menu_structurs }}
            </routerLink>
          </li>          
          <li>
            <routerLink
              v-if="!user.refer && user.status === 1"
              :to="'/launch/partnerbecome'"
            >
              <span class="icon is-small is-left mr-1">
                <font-awesome-icon :icon="['fas', 'user-friends']" />
              </span>
              {{ locale.header_partnerbecome }}</routerLink
            >
          </li>
          <li>
            <routerLink
              v-if="user.status === 1"
              :to="'/launch/agreement'"
            >
              <span class="icon is-small is-left mr-1">
                <font-awesome-icon :icon="['fas', 'file-signature']" />
              </span>
              {{ locale.header_agreement }}</routerLink
            >
          </li>
          <li>
            <routerLink :to="'/launch/changepass'">
              <span class="icon is-small is-left mr-1">
                <font-awesome-icon :icon="['fas', 'lock']" />
              </span>
              {{ locale.header_changepassword }}</routerLink
            >
          </li>
          <li>
            <routerLink :to="'/launch/help'">
              <span class="icon is-small is-left mr-1">
                <font-awesome-icon :icon="['fas', 'question']" />
              </span>
              {{ locale.header_help }}</routerLink
            >
          </li>
          <li class="dropdown-divider has-background-grey-light"></li>
          <li>
            <routerLink :to="'/launch/dashboard'">
              <span class="icon is-small is-left mr-1">
                <font-awesome-icon :icon="['fas', 'house-user']" />
              </span>
              {{ locale.menu_dashboard }}
            </routerLink>
          </li>
          <li>
            <routerLink :to="'/launch/promotion'">
              <span class="icon is-small is-left mr-1">
                <font-awesome-icon :icon="['fas', 'award']" />
              </span>
              {{ locale.menu_promotion }}
            </routerLink>
          </li>
          <li>
            <routerLink :to="'/launch/career'">
              <span class="icon is-small is-left mr-1">
                <font-awesome-icon :icon="['fas', 'briefcase']" /> </span
              >{{ locale.menu_career }}
            </routerLink>
          </li>          
          <li v-if="user.status === 1">
            <routerLink :to="'/launch/pay'">
              <span class="icon is-small is-left mr-1">
                <font-awesome-icon :icon="['fas', 'money-bill']" />
              </span>
              {{ locale.menu_pays }}
            </routerLink>
          </li>
          <li>
            <routerLink :to="'/launch/messages'">
              <span class="icon is-small is-left mr-1">
                <font-awesome-icon :icon="['fas', 'envelope']" />
              </span>
              {{ locale.menu_messages }}
            </routerLink>
          </li>          
          <li></li>
          <li class="dropdown-divider has-background-grey-light"></li>
          <li>
            <span
              class="has-text-white mr-6"
              @click="slang($event)"
              v-for="lang in languages"
              :key="lang.value"
            >
              {{ lang.name }}
            </span>
          </li>
          <li class="dropdown-divider has-background-grey-light"></li>
          <li>
            <routerLink :to="'/hangup'">
              <span class="icon is-small is-left mr-1">
                <font-awesome-icon :icon="['fas', 'running']" />
              </span>
              {{ locale.header_exit }}
            </routerLink>
          </li>
        </ul>
      </aside>
    </app-slide>
    <app-slide
      @handlerOpen="menuHomeOpen"
      @handlerClose="menuHomeClose"
      :btnBurger="btnHomeBurger"
      @closeMenu="closeHomeBurger"
      :top="topMobile"
      :classMobile="classMobile"
    >
      <aside class="menu">
        <ul class="menu-mobile">
          <li>
            <router-link to="/">{{ locale.mainm_home }} </router-link>
          </li>
          <li>
            <router-link to="/company">{{ locale.mainm_about }} </router-link>
          </li>
          <li>
            <router-link to="/support">{{ locale.mainm_support }} </router-link>
          </li>
        </ul>
      </aside>
    </app-slide>
    <div class="is-centered">
      <div v-if="isEventActive" class="box m-0">
        <p v-for="event in events" :key="event.index">
          {{ eventtext(event) }}
          <a v-if="event.kind==='Promotion'" class="routerlink-w color-menu-w has-text-weight-bold" @click="clickPromotion()">{{ locale.menu_promotion}}</a>
        </p>
      </div>
      <div class="buttons is-centered">
        <button
          v-if="events.length > 0"
          class="bulma-button-mixin"
          @click="clickEvent"
        >
          <span>{{ locale.events_show }}</span>
          <span class="tag is-info m-1">{{ events.length }}</span>
          <span class="icon is-small">
            <font-awesome-icon
              :icon="['fas', iEventActive]"
              color="rgb(65, 105, 180)"
            />
          </span>
        </button>
      </div>
    </div>
    <div class="hero-body p-1">
      <router-view></router-view>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapGetters } from "vuex";
import AlertComponent from "./Alert.vue";
import MobileSlide from "../helpers/MobileSlide.vue";
import store from "@/store";
import { LANG_SETUP } from "@/store/actions/lang";

export default defineComponent({
  name: "HomeComponent",
  components: {
    "app-alert": AlertComponent,
    "app-slide": MobileSlide,
  },
  data() {
    const hMessageOpen: any = undefined;
    const hProfileOpen: any = undefined;
    const hHomeOpen: any = undefined;
    const hHomeClose: any = undefined;
    return {
      hMessageOpen,
      hProfileOpen,
      hHomeOpen,
      hHomeClose,
      topMobile: "0",
      isMessageActive: false,
      isProfileActive: false,
      isEventActive: false
    };
  },
  setup() {
    const menuMobile = ref<HTMLElement>();
    const btnMessageBurger = ref<HTMLElement>();
    const btnProfileBurger = ref<HTMLElement>();
    const btnHomeBurger = ref<HTMLElement>();
    return {
      classMobile: "is-hidden-desktop is-hidden-tablet",
      menuMobile,
      btnMessageBurger,
      btnProfileBurger,
      btnHomeBurger,
      imglogo: require(`../assets/images/logo.png`),
    };
  },
  mounted: function () {
    window.addEventListener("resize", this.mobileResize);
    this.mobileResize();
  },
  unmounted: function () {
    window.removeEventListener("resize", this.mobileResize);
  },
  computed: {
    ...mapGetters([
      "languages",
      "locale",
      "companyname",
      "user",
      "avatar",
      "events",
    ]),
    isPathMessageActive() {
      if (this.$route.path.indexOf("/launch/messages") === -1) {
        return false;
      } else {
        return true;
      }
    },
    iEventActive(): any {
      if (this.isEventActive) {
        return "angle-up";
      }
      return "angle-down";
    },
  },
  methods: {
    mobileResize() {
      this.topMobile = this.menuMobile
        ? String(this.menuMobile.offsetHeight)
        : "0";
    },
    menuMessageOpen: function (fn: any) {
      this.hMessageOpen = fn;
    },
    menuProfileOpen: function (fn: any) {
      this.hProfileOpen = fn;
    },
    menuHomeOpen: function (fn: any) {
      this.hHomeOpen = fn;
    },
    menuHomeClose: function (fn: any) {
      this.hHomeClose = fn;
    },
    clickProfile() {
      this.isProfileActive = !this.isProfileActive;
    },
    clickMessage() {
      this.isMessageActive = !this.isMessageActive;
    },
    onClickMessageAway() {
      this.isMessageActive = false;
    },
    clickProfileMobile() {
      this.hProfileOpen();
    },
    clickMessageMobile() {
      this.hMessageOpen();
    },
    clickHomeMobile(e: any) {
      const target = e.currentTarget;
      if (target.className.indexOf("is-active") === -1) {
        target.classList.toggle("is-active");
        this.hHomeOpen();
      } else {
        this.hHomeClose();
      }
    },
    closeHomeBurger(e: any) {
      e.classList.toggle("is-active");
    },
    slang(e: any) {
      store.dispatch(LANG_SETUP, e.target.textContent);
    },
    messageunread() {
      if (this.locale.messageunread) {
        if (this.user.messageunread > 0) {
          return this.locale.messageunread.replace(
            `$1`,
            this.user.messageunread.toString()
          );
        } else {
          return this.locale.messagereaded;
        }
      }
    },
    usernotify() {
      if (store.getters.messageunread > 0) {
        return true;
      } else {
        return false;
      }
    },
    clickEvent() {
      this.isEventActive = !this.isEventActive;
    },
    clickProfileItem(route: string) {
      this.$router.push(route);
      this.isProfileActive = false;
    },
    clickProfileProfile() {
      this.clickProfileItem("/launch/profile");
    },
    clickProfilePartnerbecome() {
      this.clickProfileItem("/launch/partnerbecome");
    },
    clickProfileChangepass() {
      this.clickProfileItem("/launch/changepass");
    },
    clickHelp() {
      this.clickProfileItem("/launch/help");
    },
    clickRoomPartner() {
      this.clickProfileItem("/launch/structure");
    },
    clickAgreement() {
      this.clickProfileItem("/launch/agreement");
    },
    clickPromotion() {
      this.clickProfileItem("/launch/promotion");
      this.isEventActive = false;
    },
    eventtext(event: any){
      if (event.kind === "Promotion"){
        return event.title + ' ' + this.locale.menu_promotion_page;
      }else{
        return event.title;
      }
    }
  },
});
</script>

<style scoped>
a.dropdown-item:hover {
  background-color: transparent;
}
</style>