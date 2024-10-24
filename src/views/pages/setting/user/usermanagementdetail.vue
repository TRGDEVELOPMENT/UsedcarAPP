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
                  <span class="fs-5 fw-bold">User Management detail</span>
                </div>
                <div class="d-flex flex-row-auto w-400px flex-right me-2">
                  <div class="card-title my-5">
                    <div
                      class="d-flex align-items-center position-relative my-1"
                    >
                      <KTIcon
                        icon-name="magnifier"
                        icon-class="fs-1 position-absolute ms-6"
                      />
                      <input
                        type="name"
                        v-model="keyuserrole"
                        @change="onSearch"
                        class="form-control form-control-solid w-400px ps-15"
                        placeholder="ค้นหา"
                      />
                    </div>
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
                        @click="onCreate()"
                        data-bs-toggle="modal"
                        data-bs-target="#saveoredituserrole"
                      >
                        เพิ่ม User
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
                <th class="w-200px fw-semibold name-dark name-center">Emp Code</th>
                <th class="w-200px fw-semibold name-dark name-center">
                  ชื่อ-สกุล
                </th>
                <th class="w-500px fw-semibold name-dark name-center">
                  Role
                </th>
                <th class="w-150px fw-semibold name-dark name-center">
                  สถานะ
                </th>
                <th class="w-150px fw-semibold name-dark name-center">
                  Option
                </th>
              </tr>
            </thead>
            <tbody v-for="(item, id) in listdatauserrole.data" :key="id">
              <tr>
                <td class="name-center">{{ item.no }}</td>
                <td class="fs-7">
                  <span class="fw-semibold">{{ item.empcode }}</span>
                </td>
                <td class="fs-7">
                  <span class="fw-semibold">{{ item.name }}</span>
                </td>
                <td class="fs-7">
                  <span class="fw-semibold">{{ item.role }}</span>
                </td>
                <td class="fs-7">
                  <span class="fw-semibold">{{ item.isactive }}</span>
                </td>
                <td class="fs-7 name-center">
                  <a
                    @click="onEdit()"
                    data-bs-toggle="modal"
                    data-bs-target="#saveoredituserrole"
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                  >
                    <KTIcon icon-name="pencil" icon-class="fs-3" />
                  </a>
                  <a
                    @click="onEdit()"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteuserrole"
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                  >
                    <KTIcon icon-name="trash" icon-class="fs-3" />
                  </a>
                </td>
              </tr>
            </tbody>
            <tbody
              v-if="
                listdatauserrole.data == undefined ||
                listdatauserrole.data.length == 0
              "
            >
              <tr class="fs-7 name-gray-800">
                <td colspan="6" class="name-center">ไม่พบข้อมูล</td>
              </tr>
            </tbody>
            <tfoot>
              <td colspan="2" class="text-start">
                <span class="fw-semibold">จำนวนทั้งหมด :</span>
                {{ totaldatauserrole }}
              </td>
              <td colspan="5" class="text-end">
                <vue-awesome-paginate
                  v-if="totalpageuserrole != 0"
                  :total-items="totalpageuserrole"
                  :items-per-page="5"
                  :max-pages-shown="5"
                  :show-jump-buttons="true"
                  :on-click="onPageClick"
                  v-model="currentpageuserrole"
                />
              </td>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import {
  employeeStore,
  type Employee,
  type RespList,
  type Resp,
} from "@/stores/settings/user/employee";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "vue3-toastify/dist/index.css";
export default defineComponent({
  name: "role",
  components: {},
  setup() {
    const userrolestore = employeeStore();
    let listdatauserrole = ref<RespList<Employee[]>>({
      totaldata: 0,
      data: [],
    });
    let titlemodaluserrole = ref<string>("เพิ่ม User Role");
    let totaldatauserrole = ref<number>(0);
    let totalpageuserrole = ref<number>(1);
    let currentpageuserrole = ref<number>(1);
    let keyuserrole = ref<string>("");
    const selectdatafinancestatus = ref<Employee>({
      id: 0,
      no: 0,
      empcode: "",
      name: "",
      role: "",
      isactive: false
    });
    onMounted(() => {
      onInitial();
    });
    const onInitial = async () => {
      listdatauserrole.value = await userrolestore.getEmployeeList(
        keyuserrole.value,
        1
      );
      totaldatauserrole.value = listdatauserrole.value.totaldata;
      totalpageuserrole.value = totaldatauserrole.value;
    };
    const onPageClick = async (page: number) => {
      const keyword = keyuserrole.value.trim();
      listdatauserrole.value = await userrolestore.getEmployeeList(
        keyword,
        page
      );
      totaldatauserrole.value = listdatauserrole.value.totaldata;
      totalpageuserrole.value = totaldatauserrole.value;
      currentpageuserrole.value = page;
    };
    const onSearch = async () => {
      currentpageuserrole.value = 1;
      const keySearch = keyuserrole.value.trim();
      if (keySearch != "") {
        const keyword = keyuserrole.value.trim();
        listdatauserrole.value = await userrolestore.getEmployeeList(
          keyword,
          currentpageuserrole.value
        );
        totaldatauserrole.value = listdatauserrole.value.totaldata;
        totalpageuserrole.value = totaldatauserrole.value;
      } else {
        onInitial();
      }
      console.log(listdatauserrole.value);
    };
    const onCreate = async () => {
      selectdatafinancestatus.value = {
        id: 0,
      no: 0,
      empcode: "",
      name: "",
      role: "",
      isactive: false
      };

      if (
        selectdatafinancestatus.value.name == undefined ||
        selectdatafinancestatus.value.name == ""
      ) {
        titlemodaluserrole.value = "เพิ่ม User Role";
      } else {
        titlemodaluserrole.value = "แก้ไข User Role";
      }
    };
    const onEdit = async (/*item: */) => {
      // selectdatafinancestatus.value = {
      //   id: item.id,
      //   no: item.no,
      //   name: item.name,
      //   description: item.description,
      //   isactive: item.isactive,
      //   creatorid: item.creatorid,
      //   creatorname: item.creatorname,
      //   createddate: item.createddate,
      //   modifiedid: item.modifiedid,
      //   modifiedname: item.modifiedname,
      //   modifieddate: item.modifieddate,
      //   deletedid: item.deletedid,
      //   deletedname: item.deletedname,
      //   deleteddate: item.deleteddate,
      // };

      // if (
      //   selectdatafinancestatus.value.name == undefined ||
      //   selectdatafinancestatus.value.name == ""
      // ) {
      //   titlemodaluserrole.value = "เพิ่ม User Role";
      // } else {
      //   titlemodaluserrole.value = "แก้ไข User Role";
      // }
    };
    const onSave = async () => {
      // const resp = ref<Resp>({ message: "", status: false });
      // resp.value = await userrolestore.getValidateUserRole(
      //   selectdatafinancestatus.value
      // );
      // if (resp.value.status) {
      //   if (selectdatafinancestatus.value.id == 0) {
      //     console.log("if" + selectdatafinancestatus.value.id);
      //     resp.value = await userrolestore.insertUserRoleById(
      //       selectdatafinancestatus.value
      //     );
      //     if (resp.value.status) {
      //       Swal.fire({
      //         name: resp.value.message,
      //         icon: "success",
      //         buttonsStyling: false,
      //         confirmButtonname: "ตกลง",
      //         heightAuto: false,
      //         customClass: {
      //           confirmButton: "btn fw-semibold btn-light-primary btn-sm",
      //         },
      //       });
      //     } else {
      //       Swal.fire({
      //         name: resp.value.message,
      //         icon: "error",
      //         buttonsStyling: false,
      //         confirmButtonname: "ลองอีกครั้ง!",
      //         heightAuto: false,
      //         customClass: {
      //           confirmButton: "btn fw-semibold btn-light-danger btn-sm",
      //         },
      //       });
      //     }
      //   } else {
      //     resp.value = await userrolestore.updateUserRoleById(
      //       selectdatafinancestatus.value
      //     );
      //     if (resp.value.status) {
      //       Swal.fire({
      //         name: resp.value.message,
      //         icon: "success",
      //         buttonsStyling: false,
      //         confirmButtonname: "ตกลง",
      //         heightAuto: false,
      //         customClass: {
      //           confirmButton: "btn fw-semibold btn-light-primary btn-sm",
      //         },
      //       });
      //     } else {
      //       Swal.fire({
      //         name: resp.value.message,
      //         icon: "error",
      //         buttonsStyling: false,
      //         confirmButtonname: "ลองอีกครั้ง!",
      //         heightAuto: false,
      //         customClass: {
      //           confirmButton: "btn fw-semibold btn-light-danger btn-sm",
      //         },
      //       });
      //     }
      //   }
      // } else {
      //   Swal.fire({
      //     name: resp.value.message,
      //     icon: "error",
      //     buttonsStyling: false,
      //     confirmButtonname: "ลองอีกครั้ง!",
      //     heightAuto: false,
      //     customClass: {
      //       confirmButton: "btn fw-semibold btn-light-danger btn-sm",
      //     },
      //   });
      // }
      // listdatauserrole.value = await userrolestore.getUserRoleList(
      //   keyuserrole.value,
      //   currentpageuserrole.value
      // );
      // totaldatauserrole.value = listdatauserrole.value.totaldata;
      // totalpageuserrole.value = totaldatauserrole.value;
    };
    const onDelete = async () => {
      const resp = ref<Resp>({ message: "", status: false });
      resp.value = await userrolestore.getValidateEmployee(
        selectdatafinancestatus.value
      );
      if (resp.value.status) {
        selectdatafinancestatus.value.isactive = false;
        resp.value = await userrolestore.deleteEmployeeById(
          selectdatafinancestatus.value
        );
        if (resp.value.status) {
          Swal.fire({
            name: resp.value.message,
            icon: "success",
            buttonsStyling: false,
            confirmButtonname: "ตกลง",
            heightAuto: false,
            customClass: {
              confirmButton: "btn fw-semibold btn-light-primary btn-sm",
            },
          });
        } else {
          Swal.fire({
            name: resp.value.message,
            icon: "error",
            buttonsStyling: false,
            confirmButtonname: "ลองอีกครั้ง!",
            heightAuto: false,
            customClass: {
              confirmButton: "btn fw-semibold btn-light-danger btn-sm",
            },
          });
        }
      } else {
        Swal.fire({
          name: resp.value.message,
          icon: "error",
          buttonsStyling: false,
          confirmButtonname: "ลองอีกครั้ง!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semibold btn-light-danger btn-sm",
          },
        });
      }
      listdatauserrole.value = await userrolestore.getEmployeeList(
        keyuserrole.value,
        currentpageuserrole.value
      );
      totaldatauserrole.value = listdatauserrole.value.totaldata;
      totalpageuserrole.value = totaldatauserrole.value;
    };
    return {
      getAssetPath,
      listdatauserrole,
      onEdit,
      onDelete,
      onSave,
      selectdatafinancestatus,
      titlemodaluserrole,
      totaldatauserrole,
      totalpageuserrole,
      currentpageuserrole,
      onPageClick,
      keyuserrole,
      onSearch,
      onCreate,
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
