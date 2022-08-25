<template>
  <div class="box">
    <h3 class="has-text-weight-bold mb-3">
      <p>{{ locale.dashboard_title }} {{ user.fullusername() }}</p>
    </h3>
    <p>
      {{ locale.dashboard_title1 }}
      <span class="has-text-weight-bold">{{ companyname }}</span
      >!
    </p>
    <p>
      {{ locale.dashboard_statusaccount }}
      <span :class="_innerclassstatus()">{{ statusaccount() }}</span>
    </p>
    <div
      v-if="user.status === 0 && user.accounts.length > 0"
      :class="_innerclassstatus()"
    >
      <p>{{ locale.erroraccountneedactive }}</p>
      <p>
        {{ locale.amount_low }}: {{ locale.dashboard_onaccount }}
        {{ user.accounts[0].amount }} &#36;
      </p>
      <span>{{ locale.number_account }} : </span>
      <span class="is-size-4">{{ user.accounts[0].account }}</span>
      <a @click="copyclick">
        <span class="icon is-small ml-3">
          <font-awesome-icon
            :icon="['fas', 'clipboard']"
            class="has-text-info"
          />
        </span>
      </a>
    </div>
    <p>
      {{ locale.dashboard_userank }}
      <span :class="_innerclassrank()">{{ _classrank() }}</span>
    </p>
    <div v-if="user.refer">
      {{ locale.dashboard_amountraised }}:
      <span class="has-text-weight-bold"
        >{{ user.amountraised.toFixed(2) }} &#36;</span
      >
      <p>{{ locale.dashboard_amountnetraised }}:
      <span class="has-text-weight-bold"
        >{{ user.amountnetraised.toFixed(2) }} &#36;</span
      ></p>
    </div>
    <p v-if="enters.length > 0">
      {{ locale.dashboard_loginlast1 }} {{ enters[0].time }},
      {{ enters[0].day }}, {{ locale.dashboard_loginlast2 }} {{ enters[0].ip }}.
    </p>
    <p>
      {{ locale.dashboard_answer1 }}
      {{ companyname }} {{ locale.dashboard_answer2 }}
    </p>
    <p class="is-align-items-center is-flex">
      <span class="icon mr-1">
        <font-awesome-icon :icon="['fas', 'envelope']" class="color-menu-w" />
      </span>
      {{ locale.dashboard_email }}
      <span class="routerlink-w ml-1">
        <a class="color-menu-w" :href="hrefmail()"> {{ companysemail }}</a>
      </span>
    </p>
    <p>{{ locale.dashboard_bestregards }},</p>
    {{ currdate }} – <span class="has-text-weight-bold">{{ companyname }}</span>
  </div>

  <div class="box columns">
    <div class="column">
      <div class="level-left level-item">
        <figure class="image is-48x48">
          <img :src="imglock" alt="lock" />
        </figure>
        <h1 class="title color-menu-w is-4 mx-2">
          {{ locale.dashboard_enter }}
        </h1>
      </div>
      <table ref="userenter"></table>
    </div>
    <div class="column">
      <div class="level-left">
        <figure class="image is-48x48">
          <img :src="imgprofit" alt="profit" />
        </figure>
        <h1 class="title color-menu-w is-4 mx-2">
          {{ locale.dashboard_profit }}
        </h1>
      </div>
      <table ref="userprofit"></table>
    </div>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import { defineComponent, ref } from "vue";
import { mapGetters } from "vuex";
import { findIconDefinition, icon } from "@fortawesome/fontawesome-svg-core";
import {
  dateformat,
  classrank,
  innerclassrank,
  innerclassstatus,
  monthtostr
} from "@/_services/func.service";

