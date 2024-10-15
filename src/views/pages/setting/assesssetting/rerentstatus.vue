<template>
  <div>
    <div class="p-header">
      <div class="d-flex flex-row">
        <div class="d-flex flex-row flex-column-fluid">
          <div class="d-flex flex-row-fluid flex-left my-5">
            <span class="fs-5 fw-bold">สถานะ Rerent</span>
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
                  v-model="keyrerentstatus"
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
                  data-bs-target="#saveoreditrerentstatus"
                >
                  เพิ่มสถานะ Rerent
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
            ชื่อ status
          </th>
          <th class="w-200px fw-semibold name-dark name-center">คำอธิบาย</th>
          <th class="w-500px fw-semibold name-dark name-center">ผู้บันทึก</th>
          <th class="w-150px fw-semibold name-dark name-center">สร้างวันที่</th>
          <th class="w-150px fw-semibold name-dark name-center">แก้ไขล่าสุดวันที่</th>
          <th class="w-150px fw-semibold name-dark name-center">Option</th>
        </tr>
      </thead>
      <tbody v-for="(item, id) in listdatarerentstatus.data" :key="id">
        <tr>
          <td class="name-center">{{ item.no }}</td>
          <td class="fs-7">
            <span class="fw-semibold">{{ item.status }}</span>
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
              data-bs-target="#saveoreditrerentstatus"
              class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
            >
              <KTIcon icon-name="pencil" icon-class="fs-3" />
            </a>
            <a
              @click="onEdit(item)"
              data-bs-toggle="modal"
              data-bs-target="#deletererentstatus"
              class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
            >
              <KTIcon icon-name="trash" icon-class="fs-3" />
            </a>
          </td>
        </tr>
      </tbody>
      <tbody
        v-if="
          listdatarerentstatus.data == undefined ||
          listdatarerentstatus.data.length == 0
        "
      >
        <tr class="fs-7 name-gray-800">
          <td colspan="6" class="name-center">ไม่พบข้อมูล</td>
        </tr>
      </tbody>
      <tfoot>
        <td colspan="2" class="text-start">
          <span class="fw-semibold">จำนวนทั้งหมด :</span> {{ totaldatarerentstatus }}
        </td>
        <td colspan="5" class="text-end">
          <vue-awesome-paginate
            v-if="totalpagererentstatus != 0"
            :total-items="totalpagererentstatus"
            :items-per-page="5"
            :max-pages-shown="5"
            :show-jump-buttons="true"
            :on-click="onPageClick"
            v-model="currentpagererentstatus"
          />
        </td>
      </tfoot>
    </table>
  </div>
  <div
    class="modal fade"
    id="saveoreditrerentstatus"
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
            {{ titlemodalrerentstatus }}
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
            <label class="form-label">ชื่อ status</label>
            <input
              type="name"
              class="form-control"
              id="prefixinputbox"
              placeholder="ชื่อ status"
              v-model="selectdatarerentstatus.status"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">คำอธิบาย</label>
            <input
              type="name"
              class="form-control"
              id="prefixinputbox"
              placeholder="คำอธิบาย"
              v-model="selectdatarerentstatus.description"
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
    id="deletererentstatus"
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
            ต้องการลบ status ?
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
            <label class="form-label">ชื่อ status</label>
            <input
              :disabled="true"
              type="name"
              class="form-control"
              id="prefixinputbox"
              placeholder="ชื่อ status"
              v-model="selectdatarerentstatus.status"
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
              v-model="selectdatarerentstatus.description"
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
  rerentstatusStore,
  type ReRentStatus,
  type RespList,
  type Resp,
} from "@/stores/settings/assessetting/rerentstatus";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "vue3-toastify/dist/index.css";
export default defineComponent({
  name: "Rerent Status",
  components: {},
  setup() {
    const rerentstatusstore = rerentstatusStore();
    let listdatarerentstatus = ref<RespList<ReRentStatus[]>>({
      totaldata: 0,
      data: [],
    });
    let titlemodalrerentstatus = ref<string>("เพิ่ม status");
    let totaldatarerentstatus = ref<number>(0);
    let totalpagererentstatus = ref<number>(1);
    let currentpagererentstatus = ref<number>(1);
    let keyrerentstatus = ref<string>("");
    const selectdatarerentstatus = ref<ReRentStatus>({
      id: 0,
      no: 0,
      status: "",
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
      listdatarerentstatus.value = await rerentstatusstore.getReRentStatusList(
        keyrerentstatus.value,
        1
      );
      totaldatarerentstatus.value = listdatarerentstatus.value.totaldata;
      totalpagererentstatus.value = totaldatarerentstatus.value;
    };
    const onPageClick = async (page: number) => {
      const keyword = keyrerentstatus.value.trim();
      listdatarerentstatus.value = await rerentstatusstore.getReRentStatusList(
        keyword,
        page
      );
      totaldatarerentstatus.value = listdatarerentstatus.value.totaldata;
      totalpagererentstatus.value = totaldatarerentstatus.value;
      currentpagererentstatus.value = page;
    };
    const onSearch = async () => {
      currentpagererentstatus.value = 1;
      const keySearch = keyrerentstatus.value.trim();
      if (keySearch != "") {
        const keyword = keyrerentstatus.value.trim();
        listdatarerentstatus.value = await rerentstatusstore.getReRentStatusList(
          keyword,
          currentpagererentstatus.value
        );
        totaldatarerentstatus.value = listdatarerentstatus.value.totaldata;
        totalpagererentstatus.value = totaldatarerentstatus.value;
      } else {
        onInitial();
      }
      console.log(listdatarerentstatus.value);
    };
    const onCreate = async () => {
      selectdatarerentstatus.value = {
        id: 0,
        no: 0,
        status: "",
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
        selectdatarerentstatus.value.status == undefined ||
        selectdatarerentstatus.value.status == ""
      ) {
        titlemodalrerentstatus.value = "เพิ่มไข status";
      } else {
        titlemodalrerentstatus.value = "แก้ไข status";
      }
    };
    const onEdit = async (item: ReRentStatus) => {
      selectdatarerentstatus.value = {
        id: item.id,
        no: item.no,
        status: item.status,
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
        selectdatarerentstatus.value.status == undefined ||
        selectdatarerentstatus.value.status == ""
      ) {
        titlemodalrerentstatus.value = "เพิ่ม status";
      } else {
        titlemodalrerentstatus.value = "แก้ไข status";
      }
    };
    const onSave = async () => {
      const resp = ref<Resp>({ message: "", status: false });
      resp.value = await rerentstatusstore.getValidateReRentStatus(
        selectdatarerentstatus.value
      );
      if (resp.value.status) {
        if (selectdatarerentstatus.value.id == 0) {
          console.log("if" + selectdatarerentstatus.value.id);
          resp.value = await rerentstatusstore.insertReRentStatusById(
            selectdatarerentstatus.value
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
          resp.value = await rerentstatusstore.updateReRentStatusById(
            selectdatarerentstatus.value
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
      listdatarerentstatus.value = await rerentstatusstore.getReRentStatusList(
        keyrerentstatus.value,
        currentpagererentstatus.value
      );
      totaldatarerentstatus.value = listdatarerentstatus.value.totaldata;
      totalpagererentstatus.value = totaldatarerentstatus.value;
    };
    const onDelete = async () => {
      const resp = ref<Resp>({ message: "", status: false });
      resp.value = await rerentstatusstore.getValidateReRentStatus(
        selectdatarerentstatus.value
      );
      if (resp.value.status) {
        selectdatarerentstatus.value.isactive = false;
        resp.value = await rerentstatusstore.deleteReRentStatusById(
          selectdatarerentstatus.value
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
      listdatarerentstatus.value = await rerentstatusstore.getReRentStatusList(
        keyrerentstatus.value,
        currentpagererentstatus.value
      );
      totaldatarerentstatus.value = listdatarerentstatus.value.totaldata;
      totalpagererentstatus.value = totaldatarerentstatus.value;
    };
    return {
      getAssetPath,
      listdatarerentstatus,
      onEdit,
      onDelete,
      onSave,
      selectdatarerentstatus,
      titlemodalrerentstatus,
      totaldatarerentstatus,
      totalpagererentstatus,
      currentpagererentstatus,
      onPageClick,
      keyrerentstatus,
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
