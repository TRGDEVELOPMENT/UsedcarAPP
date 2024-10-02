<template>
  <div>
    <div>
      <ol class="breadcrumb text-muted fs-6 fw-semibold">
        <li class="breadcrumb-item">
          <span class="">ตั้งค่า</span>
        </li>
        <li class="breadcrumb-item">
          <span class="">ตั้งค่าลูกค้า</span>
        </li>
      </ol>
    </div>
    <div class="p-header">
      <span class="fs-2 fw-bold">ตั้งค่าลูกค้า</span>
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
                >คำนำหน้าชื่อ</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" data-bs-toggle="tab" href="#kt_tab_pane_2"
                >ประเภทลูกค้า</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" data-bs-toggle="tab" href="#kt_tab_pane_3"
                >เงื่อนไขการชำระ</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" data-bs-toggle="tab" href="#kt_tab_pane_4"
                >ประเภทที่อยู่</a
              >
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div
              class="tab-pane fade show active"
              id="kt_tab_pane_1"
              role="tabpanel"
            >
              <prefixcustomer></prefixcustomer>
            </div>
            <div class="tab-pane fade" id="kt_tab_pane_2" role="tabpanel">
              <customertype></customertype>
            </div>
            <div class="tab-pane fade" id="kt_tab_pane_3" role="tabpanel">
              Et et consectetur ipsum labore excepteur est proident excepteur ad
              velit occaecat qui minim occaecat veniam. Fugiat veniam incididunt
              anim aliqua enim pariatur veniam sunt est aute sit dolor anim.
              Velit non irure adipisicing aliqua ullamco irure incididunt irure
              non esse consectetur nostrud minim non minim occaecat. Amet duis
              do nisi duis veniam non est eiusmod tempor incididunt tempor dolor
              ipsum in qui sit.
            </div>
            <div class="tab-pane fade" id="kt_tab_pane_4" role="tabpanel">
              Et et consectetur ipsum labore excepteur est proident excepteur ad
              velit occaecat qui minim occaecat veniam. Fugiat veniam incididunt
              anim aliqua enim pariatur veniam sunt est aute sit dolor anim.
              Velit non irure adipisicing aliqua ullamco irure incididunt irure
              non esse consectetur nostrud minim non minim occaecat. Amet duis
              do nisi duis veniam non est eiusmod tempor incididunt tempor dolor
              ipsum in qui sit.
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
import prefixcustomer from "@/views/pages/setting/customersetting/prefixsetting.vue";
import customertype from "@/views/pages/setting/customersetting/customertype.vue";
export default defineComponent({
  name: "Customer setting",
  components: {
    prefixcustomer,
    customertype,
  },
  setup() {
    const breadcrumbtext = ref<string[]>([]);
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
