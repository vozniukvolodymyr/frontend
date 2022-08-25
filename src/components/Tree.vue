<template>
  <div class="tree-container">
    <div class="tree" :class="{horizontal, collapsable}">
      <BlocksNode
        :data="data"
        :props="props"
        :horizontal="horizontal"
        :label-width="labelWidth"
        :collapsable="collapsable"
        :render-content="renderContent"
        :label-class-name="labelClassName"
        @node-expand="(e, data,nodeContext) => $emit('node-expand', e, data,nodeContext)"
        @node-focus="(e, data,nodeContext) => $emit('node-focus', e, data,nodeContext)"
        @node-click="(e, data,nodeContext) => onNodeClick(e, data, nodeContext)"
        @node-mouseover="(e, data,nodeContext) => $emit('node-mouseover', e, data,nodeContext)"
        @node-mouseout="(e, data,nodeContext) => $emit('node-mouseout', e, data,nodeContext)"
      >
      <template #node="{data,context}">
        <slot name="node" :data="data" :context="context"></slot>
      </template>
      </BlocksNode>
    </div>
  </div>
</template>

<script lang="ts">
import BlocksNode from './blocks-node.vue';
import {defineComponent} from 'vue';
export default defineComponent({
  name: 'TreeComponent',
  components: {
    BlocksNode
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    props: {
      type: Object,
      default: () => ({ 
        label: 'text',
        expand: 'expand',
        children: 'children',
        key:'id',
        ownerkey: 'ownerkey'
      })
    },
    horizontal: Boolean,
    collapsable: Boolean,
    renderContent: Function,
    labelWidth: [String, Number],
    labelClassName: [Function, String],
  },
  setup(){    
    const nodecontext: any = {};    
    return { nodecontext }
  },
  methods:{
    onNodeClick(e: any, data: any, nodeContext: any) {
      if (data.text !== ''){
        if (('isSelected' in this.nodecontext)&&(this.nodecontext.isSelected())){
          this.nodecontext.nodeSelect();
        }
        this.nodecontext = nodeContext;
        nodeContext.nodeSelect();
        this.$emit('node-click', e, data, nodeContext);
      }
    }
  }
})
</script>

<style lang="less">
  @import "../assets/tree.less";
</style>