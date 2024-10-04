<template>
  <div>
    <div class="p-header">
      <div class="d-flex flex-row">
        <div class="d-flex flex-row flex-column-fluid">
          <div class="d-flex flex-row-fluid flex-left my-5">
            <span class="fs-5 fw-bold">ประเภทหลังคา</span>
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
                  v-model="keyrooftype"
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
                  เพิ่มประเภทหลังคา
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
            ประเภทหลังคา
          </th>
          <th class="w-200px fw-semibold name-dark name-center">ผู้บันทึก</th>
          <th class="w-500px fw-semibold name-dark name-center">สร้างวันที่</th>
          <th class="w-150px fw-semibold name-dark name-center">แก้ไขล่าสุด</th>
          <th class="w-150px fw-semibold name-dark name-center">Option</th>
        </tr>
      </thead>
      <tbody v-for="(item, id) in listdatarooftype.data" :key="id">
        <tr>
          <td class="name-center">{{ item.no }}</td>
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
          <td class="fs-7 name-center">
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
      <tbody
        v-if="
          listdatarooftype.data == undefined ||
          listdatarooftype.data.length == 0
        "
      >
        <tr class="fs-7 name-gray-800">
          <td colspan="6" class="name-center">ไม่พบข้อมูล</td>
        </tr>
      </tbody>
      <tfoot>
        <td colspan="2" class="text-start">
          <span class="fw-semibold">จำนวนทั้งหมด :</span> {{ totaldatarooftype }}
        </td>
        <td colspan="5" class="text-end">
          <vue-awesome-paginate
            v-if="totalpagerooftype != 0"
            :total-items="totalpagerooftype"
            :items-per-page="5"
            :max-pages-shown="5"
            :show-jump-buttons="true"
            :on-click="onPageClick"
            v-model="currentpagerooftype"
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
            {{ titlemodalrooftype }}
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
            <label class="form-label">ประเภทหลังคา</label>
            <input
              type="name"
              class="form-control"
              id="prefixinputbox"
              placeholder="นาย/ นาง/ นางสาว"
              v-model="selectdatarooftype.name"
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
            <label class="form-label">ประเภทหลังคา</label>
            <input
              :disabled="true"
              type="name"
              class="form-control"
              id="prefixinputbox"
              placeholder="นาย/ นาง/ นางสาว"
              v-model="selectdatarooftype.name"
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
  rooftypeStore,
  type RootType,
  type RespList,
  type Resp,
} from "@/stores/settings/assessetting/rooftype";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { toast, type ToastOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export default defineComponent({
  name: "Customer setting",
  components: {},
  setup() {
    const rooftypestore = rooftypeStore();
    let listdatarooftype = ref<RespList<RootType[]>>({
      totaldata: 0,
      data: [],
    });
    let titlemodalrooftype = ref<string>("เพิ่มประเภทหลังคา");
    let totaldatarooftype = ref<number>(0);
    let totalpagerooftype = ref<number>(1);
    let currentpagerooftype = ref<number>(1);
    let keyrooftype = ref<string>("");
    const selectdatarooftype = ref<RootType>({
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
      listdatarooftype.value = await rooftypestore.getRootTypeList(
        keyrooftype.value,
        1
      );
      totaldatarooftype.value = listdatarooftype.value.totaldata;
      totalpagerooftype.value = totaldatarooftype.value;
    };
    const onPageClick = async (page: number) => {
      const keyword = keyrooftype.value.trim();
      listdatarooftype.value = await rooftypestore.getRootTypeList(
        keyword,
        page
      );
      totaldatarooftype.value = listdatarooftype.value.totaldata;
      totalpagerooftype.value = totaldatarooftype.value;
      currentpagerooftype.value = page;
    };
    const onSearch = async () => {
      currentpagerooftype.value = 1;
      const keySearch = keyrooftype.value.trim();
      if (keySearch != "") {
        const keyword = keyrooftype.value.trim();
        listdatarooftype.value = await rooftypestore.getRootTypeList(
          keyword,
          currentpagerooftype.value
        );
        totaldatarooftype.value = listdatarooftype.value.totaldata;
        totalpagerooftype.value = totaldatarooftype.value;
      } else {
        onInitial();
      }
      console.log(listdatarooftype.value);
    };
    const onCreate = async () => {
      selectdatarooftype.value = {
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
        selectdatarooftype.value.name == undefined ||
        selectdatarooftype.value.name == ""
      ) {
        titlemodalrooftype.value = "เพิ่มไขประเภทหลังคา";
      } else {
        titlemodalrooftype.value = "แก้ไขประเภทหลังคา";
      }
    };
    const onEdit = async (item: RootType) => {
      selectdatarooftype.value = {
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
        selectdatarooftype.value.name == undefined ||
        selectdatarooftype.value.name == ""
      ) {
        titlemodalrooftype.value = "เพิ่มประเภทหลังคา";
      } else {
        titlemodalrooftype.value = "แก้ไขประเภทหลังคา";
      }
    };
    const onSave = async () => {
      const resp = ref<Resp>({ message: "", status: false });
      resp.value = await rooftypestore.getValidateRootType(
        selectdatarooftype.value
      );
      if (resp.value.status) {
        if (selectdatarooftype.value.id == 0) {
          console.log("if" + selectdatarooftype.value.id);
          resp.value = await rooftypestore.insertRootTypeById(
            selectdatarooftype.value
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
          resp.value = await rooftypestore.updateRootTypeById(
            selectdatarooftype.value
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
      listdatarooftype.value = await rooftypestore.getRootTypeList(
        keyrooftype.value,
        currentpagerooftype.value
      );
      totaldatarooftype.value = listdatarooftype.value.totaldata;
      totalpagerooftype.value = totaldatarooftype.value;
    };
    const onDelete = async () => {
      const resp = ref<Resp>({ message: "", status: false });
      resp.value = await rooftypestore.getValidateRootType(
        selectdatarooftype.value
      );
      if (resp.value.status) {
        selectdatarooftype.value.isactive = false;
        resp.value = await rooftypestore.deleteRootTypeById(
          selectdatarooftype.value
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
      listdatarooftype.value = await rooftypestore.getRootTypeList(
        keyrooftype.value,
        currentpagerooftype.value
      );
      totaldatarooftype.value = listdatarooftype.value.totaldata;
      totalpagerooftype.value = totaldatarooftype.value;
    };
    return {
      getAssetPath,
      listdatarooftype,
      onEdit,
      onDelete,
      onSave,
      selectdatarooftype,
      titlemodalrooftype,
      totaldatarooftype,
      totalpagerooftype,
      currentpagerooftype,
      onPageClick,
      keyrooftype,
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
