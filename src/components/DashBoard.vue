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
      <p>
        {{ locale.dashboard_amountnetraised }}:
        <span class="has-text-weight-bold"
          >{{ user.amountnetraised.toFixed(2) }} &#36;</span
        >
      </p>
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
      <table ref="userenter" style="white-space: nowrap"></table>
    </div>
    <div class="column">
      <div class="level-left level-item is-flex is-flex-wrap-wrap">
        <figure class="image is-48x48">
          <img :src="imgprofit" alt="profit" />
        </figure>
        <h1 class="title color-menu-w is-4 mr-2">
          {{ locale.dashboard_profit }}
        </h1>
        <h1
          class="title routerlink-w p-1 mr-2 is-4"
          :class="{ 'has-background-grey-lighter': isUserprofit }"
          style="white-space: nowrap"
        >
          <a
            class="has-text-black has-text-weight-bold is-4"
            @click="clickEvent"
            >{{ locale.dashboard_profit_cl }}</a
          >
        </h1>
        <h1
          class="title routerlink-w p-1 is-4"
          :class="{ 'has-background-grey-lighter': !isUserprofit }"
          style="white-space: nowrap"
        >
          <a
            class="has-text-black has-text-weight-bold"
            style="white-space: nowrap"
            @click="clickEvent"
            >{{ locale.dashboard_profit_co }}</a
          >
        </h1>
      </div>
      <table
        v-show="isUserprofit"
        ref="userprofit"
        style="white-space: nowrap"
      ></table>
      <div v-if="!isUserprofit" ref="companyprofit">
        <h1 class="title is-5 my-1">
          {{ locale.dashboard_profit_w }}
        </h1>
        <chart-line :chart-data="chartData" :chart-options="chartOptions" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import { defineAsyncComponent, defineComponent, ref } from "vue";
import { mapGetters } from "vuex";
import { findIconDefinition, icon } from "@fortawesome/fontawesome-svg-core";
import {
  dateformat,
  classrank,
  innerclassrank,
  innerclassstatus,
  monthtostr,
} from "@/_services/func.service";

const ChartLineComponent = defineAsyncComponent(
  () => import("../helpers/ChartLine.vue")
);
export default defineComponent({
  name: "DashBoardComponent",
  components: {
    "chart-line": ChartLineComponent,
  },
  computed: {
    ...mapGetters([
      "locale",
      "user",
      "companyname",
      "companysemail",
      "enters",
      "profits",
    ]),
  },
  data() {
    const chartData = {
      labels: [""],
      datasets: [
        {
          data: [0],
          borderColor: ["#503FDD"],
          backgroundColor: "#20c9d9",
          borderWidth: 1,
          tension: 0.5,
        },
      ],
    };
    const chartOptions = {
      scales: {
        y: {
          // not 'yAxes: [{' anymore (not an array anymore)
          ticks: {
            color: "black", // not 'fontColor:' anymore
            // fontSize: 18,
            font: {
              size: 14, // 'size' now within object 'font {}'
            },
            beginAtZero: true,
          },
        },
        x: {
          // not 'xAxes: [{' anymore (not an array anymore)
          ticks: {
            color: "black", // not 'fontColor:' anymore
            //fontSize: 14,
            font: {
              size: 14, // 'size' now within object 'font {}'
            },
            stepSize: 1,
            beginAtZero: true,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    };
    return {
      currdate: dateformat(new Date()),
      imglock: require(`../assets/images/lock.svg`),
      imgprofit: require(`../assets/images/profit.png`),
      timerId: 0,
      isUserprofit: true,
      isCompanyprofit: false,
      loading: false,
      chartData,
      chartOptions,
    };
  },
  setup() {
    const userenter = ref<HTMLElement>();
    const userprofit = ref<HTMLElement>();
    const companyprofit = ref<HTMLElement>();
    return {
      userenter,
      userprofit,
      companyprofit,
    };
  },
  methods: {
    copyclick() {
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
    fillprofit() {
      const coins = icon(
        findIconDefinition({ prefix: "fas", iconName: "coins" })
      );
      store.getters.profits.forEach((element: any) => {
        let etr = document.createElement("tr");
        this.userprofit?.appendChild(etr);
        etr.innerHTML = `<td class="enter-day m-1">${element.year
          .toString()
          .concat(" ", monthtostr(element.month, this.locale))}</td>`;
        etr = document.createElement("tr");
        this.userprofit?.appendChild(etr);
        etr.innerHTML = `<td class="enter-time m-1 pr-1"><p class="is-align-items-center is-flex">
                                  <span class="icon">
                                    ${coins.html}
                                  </span>
                                  ${element.profit.toFixed(2)}
                            </p></td>`;
      });
    },
    hrefmail() {
      return "mailto:" + this.companysemail;
    },
    clickEvent() {
      this.isUserprofit = !this.isUserprofit;
      if (!this.isUserprofit && !this.isCompanyprofit) {
        this.loading = true;
        store
          .dispatch("getcompanyprofit")
          .then((res) => {
            if (res.data) {
              this.chartData.labels = [...res.data.profits].map((item) => {
                const date = new Date(item.date);
                return monthtostr(date.getMonth(), this.locale).concat(
                  " ",
                  date.getFullYear().toString().slice(-2)
                );
              });
              this.chartData.datasets[0].data = [...res.data.profits].map(
                (item) => item.profit
              );
            }
            this.loading = false;
            this.isCompanyprofit = true;
          })
          .catch(() => {
            this.loading = false;
          });
      }
    },
  },
  mounted: function () {
    if (store.getters.enters.length > 0) {
      let day = store.getters.enters[0].day;
      const lock = icon(
        findIconDefinition({ prefix: "fas", iconName: "lock" })
      );
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
