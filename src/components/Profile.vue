<template>
  <div class="container p-1 box">
    <h1 class="title is-4 m-0">{{ locale.profile_common }}</h1>
    <div class="is-flex is-flex-wrap-wrap is-justify-content-space-between">
      <div>
        <p class="is-size-5 has-text-weight-bold">{{ locale.profile_avatar }}</p>
        <figure class="image img-avatar">
          <img :src="avatar" alt="Avatar" />
        </figure>
        <div class="file is-info">
          <label class="file-label">
            <input
              class="file-input"
              type="file"
              :disabled="loading"
              @change="validateFile($event)"
              @click="resetFile($event)"
              accept="image/jpg,image/jpeg,image/png,image/gif"
            />
            <span class="file-cta">
              <span class="file-icon">
                <font-awesome-icon :icon="['fas', 'upload']" />
              </span>
              <span class="file-label">{{ locale.reg_passcanchoose }} </span>
            </span>
          </label>
        </div>
        <span v-if="favatarer !== ''" class="has-text-danger">
          {{ favatarer }}
        </span>
      </div>
      <div>
        <div>
          <p class="is-size-5 has-text-weight-bold">
            {{ locale.profile_pasport }}
          </p>
          <table class="table">
            <tbody>
              <tr>
                <td>{{ locale.profile_lname }}</td>
                <td>{{ user.lastname }}</td>
              </tr>
              <tr>
                <td>{{ locale.profile_fname }}</td>
                <td>{{ user.firstname }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="">
        <p class="is-size-5 has-text-weight-bold">
          {{ locale.profile_contact }}
        </p>
        <table class="table">
          <tbody>
            <tr>
              <td>{{ locale.profile_email }}</td>
              <td>{{ user.email }}</td>
            </tr>
            <tr>
              <td>{{ locale.profile_phone }}</td>
              <td>{{ user.phone }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="is-flex is-flex-wrap-wrap is-justify-content-space-between">
      <div>
        <span class="is-size-5 has-text-weight-bold">{{
          locale.profile_addinfo
        }}</span>
        <table class="table">
          <tbody>
            <tr>
              <td>{{ locale.profile_nameinvite }}</td>
              <td>
                <p>{{ user.invite.name }}</p>
                <p>{{ user.invite.phone }}</p>
                <p>Email: {{ inviteemail }}

                  <a @click="copyclickinvite">
                    <span class="icon is-small ml-1">
                      <font-awesome-icon
                        :icon="['fas', 'clipboard']"
                        class="has-text-info"
                      />
                    </span>
                  </a>
                </p>
              </td>
            </tr>
            <tr>
              <td>{{ locale.profile_refer }}</td>
              <td>
                <span v-if="user.refer">
                  {{ user.refer }}
                  <a @click="copyclickrefer">
                    <span class="icon is-small ml-1">
                      <font-awesome-icon
                        :icon="['fas', 'clipboard']"
                        class="has-text-info"
                      />
                    </span>
                  </a>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="user.status === 1" class="color-back-button">
        <span class="is-size-5 has-text-weight-bold">{{
          locale.profile_accountinfo
        }}</span>
        <div class="mx-2">
          <label class="checkbox">
            <input
              type="checkbox"
              checked="autotransferprofit"
              v-model="autotransferprofit"
              :disabled="user.status !== 1"
            />
            {{ locale.profile_autotransferprofit }}
          </label>
          <div v-if="user.refer" class="mt-3">
            <label class="checkbox">
              <input
                type="checkbox"
                checked="autotransferbonus"
                v-model="autotransferbonus"
                :disabled="user.status !== 1"
              />
              {{ locale.profile_autotransferbonus }}
            </label>
          </div>
          <div class="field has-text-centered p-2">
            <div
              class="button is-size-6 color-menu-w"
              v-bind:class="{ 'div-disabled': loading === true }"
              @click="autotransferaccountscheck"
            >
              <div class="level-item">
                <span>{{ locale.profile_save }}</span>
                <span
                  v-bind:class="{ 'bulma-loader-mixin ml-2': loading === true }"
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <app-code
    @handler="fcfunchandle"
    :cancel="cancel"
    :repeat="autotransferaccountscheck"
    @send="autotransferaccounts"
    :loading="loading"
  ></app-code>
</template>

<script lang="ts">
import store from "@/store";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import { objecthash } from "@/_services/func.service";
import { USER_AUTOTRANSFER } from "@/store/actions/user";
import CodeComponent from "./Code.vue";

export default defineComponent({
  name: "ProfileComponent",
  components: {
    "app-code": CodeComponent,
  },
  computed: {
    ...mapGetters(["locale", "avatar", "user", "companysemail"]),
  },
  data() {
    const loading = false;
    const avatarok = false;
    const favatarer = "";
    const favatarsend: any = undefined;
    const fchandle: any = undefined;
    const ikey = new Date().getTime().toString();
    return {
      loading,
      token: "",
      fchandle,
      avatarok,
      favatarer,
      favatarsend,
      ikey,
      inviteemail: "",
      autotransferprofit: store.getters.user.autotransferprofit,
      autotransferbonus: store.getters.user.autotransferbonus,
    };
  },
  created() {
    this.inviteemail = this.user.invite.email;
    if (this.inviteemail === "") {
      this.inviteemail = this.companysemail;
    }
  },
  methods: {
    fcfunchandle: function (fn: any) {
      this.fchandle = fn;
    },
    cancel(): any {
      this.token = "";
      this.fchandle("");
    },
    copyclickrefer(): any {
      navigator.clipboard
        .writeText(this.user.refer || "")
        .then()
        .catch((e) => console.error(e));
    },
    copyclickinvite(): any {
      navigator.clipboard
        .writeText(this.inviteemail || "")
        .then()
        .catch((e) => console.error(e));
    },
    resetFile(fileEvent: any): void {
      fileEvent.target.value = "";
    },
    autotransferaccountscheck() {
      this.cancel();
      if (
        this.autotransferprofit !== store.getters.user.autotransferprofit ||
        this.autotransferbonus !== store.getters.user.autotransferbonus
      ) {
        this.loading = true;
        const data = {
          profit: this.autotransferprofit.toString(),
          bonus: this.autotransferbonus.toString(),
        };
        const hash = objecthash(data).toString();
        Object.assign(data, { versionuser: this.user.versionuser });
        store
          .dispatch("changeautotransfer", { data: data, idempotencykey: hash })
          .then((res) => {
            if (res.data.token) {
              this.token = res.data.token;
              this.fchandle(res.data.email);
            }
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          });
      }
    },
    autotransferaccounts(val: string): void {
      this.loading = true;
      const data = {
        profit: this.autotransferprofit.toString(),
        bonus: this.autotransferbonus.toString(),
        token: this.token,
        code: val,
      };
      const hash = objecthash(data).toString();
      Object.assign(data, { versionuser: this.user.versionuser });
      store
        .dispatch("changeautotransfer", { data: data, idempotencykey: hash })
        .then((res) => {
          this.cancel();
          store.commit(USER_AUTOTRANSFER, res.data);
          this.autotransferprofit = store.getters.user.autotransferprofit;
          this.autotransferbonus = store.getters.user.autotransferbonus;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    validateFile(fileEvent: any): void {
      this.favatarsend = fileEvent.target.files[0];
      this.avatarok = false;
      this.favatarer = "";
      if (this.favatarsend.size > 100000) {
        this.favatarer = this.locale.mp_avatarbig_er;
      } else {
        if (
          this.favatarsend.type !== "image/png" &&
          this.favatarsend.type !== "image/jpeg" &&
          this.favatarsend.type !== "image/jpg" &&
          this.favatarsend.type !== "image/gif"
        ) {
          this.favatarer = this.locale.mp_avatarfmt_er;
        } else {
          this.avatarok = true;
          this.loading = true;
          store
            .dispatch("changeavatar", {
              file: this.favatarsend,
              idempotencykey: this.ikey,
            })
            .then(() => {
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        }
      }
    },
  },
});
</script>

<style scoped>
.img-avatar {
  height: 150px;
  width: 150px;
}

@media only screen and (max-width: 475px) {
  .img-avatar {
    height: 100px;
    width: 100px;
  }
}
</style>
