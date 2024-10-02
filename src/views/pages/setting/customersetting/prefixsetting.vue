<template>
  <div>
    <div class="p-header">
      <div class="d-flex flex-row">
        <div class="d-flex flex-row flex-column-fluid">
          <div class="d-flex flex-row-fluid flex-left my-5">
            <span class="fs-5 fw-bold">คำนำหน้าชื่อ</span>
          </div>
          <div class="d-flex flex-row-auto w-400px flex-right me-2">
            <div class="card-title my-5">
              <div class="d-flex align-items-center position-relative my-1">
                <KTIcon
                  icon-name="magnifier"
                  icon-class="fs-1 position-absolute ms-6"
                />
                <input
                  type="text"
                  v-model="key"
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
                  data-bs-target="#saveoredit"
                >
                  เพิ่มคำนำหน้าชื่อ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <table class="table table-hover table-bordered border">
      <thead class="bg-gray-100">
        <tr class="fs-6 text-gray-800 border-bottom-2 border-gray-200">
          <th class="w-50px fw-semibold text-dark text-center">ลำดับ</th>
          <th class="w-200px fw-semibold text-dark text-center">คำนำหน้า</th>
          <th class="w-200px fw-semibold text-dark text-center">ผู้บันทึก</th>
          <th class="w-500px fw-semibold text-dark text-center">สร้างวันที่</th>
          <th class="w-150px fw-semibold text-dark text-center">แก้ไขล่าสุด</th>
          <th class="w-150px fw-semibold text-dark text-center">Option</th>
        </tr>
      </thead>
      <tbody v-for="(item, id) in listData.data" :key="id">
        <tr>
          <td class="text-center">{{ item.no }}</td>
          <td class="fs-7">
            <span class="fw-semibold">{{ item.text }}</span>
          </td>
          <td class="fs-7">
            <span class="fw-semibold">{{ item.create_name }}</span>
          </td>
          <td class="fs-7">
            <span class="fw-semibold">{{ item.create_date }}</span>
          </td>
          <td class="fs-7">
            <span class="fw-semibold">{{ item.modify_date }}</span>
          </td>
          <td class="fs-7 text-center">
            <a
              @click="onEdit(item)"
              data-bs-toggle="modal"
              data-bs-target="#saveoredit"
              class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
            >
              <KTIcon icon-name="pencil" icon-class="fs-3" />
            </a>
            <a
              @click="onEdit(item)"
              data-bs-toggle="modal"
              data-bs-target="#delete"
              class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
            >
              <KTIcon icon-name="trash" icon-class="fs-3" />
            </a>
          </td>
        </tr>
      </tbody>
      <tbody v-if="listData.data == undefined || listData.data.length == 0">
        <tr class="fs-7 text-gray-800">
          <td colspan="6" class="text-center">ไม่พบข้อมูล</td>
        </tr>
      </tbody>
      <tfoot>
        <td colspan="2" class="text-start">
          <span class="fw-semibold">จำนวนทั้งหมด :</span> {{ totaldata }}
        </td>
        <td colspan="5" class="text-end">
          <vue-awesome-paginate
            v-if="totalpage != 0"
            :total-items="totalpage"
            :items-per-page="5"
            :max-pages-shown="5"
            :show-jump-buttons="true"
            :on-click="onPageClick"
            v-model="currentpage"
          />
        </td>
      </tfoot>
    </table>
  </div>
  <div
    class="modal fade"
    id="saveoredit"
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
            {{ titlemodalprefix }}
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
            <label class="form-label">คำนำหน้าชื่อ</label>
            <input
              type="text"
              class="form-control"
              id="prefixinputbox"
              placeholder="นาย/ นาง/ นางสาว"
              v-model="selectdata.text"
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
    id="delete"
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
            ต้องการลบคำนำหน้าชื่อ ?
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
            <label class="form-label">คำนำหน้าชื่อ</label>
            <input
              :disabled="true"
              type="text"
              class="form-control"
              id="prefixinputbox"
              placeholder="นาย/ นาง/ นางสาว"
              v-model="selectdata.text"
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
  prefixcustomerStore,
  type PrefixCustomer,
  type RespList,
  type Resp,
} from "@/stores/settings/customersetting/prefixsetting";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { toast, type ToastOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export default defineComponent({
  name: "Customer setting",
  components: {},
  setup() {
    const prefixstore = prefixcustomerStore();
    let listData = ref<RespList<PrefixCustomer[]>>({ totaldata: 0, data: [] });
    let titlemodalprefix = ref<string>("เพิ่มคำนำหน้าชื่อ");
    let totaldata = ref<number>(0);
    let totalpage = ref<number>(1);
    let currentpage = ref<number>(1);
    let key = ref<string>("");
    const selectdata = ref<PrefixCustomer>({
      id: 0,
      no: 0,
      text: "",
      create_id: "",
      create_name: "",
      modify_id: "",
      modify_name: "",
      create_date: "",
      modify_date: "",
      isactive: false,
    });
    onMounted(() => {
      onInitial();
    });
    const onInitial = async () => {
      listData.value = await prefixstore.getPrefixSettingList(key.value, 1);
      totaldata.value = listData.value.totaldata;
      totalpage.value = totaldata.value;
    };
    const onPageClick = async (page: number) => {
      const keyword = key.value.trim();
      listData.value = await prefixstore.getPrefixSettingList(keyword, page);
      totaldata.value = listData.value.totaldata;
      totalpage.value = totaldata.value;
      currentpage.value = page;
    };
    const onSearch = async () => {
      currentpage.value = 1;
      const keySearch = key.value.trim();
      if (keySearch != "") {
        const keyword = key.value.trim();
        listData.value = await prefixstore.getPrefixSettingList(
          keyword,
          currentpage.value
        );
        totaldata.value = listData.value.totaldata;
        totalpage.value = totaldata.value;
      } else {
        onInitial();
      }
      console.log(listData.value);
    };
    const onCreate = async () => {
      selectdata.value = {
        id: 0,
        no: 0,
        text: "",
        create_id: "",
        create_name: "",
        modify_id: "",
        modify_name: "",
        create_date: "",
        modify_date: "",
        isactive: true,
      };

      if (selectdata.value.text == undefined || selectdata.value.text == "") {
        titlemodalprefix.value = "เพิ่มไขคำนำหน้าชื่อ";
      } else {
        titlemodalprefix.value = "แก้ไขไขคำนำหน้าชื่อ";
      }
    };
    const onEdit = async (item: PrefixCustomer) => {
      selectdata.value = {
        id: item.id,
        no: item.no,
        text: item.text,
        create_id: "",
        create_name: item.create_name,
        modify_id: "",
        modify_name: item.modify_name,
        create_date: item.create_date,
        modify_date: item.modify_date,
        isactive: item.isactive,
      };

      if (selectdata.value.text == undefined || selectdata.value.text == "") {
        titlemodalprefix.value = "เพิ่มไขคำนำหน้าชื่อ";
      } else {
        titlemodalprefix.value = "แก้ไขไขคำนำหน้าชื่อ";
      }
    };
    const onSave = async () => {
      const resp = ref<Resp>({ message: "", status: false });
      resp.value = await prefixstore.getValidatePrefixSetting(selectdata.value);
      if (resp.value.status) {
        if (selectdata.value.id == 0) {
          console.log("if" + selectdata.value.id);
          resp.value = await prefixstore.insertPrefixSettingById(
            selectdata.value
          );
          if (resp.value.status) {
            Swal.fire({
              text: resp.value.message,
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "ตกลง",
              heightAuto: false,
              customClass: {
                confirmButton: "btn fw-semibold btn-light-primary btn-sm",
              },
            });
          } else {
            Swal.fire({
              text: resp.value.message,
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "ลองอีกครั้ง!",
              heightAuto: false,
              customClass: {
                confirmButton: "btn fw-semibold btn-light-danger btn-sm",
              },
            });
          }
        } else {
          resp.value = await prefixstore.updatePrefixSettingById(
            selectdata.value
          );
          if (resp.value.status) {
            Swal.fire({
              text: resp.value.message,
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "ตกลง",
              heightAuto: false,
              customClass: {
                confirmButton: "btn fw-semibold btn-light-primary btn-sm",
              },
            });
          } else {
            Swal.fire({
              text: resp.value.message,
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "ลองอีกครั้ง!",
              heightAuto: false,
              customClass: {
                confirmButton: "btn fw-semibold btn-light-danger btn-sm",
              },
            });
          }
        }
      } else {
        Swal.fire({
          text: resp.value.message,
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "ลองอีกครั้ง!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semibold btn-light-danger btn-sm",
          },
        });
      }
      listData.value = await prefixstore.getPrefixSettingList(
        key.value,
        currentpage.value
      );
      totaldata.value = listData.value.totaldata;
      totalpage.value = totaldata.value;
    };
    const onDelete = async () => {
      const resp = ref<Resp>({ message: "", status: false });
      resp.value = await prefixstore.getValidatePrefixSetting(selectdata.value);
      if (resp.value.status) {
        selectdata.value.isactive = false;
        resp.value = await prefixstore.deletePrefixSettingById(
          selectdata.value
        );
        if (resp.value.status) {
          Swal.fire({
            text: resp.value.message,
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "ตกลง",
            heightAuto: false,
            customClass: {
              confirmButton: "btn fw-semibold btn-light-primary btn-sm",
            },
          });
        } else {
          Swal.fire({
            text: resp.value.message,
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "ลองอีกครั้ง!",
            heightAuto: false,
            customClass: {
              confirmButton: "btn fw-semibold btn-light-danger btn-sm",
            },
          });
        }
      } else {
        Swal.fire({
          text: resp.value.message,
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "ลองอีกครั้ง!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semibold btn-light-danger btn-sm",
          },
        });
      }
      listData.value = await prefixstore.getPrefixSettingList(
        key.value,
        currentpage.value
      );
      totaldata.value = listData.value.totaldata;
      totalpage.value = totaldata.value;
    };
    return {
      getAssetPath,
      listData,
      onEdit,
      onDelete,
      onSave,
      selectdata,
      titlemodalprefix,
      totaldata,
      totalpage,
      currentpage,
      onPageClick,
      key,
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
