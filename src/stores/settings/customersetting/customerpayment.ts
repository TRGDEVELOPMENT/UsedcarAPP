import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import { useRouter } from "vue-router";
interface CustomerPayment {
  id: number;
  no: number;
  code: string;
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
export type { CustomerPayment, RespList, Resp };
export const customerpaymentStore = defineStore("customerpayment", () => {
  const router = useRouter();
  function setError() {
    router.push({ name: "500" });
  }
  const getValidateCustomerPayment = async (
    data: CustomerPayment
  ): Promise<Resp> => {
    let res: Resp = { message: "", status: false };
    if (data.code == undefined || data.code.trim() == "") {
      res.message = "ไม่ได้ใส่รหัสเงื่อนไขการชำระ";
    }
    if (data.name == undefined || data.name.trim() == "") {
      res.message += ", ไม่ได้ใส่ชื่อเงื่อนไขการชำระ";
    } else {
      res.message = "";
      res.status = true;
    }
    return res;
  };
  const getCustomerPaymentList = async (
    key: string,
    page: number
  ): Promise<RespList<CustomerPayment[]>> => {
    ApiService.setURL();
    ApiService.setHeader();
    let res: RespList<CustomerPayment[]> = { totaldata: 0, data: [] };
    const params = {
      page: page,
      key: key,
    };
    await ApiService.get("/setting/customersetting/customerpayment/list", { params: params })
      .then((data) => {
        res = data.data[0];
      })
      .catch(() => {
        setError();
      });
    return res;
  };
  const updateCustomerPaymentById = async (
    params: CustomerPayment
  ): Promise<Resp> => {
    ApiService.setURL();
    ApiService.setHeader();
    const res: Resp = { message: "", status: false };
    await ApiService.update("/setting/customersetting/customerpayment", "update", {
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
  const deleteCustomerPaymentById = async (
    params: CustomerPayment
  ): Promise<Resp> => {
    ApiService.setURL();
    ApiService.setHeader();
    const res: Resp = { message: "", status: false };
    await ApiService.update("/setting/customersetting/customerpayment", "delete", {
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
  const insertCustomerPaymentById = async (
    params: CustomerPayment
  ): Promise<Resp> => {
    ApiService.setURL();
    ApiService.setHeader();
    const res: Resp = { message: "", status: false };
    await ApiService.post("/setting/customersetting/customerpayment/insert", { data: [params] })
      .then(() => {
        res.message = "เพิ่มสำเร็จ";
        res.status = true;
      })
      .catch((e) => {
        setError();
      });
    return res;
  };
  return { getValidateCustomerPayment,getCustomerPaymentList,updateCustomerPaymentById,deleteCustomerPaymentById,insertCustomerPaymentById };
});
