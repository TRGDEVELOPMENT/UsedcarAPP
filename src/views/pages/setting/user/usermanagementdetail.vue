<template>
  <div>
    <div>
      <ol class="breadcrumb text-muted fs-6 fw-semibold">
        <li class="breadcrumb-item">
          <span class="">ตั้งค่า</span>
        </li>
        <li class="breadcrumb-item">
          <span class="">User Management detail</span>
        </li>
      </ol>
    </div>
    <div class="p-header">
      <span class="fs-2 fw-bold">User Management detail</span>
    </div>
    <div class="card shadow-sm container-card">
      <div class="card-body">
        <div>
          <div class="p-header">
            <div class="d-flex flex-row">
              <div class="d-flex flex-row flex-column-fluid">
                <div class="d-flex flex-row-fluid flex-left my-5">
                  <span class="fs-5 fw-bold">ชื่อ - สกุล : {{ employeename }}</span> 
                </div>
                <br>
                <div class="d-flex flex-row-auto flex-right">
                  <div class="card-title my-5">
                    <div
                      class="d-flex align-items-center position-relative my-1"
                    >
                      <button
                        type="button"
                        class="btn btn-primary"
                        @click="onSave"
                        data-bs-toggle="modal"
                        data-bs-target="#saveoredituserrole"
                      >
                        บันทึก
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <table class="table table-hover table-bordered border">
              <thead class="bg-gray-100">
                <tr class="fs-6 name-gray-800 border-bottom-2 border-gray-200">
                  <th class="w-50px fw-semibold name-dark name-center">ลำดับ</th>
                  <th class="w-200px fw-semibold name-dark name-center">
                    Module Name
                  </th>
                  <th class="w-200px fw-semibold name-dark name-center">
                    Description
                  </th>
                  <th class="w-500px fw-semibold name-dark name-center">
                    การเข้าถึง
                  </th>
                  <th class="w-500px fw-semibold name-dark name-center">
                    บันทึก/แก้ไข
                  </th>
                  <th class="w-500px fw-semibold name-dark name-center">
                    อนุมัติ
                  </th>
                </tr>
              </thead>
              <tbody v-for="(item, id) in employeeitem" :key="id">
                <tr>
                  <td class="name-center">{{ item.no }}</td>
                  <td class="fs-7">
                    <span class="fw-semibold">{{ item.module }}</span>
                  </td>
                  <td class="fs-7">
                    <span class="fw-semibold">{{ item.description }}</span>
                  </td>
                  <td class="fs-7">
                    <input type="checkbox" id="checkbox" v-model="item.isaccess" />
                  </td>
                  <td class="fs-7">
                    <input type="checkbox" id="checkbox" v-model="item.isedit" />
                  </td>
                  <td class="fs-7">
                    <input type="checkbox" id="checkbox" v-model="item.isapprove" />
                  </td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import "vue3-toastify/dist/index.css";
import router from "@/router";
import { useRoute } from "vue-router";
import { EmployeeModule, employeeStore,type Employee } from "@/stores/settings/user/employee";
import Swal from "sweetalert2/dist/sweetalert2.js";
export default defineComponent({
  name: "role",
  components: {},
  setup() {
    const route = useRoute();
    const employeeid = ref<number>(0);
    const employeename = ref<string>('');
    const employeestore = employeeStore();
    let employeeitem = ref<EmployeeModule[]>([]);
    onMounted(() => {
      onInitial();
    });
    const onInitial = async () => {
      let i = 0;
      employeeid.value = Number(route.params.id);
      employeename.value = String(route.params.name);
      employeeitem.value = (await employeestore.getEmployeeModuleList(employeeid.value)).data;
      employeeitem.value.forEach((item) => {
        employeeitem.value[i].no = i+1;i++;
      });
      console.log(employeeitem.value);
      
    };
    const onPageClick = async (page: number) => {
    
    };
    const onSearch = async () => {
     
    };
    const onCreate = async () => {
    };
    const onEdit = async () => {
     
    };
    const onSave = async () => {
      Swal.fire({
              text: "บันทึกสำเร็จ",
              icon: "success",
              buttonsStyling: false,
              confirmButtonname: "ตกลง",
              heightAuto: false,
              customClass: {
                confirmButton: "btn fw-semibold btn-light-primary btn-sm",
              },
        });
        router.push("/usermanagement");
    };
    const onDelete = async () => {
    };
    return {
      getAssetPath,
      onEdit,
      onDelete,
      onSave,
      onPageClick,
      onSearch,
      onCreate,
      employeeid,
      employeename,
      employeeitem
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
