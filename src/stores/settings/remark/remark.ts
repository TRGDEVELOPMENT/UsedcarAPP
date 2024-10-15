import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import { useRouter } from "vue-router";
interface Remark {
  id: number;
  no: number;
  label: string;
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
export type { Remark, RespList, Resp };
export const remarkStore = defineStore(
  "remark",
  () => {
    const router = useRouter();
    function setError() {
      router.push({ name: "500" });
    }
    const getValidateRemark = async (
      data: Remark
    ): Promise<Resp> => {
      let res: Resp = { message: "", status: false };
      if (data.label == undefined || data.label.trim() == "") {
        res.message += ", ไม่ได้ใส่ชื่อเหตุผล";
      } else {
        res.message = "";
        res.status = true;
      }
      return res;
    };
    const getRemarkList = async (
      key: string,
      page: number
    ): Promise<RespList<Remark[]>> => {
      ApiService.setURL();
      ApiService.setHeader();
      let res: RespList<Remark[]> = { totaldata: 0, data: [] };
      const params = {
        page: page,
        key: key,
      };
      await ApiService.get("/setting/remark/remark/list", { params: params })
        .then((data) => {
          res = data.data[0];
        })
        .catch(() => {
          setError();
        });
      return res;
    };
    const updateRemarkById = async (
      params: Remark
    ): Promise<Resp> => {
      ApiService.setURL();
      ApiService.setHeader();
      const res: Resp = { message: "", status: false };
      await ApiService.update("/setting/remark/remark", "update", {
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
    const deleteRemarkById = async (
      params: Remark
    ): Promise<Resp> => {
      ApiService.setURL();
      ApiService.setHeader();
      const res: Resp = { message: "", status: false };
      await ApiService.update("/setting/remark/remark", "delete", {
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
    const insertRemarkById = async (
      params: Remark
    ): Promise<Resp> => {
      ApiService.setURL();
      ApiService.setHeader();
      const res: Resp = { message: "", status: false };
      await ApiService.post("/setting/remark/remark/insert", { data: [params] })
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
      getValidateRemark,
      getRemarkList,
      updateRemarkById,
      deleteRemarkById,
      insertRemarkById,
    };
  }
);
