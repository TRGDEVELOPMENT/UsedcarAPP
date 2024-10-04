<template>
  <div>
    <div class="p-header">
      <div class="d-flex flex-row">
        <div class="d-flex flex-row flex-column-fluid">
          <div class="d-flex flex-row-fluid flex-left my-5">
            <span class="fs-5 fw-bold">ประเภทที่อยู่</span>
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
                  v-model="keycustomeraddresstype"
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
                  data-bs-target="#saveoreditcustomeraddress"
                >
                  เพิ่มประเภทที่อยู่
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
          <th class="w-200px fw-semibold text-dark text-center">
            ประเภทที่อยู่
          </th>
          <th class="w-200px fw-semibold text-dark text-center">ผู้บันทึก</th>
          <th class="w-500px fw-semibold text-dark text-center">สร้างวันที่</th>
          <th class="w-150px fw-semibold text-dark text-center">แก้ไขล่าสุด</th>
          <th class="w-150px fw-semibold text-dark text-center">Option</th>
        </tr>
      </thead>
      <tbody v-for="(item, id) in listDatacustomeraddresstype.data" :key="id">
        <tr>
          <td class="text-center">{{ item.no }}</td>
          <td class="fs-7">
            <span class="fw-semibold">{{ item.name }}</span>
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
              data-bs-target="#saveoreditcustomeraddress"
              class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
            >
              <KTIcon icon-name="pencil" icon-class="fs-3" />
            </a>
            <a
              @click="onEdit(item)"
              data-bs-toggle="modal"
              data-bs-target="#deletecustomeraddress"
              class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
            >
              <KTIcon icon-name="trash" icon-class="fs-3" />
            </a>
          </td>
        </tr>
      </tbody>
      <tbody
        v-if="
          listDatacustomeraddresstype.data == undefined ||
          listDatacustomeraddresstype.data.length == 0
        "
      >
        <tr class="fs-7 text-gray-800">
          <td colspan="6" class="text-center">ไม่พบข้อมูล</td>
        </tr>
      </tbody>
      <tfoot>
        <td colspan="2" class="text-start">
          <span class="fw-semibold">จำนวนทั้งหมด :</span> {{ totaldatacustomeraddresstype }}
        </td>
        <td colspan="5" class="text-end">
          <vue-awesome-paginate
            v-if="totalpagecustomeraddresstype != 0"
            :total-items="totalpagecustomeraddresstype"
            :items-per-page="5"
            :max-pages-shown="5"
            :show-jump-buttons="true"
            :on-click="onPageClick"
            v-model="currentpagecustomeraddresstype"
          />
        </td>
      </tfoot>
    </table>
  </div>
  <div
    class="modal fade"
    id="saveoreditcustomeraddress"
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
            {{ titlemodalcustomeraddresstype }}
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
            <label class="form-label">ประเภทที่อยู่</label>
            <input
              type="text"
              class="form-control"
              id="prefixinputbox"
              placeholder="ประเภทที่อยู่"
              v-model="selectdata.name"
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
    id="deletecustomeraddress"
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
            ต้องการลบประเภทที่อยู่ ?
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
            <label class="form-label">ประเภทที่อยู่</label>
            <input
              :disabled="true"
              type="text"
              class="form-control"
              id="prefixinputbox"
              placeholder="นาย/ นาง/ นางสาว"
              v-model="selectdata.name"
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
  customeraddresstypeStore,
  type CustomerAddresstype,
  type RespList,
  type Resp,
} from "@/stores/settings/customersetting/customeraddresstype";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { toast, type ToastOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export default defineComponent({
  name: "Customer setting",
  components: {},
  setup() {
    const customeraddresstypestore = customeraddresstypeStore();
    let listDatacustomeraddresstype = ref<RespList<CustomerAddresstype[]>>({ totaldata: 0, data: [] });
    let titlemodalcustomeraddresstype = ref<string>("เพิ่มประเภทที่อยู่");
    let totaldatacustomeraddresstype = ref<number>(0);
    let totalpagecustomeraddresstype = ref<number>(1);
    let currentpagecustomeraddresstype = ref<number>(1);
    let keycustomeraddresstype = ref<string>("");
    const selectdata = ref<CustomerAddresstype>({
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
      deleteddate: ""
    });
    onMounted(() => {
      onInitial();
    });
    const onInitial = async () => {
      listDatacustomeraddresstype.value = await customeraddresstypestore.getCustomerCustomerAddresstypeList(keycustomeraddresstype.value, 1);
      totaldatacustomeraddresstype.value = listDatacustomeraddresstype.value.totaldata;
      totalpagecustomeraddresstype.value = totaldatacustomeraddresstype.value;
    };
    const onPageClick = async (page: number) => {
      const keyword = keycustomeraddresstype.value.trim();
      listDatacustomeraddresstype.value = await customeraddresstypestore.getCustomerCustomerAddresstypeList(keyword, page);
      totaldatacustomeraddresstype.value = listDatacustomeraddresstype.value.totaldata;
      totalpagecustomeraddresstype.value = totaldatacustomeraddresstype.value;
      currentpagecustomeraddresstype.value = page;
    };
    const onSearch = async () => {
      currentpagecustomeraddresstype.value = 1;
      const keySearch = keycustomeraddresstype.value.trim();
      if (keySearch != "") {
        const keyword = keycustomeraddresstype.value.trim();
        listDatacustomeraddresstype.value = await customeraddresstypestore.getCustomerCustomerAddresstypeList(
          keyword,
          currentpagecustomeraddresstype.value
        );
        totaldatacustomeraddresstype.value = listDatacustomeraddresstype.value.totaldata;
        totalpagecustomeraddresstype.value = totaldatacustomeraddresstype.value;
      } else {
        onInitial();
      }
      console.log(listDatacustomeraddresstype.value);
    };
    const onCreate = async () => {
      selectdata.value = {
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
      deleteddate: ""
      };

      if (selectdata.value.name == undefined || selectdata.value.name == "") {
        titlemodalcustomeraddresstype.value = "เพิ่มไขประเภทที่อยู่";
      } else {
        titlemodalcustomeraddresstype.value = "แก้ไขไขประเภทที่อยู่";
      }
    };
    const onEdit = async (item: CustomerAddresstype) => {
      selectdata.value = {
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
        deleteddate: item.deleteddate
      };

      if (selectdata.value.name == undefined || selectdata.value.name == "") {
        titlemodalcustomeraddresstype.value = "เพิ่มไขประเภทที่อยู่";
      } else {
        titlemodalcustomeraddresstype.value = "แก้ไขประเภทที่อยู่";
      }
    };
    const onSave = async () => {
      const resp = ref<Resp>({ message: "", status: false });
      resp.value = await customeraddresstypestore.getValidateCustomerAddresstype(selectdata.value);
      if (resp.value.status) {
        if (selectdata.value.id == 0) {
          console.log("if" + selectdata.value.id);
          resp.value = await customeraddresstypestore.insertCustomerAddresstypeById(
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
          resp.value = await customeraddresstypestore.updateCustomerAddresstypeById(
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
      listDatacustomeraddresstype.value = await customeraddresstypestore.getCustomerCustomerAddresstypeList(
        keycustomeraddresstype.value,
        currentpagecustomeraddresstype.value
      );
      totaldatacustomeraddresstype.value = listDatacustomeraddresstype.value.totaldata;
      totalpagecustomeraddresstype.value = totaldatacustomeraddresstype.value;
    };
    const onDelete = async () => {
      const resp = ref<Resp>({ message: "", status: false });
      resp.value = await customeraddresstypestore.getValidateCustomerAddresstype(selectdata.value);
      if (resp.value.status) {
        selectdata.value.isactive = false;
        resp.value = await customeraddresstypestore.deleteCustomerAddresstypeById(
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
      listDatacustomeraddresstype.value = await customeraddresstypestore.getCustomerCustomerAddresstypeList(
        keycustomeraddresstype.value,
        currentpagecustomeraddresstype.value
      );
      totaldatacustomeraddresstype.value = listDatacustomeraddresstype.value.totaldata;
      totalpagecustomeraddresstype.value = totaldatacustomeraddresstype.value;
    };
    return {
      getAssetPath,
      listDatacustomeraddresstype,
      onEdit,
      onDelete,
      onSave,
      selectdata,
      titlemodalcustomeraddresstype,
      totaldatacustomeraddresstype,
      totalpagecustomeraddresstype,
      currentpagecustomeraddresstype,
      onPageClick,
      keycustomeraddresstype,
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
