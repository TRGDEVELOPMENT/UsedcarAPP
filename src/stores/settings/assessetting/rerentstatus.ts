import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import { useRouter } from "vue-router";
interface ReRentStatus {
  id: number;
  no: number;
  status: string;
  description: string;
  isactive: boolean;
  creatorid: string;
  creatorname: string;
  createddate: string;
  modifiedid: string;
  modifiedname: string;
  modifieddate: string;
  deletedid: string;
  deletedname: string;
  deleteddate: string;
}
interface RespList<data = any> {
  totaldata: number;
  data: data;
}
interface Resp {
  message: string;
  status: boolean;
}
export type { ReRentStatus, RespList, Resp };
export const rerentstatusStore = defineStore(
  "rerentstatus",
  () => {
    const router = useRouter();
    function setError() {
      router.push({ name: "500" });
    }
    const getValidateReRentStatus = async (
      data: ReRentStatus
    ): Promise<Resp> => {
      let res: Resp = { message: "", status: false };
      if (data.status == undefined || data.status.trim() == "") {
        res.message += ", ไม่ได้ใส่ status";
      } else {
        res.message = "";
        res.status = true;
      }
      return res;
    };
    const checkDuplicate = async (keyword: string): Promise<boolean> => {
      let res: boolean = false;
      const listdata = await getReRentStatusList(keyword, 0);
      if (listdata.data) {
        let i = 0;
        while (i < listdata.data.length) {
          if (listdata.data[i].status == keyword) {
            res = true;
            break;
          }
          i++;
        }
      }
      return res;
    };
    const getReRentStatusList = async (
      key: string,
      page: number
    ): Promise<RespList<ReRentStatus[]>> => {
      ApiService.setURL();
      ApiService.setHeader();
      let res: RespList<ReRentStatus[]> = { totaldata: 0, data: [] };
      const params = {
        page: page,
        key: key,
      };
      await ApiService.get("/setting/assess/rerentstatus/list", { params: params })
        .then((data) => {
          res = data.data[0];
        })
        .catch(() => {
          setError();
        });
      return res;
    };
    const updateReRentStatusById = async (
      params: ReRentStatus
    ): Promise<Resp> => {
      ApiService.setURL();
      ApiService.setHeader();
      const res: Resp = { message: "", status: false };
      await ApiService.update("/setting/assess/rerentstatus/rerentstatus", "update", {
        data: [params],
      })
        .then(() => {
          res.message = "อัพเดตสำเร็จ";
          res.status = true;
        })
        .catch((e) => {
          setError();
        });
      return res;
    };
    const deleteReRentStatusById = async (
      params: ReRentStatus
    ): Promise<Resp> => {
      ApiService.setURL();
      ApiService.setHeader();
      const res: Resp = { message: "", status: false };
      await ApiService.update("/setting/assess/rerentstatus", "delete", {
        data: [params],
      })
        .then(() => {
          res.message = "ลบสำเร็จ";
          res.status = true;
        })
        .catch((e) => {
          setError();
        });
      return res;
    };
    const insertReRentStatusById = async (
      params: ReRentStatus
    ): Promise<Resp> => {
      ApiService.setURL();
      ApiService.setHeader();
      const res: Resp = { message: "", status: false };
      await ApiService.post("/setting/assess/rerentstatus/insert", { data: [params] })
        .then(() => {
          res.message = "เพิ่มสำเร็จ";
          res.status = true;
        })
        .catch((e) => {
          setError();
        });
      return res;
    };
    return {
      getValidateReRentStatus,
      getReRentStatusList,
      updateReRentStatusById,
      deleteReRentStatusById,
      insertReRentStatusById,
      checkDuplicate,
    };
  }
);
