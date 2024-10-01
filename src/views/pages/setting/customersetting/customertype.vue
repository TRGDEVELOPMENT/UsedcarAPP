<template>

</template>
      
<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import {  prefixcustomerStore, type PrefixCustomer,type RespList  } from "@/stores/settings/prefixsetting";
export default defineComponent({
  name: "Customer type",
  components: {
  },
  setup() {   

    onMounted(() => {
      initial();
    });
    const initial = async () =>{
    
    }
    const onPageClick = async (page: number) => {
   
    };
    const onEdit = async (item:PrefixCustomer) =>{ 

    }
    const onSave = async () =>{
     
      
    }
    const onDelete = (id: number,p1: string) => {
    };
    return {
      getAssetPath,onEdit,onDelete,onSave,onPageClick
    };
  },
});
</script>
<style scoped>
.p-header{
padding: 1%;
}

</style>