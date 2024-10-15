<template>
  <div>
    <div>
      <ol class="breadcrumb text-muted fs-6 fw-semibold">
        <li class="breadcrumb-item">
          <span class="">ตั้งค่า</span>
        </li>
        <li class="breadcrumb-item">
          <span class="">เหตุผลขอยกเลิก</span>
        </li>
      </ol>
    </div>
    <div class="p-header">
      <span class="fs-2 fw-bold">เหตุผลขอยกเลิก</span>
    </div>
    <div class="card shadow-sm container-card">
      <div class="card-body">
        <div>
          <div class="p-header">
            <div class="d-flex flex-row">
              <div class="d-flex flex-row flex-column-fluid">
                <div class="d-flex flex-row-fluid flex-left my-5">
                  <span class="fs-5 fw-bold">เหตุผลขอยกเลิก</span>
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
                        v-model="keyuserremark"
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
                        data-bs-target="#saveoreditremark"
                      >
                        เพิ่มเหตุผลขอยกเลิก
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
                  เหตุผลขอยกเลิก
                </th>
                <th class="w-200px fw-semibold name-dark name-center">
                  คำอธิบาย
                </th>
                <th class="w-150px fw-semibold name-dark name-center">สถานะ</th>
                <th class="w-500px fw-semibold name-dark name-center">
                  ผู้บันทึก
                </th>
                <th class="w-150px fw-semibold name-dark name-center">
                  Option
                </th>
              </tr>
            </thead>
            <tbody v-for="(item, id) in listdataremark.data" :key="id">
              <tr>
                <td class="name-center">{{ item.no }}</td>
                <td class="fs-7">
                  <span class="fw-semibold">{{ item.label }}</span>
                </td>
                <td class="fs-7">
                  <span class="fw-semibold">{{ item.description }}</span>
                </td>
                <td class="fs-7">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-check"
                    viewBox="0 0 16 16"
                    v-show="item.isactive"
                  >
                    <path
                      d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"
                    />
                  </svg>
                </td>
                <td class="fs-7">
                  <span class="fw-semibold">{{ item.creatorname }}</span>
                </td>
                <td class="fs-7 name-center">
                  <a
                    @click="onEdit(item)"
                    data-bs-toggle="modal"
                    data-bs-target="#saveoreditremark"
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                  >
                    <KTIcon icon-name="pencil" icon-class="fs-3" />
                  </a>
                  <a
                    @click="onEdit(item)"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteremark"
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                  >
                    <KTIcon icon-name="trash" icon-class="fs-3" />
                  </a>
                </td>
              </tr>
            </tbody>
            <tbody
              v-if="
                listdataremark.data == undefined ||
                listdataremark.data.length == 0
              "
            >
              <tr class="fs-7 name-gray-800">
                <td colspan="6" class="name-center">ไม่พบข้อมูล</td>
              </tr>
            </tbody>
            <tfoot>
              <td colspan="2" class="text-start">
                <span class="fw-semibold">จำนวนทั้งหมด :</span>
                {{ totaldataremark }}
              </td>
              <td colspan="5" class="text-end">
                <vue-awesome-paginate
                  v-if="totalpageremark != 0"
                  :total-items="totalpageremark"
                  :items-per-page="5"
                  :max-pages-shown="5"
                  :show-jump-buttons="true"
                  :on-click="onPageClick"
                  v-model="currentpageremark"
                />
              </td>
            </tfoot>
          </table>
        </div>
        <div
          class="modal fade"
          id="saveoreditremark"
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
                  {{ titlemodalremark }}
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
                  <label class="form-label">เหตุผลขอยกเลิก</label>
                  <input
                    type="name"
                    class="form-control"
                    id="prefixinputbox"
                    placeholder="เหตุผลขอยกเลิก"
                    v-model="selectdatafinancestatus.label"
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
          id="deleteremark"
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
                  ต้องการลบ User Role ?
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
                  <label class="form-label">เหตุผลขอยกเลิก</label>
                  <input
                    :disabled="true"
                    type="name"
                    class="form-control"
                    id="prefixinputbox"
                    placeholder="เหตุผลขอยกเลิก"
                    v-model="selectdatafinancestatus.label"
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">คำอธิบาย </label>
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
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import {
  remarkStore,
  type Remark,
  type RespList,
  type Resp,
} from "@/stores/settings/remark/remark";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "vue3-toastify/dist/index.css";
export default defineComponent({
  name: "role",
  components: {},
  setup() {
    const remarkstore = remarkStore();
    let listdataremark = ref<RespList<Remark[]>>({
      totaldata: 0,
      data: [],
    });
    let titlemodalremark = ref<string>("เพิ่มเหตุผลขอยกเลิก");
    let totaldataremark = ref<number>(0);
    let totalpageremark = ref<number>(1);
    let currentpageremark = ref<number>(1);
    let keyuserremark = ref<string>("");
    const selectdatafinancestatus = ref<Remark>({
      id: 0,
      no: 0,
      label: "",
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
      listdataremark.value = await remarkstore.getRemarkList(
        keyuserremark.value,
        1
      );
      totaldataremark.value = listdataremark.value.totaldata;
      totalpageremark.value = totaldataremark.value;
    };
    const onPageClick = async (page: number) => {
      const keyword = keyuserremark.value.trim();
      listdataremark.value = await remarkstore.getRemarkList(keyword, page);
      totaldataremark.value = listdataremark.value.totaldata;
      totalpageremark.value = totaldataremark.value;
      currentpageremark.value = page;
    };
    const onSearch = async () => {
      currentpageremark.value = 1;
      const keySearch = keyuserremark.value.trim();
      if (keySearch != "") {
        const keyword = keyuserremark.value.trim();
        listdataremark.value = await remarkstore.getRemarkList(
          keyword,
          currentpageremark.value
        );
        totaldataremark.value = listdataremark.value.totaldata;
        totalpageremark.value = totaldataremark.value;
      } else {
        onInitial();
      }
      console.log(listdataremark.value);
    };
    const onCreate = async () => {
      selectdatafinancestatus.value = {
        id: 0,
        no: 0,
        label: "",
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
        selectdatafinancestatus.value.label == undefined ||
        selectdatafinancestatus.value.label == ""
      ) {
        titlemodalremark.value = "เพิ่มเหตุผลขอยกเลิก";
      } else {
        titlemodalremark.value = "แก้ไขเหตุผลขอยกเลิก";
      }
    };
    const onEdit = async (item: Remark) => {
      selectdatafinancestatus.value = {
        id: item.id,
        no: item.no,
        label: item.label,
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
        selectdatafinancestatus.value.label == undefined ||
        selectdatafinancestatus.value.label == ""
      ) {
        titlemodalremark.value = "เพิ่มเหตุผลขอยกเลิก";
      } else {
        titlemodalremark.value = "แก้ไขเหตุผลขอยกเลิก";
      }
    };
    const onSave = async () => {
      const resp = ref<Resp>({ message: "", status: false });
      resp.value = await remarkstore.getValidateRemark(
        selectdatafinancestatus.value
      );
      if (resp.value.status) {
        if (selectdatafinancestatus.value.id == 0) {
          console.log("if" + selectdatafinancestatus.value.id);
          resp.value = await remarkstore.insertRemarkById(
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
          resp.value = await remarkstore.updateRemarkById(
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
      listdataremark.value = await remarkstore.getRemarkList(
        keyuserremark.value,
        currentpageremark.value
      );
      totaldataremark.value = listdataremark.value.totaldata;
      totalpageremark.value = totaldataremark.value;
    };
    const onDelete = async () => {
      const resp = ref<Resp>({ message: "", status: false });
      resp.value = await remarkstore.getValidateRemark(
        selectdatafinancestatus.value
      );
      if (resp.value.status) {
        selectdatafinancestatus.value.isactive = false;
        resp.value = await remarkstore.deleteRemarkById(
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
      listdataremark.value = await remarkstore.getRemarkList(
        keyuserremark.value,
        currentpageremark.value
      );
      totaldataremark.value = listdataremark.value.totaldata;
      totalpageremark.value = totaldataremark.value;
    };
    return {
      getAssetPath,
      listdataremark,
      onEdit,
      onDelete,
      onSave,
      selectdatafinancestatus,
      titlemodalremark,
      totaldataremark,
      totalpageremark,
      currentpageremark,
      onPageClick,
      keyuserremark,
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
