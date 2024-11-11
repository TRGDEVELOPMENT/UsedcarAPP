<template>
    <div>
      <div>
        <ol class="breadcrumb text-muted fs-6 fw-semibold">
          <li class="breadcrumb-item">
            <span class="">ตั้งค่า</span>
          </li>
          <li class="breadcrumb-item">
            <span class="">Role module</span>
          </li>
        </ol>
      </div>
      <div class="p-header">
        <span class="fs-2 fw-bold">Role Module</span>
      </div>
      <div class="card shadow-sm container-card">
        <div class="card-body">
          <div>
            <div class="p-header">
              <div class="d-flex flex-row">
                <div class="d-flex flex-row flex-column-fluid">
                  <div class="d-flex flex-row-fluid flex-left my-5">
                    <span class="fs-5 fw-bold">{{ rolename }}</span>
                  </div>
                  <div class="d-flex flex-row-auto w-400px flex-right me-2">
                    <div class="card-title my-5">
                    </div>
                  </div>
                  <div class="d-flex flex-row-auto flex-right">
                    <div class="card-title my-5">
                      <div
                        class="d-flex align-items-center position-relative my-1"
                      >
                        <button
                          type="button"
                          class="btn btn-primary"
                          @click="onSave"
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
                    Active
                  </th>
                </tr>
              </thead>
              <tbody v-for="(item, id) in rolemodulelist" :key="id">
                <tr>
                  <td class="name-center">{{ item.no }}</td>
                  <td class="fs-7">
                    <span class="fw-semibold">{{ item.name }}</span>
                  </td>
                  <td class="fs-7">
                    <span class="fw-semibold">{{ item.description }}</span>
                  </td>
                  <td class="fs-7">
                    <input type="checkbox" id="checkbox" v-model="item.isactive" />
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
  import { useRoute } from "vue-router";
  import { roleStore, RespList , type RoleModule } from "@/stores/settings/user/role";
  import Swal from "sweetalert2/dist/sweetalert2.js";
  import router from "@/router";
  export default defineComponent({
    name: "rolemodule",
    components: {},
    setup() {
      const route = useRoute();
      const rolestore = roleStore();
      const rolename = ref<string>(String(route.params.name));
      let rolemodulelist = ref<RoleModule[]>([]);
      onMounted(() => {
        onInitial();
      });
      const onInitial = async () => {
        rolemodulelist.value = (await rolestore.getModuleList(Number(route.params.id))).data;
        for(let i = 0; i < rolemodulelist.value.length ; i++){
            rolemodulelist.value[i].no = i+1;
        }
      };
      const onSave = async () => {
        let res;
        res = await rolestore.inserOrUpdateModuleRole(rolemodulelist.value);
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
        router.push("/role");
      };
      const onDelete = async () => {
      };
      return {
        getAssetPath,
        onDelete,
        onSave,
        rolename,
        rolemodulelist
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
  