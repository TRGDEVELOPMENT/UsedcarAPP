<template>
  <div>
    <div class="p-header">
      <div class="d-flex flex-row">
        <div class="d-flex flex-row flex-column-fluid">
          <div class="d-flex flex-row-fluid flex-left my-5">
            <span class="fs-5 fw-bold">สถานะไฟแนนซ์</span>
          </div>
          <div class="d-flex flex-row-auto w-400px flex-right me-2">
            <div class="card-title my-5">
              <div class="d-flex align-items-center position-relative my-1">
                <KTIcon
                  icon-name="magnifier"
                  icon-class="fs-1 position-absolute ms-6"
                />
                <input
                  type="name"
                  v-model="keyfinancestatus"
                  @change="onSearch"
                  class="form-control form-control-solid w-400px ps-15"
                  placeholder="ค้นหา"
                />
              </div>
            </div>
          </div>
          <div class="d-flex flex-row-auto flex-right">
            <div class="card-title my-5">
              <div class="d-flex align-items-center position-relative my-1">
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="onCreate()"
                  data-bs-toggle="modal"
                  data-bs-target="#saveoreditfinancestatus"
                >
                  เพิ่มสถานะไฟแนนซ์
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
            ชื่อสถานะไฟแนนซ์
          </th>
          <th class="w-200px fw-semibold name-dark name-center">คำอธิบาย</th>
          <th class="w-500px fw-semibold name-dark name-center">ผู้บันทึก</th>
          <th class="w-150px fw-semibold name-dark name-center">สร้างวันที่</th>
          <th class="w-150px fw-semibold name-dark name-center">แก้ไขล่าสุดวันที่</th>
          <th class="w-150px fw-semibold name-dark name-center">Option</th>
        </tr>
      </thead>
      <tbody v-for="(item, id) in listdatafinancestatus.data" :key="id">
        <tr>
          <td class="name-center">{{ item.no }}</td>
          <td class="fs-7">
            <span class="fw-semibold">{{ item.name }}</span>
          </td>
          <td class="fs-7">
            <span class="fw-semibold">{{ item.description }}</span>
          </td>
          <td class="fs-7">
            <span class="fw-semibold">{{ item.creatorname }}</span>
          </td>
          <td class="fs-7">
            <span class="fw-semibold">{{ item.createddate }}</span>
          </td>
          <td class="fs-7">
            <span class="fw-semibold">{{ item.modifieddate }}</span>
          </td>
          <td class="fs-7 name-center">
            <a
              @click="onEdit(item)"
              data-bs-toggle="modal"
              data-bs-target="#saveoreditfinancestatus"
              class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
            >
              <KTIcon icon-name="pencil" icon-class="fs-3" />
            </a>
            <a
              @click="onEdit(item)"
              data-bs-toggle="modal"
              data-bs-target="#deletefinancestatus"
              class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
            >
              <KTIcon icon-name="trash" icon-class="fs-3" />
            </a>
          </td>
        </tr>
      </tbody>
      <tbody
        v-if="
          listdatafinancestatus.data == undefined ||
          listdatafinancestatus.data.length == 0
        "
      >
        <tr class="fs-7 name-gray-800">
          <td colspan="6" class="name-center">ไม่พบข้อมูล</td>
        </tr>
      </tbody>
      <tfoot>
        <td colspan="2" class="text-start">
          <span class="fw-semibold">จำนวนทั้งหมด :</span> {{ totaldatafinancestatus }}
        </td>
        <td colspan="5" class="text-end">
          <vue-awesome-paginate
            v-if="totalpagefinancestatus != 0"
            :total-items="totalpagefinancestatus"
            :items-per-page="5"
            :max-pages-shown="5"
            :show-jump-buttons="true"
            :on-click="onPageClick"
            v-model="currentpagefinancestatus"
          />
        </td>
      </tfoot>
    </table>
  </div>
  <div
    class="modal fade"
    id="saveoreditfinancestatus"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">
            {{ titlemodalfinancestatus }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">ชื่อสถานะไฟแนนซ์</label>
            <input
              type="name"
              class="form-control"
              id="prefixinputbox"
              placeholder="ชื่อสถานะไฟแนนซ์"
              v-model="selectdatafinancestatus.name"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">คำอธิบาย</label>
            <input
              type="name"
              class="form-control"
              id="prefixinputbox"
              placeholder="คำอธิบาย"
              v-model="selectdatafinancestatus.description"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button
            id="backbutton"
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            กลับ
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="onSave"
          >
            บันทึก
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    class="modal fade"
    id="deletefinancestatus"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">
            ต้องการลบประเภทหลังคา ?
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">ชื่อสถานะไฟแนนซ์</label>
            <input
              :disabled="true"
              type="name"
              class="form-control"
              id="prefixinputbox"
              placeholder="ชื่อสถานะไฟแนนซ์"
              v-model="selectdatafinancestatus.name"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">คำอธิบาย	</label>
            <input
              :disabled="true"
              type="name"
              class="form-control"
              id="prefixinputbox"
              placeholder="คำอธิบาย	"
              v-model="selectdatafinancestatus.description"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button
            id="backbutton"
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            กลับ
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="onDelete"
          >
            ลบ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import {
  financestatusStore,
  type FinanceStatus,
  type RespList,
  type Resp,
} from "@/stores/settings/assessetting/financestatus";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "vue3-toastify/dist/index.css";
export default defineComponent({
  name: "Finance Status",
  components: {},
  setup() {
    const financestatusstore = financestatusStore();
    let listdatafinancestatus = ref<RespList<FinanceStatus[]>>({
      totaldata: 0,
      data: [],
    });
    let titlemodalfinancestatus = ref<string>("เพิ่มสถานะไฟแนนซ์");
    let totaldatafinancestatus = ref<number>(0);
    let totalpagefinancestatus = ref<number>(1);
    let currentpagefinancestatus = ref<number>(1);
    let keyfinancestatus = ref<string>("");
    const selectdatafinancestatus = ref<FinanceStatus>({
      id: 0,
      no: 0,
      name: "",
      description: "",
      isactive: false,
      creatorid: "",
      creatorname: "",
      createddate: "",
      modifiedid: "",
      modifiedname: "",
      modifieddate: "",
      deletedid: "",
      deletedname: "",
      deleteddate: "",
    });
    onMounted(() => {
      onInitial();
    });
    const onInitial = async () => {
      listdatafinancestatus.value = await financestatusstore.getFinanceStatusList(
        keyfinancestatus.value,
        1
      );
      totaldatafinancestatus.value = listdatafinancestatus.value.totaldata;
      totalpagefinancestatus.value = totaldatafinancestatus.value;
    };
    const onPageClick = async (page: number) => {
      const keyword = keyfinancestatus.value.trim();
      listdatafinancestatus.value = await financestatusstore.getFinanceStatusList(
        keyword,
        page
      );
      totaldatafinancestatus.value = listdatafinancestatus.value.totaldata;
      totalpagefinancestatus.value = totaldatafinancestatus.value;
      currentpagefinancestatus.value = page;
    };
    const onSearch = async () => {
      currentpagefinancestatus.value = 1;
      const keySearch = keyfinancestatus.value.trim();
      if (keySearch != "") {
        const keyword = keyfinancestatus.value.trim();
        listdatafinancestatus.value = await financestatusstore.getFinanceStatusList(
          keyword,
          currentpagefinancestatus.value
        );
        totaldatafinancestatus.value = listdatafinancestatus.value.totaldata;
        totalpagefinancestatus.value = totaldatafinancestatus.value;
      } else {
        onInitial();
      }
      console.log(listdatafinancestatus.value);
    };
    const onCreate = async () => {
      selectdatafinancestatus.value = {
        id: 0,
        no: 0,
        name: "",
        description: "",
        isactive: false,
        creatorid: "",
        creatorname: "",
        createddate: "",
        modifiedid: "",
        modifiedname: "",
        modifieddate: "",
        deletedid: "",
        deletedname: "",
        deleteddate: "",
      };

      if (
        selectdatafinancestatus.value.name == undefined ||
        selectdatafinancestatus.value.name == ""
      ) {
        titlemodalfinancestatus.value = "เพิ่มไขสถานะไฟแนนซ์";
      } else {
        titlemodalfinancestatus.value = "แก้ไขสถานะไฟแนนซ์";
      }
    };
    const onEdit = async (item: FinanceStatus) => {
      selectdatafinancestatus.value = {
        id: item.id,
        no: item.no,
        name: item.name,
        description: item.description,
        isactive: item.isactive,
        creatorid: item.creatorid,
        creatorname: item.creatorname,
        createddate: item.createddate,
        modifiedid: item.modifiedid,
        modifiedname: item.modifiedname,
        modifieddate: item.modifieddate,
        deletedid: item.deletedid,
        deletedname: item.deletedname,
        deleteddate: item.deleteddate,
      };

      if (
        selectdatafinancestatus.value.name == undefined ||
        selectdatafinancestatus.value.name == ""
      ) {
        titlemodalfinancestatus.value = "เพิ่มสถานะไฟแนนซ์";
      } else {
        titlemodalfinancestatus.value = "แก้ไขสถานะไฟแนนซ์";
      }
    };
    const onSave = async () => {
      const resp = ref<Resp>({ message: "", status: false });
      resp.value = await financestatusstore.getValidateFinanceStatus(
        selectdatafinancestatus.value
      );
      if (resp.value.status) {
        if (selectdatafinancestatus.value.id == 0) {
          console.log("if" + selectdatafinancestatus.value.id);
          resp.value = await financestatusstore.insertFinanceStatusById(
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
          resp.value = await financestatusstore.updateFinanceStatusById(
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
      listdatafinancestatus.value = await financestatusstore.getFinanceStatusList(
        keyfinancestatus.value,
        currentpagefinancestatus.value
      );
      totaldatafinancestatus.value = listdatafinancestatus.value.totaldata;
      totalpagefinancestatus.value = totaldatafinancestatus.value;
    };
    const onDelete = async () => {
      const resp = ref<Resp>({ message: "", status: false });
      resp.value = await financestatusstore.getValidateFinanceStatus(
        selectdatafinancestatus.value
      );
      if (resp.value.status) {
        selectdatafinancestatus.value.isactive = false;
        resp.value = await financestatusstore.deleteFinanceStatusById(
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
      listdatafinancestatus.value = await financestatusstore.getFinanceStatusList(
        keyfinancestatus.value,
        currentpagefinancestatus.value
      );
      totaldatafinancestatus.value = listdatafinancestatus.value.totaldata;
      totalpagefinancestatus.value = totaldatafinancestatus.value;
    };
    return {
      getAssetPath,
      listdatafinancestatus,
      onEdit,
      onDelete,
      onSave,
      selectdatafinancestatus,
      titlemodalfinancestatus,
      totaldatafinancestatus,
      totalpagefinancestatus,
      currentpagefinancestatus,
      onPageClick,
      keyfinancestatus,
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
</style>
