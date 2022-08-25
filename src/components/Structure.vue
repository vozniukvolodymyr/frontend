<template>
  <div class="table-scroll">
    <div v-if="structure.nodes[0].text" class="tree-wrap color-back-menu has-text-centered">
      <blocks-tree
        :data="structure.nodes[0]"
        :horizontal="false"
        :collapsable="true"
        @node-expand="onExpand"
        @node-click="onClick"
      >
        <template #node="{ data, context }">
          <div
            class="cgender"
            v-bind:class="[
              context.isSelected() === true
                ? 'color-back-button'
                : _innerclassrank(data),
              data && data.item.status > 0
              ? 'user-active'
              : 'user-noactive',
            ]"
          >
            <img style="pointer-events: none" class="igender" :src="iunknown" />
          </div>
          <slot v-if="data && data.item">
            <div
              class="has-text-white"
              style="cursor: default"
            >
              {{ data.text }}
            </div>
          </slot>
        </template>
      </blocks-tree>
    </div>
  </div>
  <footer class="has-background-link-light p-1">
    <div class="m-1 color-menu-w">
      <p class="has-text-black">{{ username }}</p>
      <p>
        {{ locale.structure_ranknet }}
        <span class="has-text-black">{{ userrank }}</span>
      </p>
      <p>
        {{ locale.structure_amountraised }}
        <span class="has-text-black">{{ useramountraised }}</span>
      </p>
      <p>
        {{ locale.structure_bonusmonth }}
        <span class="has-text-black">{{ userbonus }}</span>
      </p>
    </div>
  </footer>
</template>

<script lang="ts">
import store from "@/store";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import TreeComponent from "./Tree.vue";
import { Netstructure } from "../_models/netstructure";
import { classrank, innerclassrank } from "@/_services/func.service";

export default defineComponent({
  name: "StructureComponent",
  components: {
    "blocks-tree": TreeComponent,
  },
  computed: {
    ...mapGetters(["locale", "user"]),
  },
  setup() {
    return {
      iunknown: require(`../assets/images/unknown.svg`),
      model: { token: "", clientid: "", bossid: "" },
    };
  },
  data() {
    const fchandle: any = undefined;
    const structure = new Netstructure();
    structure.root({});
    return {
      loading: false,
      structure,
      fchandle,
      username: "",
      userrank: "",
      useramountraised: "",
      userbonus: "",
    };
  },
  created() {
    this.getstructure(undefined);
  },
  methods: {
    fcfunchandle: function (fn: any) {
      this.fchandle = fn;
    },
    cancel(): any {
      this.model.token = "";
      this.fchandle("");
    },
    onExpand(e: any, node: any, nodeContext: any) {
      if (nodeContext.isExpanded()) {
        this.getstructure(node);
      }
    },
    onClick(e: any, node: any, nodeContext: any) {
      if (nodeContext.isSelected()) {
        this.username = node.text;
        this.userrank = classrank(node.item.rank, this.locale);
        this.useramountraised = node.item.amountraised;
        this.userbonus = node.item.amountbonus;
      }
    },
    getstructure(node: any) {
      let id = undefined;
      if (node) {
        if (node.children && node.children.length > 0) {
          return;
        }
        id = node.id;
      }
      this.loading = true;
      store
        .dispatch("getstructure", id)
        .then((res: any) => {
          if (res.data) {
            let refer = '';
            if (this.user.refer){
              const pos = this.user.refer.indexOf('register?ref=');
              if (pos > -1){
                refer = this.user.refer.substring(pos + 13, this.user.refer.length);
              }
            }
            if (refer === res.data.data[0].REFER) {
              let bonusamount = '';
              if (res.data.data[0].statistics_bonusamount){
                bonusamount = res.data.data[0].statistics_bonusamount.toFixed(2);
              }
              const node = {
                id: res.data.data[0].ID,
                text: this.locale.struc_you,
                childcount: res.data.data[0].countpo,
                expand: true,
                item: {
                  status: store.getters.user.status,
                  rank: store.getters.user.rank,
                  amountraised: store.getters.user.amountraised.toFixed(2),
                  amountbonus: bonusamount,
                },
              };
              this.structure.root(node);
            }
            const length = res.data.data.length;
            for (let i = 1; i < length; i += 1) {
              let element = res.data.data[i];
              let bonusamount = '';
              if (element.statistics_bonusamount){
                bonusamount = element.statistics_bonusamount.toFixed(2);
              }
              const node = {
                id: element.ID,
                text: `${element.SURNAME + " " + element.FIRSTNAME}`,
                childcount: element.countpo,
                ownerkey: element.CLIENTBOSS_ID,
                item: {
                  status: element.STATUS,
                  rank: element.CRANK,
                  amountraised: element.AMOUNTRAISED,
                  amountbonus: bonusamount,
                },
              };
              if (element.countpo === 0) {
                Object.assign(node);
              }
              this.structure.add(
                node,
                element.CLIENTBOSS_ID,
                this.structure.traverseBF
              );
            }
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    copyclick(node: any) {
      navigator.clipboard
        .writeText(node.item.account || "")
        .then()
        .catch((e) => console.error(e));
    },
    _innerclassrank(node: any) {
      if (node) {
        return innerclassrank(node.item.rank);
      } else {
        return innerclassrank(0);
      }
    },
  },
});
</script>

<style scoped>
.igender {
  width: 3em;
  height: 3em;
  margin-top: 0.4em;
}

.cgender {
  width: 4em;
  height: 4em;
  border-radius: 50%;
  margin-left: auto;
  margin-right: auto;
}

.user-active {
  border: 2px solid #20c9d9;
}

.user-noactive {
  border: 3px solid red;
}

.tree-wrap {
  height: calc(100vh - 17em);
}
</style>