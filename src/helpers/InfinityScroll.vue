<template>
  <tbody>
    <tr
      v-for="item in items"
      :key="item.id"
      @click="(e) => onItemClick(e, item)"
    >
      <slot name="node" v-bind:item="item"> </slot>
    </tr>
  </tbody>
  <app-observer @intersect="intersected" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ObserveComponent from "./Observer.vue";
import store from "@/store";

export default defineComponent({
  name: "InfinityScrollComponent",  
  components: {
    "app-observer": ObserveComponent    
  },
  props: {
    handler: Function,
    loading: Boolean
  },
  emits: ['handlerfetch', 'handlerupdate', 'item-click'],
  data() {
    const params: any = undefined;
    return { 
      total: 0,
      offset: 999999999999,
      items: [] as any,
      url: '',
      params
    }
  },
  created() {
    this.$emit("handlerfetch", this.fetchData);
    this.$emit("handlerupdate", this.updateItem);
  },
  methods: {
    onItemClick(e: any, item: any){
      this.$emit('item-click', e, item);
    },
    updateItem(id: any, params: any) {
      for (let i = 0, length = this.items.length; i < length; i++) {      
        if (id === this.items[i].id){
          Object.assign(this.items[i], params);
          break;
        }
      }
    },
    fetchData(url: string, params: any) {
      this.url = url;
      if (this.url === ''){
        this.total = 0;
        this.offset = 999999999999;
        this.items= [];
        return;
      }
      if  (this.offset !== 999999999999 && this.total === this.items.length){
        return;
      }
      this.params = params;
      const model = {offset: this.offset.toString()};
      if (this.params ){
        Object.assign(model, this.params);
      }
      return store.dispatch(url, model)
        .then((res: any) => {
          if (res.data && res.data.data.length > 0) {       
            if (this.items.length === 0){
              this.total = res.data.total;
            }
            this.items = [...this.items, ...res.data.data];             
            this.offset = res.data.offset;
          }          
        })         
    },
    intersected() {
      if (this.loading === true) return;
      setTimeout(() => {        
        this.fetchData(this.url, this.params);
      }, 200)       
    },
  }
});
</script>