export default defineComponent({
  name: "DashBoardComponent",
  computed: {
    ...mapGetters([
      "locale",
      "user",
      "companyname",
      "companysemail",
      "enters",
      "profits"
    ]),
  },
  data() {
    return {
      currdate: dateformat(new Date()),
      imglock: require(`../assets/images/lock.svg`),
      imgprofit: require(`../assets/images/profit.png`),
      timerId: 0
    };
  },
  setup() {
    const userenter = ref<HTMLElement>();
    const userprofit = ref<HTMLElement>();
    return {
      userenter,
      userprofit
    };
  },
  methods: {
    copyclick(): any {
      navigator.clipboard
        .writeText(this.user.accounts[0].account)
        .then()
        .catch((e) => console.error(e));
    },
    statusaccount() {
      if (store.getters.locale.status_nonactive) {
        switch (store.getters.user.status) {
          case 1:
            return store.getters.locale.status_active;
          case 2:
            return store.getters.locale.status_blocked;
          case 3:
            return store.getters.locale.status_close;
          default:
            return store.getters.locale.status_nonactive;
        }
      } else {
        return "";
      }
    },
    _innerclassstatus() {
      return innerclassstatus(store.getters.user.status);
    },
    _classrank() {
      return classrank(store.getters.user.rank, store.getters.locale);
    },
    _innerclassrank() {
      return innerclassrank(store.getters.user.rank);
    },
    elementprofile(i: any) {
      let element = store.getters.profits[i];
      let etr = document.createElement("tr");
      this.userprofit?.appendChild(etr);
      let etd = document.createElement("td");
      etr.appendChild(etd);
      etd.className = "enter-day m-1";
      etd.textContent = element.year
        .toString()
        .concat(" ", monthtostr(element.month, this.locale));
      etr = document.createElement("tr");
      this.userprofit?.appendChild(etr);
      etd = document.createElement("td");
      etr.appendChild(etd);
      etd.className = "enter-time m-1 pr-1";
      const text = element.profit.toFixed(2);
      const coins = icon(
        findIconDefinition({ prefix: "fas", iconName: "coins" })
      );
      etd.innerHTML = `
                            <p class="is-align-items-center is-flex">                                              
                                  <span class="icon">
                                    ${coins.html}
                                  </span>                     
                                  ${text}
                            </p>`;
    },
    fillprofit() {
      if (store.getters.profits.length > 0) {
        for (let i = 0; i < store.getters.profits.length; i += 1) {
          this.elementprofile(i);
        }
      }
    },
    hrefmail() {
      return "mailto:" + this.companysemail;
    },
  },
  mounted: function () {
    if (store.getters.enters.length > 0) {
      let day = store.getters.enters[0].day;
      for (let i = 0; i < store.getters.enters.length; i += 1) {
        let element = store.getters.enters[i];
        let etr = document.createElement("tr");
        this.userenter?.appendChild(etr);
        let etd = document.createElement("td");
        etr.appendChild(etd);
        if (day !== element.day || i === 0) {
          etd.className = "enter-day m-1";
          etd.textContent = element.day;
          day = etd.textContent;
          etr = document.createElement("tr");
          this.userenter?.appendChild(etr);
          etd = document.createElement("td");
          etr.appendChild(etd);
        }
        etd.className = "enter-time m-1 pr-1";
        const text = element.time
          .concat(", ")
          .concat(element.day)
          .concat(` ${this.locale.ipaddress}: `)
          .concat(element.ip);
        const lock = icon(
          findIconDefinition({ prefix: "fas", iconName: "lock" })
        );
        etd.innerHTML = `
                            <p class="is-align-items-center is-flex">                                              
                                  <span class="icon">
                                    ${lock.html}
                                  </span>                     
                                  ${text}
                            </p>`;
      }
    }
    if (store.getters.locale.status_nonactive) {
      this.fillprofit();
    } else {
      this.timerId = setInterval(() => {
        if (store.getters.locale.status_nonactive) {
          clearTimeout(this.timerId);
          this.fillprofit();
        }
      }, 500);
    }
  },
});
</script>

<style scoped>
</style>
