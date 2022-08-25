<template>
  <div class="container is-fluid">
    <h1 class="title is-4">{{ locale.menu_documents }}</h1>
    <h1 class="subtitle is-6">
      <input
        id="sonlyunread"
        type="checkbox"
        name="sonlyunread"
        class="switch is-rtl is-info is-rounded"
        checked=onlyUnread
      />
      <label for="sonlyunread">{{ locale.doc_onlydownload }}</label>
    </h1>

    <div class="pagination">
      <span style="padding: 10px">{{ getmessagevalue() }}</span>
      <button
        :disabled="loading || messbeg == 0"
        class="btnscroll"
        @click="loadmess('back')"
      ></button>
      <button
        :disabled="loading || messend > messcnt - 1"
        class="btnscroll"
        @click="loadmess('forward')"
      ></button>
    </div>
    <table>
      <tr v-for="message in messages" :key="message.id">
        <td
          v-bind:class="{
            messnew: message.status === 'n',
            messread: message.status !== 'n',
          }"
        >
          <label class="checkbox-other">
            <input type="checkbox" v-model="message.checked" />
          </label>
        </td>
        <td
          v-bind:class="{
            messnew: message.status === 'n',
            messread: message.status !== 'n',
          }"
        >
          <a class="message" @click="messreaded(message)">{{ message.text }}</a>
        </td>
        <td
          v-bind:class="{
            messnew: message.status === 'n',
            messread: message.status !== 'n',
          }"
          style="width: 100px"
        >
          {{ message.date }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "DocumentsComponent",
  props: {
    onlyunread: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    const messages: Array<{
      id: number;
      date: string;
      status: string;
      text: string;
      checked: boolean;
      change: boolean;
    }> = [];
    return {
      onlyUnread: this.onlyunread,
      messcnt: 0,
      messpage: 20,
      messbeg: 0,
      messend: 0,
      messages,
      loading: false,
    };
  },
  computed: {
    ...mapGetters(["locale"]),
  },
  created() {
    this.loadmess("forward");
  },
  methods: {
    messreaded(message: any): void {
      if (message.status !== "r") {
        message.status = "r";
        message.change = true;
      }
    },
    loadmess(value: string): void {
      const model: any = {};
      let send = false;
      if (this.messcnt === 0) {
        model.beg = 0;
        model.end = this.messpage - 1;
        send = true;
      } else {
        if (value === "forward") {
          if (this.messend + 1 < this.messcnt) {
            model.beg = this.messend + 1;
            model.end = model.beg + this.messpage - 1;
            send = true;
          }
        } else {
          if (this.messbeg > 0) {
            model.end = this.messbeg - 1;
            model.beg = this.messbeg - this.messpage;
            send = true;
          }
        }
      }
      if (send) {
        this.loading = true;
        store
          .dispatch("getmessages", {
            onlyunread: this.onlyUnread.toString(),
            beg: model.beg.toString(),
            end: model.end.toString(),
          })          
          .then((res: any) => {
            if (res.data) {
              if (res.data.data) {
                this.messages = res.data.data;
                for (let i = 0; i < res.body.messages.length; i++) {
                  this.messages[i].checked = false;
                  this.messages[i].change = false;
                }
                this.messcnt = res.body.messcnt;
                this.messbeg = res.body.messbeg;
                this.messend = res.body.messend;
              }
            }
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          });
      }
    },
    getmessagevalue(): string {
      let end: number;
      if (this.messend > this.messcnt) {
        end = this.messcnt - 1;
      } else {
        end = this.messend;
      }
      return (
        this.messbeg +
        1 +
        " - " +
        (end + 1) +
        " " +
        this.locale.mes_page +
        " " +
        this.messcnt
      );
    },
  },
});
</script>

<style scoped>
.message {
  display: block; /* Ссылка как блочный элемент */
  padding: 5px; /* Поля вокруг надписи */
  text-decoration: none; /* Подчеркивание у ссылок убираем */
}

.message:hover {
  color: black; /* Цвет текста активного пункта */
  background-color: #ebf0f3; /* Цвет фона активного пункта */
}

.messnew {
  border-bottom: 1px solid rgb(214, 214, 214);
  font-weight: bold;
  background-color: white;
}

.messread {
  font-weight: normal;
  background-color: rgb(245, 247, 248);
  border-bottom: 1px solid rgb(230, 230, 233);
}
</style>