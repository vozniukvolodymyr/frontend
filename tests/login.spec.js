import { mount } from "@vue/test-utils"
import LoginComponent from "../src/components/Login.vue"
import store from '../src/store/index';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { LANG_SETUP } from '../src/store/actions/lang';
import { ALERT_CLOSE } from '../src/store/actions/alert';
import axios from 'axios';

library.add(faAngleUp);
library.add(faAngleDown)

describe("LoginComponent", () => {
  let $store;
  store.commit(LANG_SETUP, "EN");
  beforeEach(() => {
    $store = {
      state: store.state,
      getters: store.getters
    };
    store.commit(ALERT_CLOSE);
  });

  it("Login Form email empty: error", async () => {
    const wrapper = mount(LoginComponent, {
      global: {
        mocks: {
          $store
        },
        stubs: { FontAwesomeIcon }
      }
    })
    expect(store.state.alertstore.alerttype).toEqual("");
    await wrapper.find(".button-submit").trigger('click');
    expect(store.state.alertstore.alerttype).toEqual("error");
    expect(store.state.alertstore.alerttext).toEqual(store.state.langstore.lang.lang.log_er);
    expect(store.state.alertstore.alerttitle).toEqual("Log in");
  }),
    it("Login Form email uncorrect: error", async () => {
      const wrapper = mount(LoginComponent, {
        global: {
          mocks: {
            $store
          },
          stubs: { FontAwesomeIcon }
        }
      })
      expect(store.state.alertstore.alerttype).toEqual("");
      const emailField = wrapper.find('input[type="email"]')
      await emailField.setValue("emailaddress");
      await wrapper.find(".button-submit").trigger('click');
      expect(store.state.alertstore.alerttype).toEqual("error");
      expect(store.state.alertstore.alerttext).toEqual(store.state.langstore.lang.lang.log_er);
      expect(store.state.alertstore.alerttitle).toEqual("Log in");
    }),
    it("Login Form password empty: error", async () => {
      const wrapper = mount(LoginComponent, {
        global: {
          mocks: {
            $store
          },
          stubs: { FontAwesomeIcon }
        }
      })
      expect(store.state.alertstore.alerttype).toEqual("");
      const emailField = wrapper.find('input[type="email"]')
      await emailField.setValue("emailaddress@gmail.com");
      await wrapper.find(".button-submit").trigger('click');
      expect(store.state.alertstore.alerttype).toEqual("error");
      expect(store.state.alertstore.alerttext).toEqual(store.state.langstore.lang.lang.log_er);
      expect(store.state.alertstore.alerttitle).toEqual("Log in");
    })

  it("Login Form send: OK", async () => {
    const wrapper = mount(LoginComponent, {
      global: {
        mocks: {
          $store
        },
        stubs: { FontAwesomeIcon }
      }
    })

    jest.spyOn(axios, 'post').mockImplementation(() => Promise.resolve(
      { data: { token: "fdgdfgdfYggU12", events: [], enters: [], refer: "ewtfg7Utji" } }));

    const emailField = wrapper.find('input[type="email"]')
    await emailField.setValue("emailaddress@gmail.com");
    const passField = wrapper.find('input[type="password"]')
    await passField.setValue("RghwzuO23");
    await wrapper.find(".button-submit").trigger('click');
    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(store.state.userstore.status).toEqual("success");
    expect(store.state.userstore.token).toEqual("fdgdfgdfYggU12");
    expect(store.state.userstore.userservice.user.refer).toEqual(window.location.origin + '/register?ref=ewtfg7Utji');
    expect(wrapper.vm.$data.loading).toBe(false);
  }),
  it("Login Form send: Error", async () => {
    const wrapper = mount(LoginComponent, {
      global: {
        mocks: {
          $store
        },
        stubs: { FontAwesomeIcon }
      }
    })

    jest.spyOn(axios, 'post').mockImplementation(() => Promise.reject({status: 404}));
    const emailField = wrapper.find('input[type="email"]')
    await emailField.setValue("emailaddress@gmail.com");
    const passField = wrapper.find('input[type="password"]')
    await passField.setValue("RghwzuO23");
    await wrapper.find(".button-submit").trigger('click');
    expect(store.state.userstore.status).toEqual("error");
  })

})