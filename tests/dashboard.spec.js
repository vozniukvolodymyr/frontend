import './fontawesome';
import { mount } from "@vue/test-utils";
import 'jest-canvas-mock';
import DashBoardComponent from "../src/components/DashBoard.vue";
import store from '../src/store/index';
import { LANG_SETUP, LANG_SUCCESS } from '../src/store/actions/lang';
import { ALERT_CLOSE } from '../src/store/actions/alert';
import { AUTH_SUCCESS } from '../src/store/actions/user';
import VueClickAway from "vue3-click-away";
import axios from 'axios';
import flushPromises from 'flush-promises'

describe("DashBoardComponent", () => {
  let $store;
  let $route = { path: '' };
  store.commit(LANG_SETUP, "EN");
  store.commit(LANG_SUCCESS, {
    "status_nonactive": "Inactive",
    "month_January": "January",
    "month_February": "February",
    "month_March": "March",
    "month_April": "April",
    "month_May": "May",
    "month_June": "June",
    "month_July": "July",
    "month_August": "August",
    "month_September": "September",
    "month_October": "October",
    "month_November": "November",
    "month_December": "December"
  });
  beforeEach(() => {
    $store = {
      state: store.state,
      getters: store.getters
    };
    store.commit(ALERT_CLOSE);
  });

  it("DashBoard Form initialization: params", () => {
    store.commit(AUTH_SUCCESS, { token: "fdgdfgdfYggU12", events: [], enters: [], refer: "ewtfg7Utji" });
    const wrapper = mount(DashBoardComponent, {
      global: {
        mocks: {
          $store,
          $route
        },
        stubs: ["font-awesome-icon", "router-link", "router-view", "routerLink"],
        plugins: [VueClickAway]
      }
    })
    expect(wrapper.vm.$data.isUserprofit).toBe(true);
    expect(wrapper.vm.$data.isCompanyprofit).toBe(false);
  });
  it("DashBoard Form load Enter user: OK", () => {
    const enters = [
      { day: "22-01-10", time: "10:00:00", ip: "127.0.0.1" },
      { day: "22-01-11", time: "11:00:00", ip: "127.0.0.2" },
      { day: "22-01-12", time: "13:00:00", ip: "127.0.0.3" }
    ]
    store.commit(AUTH_SUCCESS, { token: "fdgdfgdfYggU12", events: [], enters: enters, refer: "ewtfg7Utji" });
    const wrapper = mount(DashBoardComponent, {
      global: {
        mocks: {
          $store,
          $route
        },
        stubs: ["font-awesome-icon", "router-link", "router-view", "routerLink"],
        plugins: [VueClickAway]
      }
    })
    expect(wrapper.vm.$data.isUserprofit).toBe(true);
    expect(wrapper.vm.$data.isCompanyprofit).toBe(false);
    expect(store.state.userstore.enters).toEqual(enters);
  });
  it("DashBoard Form load profitUser: OK", () => {
    const profits = [
      { year: 2022, month: 1, profit: 1.6 },
      { year: 2022, month: 2, profit: 3 },
      { year: 2022, month: 3, profit: 0.5 }
    ]
    store.commit(AUTH_SUCCESS, { token: "fdgdfgdfYggU12", events: [], enters: [], profits: profits, refer: "ewtfg7Utji" });
    const wrapper = mount(DashBoardComponent, {
      global: {
        mocks: {
          $store,
          $route
        },
        stubs: ["font-awesome-icon", "router-link", "router-view", "routerLink"],
        plugins: [VueClickAway]
      }
    })
    expect(wrapper.vm.$data.isUserprofit).toBe(true);
    expect(wrapper.vm.$data.isCompanyprofit).toBe(false);
    expect(store.state.userstore.profits).toEqual(profits);
  });
  it("DashBoard Form mount profitUser: OK", () => {
    const profits = [
      { year: 2022, month: 1, profit: 1.6 },
      { year: 2022, month: 2, profit: 3 },
      { year: 2022, month: 3, profit: 0.5 }
    ]
    store.commit(AUTH_SUCCESS, { token: "fdgdfgdfYggU12", events: [], enters: [], profits: profits, refer: "ewtfg7Utji" });
    const wrapper = mount(DashBoardComponent, {
      global: {
        mocks: {
          $store,
          $route
        },
        stubs: ["font-awesome-icon", "router-link", "router-view", "routerLink"],
        plugins: [VueClickAway]
      }
    })
    expect(wrapper.vm.$data.isUserprofit).toBe(true);
    expect(wrapper.vm.$data.isCompanyprofit).toBe(false);
    expect(store.state.userstore.profits).toEqual(profits);
    expect(wrapper.vm.$refs.userprofit.innerHTML).toContain("2022 February");
    expect(wrapper.vm.$refs.userprofit.innerHTML).toContain("2022 March");
    expect(wrapper.vm.$refs.userprofit.innerHTML).toContain("2022 January");
  });
  it("DashBoard Form load profitCompany: Error", async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject());
    store.commit(AUTH_SUCCESS, { token: "fdgdfgdfYggU12", events: [], enters: [], refer: "ewtfg7Utji" });
    const wrapper = mount(DashBoardComponent, {
      global: {
        mocks: {
          $store,
          $route
        },
        stubs: ["font-awesome-icon", "router-link", "router-view", "routerLink"],
        plugins: [VueClickAway]
      }
    })
    expect(wrapper.vm.$data.isUserprofit).toBe(true);
    expect(wrapper.vm.$data.isCompanyprofit).toBe(false);
    expect(wrapper.vm.$data.loading).toBe(false);

    wrapper.vm.clickEvent();
    expect(wrapper.vm.$data.loading).toBe(true);
    expect(wrapper.vm.$data.isUserprofit).toBe(false);
    expect(wrapper.vm.$data.isCompanyprofit).toBe(false);
    expect(axios.get).toHaveBeenCalledWith("/api/profit",
      {
        "headers": { "Authorization": "Bearer fdgdfgdfYggU12" },
        "params": {}
      });
    try {
      await flushPromises();
    } catch (e) {
      expect(e).toEqual("Error");
    }
    expect(wrapper.vm.$data.loading).toBe(false);
    expect(wrapper.vm.$data.chartData.labels).toEqual([""]);
  });
  it("DashBoard Form load profitCompany: OK", async () => {
    const profitCompany = [
      { date: new Date("2022-02-01"), profit: 1.6 },
      { date: new Date("2022-03-01"), profit: 1.9 },
      { date: new Date("2022-04-01"), profit: 0.1 },
      { date: new Date("2022-05-01"), profit: 2.1 },
    ];
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(
      { data: { profits: profitCompany } }));
    store.commit(AUTH_SUCCESS, { token: "fdgdfgdfYggU12", events: [], enters: [], refer: "ewtfg7Utji" });
    const wrapper = mount(DashBoardComponent, {
      global: {
        mocks: {
          $store,
          $route
        },
        stubs: ["font-awesome-icon", "router-link", "router-view", "routerLink"],
        plugins: [VueClickAway]
      }
    })
    expect(wrapper.vm.$data.isUserprofit).toBe(true);
    expect(wrapper.vm.$data.isCompanyprofit).toBe(false);
    expect(wrapper.vm.$data.loading).toBe(false);
    wrapper.vm.clickEvent();
    expect(wrapper.vm.$data.loading).toBe(true);
    expect(wrapper.vm.$data.isUserprofit).toBe(false);
    expect(wrapper.vm.$data.isCompanyprofit).toBe(false);
    expect(axios.get).toHaveBeenCalledWith("/api/profit",
      {
        "headers": { "Authorization": "Bearer fdgdfgdfYggU12" },
        "params": {}
      });
    await flushPromises();
    expect(wrapper.vm.$data.loading).toBe(false);
    expect(wrapper.vm.$data.isCompanyprofit).toBe(true);
    expect(wrapper.vm.$data.chartData.labels).toEqual(["January 22", "February 22", "March 22", "April 22"]);
    expect(wrapper.vm.$data.chartData.datasets[0].data).toEqual([1.6, 1.9, 0.1, 2.1]);
    expect(wrapper.vm.$refs.companyprofit.style.display).toBe("");
    expect(wrapper.vm.$refs.userprofit.style.display).toBe("none");
    wrapper.vm.clickEvent();
    expect(wrapper.vm.$data.loading).toBe(false);
  });
})