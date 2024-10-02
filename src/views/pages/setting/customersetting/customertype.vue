<template>
  <div>
    <div class="p-header">
      <div class="d-flex flex-row">
        <div class="d-flex flex-row flex-column-fluid">
          <div class="d-flex flex-row-fluid flex-left my-5">
            <span class="fs-5 fw-bold">ประเภทลูกค้า</span>
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
                  v-model="keyustomertype"
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
                  data-bs-target="#saveoreditcustomertype"
                >
                  เพิ่มประเภทลูกค้า
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
          <th class="w-200px fw-semibold text-dark text-center">รหัสลูกค้า</th>
          <th class="w-200px fw-semibold text-dark text-center">
            ชื่อประเภทลูกค้า
          </th>
          <th class="w-200px fw-semibold text-dark text-center">
            แสดง Parking Location
          </th>
          <th class="w-500px fw-semibold text-dark text-center">ผู้บันทึก</th>
          <th class="w-150px fw-semibold text-dark text-center">สร้างวันที่</th>
          <th class="w-150px fw-semibold text-dark text-center">แก้ไขล่าสุด</th>
          <th class="w-150px fw-semibold text-dark text-center">Option</th>
        </tr>
      </thead>
      <tbody
        v-for="(item, id) in listDataCustomerType.data"
        :keyustomertype="id"
      >
        <tr>
          <td class="text-center">{{ item.no }}</td>
          <td class="fs-7">
            <span class="fw-semibold">{{ item.typecode }}</span>
          </td>
          <td class="fs-7">
            <span class="fw-semibold">{{ item.name }}</span>
          </td>
          <td class="fs-7">
            <input
              :disabled="true"
              type="checkbox"
              v-model="item.isparkinglocation"
              class="fw-semibold"
            />
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
          <td class="fs-7 text-center">
            <a
              @click="onEdit(item)"
              data-bs-toggle="modal"
              data-bs-target="#saveoreditcustomertype"
              class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
            >
              <KTIcon icon-name="pencil" icon-class="fs-3" />
            </a>
            <a
              @click="onEdit(item)"
              data-bs-toggle="modal"
              data-bs-target="#deletecustomertype"
              class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
            >
              <KTIcon icon-name="trash" icon-class="fs-3" />
            </a>
          </td>
        </tr>
      </tbody>
      <tbody
        v-if="
          listDataCustomerType.data == undefined ||
          listDataCustomerType.data.length == 0
        "
      >
        <tr class="fs-7 text-gray-800">
          <td colspan="6" class="text-center">ไม่พบข้อมูล</td>
        </tr>
      </tbody>
      <tfoot>
        <td colspan="2" class="text-start">
          <span class="fw-semibold">จำนวนทั้งหมด :</span
          >{{ totaldatacustomertype }}
        </td>
        <td colspan="6" class="text-end">
          <vue-awesome-paginate
            v-if="totalpagecustomertype != 0"
            :total-items="totalpagecustomertype"
            :items-per-page="5"
            :max-pages-shown="5"
            :show-jump-buttons="true"
            :on-click="onPageClick"
            v-model="currentpagecustomertype"
          />
        </td>
      </tfoot>
    </table>
  </div>
  <div
    class="modal fade"
    id="saveoreditcustomertype"
    data-bs-backdrop="static"
    data-bs-keyustomertypeboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">
            {{ titlemodalcustomertype }}
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
            <label class="form-label">รหัสลูกค้า</label>
            <input
              type="text"
              class="form-control"
              id="prefixinputbox"
              placeholder="J-O"
              v-model="selectdatacustomertype.typecode"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">ชื่อประเภทลูกค้า</label>
            <input
              type="text"
              class="form-control"
              id="prefixinputbox"
              placeholder="Retail-Online"
              v-model="selectdatacustomertype.name"
            />
          </div>
          <div class="mb-3">
            <div><label class="form-label">แสดง Parking Location</label></div>
            <div>
              <input
                type="checkbox"
                v-model="selectdatacustomertype.isparkinglocation"
                class="fw-semibold"
              />
            </div>
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
    id="deletecustomertype"
    data-bs-backdrop="static"
    data-bs-keyustomertypeboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">
            ต้องการลบประเภทลูกค้า ?
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
            <label class="form-label">รหัสลูกค้า</label>
            <input
              :disabled="true"
              type="text"
              class="form-control"
              id="prefixinputbox"
              placeholder="J-O"
              v-model="selectdatacustomertype.typecode"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">ชื่อประเภทลูกค้า</label>
            <input
              :disabled="true"
              type="text"
              class="form-control"
              id="prefixinputbox"
              placeholder="Retail-Online"
              v-model="selectdatacustomertype.name"
            />
          </div>
          <div class="mb-3">
            <div><label class="form-label">แสดง Parking Location</label></div>
            <div>
              <input
                :disabled="true"
                type="checkbox"
                v-model="selectdatacustomertype.isparkinglocation"
                class="fw-semibold"
              />
            </div>
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
            บันทึก
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
  customertypeStore,
  type Customertype,
  type RespList,
  type Resp,
} from "@/stores/settings/customersetting/customertype";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { toast, type ToastOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export default defineComponent({
  name: "Customer type",
  components: {},
  setup() {
    const customertypestore = customertypeStore();
    let listDataCustomerType = ref<RespList<Customertype[]>>({
      totaldata: 0,
      data: [],
    });
    let titlemodalcustomertype = ref<string>("เพิ่มประเภทลูกค้า");
    let totaldatacustomertype = ref<number>(0);
    let totalpagecustomertype = ref<number>(1);
    let currentpagecustomertype = ref<number>(1);
    let keyustomertype = ref<string>("");
    const selectdatacustomertype = ref<Customertype>({
      id: 0,
      no: 0,
      typecode: "",
      precode: "",
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
      isparkinglocation: false,
    });
    onMounted(() => {
      onInitial();
    });
    const onInitial = async () => {
      listDataCustomerType.value = await customertypestore.getCustomerTypeList(
        keyustomertype.value,
        1
      );
      totaldatacustomertype.value = listDataCustomerType.value.totaldata;
      totalpagecustomertype.value = totaldatacustomertype.value;
    };
    const onPageClick = async (page: number) => {
      const keyword = keyustomertype.value.trim();
      listDataCustomerType.value = await customertypestore.getCustomerTypeList(
        keyword,
        page
      );
      totaldatacustomertype.value = listDataCustomerType.value.totaldata;
      totalpagecustomertype.value = totalpagecustomertype.value;
      currentpagecustomertype.value = page;
    };
    const onEdit = async (item: Customertype) => {
      selectdatacustomertype.value = {
        id: item.id,
        no: item.no,
        typecode: item.typecode,
        precode: item.precode,
        name: item.name,
        description: item.typecode,
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
        isparkinglocation: item.isparkinglocation,
      };
      if (selectdatacustomertype.value.id == undefined || selectdatacustomertype.value.id == 0) {
        titlemodalcustomertype.value = "เพิ่มประเภทลูกค้า";
      } else {
        titlemodalcustomertype.value = "แก้ไขประเภทลูกค้า";
      }
    };
    const onSave = async () => {
      console.log(selectdatacustomertype.value);
      const resp = ref<Resp>({ message: "", status: false });
      resp.value = await customertypestore.getValidateCustomerType(selectdatacustomertype.value);
      if (resp.value.status) {
        if (selectdatacustomertype.value.id == 0) {
          console.log("if" + selectdatacustomertype.value.id);
          resp.value = await customertypestore.insertCustomertypeById(
            selectdatacustomertype.value
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
          resp.value = await customertypestore.updateCustomerTypeById(
            selectdatacustomertype.value
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
      listDataCustomerType.value = await customertypestore.getCustomerTypeList(
        keyustomertype.value,
        currentpagecustomertype.value
      );
      totaldatacustomertype.value = listDataCustomerType.value.totaldata;
      totalpagecustomertype.value = totaldatacustomertype.value;
    };
    const onDelete = async () => {
      const resp = ref<Resp>({ message: "", status: false });
      resp.value = await customertypestore.getValidateCustomerType(selectdatacustomertype.value);
      if (resp.value.status) {
        selectdatacustomertype.value.isactive = false;
        resp.value = await customertypestore.deletePrefixSettingById(
          selectdatacustomertype.value
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
      listDataCustomerType.value = await customertypestore.getCustomerTypeList(
        keyustomertype.value,
        currentpagecustomertype.value
      );
      totaldatacustomertype.value = listDataCustomerType.value.totaldata;
      totalpagecustomertype.value = totaldatacustomertype.value;
    };
    const onSearch = async () => {
      currentpagecustomertype.value = 1;
      const keySearch = keyustomertype.value.trim();
      if (keySearch != "") {
        const keyword = keyustomertype.value.trim();
        listDataCustomerType.value =
          await customertypestore.getCustomerTypeList(
            keyword,
            currentpagecustomertype.value
          );
        totaldatacustomertype.value = listDataCustomerType.value.totaldata;
        totalpagecustomertype.value = totaldatacustomertype.value;
      } else {
        onInitial();
      }
      console.log(listDataCustomerType.value);
    };
    const onCreate = async () => {
      selectdatacustomertype.value = {
        id: 0,
        no: 0,
        typecode: "",
        precode: "",
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
        isparkinglocation: false,
      };
      if (selectdatacustomertype.value.id == undefined || selectdatacustomertype.value.id == 0) {
        titlemodalcustomertype.value = "เพิ่มประเภทลูกค้า";
      } else {
        titlemodalcustomertype.value = "แก้ไขประเภทลูกค้า";
      }
    };
    return {
      getAssetPath,
      listDataCustomerType,
      onEdit,
      onDelete,
      onSave,
      selectdatacustomertype,
      titlemodalcustomertype,
      totaldatacustomertype,
      totalpagecustomertype,
      currentpagecustomertype,
      onPageClick,
      keyustomertype,
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
