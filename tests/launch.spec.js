import './fontawesome';
import { mount } from "@vue/test-utils"
import LaunchComponent from "../src/components/Launch.vue"
import store from '../src/store/index';
import { LANG_SETUP, LANG_SUCCESS } from '../src/store/actions/lang';
import { ALERT_CLOSE } from '../src/store/actions/alert';
import { AUTH_SUCCESS } from '../src/store/actions/user';
import VueClickAway from "vue3-click-away";

describe("LaunchComponent", () => {
  let $store;
  let $route = {path: ''};
  store.commit(LANG_SETUP, "EN");
  store.commit(LANG_SUCCESS, {
    "menu_promotion_page": "For more information go to the page",
  });
  beforeEach(() => {
    $store = {
      state: store.state,
      getters: store.getters
    };
    store.commit(ALERT_CLOSE);
  });

  it("Launch Form events: empty", () => {
    store.commit(AUTH_SUCCESS, {token: "fdgdfgdfYggU12", events: [], enters: [], refer: "ewtfg7Utji"});
    const wrapper = mount(LaunchComponent, {
      global: {
        mocks: {
          $store,
          $route
        },
        stubs: ["font-awesome-icon", "router-link", "router-view", "routerLink"],
        plugins: [VueClickAway]
      }
    })
    expect(wrapper.vm.$data.isEventActive).toBe(false);
  }),
  it("Launch Form events: non empty", () => {
    store.commit(AUTH_SUCCESS, {token: "fdgdfgdfYggU12", events: [{kind: "event"}], enters: [], refer: "ewtfg7Utji"});
    const wrapper = mount(LaunchComponent, {
      global: {
        mocks: {
          $store,
          $route
        },
        stubs: ["font-awesome-icon", "router-link", "router-view", "routerLink"],
        plugins: [VueClickAway]
      }
    })
    expect(store.state.userstore.events.length).toBe(1);
  }),
  it("Launch Form events: non empty", async () => {
    store.commit(AUTH_SUCCESS, {token: "fdgdfgdfYggU12", events: [{kind: "Promotion", title: "chalenge"}], enters: [], refer: "ewtfg7Utji"});
    const wrapper = mount(LaunchComponent, {
      global: {
        mocks: {
          $store,
          $route
        },
        stubs: ["font-awesome-icon", "router-link", "router-view", "routerLink"],
        plugins: [VueClickAway]
      }
    });
    await wrapper.find(".bulma-button-mixin").trigger('click');
    expect(wrapper.vm.$data.isEventActive).toBe(true);
    expect(wrapper.text()).toMatch("chalenge"+ ' ' + store.state.langstore.lang.lang.menu_promotion_page)
  })

})