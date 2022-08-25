<template>
    <div class="is-size-4 has-text-white" style="display: table; text-align: center; width:100%; margin-top:10%">            
        <h1 style="font-weight: bold;">{{locale.notfound_er}}</h1>
        <h3 style="padding: 30px">{{locale.routenotfound_er}}</h3>
        <span class="is-size-1 has-text-weight-bold" style="color: white;">404</span>        
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex';

export default defineComponent({
    name: "NotFoundComponent",
    computed: {
        ...mapGetters([
            'locale'             
        ])
    }
})
</script>
