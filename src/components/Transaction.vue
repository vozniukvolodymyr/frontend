<template>
 <div class="mt-2 filter-background">   
  <div class="columns is-mobile is-multiline is-centered">
    <div class="column is-narrow">
      <input
        class="button color-menu-w"
        type="date"
        min="{{startDate}}"
        max="{{endDate}}"
        @change="changedatefrom"
        style="resize: none"
        name="datefrom"
        v-model="model.beg"
        required
      />
    </div>
    <div class="column is-narrow">
      <input
        class="button color-menu-w"
        type="date"
        min="{{startDate}}"
        max="{{endDate}}"
        @change="changedateto"
        style="resize: none"
        name="dateto"
        v-model="model.end"
        required
      />
    </div>
    <div class="column is-narrow">
      <div
        class="button color-menu-w is-size-6"
        v-bind:class="{ 'div-disabled': loading === true }"
        @click="gettransaction(true)"
      >
        <div class="level-item">
          <span>{{ locale.search }}</span>
          <span
            v-bind:class="{ 'bulma-loader-mixin ml-2': loading === true }"
          ></span>
        </div>
      </div>
    </div>
  </div>
  <div class="columns is-mobile is-multiline is-centered">
    <div class="column is-narrow">
      <button
        :disabled="transactions.length === 0"
        class="button color-menu-w" 
        @click="savepdf"
      >
        <font-awesome-icon class="mr-2 color-menu-w" :icon="['fas', 'file-pdf']" />{{
          locale.savepdf
        }}
      </button>
    </div>
    <div class="column is-narrow">
      <button
        :disabled="transactions.length === 0"
        class="button color-menu-w"
        @click="savexls"
      >
        <font-awesome-icon class="mr-2 color-menu-w" :icon="['fas', 'file-excel']" />{{
          locale.savexls
        }}
      </button>
    </div>
  </div>
  </div>
  <div id="trans-result" ref="transResult">
    <div class="table-scroll mt-2">
      <div class="color-menu-f">{{ transtitle }}</div>
      <table class="table back-transparent is-fullwidth">
        <thead>
          <tr>
            <th class="color-menu-f">{{ locale.date }}</th>
            <th class="color-menu-f">{{ locale.trans_operation }}</th>
            <th class="color-menu-f">{{ locale.trans_income }}</th>
            <th class="color-menu-f">{{ locale.trans_outcome }}</th>
            <th class="color-menu-f">{{ locale.trans_total }}</th>
          </tr>
        </thead>
        <tbody id="transaction_tbody">
          <tr v-for="item of transactions" :key="item" class="has-text-white">
            <td>{{ item.date }}</td>
            <td>{{ item.operation }}</td>
            <td>
              <div v-if="item.income > 0 || item.outcome === 0" class="has-text-success">
                {{ "+" + item.income + " " }}&#36;
              </div>
            </td>
            <td>
              <div v-if="item.outcome > 0" class="has-text-danger">
                {{ "-" + item.outcome + " " }}&#36;
              </div>
            </td>
            <td>
              <div>{{ item.total + " " }}&#36;</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      v-if="model.offset === 0 && transactions.length === 0"
      class="transempty color-menu-f"
    >
      {{ locale.trans_queryempty }}
    </div>
    <div
      v-if="model.offset === '999999999999' && !loading"
      class="transempty color-menu-f"
    >
      {{ locale.trans_queryhelp }}
    </div>
  </div>
  <div
    v-if="
      model.offset > 0 &&
      transactions.length > 0 &&
      transactions.length < transtotal
    "
    class="transcont"
  >
    <button class="btnok" @click="gettransaction(false)">
      {{ locale.continue }}
    </button>
  </div>
  
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import store from "@/store";
import { mapGetters } from "vuex";
import Transaction from "@/_models/transaction";

