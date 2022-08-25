import { mount } from "@vue/test-utils"
import RegisterComponent from "@/components/Register.vue"
import store from '@/store/index';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faAngleUp, faAngleDown, faLock, faUpload } from '@fortawesome/free-solid-svg-icons'
import { LANG_SETUP } from '@/store/actions/lang';
import { ALERT_CLOSE } from '@/store/actions/alert';
import axios from 'axios';

library.add(faAngleUp);
library.add(faAngleDown);
library.add(faLock);
library.add(faUpload);

describe("RegisterComponent", () => {
    let $store;
    store.commit(LANG_SETUP, "EN");
    beforeEach(() => {
        $store = {
            state: store.state,
            getters: store.getters
        };
        store.commit(ALERT_CLOSE);
    });
    it("Register Form refer empty: error", async () => {
        let $route = { query: {} };
        const wrapper = mount(RegisterComponent, {
            global: {
                mocks: {
                    $store,
                    $route
                },
                stubs: { FontAwesomeIcon }
            }
        })
        expect(wrapper.vm.$data.step).toEqual(0);
        expect(store.state.alertstore.alerttype).toEqual("error");
        expect(store.state.alertstore.alerttext).toEqual(store.state.langstore.lang.lang.http404ref_er);
        expect(store.state.alertstore.alerttitle).toEqual("Register");
    }),
        it("Register Form refer: is founded", async () => {
            let $route = { query: { ref: 'ewtfg7Utji' } };
            jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(
                { data: { refer: "ewtfg7Utji" } }));
            const wrapper = mount(RegisterComponent, {
                global: {
                    mocks: {
                        $store,
                        $route
                    },
                    stubs: { FontAwesomeIcon }
                }
            })
            await expect(axios.get).toHaveBeenCalledWith("/api/refer", { "params": { "refer": "ewtfg7Utji" } });
            expect(wrapper.vm.$data.step).toEqual(1);
            expect(wrapper.vm.$data.refer).toEqual("ewtfg7Utji");
            expect(wrapper.vm.$data.loading).toBe(false);
            expect(wrapper.text()).toContain("Privacy and Cookies Policy I agree to the collection and processing");
        }),
        it("Register Form refer: is founded", async () => {
            let $route = { query: { ref: 'ewtfg7Utji' } };
            jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject());
            const wrapper = mount(RegisterComponent, {
                global: {
                    mocks: {
                        $store,
                        $route
                    },
                    stubs: { FontAwesomeIcon }
                }
            })
            expect(axios.get).toHaveBeenCalledWith("/api/refer", { "params": { "refer": "ewtfg7Utji" } });
            expect(wrapper.vm.$data.step).toEqual(0);
        }),
        it("Register Form refer interceptor: is not founded", async () => {
            const res = {
                response: { status: 404, data: 'referal' }
            };
            try {
                await axios.interceptors.response.handlers[0].rejected(res);
            }
            catch (e) {
                expect(e.response).toEqual(res.response);
            }
            expect(store.state.alertstore.alerttype).toEqual("error");
            expect(store.state.alertstore.alerttext).toEqual(store.state.langstore.lang.lang.http404ref_er);
            expect(store.state.alertstore.alerttitle).toEqual("Register");
        }),
        it("Register Form step 1 button-continue: is disable", async () => {
            let $route = { query: { ref: 'ewtfg7Utji' } };
            jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(
                { data: { refer: "ewtfg7Utji" } }));
            const wrapper = mount(RegisterComponent, {
                global: {
                    mocks: {
                        $store,
                        $route
                    },
                    stubs: { FontAwesomeIcon }
                }
            })
            await expect(axios.get).toHaveBeenCalledWith("/api/refer", { "params": { "refer": "ewtfg7Utji" } });
            expect(wrapper.vm.$data.step).toEqual(1);
            expect(wrapper.vm.$data.refer).toEqual("ewtfg7Utji");
            expect(wrapper.vm.$data.loading).toBe(false);
            expect(wrapper.vm.$data.oferta).toBe(false);
            const buttons = wrapper.findAll('.button-submit')
            const button = buttons.at(0);
            expect(button.classes()).toContain('div-disabled');
        }),
        it("Register Form step 1 button-continue: is enable", async () => {
            let $route = { query: { ref: 'ewtfg7Utji' } };
            jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(
                { data: { refer: "ewtfg7Utji" } }));
            const wrapper = mount(RegisterComponent, {
                global: {
                    mocks: {
                        $store,
                        $route
                    },
                    stubs: { FontAwesomeIcon }
                }
            })
            await expect(axios.get).toHaveBeenCalledWith("/api/refer", { "params": { "refer": "ewtfg7Utji" } });
            expect(wrapper.vm.$data.step).toEqual(1);
            expect(wrapper.vm.$data.refer).toEqual("ewtfg7Utji");
            expect(wrapper.vm.$data.loading).toBe(false);
            expect(wrapper.vm.$data.oferta).toBe(false);
            await wrapper.find('input[type="checkbox"]').setChecked();
            expect(wrapper.vm.$data.oferta).toBe(true);
            const buttons = wrapper.findAll('.button-submit')
            const button = buttons.at(0);
            expect(button.classes()).not.toContain('div-disabled');
        }),
        it("Register Form step 2: OK", async () => {
            let $route = { query: { ref: 'ewtfg7Utji' } };
            jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(
                { data: { refer: "ewtfg7Utji" } }));
            const wrapper = mount(RegisterComponent, {
                global: {
                    mocks: {
                        $store,
                        $route
                    },
                    stubs: { FontAwesomeIcon }
                }
            })
            await expect(axios.get).toHaveBeenCalledWith("/api/refer", { "params": { "refer": "ewtfg7Utji" } });
            expect(wrapper.vm.$data.step).toEqual(1);
            expect(wrapper.vm.$data.refer).toEqual("ewtfg7Utji");
            expect(wrapper.vm.$data.loading).toBe(false);
            expect(wrapper.vm.$data.oferta).toBe(false);
            await wrapper.find('input[type="checkbox"]').setChecked();
            expect(wrapper.vm.$data.oferta).toBe(true);
            const buttons = wrapper.findAll('.button-submit')
            const button = buttons.at(0);
            expect(button.classes()).not.toContain('div-disabled');
            await button.trigger('click');
            expect(wrapper.vm.$data.step).toEqual(2);
        }),
        it("Register Form step back 1: OK", async () => {
            let $route = { query: { ref: 'ewtfg7Utji' } };
            jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(
                { data: { refer: "ewtfg7Utji" } }));
            const wrapper = mount(RegisterComponent, {
                global: {
                    mocks: {
                        $store,
                        $route
                    },
                    stubs: { FontAwesomeIcon }
                }
            })
            await expect(axios.get).toHaveBeenCalledWith("/api/refer", { "params": { "refer": "ewtfg7Utji" } });
            expect(wrapper.vm.$data.step).toEqual(1);
            expect(wrapper.vm.$data.refer).toEqual("ewtfg7Utji");
            expect(wrapper.vm.$data.loading).toBe(false);
            expect(wrapper.vm.$data.oferta).toBe(false);
            await wrapper.find('input[type="checkbox"]').setChecked();
            expect(wrapper.vm.$data.oferta).toBe(true);
            let buttons = wrapper.findAll('.button-submit')
            let button = buttons.at(0);
            expect(button.classes()).not.toContain('div-disabled');
            await button.trigger('click');
            expect(wrapper.vm.$data.step).toEqual(2);
            buttons = wrapper.findAll('.button-submit')
            button = buttons.at(0);
            await button.trigger('click');
            expect(wrapper.vm.$data.step).toEqual(1);
        }),
        it("Register Form step 2 fields: error", async () => {
            let $route = { query: { ref: 'ewtfg7Utji' } };
            jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(
                { data: { refer: "ewtfg7Utji" } }));
            const wrapper = mount(RegisterComponent, {
                global: {
                    mocks: {
                        $store,
                        $route
                    },
                    stubs: { FontAwesomeIcon }
                }
            })
            await expect(axios.get).toHaveBeenCalledWith("/api/refer", { "params": { "refer": "ewtfg7Utji" } });
            expect(wrapper.vm.$data.step).toEqual(1);
            expect(wrapper.vm.$data.refer).toEqual("ewtfg7Utji");
            expect(wrapper.vm.$data.loading).toBe(false);
            expect(wrapper.vm.$data.oferta).toBe(false);
            await wrapper.find('input[type="checkbox"]').setChecked();
            expect(wrapper.vm.$data.oferta).toBe(true);
            let buttons = wrapper.findAll('.button-submit')
            let button = buttons.at(0);
            expect(button.classes()).not.toContain('div-disabled');
            await button.trigger('click');
            expect(wrapper.vm.$data.step).toEqual(2);
            const inputs = wrapper.findAll('.input');
            expect(inputs.at(0).classes()).toContain('is-inputerror');
            expect(inputs.at(1).classes()).toContain('is-inputerror');
            expect(inputs.at(2).classes()).toContain('is-inputerror');
            expect(inputs.at(3).classes()).toContain('is-inputerror');
            buttons = wrapper.findAll('.button-submit')
            button = buttons.at(1);
            expect(button.classes()).toContain('div-disabled');
        }),
        it("Register Form step 2 field file type: error", async () => {
            let $route = { query: { ref: 'ewtfg7Utji' } };
            jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(
                { data: { refer: "ewtfg7Utji" } }));
            const wrapper = mount(RegisterComponent, {
                global: {
                    mocks: {
                        $store,
                        $route
                    },
                    stubs: { FontAwesomeIcon }
                }
            })
            await expect(axios.get).toHaveBeenCalledWith("/api/refer", { "params": { "refer": "ewtfg7Utji" } });
            await wrapper.find('input[type="checkbox"]').setChecked();
            let buttons = wrapper.findAll('.button-submit')
            let button = buttons.at(0);
            expect(button.classes()).not.toContain('div-disabled');
            await button.trigger('click');
            //we can stub out the entire event and file
            const file = { size: 1000, type: "image/png", name: "passport.png" };
            const event = {
                target: {
                    files: [file]
                }
            };
            const fileinput = wrapper.find('.file');
            expect(fileinput.classes()).toContain('is-inputerror');
            expect(wrapper.vm.$data.passcanok).toBe(false);
            await wrapper.vm.validateFile(event);
            expect(wrapper.vm.$data.passcanok).toBe(false);
            expect(wrapper.vm.$data.fpasscan).toEqual(store.state.langstore.lang.lang.reg_passcanfmt_er);
        }),
        it("Register Form step 2 field file size: error", async () => {
            let $route = { query: { ref: 'ewtfg7Utji' } };
            jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(
                { data: { refer: "ewtfg7Utji" } }));
            const wrapper = mount(RegisterComponent, {
                global: {
                    mocks: {
                        $store,
                        $route
                    },
                    stubs: { FontAwesomeIcon }
                }
            })
            await expect(axios.get).toHaveBeenCalledWith("/api/refer", { "params": { "refer": "ewtfg7Utji" } });
            await wrapper.find('input[type="checkbox"]').setChecked();
            let buttons = wrapper.findAll('.button-submit')
            let button = buttons.at(0);
            expect(button.classes()).not.toContain('div-disabled');
            await button.trigger('click');
            //we can stub out the entire event and file
            const file = { size: 9000001, type: "application/pdf", name: "passport.pdf" };
            const event = {
                target: {
                    files: [file]
                }
            };
            const fileinput = wrapper.find('.file');
            expect(fileinput.classes()).toContain('is-inputerror');
            expect(wrapper.vm.$data.passcanok).toBe(false);
            await wrapper.vm.validateFile(event);
            expect(wrapper.vm.$data.passcanok).toBe(false);
            expect(wrapper.vm.$data.fpasscan).toEqual(store.state.langstore.lang.lang.reg_passcanbig_er);
        }),
        it("Register Form step 2 fields: OK", async () => {
            let $route = { query: { ref: 'ewtfg7Utji' } };
            jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(
                { data: { refer: "ewtfg7Utji" } }));
            const wrapper = mount(RegisterComponent, {
                global: {
                    mocks: {
                        $store,
                        $route
                    },
                    stubs: { FontAwesomeIcon }
                }
            })
            await expect(axios.get).toHaveBeenCalledWith("/api/refer", { "params": { "refer": "ewtfg7Utji" } });
            await wrapper.find('input[type="checkbox"]').setChecked();
            let buttons = wrapper.findAll('.button-submit')
            let button = buttons.at(0);
            expect(button.classes()).not.toContain('div-disabled');
            await button.trigger('click');
            const inputs = wrapper.findAll('.input');
            inputs.at(0).setValue('addreess@gmail.com');
            inputs.at(1).setValue('1234567890');
            inputs.at(2).setValue('User');
            await inputs.at(3).setValue('Anonymous');
            expect(inputs.at(0).classes()).not.toContain('is-inputerror');
            expect(inputs.at(1).classes()).not.toContain('is-inputerror');
            expect(inputs.at(2).classes()).not.toContain('is-inputerror');
            expect(inputs.at(3).classes()).not.toContain('is-inputerror');

            //we can stub out the entire event and file
            const file = { size: 100000, type: "application/pdf", name: "passport.pdf" };
            const event = {
                target: {
                    files: [file]
                }
            };
            const fileinput = wrapper.find('.file');
            expect(fileinput.classes()).toContain('is-inputerror');
            expect(wrapper.vm.$data.passcanok).toBe(false);
            await wrapper.vm.validateFile(event);
            expect(wrapper.vm.$data.passcanok).toBe(true);
            expect(fileinput.classes()).not.toContain('is-inputerror');
            buttons = wrapper.findAll('.button-submit')
            button = buttons.at(1);
            expect(button.classes()).not.toContain('div-disabled');
        }),
        it("Register Form step 3 form apply: OK", async () => {
            let $route = { query: { ref: 'ewtfg7Utji' } };
            jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(
                { data: { refer: "ewtfg7Utji" } }));
            jest.spyOn(axios, 'post').mockImplementation(() => Promise.resolve(
                    { data: { token: "fgfhfght546456J"} }));
            const wrapper = mount(RegisterComponent, {
                global: {
                    mocks: {
                        $store,
                        $route
                    },
                    stubs: { FontAwesomeIcon }
                }
            })
            await expect(axios.get).toHaveBeenCalledWith("/api/refer", { "params": { "refer": "ewtfg7Utji" } });
            await wrapper.find('input[type="checkbox"]').setChecked();
            let buttons = wrapper.findAll('.button-submit')
            let button = buttons.at(0);
            expect(button.classes()).not.toContain('div-disabled');
            await button.trigger('click');
            const inputs = wrapper.findAll('.input');
            inputs.at(0).setValue('addreess@gmail.com');
            inputs.at(1).setValue('1234567890');
            inputs.at(2).setValue('User');
            await inputs.at(3).setValue('Anonymous');
            expect(inputs.at(0).classes()).not.toContain('is-inputerror');
            expect(inputs.at(1).classes()).not.toContain('is-inputerror');
            expect(inputs.at(2).classes()).not.toContain('is-inputerror');
            expect(inputs.at(3).classes()).not.toContain('is-inputerror');

            //we can stub out the entire event and file
            const file = { size: 100000, type: "application/pdf", name: "passport.pdf" };
            const event = {
                target: {
                    files: [file]
                }
            };
            const fileinput = wrapper.find('.file');
            expect(fileinput.classes()).toContain('is-inputerror');
            expect(wrapper.vm.$data.passcanok).toBe(false);
            await wrapper.vm.validateFile(event);
            expect(wrapper.vm.$data.passcanok).toBe(true);
            expect(fileinput.classes()).not.toContain('is-inputerror');
            buttons = wrapper.findAll('.button-submit')
            button = buttons.at(1);
            expect(button.classes()).not.toContain('div-disabled');
            await button.trigger('click');
            expect(wrapper.vm.$data.step).toBe(3);
            expect(wrapper.vm.$data.token).toEqual("fgfhfght546456J");
        }),
        it("Register Form step 4 form code: False", async () => {
            let $route = { query: { ref: 'ewtfg7Utji' } };
            jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(
                { data: { refer: "ewtfg7Utji" } }));
            jest.spyOn(axios, 'post').mockImplementation(() => Promise.resolve(
                    { data: { token: "fgfhfght546456J"} }));
            const wrapper = mount(RegisterComponent, {
                global: {
                    mocks: {
                        $store,
                        $route
                    },
                    stubs: { FontAwesomeIcon }
                }
            })
            await expect(axios.get).toHaveBeenCalledWith("/api/refer", { "params": { "refer": "ewtfg7Utji" } });
            wrapper.setData({ step: 3 });
            wrapper.setData({ token: "fgfhfght546456J" });
            await wrapper.vm.register('12345678');
            expect(wrapper.vm.$data.loading).toBe(false);
        })
})