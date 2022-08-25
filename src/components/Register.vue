<template>
  <div class="is-flex is-justify-content-flex-end">
    <app-language :innerTitleClass="'has-text-white'"></app-language>
  </div>
  <app-alert></app-alert>
  <div v-if="step === 1" class="container wrap">
    <div class="column">
      <h1 class="title is-3 mx-2 color-menu-f">{{ locale.policytext }}</h1>
      <div class="block is-50vh-height is-border-g p-1">
        <app-policy-ru v-if="glname === 'RU'"></app-policy-ru>
        <app-policy-en v-if="glname === 'EN'"></app-policy-en>
      </div>
      <div class="block">
        <label class="checkbox has-text-white">
          <input type="checkbox" v-model="oferta" />
          {{ locale.reg_agree }}
        </label>
      </div>

      <div class="is-flex is-justify-content-flex-end">
        <div
          class="button-submit is-size-6"
          v-bind:class="{ 'div-disabled': oferta === false }"
          @click="registercontinue"
        >
          {{ locale.reg_continue }}
        </div>
      </div>
    </div>
  </div>
  <div v-if="step === 2" class="container px-1" style="max-width: 20rem">
    <div class="columns is-centered">
      <div class="column">
        <nav class="level">
          <div class="level-item">
            <figure class="image is-48x48">
              <img :src="imglogo" alt="Logo" />
            </figure>
            <h1 class="title color-menu-f is-4 mx-2">{{ companyname }}</h1>
          </div>
        </nav>
        <form>
          <h1 class="title color-menu-f is-5 my-2">
            {{ locale.log_log_title }}
          </h1>
          <h1 class="subtitle color-menu-f is-6 my-4">
            {{ locale.reg_reg_text }}
          </h1>
          <div class="field">
            <label class="label has-text-white">{{ locale.log_email }} *</label>              
            <div class="control">
              <input
                class="input"
                v-bind:class="{ 'is-inputerror': !vemail }"
                type="email"
                autocomplete="off"
                :placeholder="locale.log_email"
                v-model="email"
                required
              />
            </div>
          </div>
          <div class="field">
            <label class="label has-text-white">{{ locale.reg_phone }} *</label>
            <div class="level-item control">
              <input
                class="input"
                v-bind:class="{ 'is-inputerror': !vphone }"
                type="tel"
                autocomplete="off"
                :placeholder="locale.reg_phone"
                v-model="phone"
                required
              />
            </div>
          </div>
          <div class="field">
            <label class="label has-text-white">{{ locale.reg_lname }} *</label>
            <div class="level-item control">
              <input
                class="input"
                v-bind:class="{ 'is-inputerror': !vlname }"
                type="text"
                autocomplete="off"
                :placeholder="locale.reg_lname"
                v-model="lname"
                required
              />
            </div>
          </div>
          <div class="field">
            <label class="label has-text-white">{{ locale.reg_fname }} *</label>
            <div class="level-item control">
              <input
                class="input"
                v-bind:class="{ 'is-inputerror': !vfname }"
                type="text"
                autocomplete="off"
                :placeholder="locale.reg_fname"
                v-model="fname"
                required
              />
            </div>
          </div>

          <div class="field">
            <label class="label has-text-white">{{ locale.reg_passcan }} *</label>
            <div class="file is-boxed has-name is-fullwidth has-text-centered"            
                v-bind:class="{ 'is-inputerror': !passcanok }"
              >
              <label class="file-label">
                <input                
                  class="file-input"                  
                  type="file"
                  @change="validateFile($event)"
                  accept=".pdf"
                />
                <span class="file-cta">
                  <span class="file-icon">
                    <font-awesome-icon :icon="['fas', 'upload']" />
                  </span>
                  <span class="file-label color-menu-w"
                    >{{ locale.reg_passcanchoose }}
                  </span>
                </span>
                <span
                  class="is-border-g"
                  style="white-space: nowrap"
                  :class="[passcanok ? 'has-text-white' : 'has-text-danger']"
                >
                  <div> {{ fpasscan }}</div>                  
                  <button
                    v-if="fpasscan !== ''"
                    class="delete"
                    aria-label="close"
                    @click="fileclear($event)"
                  ></button>                 
                </span>
              </label>
            </div>
          </div>
          <div class="is-flex is-justify-content-flex-end">
            <div class="button-submit is-size-6" @click="registercancel">
              {{ locale.reg_back }}
            </div>
            <div
              class="button-submit is-size-6 ml-3"
              v-bind:class="{
                'div-disabled':
                  loading ||
                  !vemail ||
                  !vphone ||
                  !vlname ||
                  !vfname ||
                  !passcanok,
              }"
              @click="registercheck"
            >
              <div class="level-item">
                <span>{{ locale.reg_continue }}</span>
                <span
                  v-bind:class="{ 'bulma-loader-mixin ml-2': loading === true }"
                ></span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div v-show="step === 3" class="container px-1" style="max-width: 23rem">
    <div class="columns is-centered">
      <div class="column">
        <nav class="level mb-5">
          <div class="level-item">
            <figure class="image is-48x48">
              <img :src="imglogo" alt="Logo" />
            </figure>
            <h1 class="title color-menu-f is-4 mx-2">{{ companyname }}</h1>
          </div>
        </nav>
        <div class="has-background-white is-border-g p-2">
          <app-code
            v-show="step === 3"
            @handler="fcfunchandle"
            :cancel="cancelcode"
            :repeat="registercheck"
            @send="register"
            :loading="loading"
            :modal="false"
          ></app-code>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import { ALERT_ERROR, ALERT_CONFIRM } from "@/store/actions/alert";
