<template>
    <div class="d-flex flex-column flex-center flex-column-fluid">
      <div class="d-flex flex-column flex-center text-center p-10">
        <div class="card card-flush w-lg-650px py-5">
          <div class="card-body py-15 py-lg-20">
            <h1 class="fw-bolder fs-2hx text-gray-900 mb-4">คำเตือน !</h1>
            <div class="fw-semibold fs-4 mb-10">
              คุณไม่ได้รับสิทธิในการเข้าถึงข้อมูล
            </div>
            <div class="mb-0">
              <router-link to="/sign-in" class="btn btn-sm btn-primary">กลับ หน้าเข้าสู่ระบบ</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

  <script lang="ts">
  import { getAssetPath, getIllustrationsPath } from "@/core/helpers/assets";
  import { defineComponent, onMounted } from "vue";
  import LayoutService from "@/core/services/LayoutService";
  import { useBodyStore } from "@/stores/body";
  export default defineComponent({
    name: "error-404",
    components: {},
    setup() {
      const storeBody = useBodyStore();
      onMounted(() => {
        LayoutService.emptyElementClassesAndAttributes(document.body);
        storeBody.addBodyClassname("bg-body");
        storeBody.addBodyAttribute({
          qualifiedName: "style",
          value: `background:color=purple)`,
        });
      });
      return {
        getIllustrationsPath,
        getAssetPath,
      };
    },
  });
  </script>