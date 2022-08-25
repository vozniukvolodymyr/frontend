<template>
  <div class="container mt-4" style="max-width: 30rem">
    <div class="columns is-centered">
      <div class="column">
        <div class="block">
          <h1 class="title is-4 color-menu-f">
            {{ locale.header_partnerbecome }}
          </h1>
        </div>
        <div class="block">
          <h1 class="title is-6 has-text-warning">
            {{ locale.header_partnerbecome_text }}
          </h1>
        </div>
        <div class="block">
          <label class="checkbox has-text-white">
            <input type="checkbox" v-model="oferta" />
            {{ locale.partner_warning }}
          </label>
        </div>
        <div class="block">
            <div class="button-submit is-size-6" 
            v-bind:class="{ 'div-disabled': loading || !oferta || user.refer === true }"
            @click="partnerbecomecheck">
              <div class="level-item">
                <span>{{ locale.confirm }}</span>
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
      :repeat="partnerbecomecheck"
      @send="partnerbecomecreate"
      :loading="loading"
    ></app-code>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import { ALERT_CONFIRM, ALERT_SUCCESS } from "@/store/actions/alert";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import CodeComponent from "./Code.vue";

export default defineComponent({
  name: "PartnerBecomeComponent",
  components: { "app-code": CodeComponent },
  computed: {
    ...mapGetters(["locale", "user"]),
  },
  data() {
    const fchandle: any = undefined;
    return { oferta: false, fchandle, token: "", loading: false };
  },
  methods: {
    fcfunchandle: function (fn: any) {
      this.fchandle = fn;
    },
    cancel(): any {
      this.token = "";
      this.fchandle("");
    },
    partnerbecomecreate(val: string): any {
      this.loading = true;
      const models: any = {};
      models.oferta = this.oferta;
      models.code = val;
      models.token = this.token;
      store
        .dispatch("partnerbecome", {
          data: models,
          idempotencykey: this.user.versionuser,
        })
        .then((res: any) => {          
          store.commit(ALERT_CONFIRM, {
            title: this.locale.header_partnerbecome,
            mess: this.locale.partnerbecomeok
          });
          this.cancel();
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    partnerbecomecheck() {
      this.loading = true;
      this.cancel();
      const models: any = {};
      models.oferta = this.oferta;
      store
        .dispatch("partnerbecome", {
          data: models,
          idempotencykey: this.user.versionuser,
        })
        .then((res: any) => {
          if (res.data.token) {
            this.token = res.data.token;
            this.fchandle(res.data.email);
          } else {
            store.commit(ALERT_SUCCESS, {
              title: this.locale.header_partnerbecome,
              mess: res.data,
            });
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
});
</script>