import { LANG_SETUP } from "@/store/actions/lang";
import { AUTH_LOGOUT } from "@/store/actions/user";
import { looksLikeMail } from "@/_services/func.service";
import { defineAsyncComponent, defineComponent } from "vue";
import { mapGetters } from "vuex";
import { checkref, regcheck, regconfirm } from "../_services/rest.data";
import CodeComponent from "./Code.vue";
import AlertComponent from "./Alert.vue";
import LanguageComponent from "./Language.vue";
const PolicyRuComponent = defineAsyncComponent(() => import("./Policy/ru.vue"));
const PolicyEnComponent = defineAsyncComponent(() => import("./Policy/en.vue"));

export default defineComponent({
  name: "RegisterComponent",
  components: {
    "app-code": CodeComponent,
    "app-alert": AlertComponent,
    "app-language": LanguageComponent,
    "app-policy-ru": PolicyRuComponent,
    "app-policy-en": PolicyEnComponent,
  },
  computed: {
    ...mapGetters(["locale", "companyname", "glname"]),
  },
  data() {
    const loading = false;
    const passcanok = false;
    const fpasscan = "";
    const fpasscansend: any = undefined;
    const refer = undefined;
    const fchandle: any = undefined;
    return {
      token: "",
      email: "",
      phone: "",
      lname: "",
      fname: "",
      vemail: false,
      vphone: false,
      vlname: false,
      vfname: false,
      fchandle,
      loading,
      passcanok,
      fpasscan,
      fpasscansend,
      refer,
      step: 0,
      oferta: false,
      imglogo: require(`../assets/images/logo.png`),
    };
  },
  created() {
    store.commit(AUTH_LOGOUT);
    this.loading = true;
    if (this.$route.query.ref) {
      checkref(this.$route.query.ref as string)
        .then((res: any) => {
          this.step = 1;
          this.refer = res.data.refer;
          this.loading = false;
        })
        .catch(() => {
          this.refer = undefined;
          this.loading = false;
        });
    } else {
      store.commit(ALERT_ERROR, {
        title: this.locale.reg_reg,
        mess: this.locale.http404ref_er,
      });
    }
  },
  watch: {
    email() {
      this.vemail = looksLikeMail(this.email) && this.email.length < 128;
    },
    phone() {
      this.vphone =
        this.phone.length > 6 &&
        this.phone.length < 64 &&
        /^[0-9]+$/.test(this.phone);
    },
    lname() {
      this.vlname =
        this.lname.length > 1 &&
        this.lname.length < 64 &&
        /^[a-zA-Z]+$/.test(this.lname);
    },
    fname() {
      this.vfname =
        this.fname.length > 1 &&
        this.fname.length < 64 &&
        /^[a-zA-Z]+$/.test(this.fname);
    },
  },
  methods: {
    slang(e: any) {
      store.dispatch(LANG_SETUP, e.target.value);
    },
    fcfunchandle: function (fn: any) {
      this.fchandle = fn;
    },
    validateFile(fileEvent: any): void {
      if (fileEvent.target.files.length > 0) {
        this.fpasscansend = fileEvent.target.files[0];
        this.passcanok = false;
        fileEvent.target.value = "";
        if (this.fpasscansend.size > 9000000) {
          this.fpasscan = this.locale.reg_passcanbig_er;
        } else {
          if (this.fpasscansend.type !== "application/pdf") {
            this.fpasscan = this.locale.reg_passcanfmt_er;
          } else {
            this.passcanok = true;
            this.fpasscan = this.fpasscansend.name;
          }
        }
      }
    },
    cancelcode(): any {
      this.registercancel();
      this.cancel();
    },
    cancel(): any {
      this.token = "";
      this.fchandle("");
    },
    register(val: string): any {
      this.loading = true;
      const models: any = {};
      models.email = this.email;
      models.phone = this.phone;
      models.lname = this.lname;
      models.fname = this.fname;
      models.refer = this.refer;
      models.code = val;
      models.token = this.token;
      const ikey = new Date().getTime().toString();
      regconfirm(models, this.fpasscansend, ikey)
        .then((res: any) => {
          this.cancel();
          store.commit(ALERT_CONFIRM, {
            title: this.locale.reg_reg,
            mess: this.locale.reg_ok,
          });
          this.cancel();
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    registercheck() {
      this.loading = true;
      this.cancel();
      const models: any = {};
      models.email = this.email;
      models.phone = this.phone;
      models.lname = this.lname;
      models.fname = this.fname;
      models.refer = this.refer;
      const idkey = new Date().getTime().toString();
      regcheck(models, idkey)
        .then((res: any) => {
          this.loading = false;
          if (res.data.token) {
            this.registercontinue();
            this.token = res.data.token;
            this.fchandle(this.email);
          } else {
            store.commit(ALERT_CONFIRM, {
              title: this.locale.reg_reg,
              mess: res.data,
            });
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    fileclear(e: any) {
      this.fpasscan = "";
      this.passcanok = false;
      e.preventDefault();
    },
    registercancel() {
      if (this.step === 1) {
        this.$router.push("/login");
      } else {
        this.step = this.step - 1;
      }
    },
    registercontinue() {
      this.step = this.step + 1;
    },
  },
});
</script>
