<template>
  <div class="container mt-4">
    <div>
      <h1 class="is-size-3 has-text-centered color-menu-f">
        {{ locale.myaccounts }}
      </h1>
    </div>
    <div class="columns is-mobile is-multiline is-centered mb-0">
      <div class="column is-narrow">
        <div
          ref="aAll"
          class="is-clickable card color-back-button"
          @click="accountclick"
        >
          <div>{{ locale.total }}</div>
          <div>&nbsp;</div>
          <div>{{ user.allamount() }}&#36;</div>
          <div class="card-nav-bottom"></div>
        </div>
      </div>
      <div class="column is-narrow">
        <div
          ref="aInvest"
          class="is-clickable card color-back-button"
          @click="accountclick"
        >
          <div>{{ locale.iaccounts }}</div>
          <div class="num">{{ user.printsubacount(atraninvest) }}</div>

          <div class="level-left">
            {{ user.printamount(user.accounts[0]) }}&#36;
            <span class="icon is-small ml-2">
              <font-awesome-icon :icon="['fas', 'unlock']" />
            </span>
            {{ user.printamountfree(user.accounts[0]) }}&#36;
          </div>
          <div class="card-nav-bottom"></div>
        </div>
      </div>
      <div v-if="atranoperation" class="column is-narrow">
        <div
          ref="aOperation"
          class="is-clickable card color-back-button"
          @click="accountclick"
        >
          <div>{{ locale.oaccounts }}</div>
          <div class="num">{{ user.printsubacount(atranoperation) }}</div>
          <div>{{ user.printamount(user.accounts[1]) }}&#36;</div>
          <div class="card-nav-bottom"></div>
        </div>
      </div>
      <div v-if="permpayself" class="column is-narrow">
        <div
          ref="aBonus"
          class="is-clickable card color-back-button"
          @click="accountclick"
        >
          <div>{{ locale.bonusaccount }}</div>
          <div class="num">{{ user.printsubacount(atranbonus) }}</div>
          <div>{{ user.printamount(user.accounts[2]) }}&#36;</div>
          <div class="card-nav-bottom"></div>
        </div>
      </div>
      <div v-if="atranswift" class="column is-narrow">
        <div
          ref="aSwift"
          class="is-clickable card color-back-button"
          @click="accountclick"
        >
          <div>{{ locale.saccounts }}</div>
          <div class="num">{{ user.printsubacount(atranswift) }}</div>
          <div>{{ user.printamount(user.swift) }}&#36;</div>
          <div class="card-nav-bottom"></div>
        </div>
      </div>
    </div>
    <div ref="ptabCur" id="pay_tabcur">
      <div class="table-scroll">
        <table class="table back-transparent is-fullwidth">
          <thead>
            <tr>
              <th class="color-menu-f">{{ locale.pay_date }}</th>
              <th class="color-menu-f">{{ locale.pay_status }}</th>
              <th class="color-menu-f">{{ locale.pay_amount }}</th>
              <th class="color-menu-f">{{ locale.pay_comment }}</th>
            </tr>
          </thead>
          <tbody id="pay_tbody">
            <tr v-for="item of pays" :key="item" class="has-text-white">
              <td>{{ item.date }}</td>
              <td>{{ item.status }}</td>
              <td class="has-text-success">{{ item.amount + " " }}&#36;</td>
              <td>{{ item.comment }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="loading" class="loader"></div>
      <div v-if="pays.length === 0" class="paysempty color-menu-f">
        {{ locale.pay_queryempty }}
      </div>
    </div>
    <div ref="ptabInvest" class="container" style="max-width: 50rem">
      <div
        class="
          is-flex is-justify-content-space-evenly is-flex-wrap-wrap
          paymenu
        "
      >
        <a ref="payio" @click="iclick($event)">
          <span class="icon-text has-text-left">
            <span class="icon">
              <font-awesome-icon
                class="fa-lg color-menu-w"
                :icon="['fas', 'arrow-circle-left']"
              />
            </span>
            {{ locale.menu_pays_to_o }}
          </span>
        </a>
        <a ref="payit" @click="iclick($event)">
          <span class="icon-text">
            <span class="icon">
              <font-awesome-icon
                class="fa-lg color-menu-w"
                :icon="['fas', 'history']"
              />
            </span>
            {{ locale.menu_pays_tran }}
          </span>
        </a>
      </div>
      <div ref="paytabio" class="container px-1">
        <div class="color-menu-f">
          {{ locale.paytoself }}
        </div>
        <div
          v-if="payioblocked !== ''"
          class="has-text-centered has-text-weight-bold has-text-danger"
        >
          {{ payioblocked }}
        </div>
        <div class="block">
          <div class="field">
            <label class="label has-text-white">{{ locale.amount }}</label>
            <div class="control">
              <input
                class="input"
                v-bind:class="{
                  'is-inputerror': !amountvio && atraninvest.free > 0,
                }"
                type="number"
                :placeholder="locale.amount"
                v-model="amountio"
                :disabled="payioblocked !== ''"
                required
              />
            </div>
            <div v-if="wiocheckamount" class="has-text-danger">
              {{ locale.amount_low }}
            </div>
          </div>
        </div>
        <div class="block">
          <label class="checkbox has-text-white">
            <input
              type="checkbox"
              v-model="ofertaio"
              :disabled="payioblocked !== ''"
            />
            {{ locale.pay_warning }}
          </label>
        </div>
        <div class="block">
          <div
            class="button-submit is-size-6"
            v-bind:class="{ 'div-disabled': payiobtndisabled() === true }"
            @click="createpayiocheck"
          >
            <div class="level-item">
              <span>{{ locale.confirm }}</span>
              <span
                v-bind:class="{ 'bulma-loader-mixin ml-2': loading === true }"
              ></span>
            </div>
          </div>
        </div>
      </div>
      <div ref="paytabit">
        <app-transaction :account="atraninvest?.account"></app-transaction>
      </div>
    </div>
    <div ref="ptabOperation" class="container" style="max-width: 50rem">
      <div
        class="
          is-flex is-justify-content-space-evenly is-flex-wrap-wrap
          paymenu
        "
      >
        <a ref="payoi" @click="oclick($event)">
          <span class="icon-text">
            <span class="icon">
              <font-awesome-icon
                class="fa-lg color-menu-w"
                :icon="['fas', 'arrow-circle-left']"
              />
            </span>
            {{ locale.menu_pays_to_i }}
          </span>
        </a>
        <a ref="payop" @click="oclick($event)">
          <span class="icon-text">
            <span class="icon">
              <font-awesome-icon
                class="fa-lg color-menu-w"
                :icon="['fas', 'arrow-circle-right']"
              />
            </span>
            {{ locale.menu_pays_partner }}
          </span>
        </a>
        <a ref="payoo" @click="oclick($event)">
          <span class="icon-text">
            <span class="icon">
              <font-awesome-icon
                class="fa-lg color-menu-w"
                :icon="['fas', 'arrow-circle-up']"
              />
            </span>
            {{ locale.menu_pays_out }}
          </span>
        </a>
        <a ref="payot" @click="oclick($event)">
          <span class="icon-text">
            <span class="icon">
              <font-awesome-icon
                class="fa-lg color-menu-w"
                :icon="['fas', 'history']"
              />
            </span>
            {{ locale.menu_pays_tran }}
          </span>
        </a>
      </div>
      <div ref="paytaboi">
        <div class="color-menu-f">
          {{ locale.paytoself }}
        </div>
        <div class="has-text-warning">
          {{ locale.paytoinvest }}
        </div>
        <div class="block">
          <div class="field">
            <label class="label has-text-white">{{ locale.amount }}</label>
            <div class="control">
              <input
                class="input"
                v-bind:class="{ 'is-inputerror': !amountvoi }"
                type="number"
                :placeholder="locale.amount"
                v-model="amountoi"
                required
              />
            </div>
            <div v-if="woicheckamount" class="has-text-danger">
              {{ locale.amount_low }}
            </div>
          </div>
        </div>
        <div class="block">
          <label class="checkbox has-text-white">
            <input type="checkbox" v-model="ofertaoi" />
            {{ locale.pay_warning }}
          </label>
        </div>
        <div class="block">
          <div
            class="button-submit is-size-6"
            v-bind:class="{ 'div-disabled': payoibtndisabled() === true }"
            @click="createpayoicheck"
          >
            <div class="level-item">
              <span>{{ locale.confirm }}</span>
              <span
                v-bind:class="{ 'bulma-loader-mixin ml-2': loading === true }"
              ></span>
            </div>
          </div>
        </div>
      </div>
      <div ref="paytabop">
        <div class="color-menu-f">
          {{ locale.paytopartner }}
        </div>
        <div class="block">
          <div class="field">
            <label class="has-text-white label">{{ locale.receiver }}</label>
            <div class="field has-addons">
              <p class="control is-expanded">
                <input
                  class="input"
                  v-bind:class="{ 'is-inputerror': receiverfullname === '' }"
                  type="text"
                  :placeholder="locale.receiver"
                  v-model="receiverop"
                  required
                />
              </p>
              <p class="control">
                <a
                  class="button is-info icon-mobile"
                  @click="getreceiverfullname"
                >
                  <span class="icon is-small is-right">
                    <font-awesome-icon :icon="['fas', 'search']" />
                  </span>
                </a>
              </p>
            </div>
            <div v-if="errpartner" class="has-text-danger">
              {{ errpartner }}
            </div>
            <div v-if="receiverfullname !== ''" class="color-menu-f">
              {{ receiverfullname }}
            </div>
          </div>

          <div class="field">
            <label class="label has-text-white">{{ locale.amount }}</label>
            <div class="control">
              <input
                ref="iptamount"
                class="input"
                v-bind:class="{ 'is-inputerror': !amountvop }"
                type="number"
                :placeholder="locale.pay_amount"
                v-model="amountop"
                required
              />
            </div>
            <div v-if="wopcheckamount" class="has-text-danger">
              {{ locale.amount_low }}
            </div>
            <div v-if="amountvop" class="color-menu-f">
              {{ getpayopcommissionstr() }}
            </div>
          </div>

          <div class="field">
            <label class="label has-text-white">{{ locale.comment }}</label>
            <div class="control">
              <input
                class="input"
                v-bind:class="{ 'is-inputerror': !commentvop }"
                type="text"
                :placeholder="locale.max_symbol128"
                v-model="commentop"
                required
              />
            </div>
          </div>
          <div class="block">
            <label class="checkbox has-text-white">
              <input type="checkbox" v-model="ofertaop" />
              {{ locale.pay_warning }}
            </label>
          </div>

          <div class="block">
            <div
              class="button-submit is-size-6"
              v-bind:class="{ 'div-disabled': payopbtndisabled() === true }"
              @click="createpayopcheck"
            >
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
      <div ref="paytaboo">
        <div class="color-menu-f">
          {{ locale.payoutaccount }}
        </div>
        <div class="block">
          <div
            v-if="payooblocked !== ''"
            class="has-text-centered has-text-weight-bold has-text-danger"
          >
            {{ payooblocked }}
          </div>
          <div class="field">
            <label class="label has-text-white">{{ locale.amount }}</label>
            <div class="control">
              <input
                class="input"
                v-bind:class="{ 'is-inputerror': !amountvoo }"
                type="number"
                :placeholder="locale.amount"
                :disabled="payooblocked !== ''"
                v-model="amountoo"
                required
              />
            </div>
            <div v-if="woocheckamount" class="has-text-danger">
              {{ locale.amount_low }}
            </div>
            <div v-if="amountvoo" class="color-menu-f">
              {{ getpayoocommissionstr() }}
            </div>
          </div>
        </div>
        <div class="block">
          <div class="field">
            <label class="label has-text-white">{{ locale.comment }}</label>
            <div class="control">
              <input
                class="input"
                v-bind:class="{ 'is-inputerror': !commentvoo }"
                type="text"
                :placeholder="locale.max_symbol128"
                :disabled="payooblocked !== ''"
                v-model="commentoo"
                required
              />
            </div>
          </div>
        </div>
        <div class="block">
          <label class="checkbox has-text-white">
            <input
              type="checkbox"
              v-model="ofertaoo"
              :disabled="payooblocked !== ''"
            />
            {{ locale.pay_warning }}
          </label>
        </div>
        <div class="block">
          <div
            class="button-submit is-size-6"
            v-bind:class="{ 'div-disabled': payoobtndisabled() === true }"
            @click="createpayoocheck"
          >
            <div class="level-item">
              <span>{{ locale.confirm }}</span>
              <span
                v-bind:class="{ 'bulma-loader-mixin ml-2': loading === true }"
              ></span>
            </div>
          </div>
        </div>
      </div>
      <div ref="paytabot">
        <app-transaction :account="atranoperation?.account"></app-transaction>
      </div>
    </div>
    <div
      v-if="permpayself"
      ref="ptabBonus"
      class="container"
      style="max-width: 50rem"
    >
      <div
        class="
          is-flex is-justify-content-space-evenly is-flex-wrap-wrap
          paymenu
        "
      >
        <a ref="paybo" @click="bclick($event)"
          ><span
            ><i class="bi bi-arrow-up-square"></i>&nbsp;{{
              locale.menu_pays_to_o
            }}</span
          ></a
        >
        <a ref="paybt" @click="bclick($event)"
          ><span
            ><i class="bi bi-clock-history"></i>&nbsp;{{
              locale.menu_pays_tran
            }}</span
          ></a
        >
      </div>
      <div ref="paytabbo" class="container px-1" style="max-width: 50rem">
        <div class="color-menu-f">
          {{ locale.paytoself }}
        </div>
        <div class="block">
          <div class="field">
            <label class="label has-text-white">{{ locale.amount }}</label>
            <div class="control">
              <input
                class="input"
                v-bind:class="{ 'is-inputerror': !amountvbo }"
                type="number"
                :placeholder="locale.amount"
                v-model="amountbo"
                required
              />
            </div>
            <div v-if="wbocheckamount" class="has-text-danger">
              {{ locale.amount_low }}
            </div>
          </div>
          <div class="block">
            <label class="checkbox has-text-white">
              <input type="checkbox" v-model="ofertabo" />
              {{ locale.pay_warning }}
            </label>
          </div>
          <div class="block">
            <div
              class="button-submit is-size-6"
              v-bind:class="{ 'div-disabled': paybobtndisabled() === true }"
              @click="createpaybocheck"
            >
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
      <div ref="paytabbt">
        <app-transaction :account="atranbonus?.account"></app-transaction>
      </div>
    </div>

    <div ref="ptabSwift" class="container" style="max-width: 50rem">
      <div
        class="
          is-flex is-justify-content-space-evenly is-flex-wrap-wrap
          paymenu
        "
      >
        <a ref="paysi" @click="sclick($event)">
          <span class="icon-text">
            <span class="icon">
              <font-awesome-icon
                class="fa-lg color-menu-w"
                :icon="['fas', 'arrow-circle-left']"
              />
            </span>
            {{ locale.menu_pays_to_i }}
          </span>
        </a>
        <a ref="payso" @click="sclick($event)">
          <span class="icon-text has-text-left">
            <span class="icon">
              <font-awesome-icon
                class="fa-lg color-menu-w"
                :icon="['fas', 'arrow-circle-left']"
              />
            </span>
            {{ locale.menu_pays_to_o }}
          </span>
        </a>
        <a ref="paysp" @click="sclick($event)">
          <span class="icon-text">
            <span class="icon">
              <font-awesome-icon
                class="fa-lg color-menu-w"
                :icon="['fas', 'arrow-circle-right']"
              />
            </span>
            {{ locale.menu_pays_partner }}
          </span>
        </a>
        <a ref="payst" @click="sclick($event)">
          <span class="icon-text">
            <span class="icon">
              <font-awesome-icon
                class="fa-lg color-menu-w"
                :icon="['fas', 'history']"
              />
            </span>
            {{ locale.menu_pays_tran }}
          </span>
        </a>
      </div>
      <div ref="paytabsi">
        <div class="color-menu-f">
          {{ locale.paytoself }}
        </div>
        <div class="has-text-warning">
          {{ locale.paytoinvest }}
        </div>
        <div class="block">
          <div class="field">
            <label class="label has-text-white">{{ locale.amount }}</label>
            <div class="control">
              <input
                class="input"
                v-bind:class="{ 'is-inputerror': !amountvsi }"
                type="number"
                :placeholder="locale.amount"
                v-model="amountsi"
                required
              />
            </div>
            <div v-if="wsicheckamount" class="has-text-danger">
              {{ locale.amount_low }}
            </div>
          </div>
        </div>
        <div class="block">
          <label class="checkbox has-text-white">
            <input type="checkbox" v-model="ofertasi" />
            {{ locale.pay_warning }}
          </label>
        </div>
        <div class="block">
          <div
            class="button-submit is-size-6"
            v-bind:class="{ 'div-disabled': paysibtndisabled() === true }"
            @click="createpaysicheck"
          >
            <div class="level-item">
              <span>{{ locale.confirm }}</span>
              <span
                v-bind:class="{ 'bulma-loader-mixin ml-2': loading === true }"
              ></span>
            </div>
          </div>
        </div>
      </div>
      <div ref="paytabsp">
        <div class="color-menu-f">
          {{ locale.paytopartner }}
        </div>
        <div class="block">
          <div class="field">
            <label class="has-text-white label">{{ locale.receiver }}</label>
            <div class="field has-addons">
              <p class="control is-expanded">
                <input
                  class="input"
                  v-bind:class="{ 'is-inputerror': receiverfullnames === '' }"
                  type="text"
                  :placeholder="locale.receiver"
                  v-model="receiversp"
                  required
                />
              </p>
              <p class="control">
                <a
                  class="button is-info icon-mobile"
                  @click="getreceiverfullnames"
                >
                  <span class="icon is-small is-right">
                    <font-awesome-icon :icon="['fas', 'search']" />
                  </span>
                </a>
              </p>
            </div>
            <div v-if="errpartners" class="has-text-danger">
              {{ errpartners }}
            </div>
            <div v-if="receiverfullnames !== ''" class="color-menu-f">
              {{ receiverfullnames }}
            </div>
          </div>

          <div class="field">
            <label class="label has-text-white">{{ locale.amount }}</label>
            <div class="control">
              <input
                ref="sptamount"
                class="input"
                v-bind:class="{ 'is-inputerror': !amountvsp }"
                type="number"
                :placeholder="locale.pay_amount"
                v-model="amountsp"
                required
              />
            </div>
            <div v-if="wspcheckamount" class="has-text-danger">
              {{ locale.amount_low }}
            </div>
            <div v-if="amountvsp" class="color-menu-f">
              {{ getpayspcommissionstr() }}
            </div>
          </div>

          <div class="field">
            <label class="label has-text-white">{{ locale.comment }}</label>
            <div class="control">
              <input
                class="input"
                v-bind:class="{ 'is-inputerror': !commentvsp }"
                type="text"
                :placeholder="locale.max_symbol128"
                v-model="commentsp"
                required
              />
            </div>
          </div>
          <div class="block">
            <label class="checkbox has-text-white">
              <input type="checkbox" v-model="ofertasp" />
              {{ locale.pay_warning }}
            </label>
          </div>

          <div class="block">
            <div
              class="button-submit is-size-6"
              v-bind:class="{ 'div-disabled': payspbtndisabled() === true }"
              @click="createpayspcheck"
            >
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
      <div ref="paytabso" class="container px-1">
        <div class="color-menu-f">
          {{ locale.paytoself }}
        </div>
        <div class="block">
          <div class="field">
            <label class="label has-text-white">{{ locale.amount }}</label>
            <div class="control">
              <input
                class="input"
                v-bind:class="{
                  'is-inputerror': !amountvso,
                }"
                type="number"
                :placeholder="locale.amount"
                v-model="amountso"
                required
              />
            </div>
            <div v-if="wiocheckamount" class="has-text-danger">
              {{ locale.amount_low }}
            </div>
          </div>
        </div>
        <div class="block">
          <label class="checkbox has-text-white">
            <input type="checkbox" v-model="ofertaso" />
            {{ locale.pay_warning }}
          </label>
        </div>
        <div class="block">
          <div
            class="button-submit is-size-6"
            v-bind:class="{ 'div-disabled': paysobtndisabled() === true }"
            @click="createpaysocheck"
          >
            <div class="level-item">
              <span>{{ locale.confirm }}</span>
              <span
                v-bind:class="{ 'bulma-loader-mixin ml-2': loading === true }"
              ></span>
            </div>
          </div>
        </div>
      </div>
      <div ref="paytabst">
        <app-transaction :account="atranswift?.account"></app-transaction>
      </div>
    </div>
    <app-code
      @handler="fcfunchandle"
      :cancel="cancel"
      :repeat="createpaycheck"
      @send="createpay"
      :loading="loading"
    ></app-code>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import store from "@/store";