export default defineComponent({
  name: "TransactionComponent",
  props: {
    account: Number,
  },
  computed: {
    ...mapGetters(["locale"]),
  },
  data() {
    const loading = false;
    const model: any = {};
    const transactions: Array<Transaction> = [];
    const transtotal = 0;
    const transtitle = "";
    const startDate = "";
    const endDate = "";
    return {
      loading,
      model,
      transactions,
      transtotal,
      transtitle,
      startDate,
      endDate,
    };
  },
  setup() {
    const transResult = ref<HTMLElement>();
    return { transResult };
  },
  created() {
    this.model.offset = "999999999999";
    const today = new Date();
    this.model.beg =
      today.getFullYear() +
      "-" +
      ("0" + (today.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + today.getDate()).slice(-2);
    this.model.end = this.model.beg;
    this.endDate = this.model.beg;
    today.setDate(today.getDate() - 90);
    this.startDate =
      today.getFullYear() +
      "-" +
      ("0" + (today.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + today.getDate()).slice(-2);
    this.model.account = this.account;
  },
  methods: {
    changedatefrom(): any {
      const sdate = new Date(this.model.beg);
      const edate = new Date(this.model.end);
      if (sdate > edate) {
        this.model.end = this.model.beg;
      }
    },
    changedateto(): any {
      const sdate = new Date(this.model.beg);
      const edate = new Date(this.model.end);
      if (edate < sdate) {
        this.model.beg = this.model.end;
      }
    },
    savepdf(): any {
      this.model.type = "pdf";
      store
        .dispatch("gettransactionfile", this.model)
        .then((res: any) => {
          if (res.data) {
            const fileType = "application/pdf";
            const blob: Blob = new Blob([res.data], { type: fileType });
            const downloadLink = document.createElement("a");
            downloadLink.href = window.URL.createObjectURL(blob);
            downloadLink.setAttribute("download", "balance.pdf");
            document.body.appendChild(downloadLink);
            downloadLink.click();
            downloadLink.remove(); // remove the element
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    savexls(): any {
      this.model.type = "xlsx";
      store
        .dispatch("gettransactionfile", this.model)
        .then((res: any) => {
          if (res.data) {
            const fileType =
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
            const blob: Blob = new Blob([res.data], { type: fileType });
            const downloadLink = document.createElement("a");
            downloadLink.style.display = "none";
            downloadLink.href = window.URL.createObjectURL(blob);
            downloadLink.setAttribute("download", "balance.xlsx");
            document.body.appendChild(downloadLink);
            downloadLink.click();
            window.URL.revokeObjectURL(downloadLink.href);
            downloadLink.remove(); // remove the element
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    gettransaction(update: boolean): void {
      if (this.model.offset > 0 || update) {
        this.loading = true;
        if (update) {
          this.transactions.length = 0;
          this.model.offset = "999999999999";
          (this.transResult as HTMLElement).scrollIntoView();
        }
        this.model.type = "view";
        store
          .dispatch("gettransaction", this.model)
          .then((res: any) => {
            this.loading = false;
            if (res.data) {
              if (this.model.offset === "999999999999") {
                this.transtotal = res.data.total;
              }
              for (const transaction of res.data.data) {
                this.transactions.push(transaction);
              }
              this.model.offset = res.data.offset;
              let first = 0;
              if (this.transtotal > 0) {
                first = 1;
              }
              this.transtitle = this.locale.trans_title
                .replace(`$1`, this.transtotal?.toString())
                .replace(`$2`, first.toString())
                .replace(`$3`, this.transactions.length.toString());
            }
          })
          .catch(() => {
            this.loading = false;
          });
      }
    },
  },
});
</script>

<style scoped>
.filter-background{
   background-color: #0afcf05b;
}

.transempty {
  margin-top: 50px;
  text-align: center;
}

#trans-result table tr th:nth-child(n + 3),
td:nth-child(n + 3) {
  white-space: nowrap;
  text-align: right;
  max-width: 100%;
}

#transaction_tbody tr td:nth-child(1) {
  min-width: 6em;
}
</style>
