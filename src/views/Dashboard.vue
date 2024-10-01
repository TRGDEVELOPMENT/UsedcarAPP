<template>
  <div class="">
   <h2><b>Welcome to used car Application</b></h2> 
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";
import { useRouter } from 'vue-router';
export default defineComponent({
  name: "main-dashboard",
  components: {

  },
  setup() {
    
    return {
      getAssetPath,onclick
    };
  },
});
</script>