import { mapGetters } from "vuex";
import { ALERT_ERROR, ALERT_SUCCESS } from "@/store/actions/alert";
import { USER_ACCOUNT } from "@/store/actions/user";
import CodeComponent from "./Code.vue";
import TransactionComponent from "./Transaction.vue";
import {
  amountvalid,
  commentvalid,
  dateformat,
} from "@/_services/func.service";

export default defineComponent({
  name: "PayComponent",
  components: {
    "app-code": CodeComponent,
    "app-transaction": TransactionComponent,
  },
  computed: {
    ...mapGetters(["locale", "user"]),
    permpayself(): boolean {
      if (this.atranbonus) {
        return true;
      }
      return false;
    },
    wiocheckamount(): boolean {
      return this.checkioamount(this.amountio);
    },
    woicheckamount(): boolean {
      return this.checkamount(this.atranoperation, this.amountoi);
    },
    wopcheckamount(): boolean {
      return this.checkamount(
        this.atranoperation,
        this.amountop,
        this.getpayopcommission
      );
    },
    woocheckamount(): boolean {
      return this.checkamount(
        this.atranoperation,
        this.amountoo,
        this.getpayoocommission
      );
    },
    wbocheckamount(): boolean {
      return this.checkamount(this.atranbonus, this.amountbo);
    },
    wsicheckamount(): boolean {
      return this.checkamount(this.atranswift, this.amountsi);
    },
    wsocheckamount(): boolean {
      return this.checkamount(this.atranswift, this.amountso);
    },
    wspcheckamount(): boolean {
      return this.checkamount(
        this.atranswift,
        this.amountsp,
        this.getpayspcommission
      );
    },
  },
  data() {
    const loading = false;
    const model: any = { versionpay: "", token: "" };
    const atraninvest: any = undefined;
    const atranoperation: any = undefined;
    const atranbonus: any = undefined;
    const atranswift: any = undefined;
    const fchandle: any = undefined;

    const pays: Array<{
      date: string;
      status: string;
      amount: string;
      comment: string;
    }> = [];
    return {
      loading,
      receiverop: "",
      commentop: "",
      commentvop: true,
      commentoo: "",
      commentvoo: true,
      receiversp: "",
      commentsp: "",
      commentvsp: true,
      amountio: "",
      amountoi: "",
      amountop: "",
      amountoo: "",
      amountbo: "",
      amountsi: "",
      amountsp: "",
      amountso: "",
      ofertaio: false,
      ofertaoi: false,
      ofertaop: false,
      ofertaoo: false,
      ofertabo: false,
      ofertasi: false,
      ofertasp: false,
      ofertaso: false,
      payiodisabled: true,
      payoidisabled: true,
      payopdisabled: true,
      payoodisabled: true,
      paybodisabled: true,
      paysodisabled: true,
      paysidisabled: true,
      payspdisabled: true,
      amountvio: false,
      amountvoi: false,
      amountvop: false,
      amountvoo: false,
      amountvbo: false,
      amountvso: false,
      amountvsi: false,
      amountvsp: false,
      fchandle,
      sendnum: 0,
      receiverfullname: "",
      receiverfullnames: "",
      atraninvest,
      atranoperation,
      atranbonus,
      atranswift,
      pays,
      model,
      errpartner: "",
      payooblocked: "",
      payioblocked: "",
      errpartners: "",
    };
  },
  created() {
    this.atraninvest = (this.user as any).accounts[0];
    this.atranoperation = (this.user as any).accounts[1];
    this.atranbonus = (this.user as any).accounts[2];
    this.atranswift = (this.user as any).swift;
    if (!this.atraninvest.free || this.atraninvest.free === 0) {
      this.payioblocked = store.getters.locale.pay_ioblocked;
    }
    this.loading = true;
    store
      .dispatch("getpay")
      .then((res: any) => {
        if (res.data) {
          this.model.versionpay = res.data.versionpay;
          if (res.data.data.length > 0) {
            this.fillpayitems(res.data);
          }
        }
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });
  },
  setup() {
    const aAll = ref<HTMLElement>();
    const aInvest = ref<HTMLElement>();
    const aOperation = ref<HTMLElement>();
    const aBonus = ref<HTMLElement>();
    const aSwift = ref<HTMLElement>();
    const ptabCur = ref<HTMLElement>();
    const ptabInvest = ref<HTMLElement>();
    const ptabOperation = ref<HTMLElement>();
    const ptabBonus = ref<HTMLElement>();
    const ptabSwift = ref<HTMLElement>();
    const payio = ref<HTMLElement>();
    const payit = ref<HTMLElement>();
    const payoi = ref<HTMLElement>();
    const payop = ref<HTMLElement>();
    const payoo = ref<HTMLElement>();
    const payot = ref<HTMLElement>();
    const paybo = ref<HTMLElement>();
    const paybt = ref<HTMLElement>();
    const paytabio = ref<HTMLElement>();
    const paytabit = ref<HTMLElement>();
    const paytaboi = ref<HTMLElement>();
    const paytabop = ref<HTMLElement>();
    const paytaboo = ref<HTMLElement>();
    const paytabot = ref<HTMLElement>();
    const paytabbo = ref<HTMLElement>();
    const paytabbt = ref<HTMLElement>();
    const paysi = ref<HTMLElement>();
    const paysp = ref<HTMLElement>();
    const payso = ref<HTMLElement>();
    const payst = ref<HTMLElement>();
    const paytabsi = ref<HTMLElement>();
    const paytabsp = ref<HTMLElement>();
    const paytabso = ref<HTMLElement>();
    const paytabst = ref<HTMLElement>();
    return {
      aAll,
      aInvest,
      aOperation,
      aBonus,
      aSwift,
      ptabCur,
      ptabInvest,
      ptabBonus,
      ptabOperation,
      ptabSwift,
      payio,
      payit,
      payoi,
      payop,
      payoo,
      payot,
      paybo,
      paybt,
      paytabio,
      paytabit,
      paytaboi,
      paytabop,
      paytaboo,
      paytabot,
      paytabbo,
      paytabbt,
      paysi,
      paysp,
      payso,
      payst,
      paytabsi,
      paytabsp,
      paytabso,
      paytabst,
    };
  },
  mounted() {
    this.accountvisible("block", "none", "none", "none", "none");
    this.acountactive(this.aAll);
    if (this.atranoperation) {
      this.accountivisible("block", "none");
      this.acountiactive(this.payio);
    } else {
      (this.payio as HTMLElement).style.display = "none";
      this.accountivisible("none", "block");
      this.acountiactive(this.payit);
    }
    this.accountovisible("block", "none", "none", "none");
    this.acountoactive(this.payoi);
    if (this.ptabBonus) {
      this.accountbvisible("block", "none");
      this.acountbactive(this.paybo);
    }
    if (this.ptabSwift) {
      this.accountsvisible("block", "none", "none", "none");
      this.acountsactive(this.paysi);
    }
  },
  watch: {
    commentop() {
      this.commentvop = commentvalid(this.commentop);
      this.payopdisabled = this.payopbtndisabled();
    },
    amountio() {
      this.amountvio = amountvalid(this.amountio);
      this.payiodisabled = this.payiobtndisabled();
    },
    ofertaio() {
      this.payiodisabled = this.payiobtndisabled();
    },
    amountop() {
      this.amountvop = amountvalid(this.amountop);
    },
    receiverop() {
      this.receiverfullname = "";
      this.errpartner = "";
      if (this.checkreceiversame()) {
        this.errpartner = this.locale.receiversame_er;
      }
      this.payopdisabled = this.payopbtndisabled();
    },
    amountoi() {
      this.amountvoi = amountvalid(this.amountoi);
      this.payoidisabled = this.payoibtndisabled();
    },
    ofertaoi() {
      this.payoidisabled = this.payoibtndisabled();
    },
    amountbo() {
      this.amountvbo = amountvalid(this.amountbo);
      this.paybodisabled = this.paybobtndisabled();
    },
    ofertabo() {
      this.paybodisabled = this.paybobtndisabled();
    },
    ofertaop() {
      this.payopdisabled = this.payopbtndisabled();
    },
    amountoo() {
      this.amountvoo = amountvalid(this.amountoo);
      this.payoodisabled = this.payoobtndisabled();
    },
    commentoo() {
      this.commentvoo = commentvalid(this.commentoo);
      this.payoodisabled = this.payoobtndisabled();
    },
    amountsi() {
      this.amountvsi = amountvalid(this.amountsi);
      this.paysidisabled = this.paysibtndisabled();
    },
    ofertasi() {
      this.paysidisabled = this.paysibtndisabled();
    },
    amountso() {
      this.amountvso = amountvalid(this.amountso);
      this.paysodisabled = this.paysobtndisabled();
    },
    ofertaso() {
      this.paysodisabled = this.paysobtndisabled();
    },
    receiversp() {
      this.receiverfullnames = "";
      this.errpartners = "";
      if (this.checkreceiversames()) {
        this.errpartners = this.locale.receiversame_er;
      }
      this.payspdisabled = this.payspbtndisabled();
    },
    commentsp() {
      this.commentvsp = commentvalid(this.commentsp);
      this.payspdisabled = this.payspbtndisabled();
    },
    amountsp() {
      this.amountvsp = amountvalid(this.amountsp);
    },
    ofertasp() {
      this.payspdisabled = this.payspbtndisabled();
    },
  },
  methods: {
    fcfunchandle: function (fn: any) {
      this.fchandle = fn;
    },
    payopbtndisabled(): any {
      return (
        !this.commentvop ||
        this.btndisabled(this.atranoperation, this.amountop, this.ofertaop) ||
        this.receiverfullname === "" ||
        this.checkreceiversame()
      );
    },
    payiobtndisabled(): boolean {
      return (
        this.loading ||
        !this.amountvio ||
        !this.ofertaio ||
        this.atraninvest.free === undefined ||
        this.atraninvest.free === 0 ||
        this.payioblocked !== "" ||
        this.checkioamount(this.amountio)
      );
    },
    payoibtndisabled(): boolean {
      return (
        this.loading ||
        !this.amountvoi ||
        this.btndisabled(this.atranoperation, this.amountoi, this.ofertaoi)
      );
    },
    payoobtndisabled(): boolean {
      return (
        this.loading ||
        !this.amountvoo ||
        !this.commentvoo ||
        this.payooblocked !== "" ||
        this.btndisabled(this.atranoperation, this.amountoo, this.ofertaoo)
      );
    },
    paybobtndisabled(): boolean {
      return (
        this.loading ||
        !this.amountvbo ||
        this.btndisabled(this.atranbonus, this.amountbo, this.ofertabo)
      );
    },
    paysibtndisabled(): boolean {
      return (
        this.loading ||
        !this.amountvsi ||
        this.btndisabled(this.atranswift, this.amountsi, this.ofertasi)
      );
    },
    paysobtndisabled(): boolean {
      return (
        this.loading ||
        !this.amountvso ||
        this.btndisabled(this.atranswift, this.amountso, this.ofertaso)
      );
    },
    payspbtndisabled(): any {
      return (
        !this.commentvsp ||
        this.btndisabled(this.atranswift, this.amountsp, this.ofertasp) ||
        this.receiverfullnames === "" ||
        this.checkreceiversames()
      );
    },
    acountactive(target: any): any {
      let el: HTMLElement;
      el = this.aAll as HTMLElement;
      el.className = el.className.replace(" card-active", "");
      el = this.aInvest as HTMLElement;
      el.className = el.className.replace(" card-active", "");
      el = this.aOperation as HTMLElement;
      if (el) {
        el.className = el.className.replace(" card-active", "");
      }
      el = this.aBonus as HTMLElement;
      if (el) {
        el.className = el.className.replace(" card-active", "");
      }
      el = this.aSwift as HTMLElement;
      if (el) {
        el.className = el.className.replace(" card-active", "");
      }
      target.className += " card-active";
    },
    accountvisible(
      tabCur: string,
      tabInvest: string,
      tabOperation: string,
      tabBonus: string,
      tabSwift: string
    ): any {
      (this.ptabCur as HTMLElement).style.display = tabCur;
      (this.ptabInvest as HTMLElement).style.display = tabInvest;
      (this.ptabOperation as HTMLElement).style.display = tabOperation;
      if (this.ptabBonus) {
        (this.ptabBonus as HTMLElement).style.display = tabBonus;
      }
      if (this.ptabSwift) {
        (this.ptabSwift as HTMLElement).style.display = tabSwift;
      }
    },
    acountiactive(target: any): any {
      let el: HTMLElement;
      el = this.payio as HTMLElement;
      el.className = el.className.replace(" card-active", "");
      el = this.payit as HTMLElement;
      el.className = el.className.replace(" card-active", "");
      target.className += " card-active";
    },
    accountivisible(tabio: string, tabit: string): any {
      (this.paytabio as HTMLElement).style.display = tabio;
      (this.paytabit as HTMLElement).style.display = tabit;
    },
    acountoactive(target: any): any {
      let el: HTMLElement;
      el = this.payoi as HTMLElement;
      el.className = el.className.replace(" card-active", "");
      el = this.payop as HTMLElement;
      el.className = el.className.replace(" card-active", "");
      el = this.payoo as HTMLElement;
      el.className = el.className.replace(" card-active", "");
      el = this.payot as HTMLElement;
      el.className = el.className.replace(" card-active", "");
      target.className += " card-active";
    },
    accountovisible(
      payoi: string,
      payop: string,
      payoo: string,
      payot: string
    ): any {
      (this.paytaboi as HTMLElement).style.display = payoi;
      (this.paytabop as HTMLElement).style.display = payop;
      (this.paytaboo as HTMLElement).style.display = payoo;
      (this.paytabot as HTMLElement).style.display = payot;
    },
    acountbactive(target: any): any {
      let el: HTMLElement;
      el = this.paybo as HTMLElement;
      el.className = el.className.replace(" card-active", "");
      el = this.paybt as HTMLElement;
      el.className = el.className.replace(" card-active", "");
      target.className += " card-active";
    },
    accountbvisible(paybo: string, paybt: string): any {
      (this.paytabbo as HTMLElement).style.display = paybo;
      (this.paytabbt as HTMLElement).style.display = paybt;
    },
    acountsactive(target: any): any {
      let el: HTMLElement;
      el = this.paysi as HTMLElement;
      el.className = el.className.replace(" card-active", "");
      el = this.payso as HTMLElement;
      el.className = el.className.replace(" card-active", "");
      el = this.paysp as HTMLElement;
      el.className = el.className.replace(" card-active", "");
      el = this.payst as HTMLElement;
      el.className = el.className.replace(" card-active", "");
      target.className += " card-active";
    },
    accountsvisible(
      paysi: string,
      payso: string,
      paysp: string,
      payst: string
    ): any {
      (this.paytabsi as HTMLElement).style.display = paysi;
      (this.paytabso as HTMLElement).style.display = payso;
      (this.paytabsp as HTMLElement).style.display = paysp;
      (this.paytabst as HTMLElement).style.display = payst;
    },
    accountclick(event: any): any {
      if (event.currentTarget === this.aAll) {
        if (event.currentTarget.className.indexOf("card-active") === -1) {
          this.acountactive(event.currentTarget);
          this.accountvisible("block", "none", "none", "none", "none");
        }
      } else if (event.currentTarget === this.aInvest) {
        if (event.currentTarget.className.indexOf("card-active") === -1) {
          this.acountactive(event.currentTarget);
          this.accountvisible("none", "block", "none", "none", "none");
        }
      } else if (event.currentTarget === this.aOperation) {
        if (event.currentTarget.className.indexOf("card-active") === -1) {
          this.acountactive(event.currentTarget);
          this.accountvisible("none", "none", "block", "none", "none");
        }
      } else if (event.currentTarget === this.aBonus) {
        if (event.currentTarget.className.indexOf("card-active") === -1) {
          this.acountactive(event.currentTarget);
          this.accountvisible("none", "none", "none", "block", "none");
        }
      } else if (event.currentTarget === this.aSwift) {
        if (event.currentTarget.className.indexOf("card-active") === -1) {
          this.acountactive(event.currentTarget);
          this.accountvisible("none", "none", "none", "none", "block");
        }
      }
    },
    iclick(event: any): any {
      if (event.currentTarget === this.payio) {
        if (event.currentTarget.className.indexOf("card-active") === -1) {
          this.acountiactive(event.currentTarget);
          this.accountivisible("block", "none");
        }
      } else if (event.currentTarget === this.payit) {
        if (event.currentTarget.className.indexOf("card-active") === -1) {
          this.acountiactive(event.currentTarget);
          this.accountivisible("none", "block");
        }
      }
    },
    oclick(event: any): any {
      if (event.currentTarget === this.payoi) {
        if (event.currentTarget.className.indexOf("card-active") === -1) {
          this.acountoactive(event.currentTarget);
          this.accountovisible("block", "none", "none", "none");
        }
      } else if (event.currentTarget === this.payop) {
        if (event.currentTarget.className.indexOf("card-active") === -1) {
          this.acountoactive(event.currentTarget);
          this.accountovisible("none", "block", "none", "none");
        }
      } else if (event.currentTarget === this.payoo) {
        if (event.currentTarget.className.indexOf("card-active") === -1) {
          this.acountoactive(event.currentTarget);
          this.accountovisible("none", "none", "block", "none");
        }
      } else if (event.currentTarget === this.payot) {
        if (event.currentTarget.className.indexOf("card-active") === -1) {
          this.acountoactive(event.currentTarget);
          this.accountovisible("none", "none", "none", "block");
        }
      }
    },
    bclick(event: any): any {
      if (event.currentTarget === this.paybo) {
        if (event.currentTarget.className.indexOf("card-active") === -1) {
          this.acountbactive(event.currentTarget);
          this.accountbvisible("block", "none");
        }
      } else if (event.currentTarget === this.paybt) {
        if (event.currentTarget.className.indexOf("card-active") === -1) {
          this.acountbactive(event.currentTarget);
          this.accountbvisible("none", "block");
        }
      }
    },
    sclick(event: any): any {
      if (event.currentTarget === this.paysi) {
        if (event.currentTarget.className.indexOf("card-active") === -1) {
          this.acountsactive(event.currentTarget);
          this.accountsvisible("block", "none", "none", "none");
        }
      } else if (event.currentTarget === this.payso) {
        if (event.currentTarget.className.indexOf("card-active") === -1) {
          this.acountsactive(event.currentTarget);
          this.accountsvisible("none", "block", "none", "none");
        }
      } else if (event.currentTarget === this.paysp) {
        if (event.currentTarget.className.indexOf("card-active") === -1) {
          this.acountsactive(event.currentTarget);
          this.accountsvisible("none", "none", "block", "none");
        }
      } else if (event.currentTarget === this.payst) {
        if (event.currentTarget.className.indexOf("card-active") === -1) {
          this.acountsactive(event.currentTarget);
          this.accountsvisible("none", "none", "none", "block");
        }
      }
    },
    btndisabled(account: any, amount: any, oferta: any): boolean {
      const res = this.loading || !oferta;
      if (res === false && amount) {
        return this.checkamount(account, amount);
      } else {
        return true;
      }
    },
    checkamount(account: any, sum: any, commission: any = undefined): any {
      if (sum) {
        let amount = Number(sum);
        if (commission) {
          amount = amount + commission();
        }
        if (
          Number.isNaN(amount) ||
          amount < 0 ||
          amount > this.user.findaccount(account.account).amount
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    checkioamount(sum: any): any {
      if (sum) {
        let amount = Number(sum);
        if (
          Number.isNaN(amount) ||
          amount < 0 ||
          amount > this.atraninvest.free
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    resultpay(body: any): any {
      if (body) {
        if (body.status === 1) {
          this.model.versionpay = body.versionpay;
          if (body.data) {
            const status = body.data[0].status;
            body.data[0].status = this.statuspay(body.data[0].status);
            this.pays.unshift(body.data[0]);
            if (status !== 4) {
              this.checkpayversion();
            }
          }
          store.commit(ALERT_SUCCESS, {
            title: this.locale.menu_pays,
            mess: this.locale.payconfirmwait,
          });
        } else if (body.status === 0) {
          store.commit(USER_ACCOUNT, body.data);
          store.commit(ALERT_SUCCESS, {
            title: this.locale.menu_pays,
            mess: this.locale.payconfirmok,
          });
        }
        if (body.status === 2) {
          this.model.versionpay = body.versionpay;
          if (body.data) {
            this.fillpayitems(body.data);
          }
          store.commit(ALERT_ERROR, {
            title: this.locale.menu_pays,
            mess: this.locale.payconfirmoutpay,
          });
        } else if (body.status === 4) {
          if (body.data) {
            store.commit(USER_ACCOUNT, body.data);
          }
          store.commit(ALERT_ERROR, {
            title: this.locale.menu_pays,
            mess: this.locale.payconfirmoutacc,
          });
        }
      }
    },
    checkreceiversame(): any {
      if (
        this.user.accounts[0].account.toString() === this.receiverop ||
        this.user.accounts[1].account.toString() === this.receiverop
      ) {
        return true;
      } else {
        return false;
      }
    },
    getreceiverfullname(): any {
      if (!this.loading) {
        if (/^-?[1-9]\d{11,12}$/.test(this.receiverop)) {
          if (this.checkreceiversame()) {
            return;
          }
          this.loading = true;
          store
            .dispatch("getpartner", { receiver: this.receiverop })
            .then((res: any) => {
              this.loading = false;
              if (res.data.surname) {
                this.receiverfullname =
                  res.data.surname + " " + res.data.firstname;
                this.payopdisabled = this.payopbtndisabled();
              } else {
                this.errpartner = res.data;
              }
            })
            .catch(() => {
              this.loading = false;
            });
        }
      }
    },
    checkreceiversames(): any {
      if (
        this.user.accounts[0].account.toString() === this.receiversp ||
        this.user.accounts[1].account.toString() === this.receiversp
      ) {
        return true;
      } else {
        return false;
      }
    },
    getreceiverfullnames(): any {
      if (!this.loading) {
        if (/^-?[1-9]\d{11,12}$/.test(this.receiversp)) {
          if (this.checkreceiversame()) {
            return;
          }
          this.loading = true;
          store
            .dispatch("getpartner", { receiver: this.receiversp })
            .then((res: any) => {
              this.loading = false;
              if (res.data.surname) {
                this.receiverfullnames =
                  res.data.surname + " " + res.data.firstname;
                this.payspdisabled = this.payspbtndisabled();
              } else {
                this.errpartners = res.data;
              }
            })
            .catch(() => {
              this.loading = false;
            });
        }
      }
    },
    executepay(data: any, num: number): any {
      //const hash = objecthash(data).toString();
      const hash = new Date().getTime().toString();
      data.versionaccount = this.user.versionaccount;
      data.versionpay = this.model.versionpay;
      this.loading = true;
      let obj;
      if (num === 1) {
        obj = store.dispatch("payio", { data: data, idempotencykey: hash });
      } else if (num === 2) {
        obj = store.dispatch("payoi", { data: data, idempotencykey: hash });
      } else if (num === 3) {
        obj = store.dispatch("payop", { data: data, idempotencykey: hash });
      } else if (num === 4) {
        obj = store.dispatch("payoo", { data: data, idempotencykey: hash });
      } else if (num === 5) {
        obj = store.dispatch("paybo", { data: data, idempotencykey: hash });
      } else if (num === 6) {
        obj = store.dispatch("paysi", { data: data, idempotencykey: hash });
      } else if (num === 7) {
        obj = store.dispatch("payso", { data: data, idempotencykey: hash });
      } else if (num === 8) {
        obj = store.dispatch("paysp", { data: data, idempotencykey: hash });
      }
      if (obj) {
        this.sendnum = num;
        obj
          .then((res: any) => {
            if (res.data.token) {
              this.model.token = res.data.token;
              this.fchandle(res.data.email);
            } else {
              this.resultpay(res.data);
              this.cancel();
            }
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          });
      }
    },
    cancel(): any {
      this.sendnum = 0;
      this.model.token = "";
      this.fchandle("");
    },
    getpayoocommissionstr(): any {
      const value = this.getpayoocommission();
      const str = value.toFixed(2);
      return this.locale.paysrc_commision.concat(": ", str);
    },
    getpayoocommission(): any {
      if (this.amountoo) {
        const amount = Number(this.amountoo);
        if (amount > 0) {
          return Math.min(
            Math.max(
              this.user.commissionoo.min,
              amount * this.user.commissionoo.percent
            ),
            this.user.commissionoo.max
          );
        }
      }
      return 0;
    },
    getpayopcommissionstr(): any {
      const value = this.getpayopcommission();
      const str = value.toFixed(2);
      return this.locale.paysrc_commision.concat(": ", str);
    },
    getpayopcommission(): any {
      if (this.amountop) {
        const amount = Number(this.amountop);
        if (amount > 0) {
          return Math.min(
            Math.max(
              this.user.commissionop.min,
              amount * this.user.commissionop.percent
            ),
            this.user.commissionop.max
          );
        }
      }
      return 0;
    },
    getpayspcommissionstr(): any {
      const value = this.getpayspcommission();
      const str = value.toFixed(2);
      return this.locale.paysrc_commision.concat(": ", str);
    },
    getpayspcommission(): any {
      if (this.amountsp) {
        const amount = Number(this.amountsp);
        if (amount > 0) {
          return Math.min(
            Math.max(
              this.user.commissionop.min,
              amount * this.user.commissionop.percent
            ),
            this.user.commissionop.max
          );
        }
      }
      return 0;
    },
    fillpayio(): any {
      return {
        amount: this.amountio,
        oferta: this.ofertaio,
      };
    },
    fillpayoi(): any {
      return {
        amount: this.amountoi,
        oferta: this.ofertaoi,
      };
    },
    fillpayop(): any {
      return {
        sender: this.atraninvest.account,
        receiver: this.receiverop,
        amount: this.amountop,
        oferta: this.ofertaop,
        comment: this.commentop,
      };
    },
    fillpayoo(): any {
      return {
        sender: this.atranoperation.account,
        amount: this.amountoo,
        comment: this.commentoo,
        oferta: this.ofertaoo,
      };
    },
    fillpaybo(): any {
      return {
        sender: this.atranbonus.account,
        receiver: this.atranoperation.account,
        amount: this.amountbo,
        oferta: this.ofertabo,
      };
    },
    fillpaysi(): any {
      return {
        amount: this.amountsi,
        oferta: this.ofertasi,
      };
    },
    fillpayso(): any {
      return {
        amount: this.amountso,
        oferta: this.ofertaso,
      };
    },
    fillpaysp(): any {
      return {
        sender: this.atranswift.account,
        receiver: this.receiversp,
        amount: this.amountsp,
        oferta: this.ofertasp,
        comment: this.commentsp,
      };
    },
    createpayio(val: string): void {
      const data = this.fillpayio();
      data.code = val;
      data.token = this.model.token;
      this.executepay(data, 1);
    },
    createpayoi(val: string): void {
      const data = this.fillpayoi();
      data.code = val;
      data.token = this.model.token;
      this.executepay(data, 2);
    },
    createpayop(val: string): void {
      const data = this.fillpayop();
      data.code = val;
      data.token = this.model.token;
      this.executepay(data, 3);
    },
    createpayoo(val: string): void {
      const data = this.fillpayoo();
      data.code = val;
      data.token = this.model.token;
      this.executepay(data, 4);
    },
    createpaybo(val: string): void {
      const data = this.fillpaybo();
      data.code = val;
      data.token = this.model.token;
      this.executepay(data, 5);
    },
    createpaysi(val: string): void {
      const data = this.fillpaysi();
      data.code = val;
      data.token = this.model.token;
      this.executepay(data, 6);
    },
    createpayso(val: string): void {
      const data = this.fillpayso();
      data.code = val;
      data.token = this.model.token;
      this.executepay(data, 7);
    },
    createpaysp(val: string): void {
      const data = this.fillpaysp();
      data.code = val;
      data.token = this.model.token;
      this.executepay(data, 8);
    },
    createpayiocheck(): void {
      this.cancel();
      const data = this.fillpayio();
      this.executepay(data, 1);
    },
    createpayoicheck(): void {
      this.cancel();
      const data = this.fillpayoi();
      this.executepay(data, 2);
    },
    createpayopcheck(): void {
      this.cancel();
      const data = this.fillpayop();
      this.executepay(data, 3);
    },
    createpayoocheck(): void {
      this.cancel();
      const data = this.fillpayoo();
      this.executepay(data, 4);
    },
    createpaybocheck(): void {
      this.cancel();
      const data = this.fillpaybo();
      this.executepay(data, 5);
    },
    createpaysicheck(): void {
      this.cancel();
      const data = this.fillpaysi();
      this.executepay(data, 6);
    },
    createpaysocheck(): void {
      this.cancel();
      const data = this.fillpayso();
      this.executepay(data, 7);
    },
    createpayspcheck(): void {
      this.cancel();
      const data = this.fillpaysp();
      this.executepay(data, 8);
    },
    createpaycheck(): void {
      if (this.sendnum === 1) {
        this.createpayiocheck();
      } else if (this.sendnum === 2) {
        this.createpayoicheck();
      } else if (this.sendnum === 3) {
        this.createpayopcheck();
      } else if (this.sendnum === 4) {
        this.createpayoocheck();
      } else if (this.sendnum === 5) {
        this.createpaybocheck();
      } else if (this.sendnum === 6) {
        this.createpaysicheck();
      } else if (this.sendnum === 7) {
        this.createpaysocheck();
      } else if (this.sendnum === 8) {
        this.createpayspcheck();
      }
    },
    createpay(val: string): void {
      if (this.sendnum === 1) {
        this.createpayio(val);
      } else if (this.sendnum === 2) {
        this.createpayoi(val);
      } else if (this.sendnum === 3) {
        this.createpayop(val);
      } else if (this.sendnum === 4) {
        this.createpayoo(val);
      } else if (this.sendnum === 5) {
        this.createpaybo(val);
      } else if (this.sendnum === 6) {
        this.createpaysi(val);
      } else if (this.sendnum === 7) {
        this.createpayso(val);
      } else if (this.sendnum === 8) {
        this.createpaysp(val);
      }
    },
    checkpayversion() {
      let lastpay = new Date(this.model.versionpay);
      lastpay.setDate(lastpay.getDate() + 91);
      const today = new Date();
      if (today < lastpay) {
        this.payooblocked = this.locale.pay_ooblocked + dateformat(lastpay);
      }
    },
    statuspay(status: any) {
      if (status === 1) {
        return this.locale.statuspay_create;
      } else if (status === 2) {
        return this.locale.statuspay_process;
      } else if (status === 3) {
        return this.locale.statuspay_confirm;
      } else if (status === 4) {
        return this.locale.statuspay_cancel;
      } else {
        return "";
      }
    },
    fillpayitems(items: any) {
      const status = items.data[0].status;
      for (let i = 0; i < items.data.length; i += 1) {
        items.data[i].status = this.statuspay(items.data[i].status);
      }
      this.pays = items.data;
      if (status !== 4) {
        this.checkpayversion();
      }
    },
  },
});
</script>

<style scoped>
.paymenu a {
  padding: 3px 3px;
  margin: 10px 5px;
  background-color: #91e6f0;
  color: #411f99;
  border-radius: 10px;
  text-align: center;
}

.paysempty {
  margin-top: 50px;
  text-align: center;
  font-weight: bold;
}

.paymenu a.card-active {
  background-color: #20c9d9;
  border-radius: 10px;
  transform: scale(1.1);
  color: #411f99;
}

.card {
  background-color: #e9faff;
  min-width: calc(10em);
  height: calc(6em);
  padding: 0.5em 0.5em 0 0.5em;
  color: #411f99;
  font-weight: bold;
}
.num {
  text-align: right;
  font-weight: bold;
}

.card-nav-bottom {
  background-color: #e9faff;
}
.card:hover,
.card:hover .card-nav-bottom {
  background-color: #d0f4ff;
}
.card-active,
.card-active .card-nav-bottom {
  background-color: #20c9d9;
  color: #411f99;
  font-weight: bold;
}
.card-active:hover,
.card-active:hover .card-nav-bottom {
  background-color: #1db4c3;
}

.card-nav-bottom {
  cursor: pointer;
  padding-top: 1em;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  position: relative;
}

.card-nav-bottom::after {
  content: "";
  position: absolute;
  display: inline-block;
  bottom: 0;
  transform: translateX(-50%) translateY(100%);
  width: 0;
  height: 0;
  left: 50%;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-top: 15px solid #e9faff;
  transition: border-color 0.2s ease, visibility 0.2s ease;
  visibility: hidden;
}
.card:hover .card-nav-bottom::after {
  border-top-color: #d0f4ff;
}
.card-active .card-nav-bottom::after {
  visibility: visible;
  border-top-color: #20c9d9;
}
.card-active:hover .card-nav-bottom::after {
  border-top-color: #1db4c3;
}

#pay_tabcur table tr th:nth-child(n + 3),
td:nth-child(n + 3) {
  white-space: nowrap;
  text-align: right;
  max-width: 100%;
}

#pay_tbody tr td:nth-child(1) {
  min-width: 6em;
}
</style>