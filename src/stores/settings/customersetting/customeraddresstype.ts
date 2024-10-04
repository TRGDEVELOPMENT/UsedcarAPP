import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import { useRouter } from "vue-router";
import { ref } from "vue";
interface CustomerAddresstype {
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
export type { CustomerAddresstype, RespList, Resp };
export const customeraddresstypeStore = defineStore(
  "customeraddresstype",
  () => {
    const router = useRouter();
    function setError() {
      router.push({ name: "500" });
    }
    const getValidateCustomerAddresstype = async (
      data: CustomerAddresstype
    ): Promise<Resp> => {
      let res: Resp = { message: "", status: false };
      if (data.name == undefined || data.name.trim() == "") {
        res.message += ", ไม่ได้ใส่ประเภทที่อยู่";
      } else {
        res.message = "";
        res.status = true;
      }
      return res;
    };
    const getCustomerCustomerAddresstypeList = async (
      key: string,
      page: number
    ): Promise<RespList<CustomerAddresstype[]>> => {
      ApiService.setURL();
      ApiService.setHeader();
      let res: RespList<CustomerAddresstype[]> = { totaldata: 0, data: [] };
      const params = {
        page: page,
        key: key,
      };
      await ApiService.get("/setting/customersetting/customeraddresstype/list", { params: params })
        .then((data) => {
          res = data.data[0];
        })
        .catch(() => {
          setError();
        });
      return res;
    };
    const updateCustomerAddresstypeById = async (
      params: CustomerAddresstype
    ): Promise<Resp> => {
      ApiService.setURL();
      ApiService.setHeader();
      const res: Resp = { message: "", status: false };
      await ApiService.update("/setting/customersetting/customeraddresstype", "update", {
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
    const deleteCustomerAddresstypeById = async (
      params: CustomerAddresstype
    ): Promise<Resp> => {
      ApiService.setURL();
      ApiService.setHeader();
      const res: Resp = { message: "", status: false };
      await ApiService.update("/setting/customersetting/customeraddresstype", "delete", {
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
    const insertCustomerAddresstypeById = async (
      params: CustomerAddresstype
    ): Promise<Resp> => {
      ApiService.setURL();
      ApiService.setHeader();
      const res: Resp = { message: "", status: false };
      await ApiService.post("/setting/customersetting/customeraddresstype/insert", { data: [params] })
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
      getValidateCustomerAddresstype,
      getCustomerCustomerAddresstypeList,
      updateCustomerAddresstypeById,
      deleteCustomerAddresstypeById,
      insertCustomerAddresstypeById,
    };
  }
);
