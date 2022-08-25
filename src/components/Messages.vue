<template>
  <div class="container is-fluid p-0">
    <h1 class="title is-4 color-menu-f">{{ locale.menu_messages }}</h1>
    <div class="level-left level-item">
      <span>
        <input
          id="sonlyunread"
          type="checkbox"
          name="sonlyunread"
          class="switch is-rtl is-rounded is-info"
          checked="onlyUnread"
          v-model="onlyUnread"
        />
        <label class="has-text-white" for="sonlyunread">{{ locale.mess_onlyunread }}</label>
      </span>
      <span
        class="ml-2"
        v-bind:class="{ 'bulma-loader-mixin': loading === true }"
      ></span>
    </div>
    <div class="columns">
      <div class="column">
        <div class="table-scroll">
          <table class="table is-hoverable is-fullwidth is-clickable is-border">
            <app-infinityscroll
              @handlerfetch="fcfuncfetch"
              @handlerupdate="fcfuncupdate"
              :loading="loading"
              @item-click="selectmessage"
            >
              <template #node="{ item }">
                <td>
                  <div class="is-align-items-center is-flex">
                    <div
                      class="is-flex-shrink-0"
                      v-bind:class="{
                        messageunread: item.status === 0,
                        messagereaded: item.status === 1,
                      }"
                    >
                      {{ statusmessage(item) }}
                    </div>
                    {{ item.kind }}
                  </div>
                </td>
                <td style="text-align: right">
                  {{ item.date }}
                </td>
              </template>
            </app-infinityscroll>
          </table>
        </div>
      </div>
      <div v-if="titlemessage !== ''" class="column">
        <article class="message">
          <div class="message-header">
            <p>{{ titlemessage }}</p>
            <button
              class="delete"
              aria-label="delete"
              @click="closemessage"
            ></button>
          </div>
          <div class="level-left p-1 ml-2">
            <figure class="image is-32x32">
              <img :src="imglogo" alt="Logo" />
            </figure>
            <h1 class="title is-4 mx-2">{{ companyname }}</h1>
          </div>
          <div class="message-body">
            {{ textmessage }}
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import { USER_MESSAGE } from "@/store/actions/user";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import InfinityScrollComponent from "../helpers/InfinityScroll.vue";

export default defineComponent({
  name: "MessagesComponent",
  components: {
    "app-infinityscroll": InfinityScrollComponent,
  },
  props: {
    onlyunread: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const fchandlefetch: any = undefined;
    const fchandleupdate: any = undefined;
    return {
      fchandlefetch,
      fchandleupdate,
      onlyUnread: this.onlyunread,
      titlemessage: "",
      textmessage: "",
      loading: false,
    };
  },
  mounted() {
    this.loadmess();
  },
  setup() {
    return {
      imglogo: require(`../assets/images/logo.png`),
    };
  },
  computed: {
    ...mapGetters(["locale", "companyname"]),
  },
  watch: {
    onlyUnread() {
      (this.titlemessage = ""), (this.textmessage = ""), this.loadmess();
    },
    onlyunread() {
      this.onlyUnread = this.onlyunread;
    },
  },
  methods: {
    fcfuncfetch: function (fn: any) {
      this.fchandlefetch = fn;
    },
    fcfuncupdate: function (fn: any) {
      this.fchandleupdate = fn;
    },
    statusmessage(message: any) {
      if (message.status === 1) {
        return "✓";
      } else {
        return "";
      }
    },
    closemessage() {
      this.titlemessage = "";
    },
    selectmessage(e: any, item: any) {
      this.loading = true;
      store
        .dispatch("getmessage", {
          id: item.id.toString(),
        })
        .then((res: any) => {
          if (res.data) {
            this.titlemessage = res.data.kind;
            this.textmessage = res.data.comment;
            this.loading = false;
            if (res.data.status === 0) {
              this.loading = true;
              store
                .dispatch("getmessage", {
                  id: item.id.toString(),
                  readed: "true",
                })
                .then((res: any) => {
                  this.fchandleupdate(res.data.id, { status: res.data.status });
                  store.commit(USER_MESSAGE, res.data.messageunread);
                  this.loading = false;
                })
                .catch(() => {
                  this.loading = false;
                });
            }
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    loadmess(): void {
      this.fchandlefetch("");
      this.loading = true;
      if (this.onlyUnread === true) {
        this.fchandlefetch("getmessages", {
          onlyunread: this.onlyUnread.toString(),
        }).then(() => {
          this.loading = false;
        });
      } else {
        this.fchandlefetch("getmessages").then(() => {
          this.loading = false;
        });
      }
    },
  },
});
</script>