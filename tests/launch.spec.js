import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFile, faEnvelope, faLock, faChevronDown, faPhone, faMapPin, faUpload, faAngleDown, faAddressCard, 
    faHouseUser, faRunning, faUserFriends, faMoneyBill, faAngleUp, faBell, faClipboard, faSearch, faFilePdf, faFileExcel,
    faChartLine, 
    faClock,
    faGlobe,         
    faChessRook,
    faPiggyBank,
    faEuroSign,
    faHandHolding,
    faAward,         
    faDove,         
    faPlaneDeparture,
    faUnlock,
    faArrowCircleLeft,
    faHistory,
    faArrowCircleUp,
    faArrowCircleRight,
    faCoins,
    faQuestion,
    faBriefcase,
    faChevronUp,
    faFileSignature
   } from '@fortawesome/free-solid-svg-icons'
import { mount, RouterLinkStub  } from "@vue/test-utils"
import LaunchComponent from "../src/components/Launch.vue"
import store from '../src/store/index';
import { LANG_SETUP } from '../src/store/actions/lang';
import { ALERT_CLOSE } from '../src/store/actions/alert';
import { AUTH_SUCCESS } from '../src/store/actions/user';
import { RouterView } from 'vue-router';
import VueClickAway from "vue3-click-away";

library.add(faFile, faEnvelope, faLock, faChevronDown, faPhone, faMapPin, faUpload, faAngleDown, faAddressCard, 
    faHouseUser, faRunning, faUserFriends, faMoneyBill, faAngleUp, faBell, faClipboard, faSearch, faFilePdf, faFileExcel, 
    faChartLine, faClock, faGlobe, faHandHolding, faEuroSign, faChessRook, faPiggyBank, faAward, faPlaneDeparture, faDove,
    faUnlock, faArrowCircleLeft, faHistory, faArrowCircleUp, faArrowCircleRight, faCoins, faQuestion, faBriefcase, faChevronUp,
    faFileSignature)

describe("LaunchComponent", () => {
  let $store;
  let $route = {path: ''};
  store.commit(LANG_SETUP, "EN");
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