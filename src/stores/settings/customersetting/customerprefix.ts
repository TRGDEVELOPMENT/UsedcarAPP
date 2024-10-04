import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import { useRouter } from "vue-router";
import { ref } from "vue";
interface PrefixCustomer {
  id: number;
  no: number;
  text: string;
  create_id: string;
  create_name: string;
  modify_id: string;
  modify_name: string;
  create_date: string;
  modify_date: string;
  isactive: boolean;
}
interface RespList<data = any> {
  totaldata: number;
  data: data;
}
interface Resp {
  message: string;
  status: boolean;
}
export type { PrefixCustomer, RespList, Resp };
export const prefixcustomerStore = defineStore("prefixcustomer", () => {
  const router = useRouter();
  function setError() {
    router.push({ name: "500" });
  }
  const getValidatePrefixSetting = async (
    data: PrefixCustomer
  ): Promise<Resp> => {
    const res: Resp = { message: "", status: false };
    if (data.text == undefined || data.text.trim() == "") {
      res.message = "ไม่ได้ใส่คำนำหน้าชื่อ";
    } else {
      res.message = "";
      res.status = true;
    }
    return res;
  };
  const getPrefixSettingList = async (
    key: string,
    page: number
  ): Promise<RespList<PrefixCustomer[]>> => {
    ApiService.setURL();
    ApiService.setHeader();
    let res: RespList<PrefixCustomer[]> = { totaldata: 0, data: [] };
    const params = {
      page: page,
      key: key,
    };
    await ApiService.get("/setting/customersetting/customerprefix/list", { params: params })
      .then((data) => {
        res = data.data[0];
      })
      .catch(() => {
        setError();
      });
    return res;
  };
  const updatePrefixSettingById = async (
    params: PrefixCustomer
  ): Promise<Resp> => {
    ApiService.setURL();
    ApiService.setHeader();
    const res: Resp = { message: "", status: false };
    await ApiService.update("/setting/customersetting/customerprefix", "update", {
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
  const deletePrefixSettingById = async (
    params: PrefixCustomer
  ): Promise<Resp> => {
    ApiService.setURL();
    ApiService.setHeader();
    const res: Resp = { message: "", status: false };
    await ApiService.update("/setting/customersetting/customerprefix", "delete", {
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
  const insertPrefixSettingById = async (
    params: PrefixCustomer
  ): Promise<Resp> => {
    ApiService.setURL();
    ApiService.setHeader();
    const res: Resp = { message: "", status: false };
    await ApiService.post("/setting/customersetting/customerprefix/insert", { data: [params] })
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
    getPrefixSettingList,
    getValidatePrefixSetting,
    updatePrefixSettingById,
    deletePrefixSettingById,
    insertPrefixSettingById,
  };
});
