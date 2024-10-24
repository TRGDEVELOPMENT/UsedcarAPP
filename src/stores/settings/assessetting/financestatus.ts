import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import { useRouter } from "vue-router";
interface FinanceStatus {
  id: number;
  no: number;
  name: string;
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
export type { FinanceStatus, RespList, Resp };
export const financestatusStore = defineStore(
  "financestatus",
  () => {
    const router = useRouter();
    function setError() {
      router.push({ name: "500" });
    }
    const getValidateFinanceStatus = async (
      data: FinanceStatus
    ): Promise<Resp> => {
      let res: Resp = { message: "", status: false };
      if (data.name == undefined || data.name.trim() == "") {
        res.message += ", ไม่ได้ใส่ชื่อสถานะไฟแนนซ์";
      } else {
        res.message = "";
        res.status = true;
      }
      return res;
    };
    const checkDuplicate = async (keyword: string): Promise<boolean> => {
      let res: boolean = false;
      const listdata = await getFinanceStatusList(keyword,0);
      if (listdata.data) {
        let i = 0;
        while (i < listdata.data.length) {
          if (listdata.data[i].name == keyword) {
            res = true;
            break;
          }
          i++;
        }
      }
      return res;
    };
    const getFinanceStatusList = async (
      key: string,
      page: number
    ): Promise<RespList<FinanceStatus[]>> => {
      ApiService.setURL();
      ApiService.setHeader();
      let res: RespList<FinanceStatus[]> = { totaldata: 0, data: [] };
      const params = {
        page: page,
        key: key,
      };
      await ApiService.get("/setting/assess/financestatus/list", { params: params })
        .then((data) => {
          res = data.data[0];
        })
        .catch(() => {
          setError();
        });
      return res;
    };
    const updateFinanceStatusById = async (
      params: FinanceStatus
    ): Promise<Resp> => {
      ApiService.setURL();
      ApiService.setHeader();
      const res: Resp = { message: "", status: false };
      await ApiService.update("/setting/assess/financestatus", "update", {
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
    const deleteFinanceStatusById = async (
      params: FinanceStatus
    ): Promise<Resp> => {
      ApiService.setURL();
      ApiService.setHeader();
      const res: Resp = { message: "", status: false };
      await ApiService.update("/setting/assess/financestatus", "delete", {
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
    const insertFinanceStatusById = async (
      params: FinanceStatus
    ): Promise<Resp> => {
      ApiService.setURL();
      ApiService.setHeader();
      const res: Resp = { message: "", status: false };
      await ApiService.post("/setting/assess/financestatus/insert", { data: [params] })
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
      getValidateFinanceStatus,
      getFinanceStatusList,
      updateFinanceStatusById,
      deleteFinanceStatusById,
      insertFinanceStatusById,
      checkDuplicate,
    };
  }
);
