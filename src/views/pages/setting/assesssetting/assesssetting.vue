<template>
  <div>
    <div>
      <ol class="breadcrumb text-muted fs-6 fw-semibold">
        <li class="breadcrumb-item">
          <span class="">ตั้งค่า</span>
        </li>
        <li class="breadcrumb-item">
          <span class="">ตั้งค่าประเมินสภาพ</span>
        </li>
      </ol>
    </div>
    <div class="p-header">
      <span class="fs-2 fw-bold">ตั้งค่าประเมินสภาพ</span>
    </div>
    <div class="card shadow-sm container-card">
      <div class="card-body">
        <div>
          <ul class="nav nav-tabs nav-line-tabs mb-5 fs-6">
            <li class="nav-item">
              <a
                class="nav-link active"
                data-bs-toggle="tab"
                href="#kt_tab_pane_1"
                >ประเภทหลังคา</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" data-bs-toggle="tab" href="#kt_tab_pane_2"
                >สถานะไฟแนนซ์</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" data-bs-toggle="tab" href="#kt_tab_pane_3"
                >สถานะ Rerent</a
              >
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div
              class="tab-pane fade show active"
              id="kt_tab_pane_1"
              role="tabpanel"
            >
              <rooftype></rooftype>
            </div>
            <div class="tab-pane fade" id="kt_tab_pane_2" role="tabpanel">
              tab2
            </div>
            <div class="tab-pane fade" id="kt_tab_pane_3" role="tabpanel">
              tab3
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import rooftype from "./rooftype.vue";
export default defineComponent({
  name: "Customer setting",
  components: { rooftype },
  setup() {
    onMounted(() => {
      initial();
    });
    const initial = async () => {};
    return {
      getAssetPath,
    };
  },
});
</script>
<style scoped>
.p-header {
  padding: 1%;
}
.container-card {
  min-height: 600px;
}
</style>
