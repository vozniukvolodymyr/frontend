<template>
  <div class="container mt-4" style="max-width: 20rem">
    <div class="columns is-centered">
      <div class="column">
        <div class="block">
          <h1 class="title is-4 color-menu-f">
            {{ locale.cpass_name }}
          </h1>
          <h1 class="subtitle is-6 color-menu-f">{{ locale.cpass_info }}</h1>
        </div>
        <div class="block">
          <div class="field">
            <label class="has-text-white">{{ locale.cpass_oldpass }}</label>
            <div class="control has-icons-left">
              <input
                ref="ioldpass"
                class="input"
                v-bind:class="{ 'is-inputerror': !passvalid(oldpass) }"
                type="password"
                :placeholder="locale.log_pass"
                v-model="oldpass"
                @input="checkformvalid"
                required
              />
              <span class="icon is-small is-left">
                <font-awesome-icon :icon="['fas', 'lock']" />
              </span>
            </div>            
          </div>
          <div class="field">
            <label class="has-text-white">{{ locale.cpass_newpass }}</label>
            <div class="control has-icons-left">
              <input
                ref="inewpass"
                class="input"
                v-bind:class="{ 'is-inputerror': !passvalid(newpass) }"
                type="password"
                :placeholder="locale.log_pass"
                @input="stronpassword"
                v-model="newpass"
                required
              />
              <span class="icon is-small is-left">
                <font-awesome-icon :icon="['fas', 'lock']" />
              </span>
            </div>            
            <div ref="lblnpass" class="color-back-button"></div>
          </div>
          <div class="field">
            <label class="has-text-white">{{ locale.cpass_rnewpass }}</label>
            <div class="control has-icons-left">
              <input
                ref="irnewpass"
                class="input"     
                v-bind:class="{ 'is-inputerror': !passvalid(rnewpass) }"           
                type="password"
                :placeholder="locale.log_pass"
                @input="mchange"
                v-model="rnewpass"
                required
              />
              <span class="icon is-small is-left">
                <font-awesome-icon :icon="['fas', 'lock']" />
              </span>
            </div>            
          </div>
          <div class="field">
            <span v-if="passmatchok" class="has-text-danger">{{ passmatchok }}</span>
          </div>
        </div>
        <div class="block">
            <div class="button-submit is-size-6"             
            v-bind:class="{ 'div-disabled': loading || !valid === true }"
            @click="changepasscheck">
              <div class="level-item">
                <span>{{ locale.cpass_btn }}</span>
                <span
                  v-bind:class="{ 'bulma-loader-mixin ml-2': loading === true }"
                ></span>
              </div>
            </div>
        </div>
      </div>
    </div>
    <app-code
      @handler="fcfunchandle"
      :cancel="cancel"
      :repeat="changepasscheck"
      @send="changepass"
      :loading="loading"
    ></app-code>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import { ALERT_CONFIRM } from "@/store/actions/alert";
import { checkpassvalid } from "@/_services/func.service";
import { defineComponent, ref } from "vue";
import { mapGetters } from "vuex";
import CodeComponent from "./Code.vue";

export default defineComponent({
  name: "ChangePassComponent",
  components: { "app-code": CodeComponent },
  data() {
    const ikey = new Date().getTime().toString();
    const fchandle: any = undefined;
    return {
      valid: false,
      passmatchok: "",
      loading: false,
      ikey,
      fchandle,
      oldpass: "", 
      newpass: "", 
      rnewpass: "",
      token: ""
    };
  },
  setup() {
    const lblnpass = ref<HTMLElement>();
    return {
      lblnpass      
    };
  },
  computed: {
    ...mapGetters(["locale"]),
  },
  methods: {
    checkformvalid() {
        this.valid = checkpassvalid(this.oldpass) &&
                     checkpassvalid(this.newpass) && 
                     checkpassvalid(this.rnewpass);
    },
    passvalid(item: any) {
        return checkpassvalid(item)
    },
    fcfunchandle: function (fn: any) {
      this.fchandle = fn;
    },
    mchange(): void {     
      this.checkformvalid();
      this.passmatchok = "";
    },
    strongpass(pass: string): number {
      let protect = 0;
      if (pass.length < 6) {
        return 0;
      }
      //a,s,d,f
      if (pass.match("([a-z]+)")) {
        protect++;
      }
      //A,B,C,D
      if (pass.match("([A-Z]+)")) {
        protect++;
      }
      //1,2,3,4,5 ... 0
      if (pass.match("([0-9]+)")) {
        protect++;
      }
      //!@#$
      if (pass.match(/\W/)) {
        protect++;
      }
      if (protect === 2) {
        return 1;
      } else if (protect === 3) {
        return 2;
      } else if (protect === 4) {
        return 3;
      } else {
        return 0;
      }
    },
    stronpassword(): any {      
      this.mchange();
      const el = this.lblnpass;
      if (el) {
        if (this.newpass && this.newpass.length > 0) {
          const value = this.strongpass(this.newpass);
          switch (value) {
            case 2:
            case 3:
              if (value === 2) {
                el.textContent = "Medium password";
              } else {
                el.textContent = "Strong password";
              }
              el.style.color = "rgb(0, 128 , 0)";
              break;
            default:
              el.style.color = "rgb(128, 0 , 0)";
              el.textContent = "Weak password";
              break;
          }
        } else {
          el.style.color = "rgb(255, 0 , 0)";
          el.textContent = "Blank";
        }
      }
    },
    cancel(): any {
      this.token = "";
      this.fchandle("");
    },
    checkpass(): boolean {
      if (this.newpass) {
        if (this.newpass !== this.rnewpass) {
          this.passmatchok = this.locale.cpass_passmatch_er;
          return false;
        } else {
          if (this.oldpass === this.newpass) {
            this.passmatchok = this.locale.cpass_passsame_er;
            return false;
          }
        }
      } else {
        return false;
      }
      return true;
    },
    changepasscheck() {
      this.cancel();
      if (this.checkpass() === true) {
        this.loading = true;
        store
          .dispatch("changepass", {
            data: {oldpass: this.oldpass,  newpass: this.newpass,  rnewpass: this.rnewpass},      
            idempotencykey: this.ikey,
          })
          .then(
            (res: any) => {
              if (res.data.token) {
                this.token = res.data.token;
                this.fchandle(res.data.email);
              }
              this.loading = false;
            },
            () => {
              this.loading = false;
            }
          );
      }
    },
    changepass: function (val: string) {
      if (this.checkpass() === true) {
        this.loading = true;
        const models: any = {};
        models.oldpass = this.oldpass;
        models.newpass = this.newpass;
        models.rnewpass = this.rnewpass;
        models.code = val;
        models.token = this.token;
        store
          .dispatch("changepass", { data: models, idempotencykey: this.ikey })
          .then(
            () => {
              this.cancel();
              store.commit(ALERT_CONFIRM, {
                title: this.locale.cpass_name,
                mess: this.locale.cpass_changeok,
              });
              this.loading = false;
            },
            () => {
              this.loading = false;
            }
          );
      }
    },
  },
});
</script>