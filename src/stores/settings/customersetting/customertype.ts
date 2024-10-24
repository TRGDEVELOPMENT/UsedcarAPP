import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import { useRouter } from "vue-router";
interface Customertype {
  id: number;
  no: number;
  typecode: string;
  precode: string;
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
  isparkinglocation: boolean;
}
interface RespList<data = any> {
  totaldata: number;
  data: data;
}
interface Resp {
  message: string;
  status: boolean;
}
export type { Customertype, RespList, Resp };
export const customertypeStore = defineStore("customertype", () => {
  const router = useRouter();
  function setError() {
    router.push({ name: "500" });
  }
  const getValidateCustomerType = async (data: Customertype): Promise<Resp> => {
    let res: Resp = { message: "", status: false };
    if (data.typecode == undefined || data.typecode.trim() == "") {
      res.message = "ไม่ได้ใส่รหัสประเภทลูกค้า";
    }
    if (data.name == undefined || data.name.trim() == "") {
      res.message += ", ไม่ได้ใส่ชื่อประเภทลูกค้า";
    } else {
      res.message = "";
      res.status = true;
    }
    return res;
  };
  const checkDuplicate = async (keyword: string): Promise<boolean> => {
    let res: boolean = false;
    const listdata = await getCustomerTypeList(keyword, 0);
    if (listdata.data) {
      let i = 0;
      while (i < listdata.data.length) {
        if (listdata.data[i].typecode == keyword) {
          res = true;
          break;
        }
        i++;
      }
    }
    return res;
  };
  const getCustomerTypeList = async (
    key: string,
    page: number
  ): Promise<RespList<Customertype[]>> => {
    ApiService.setURL();
    ApiService.setHeader();
    let res: RespList<Customertype[]> = { totaldata: 0, data: [] };
    const params = {
      page: page,
      key: key,
    };
    await ApiService.get("/setting/customersetting/customertype/list", { params: params })
      .then((data) => {
        res = data.data[0];
      })
      .catch(() => {
        setError();
      });
    return res;
  };
  const updateCustomerTypeById = async (
    params: Customertype
  ): Promise<Resp> => {
    ApiService.setURL();
    ApiService.setHeader();
    const res: Resp = { message: "", status: false };
    await ApiService.update("/setting/customersetting/customertype", "update", {
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
    params: Customertype
  ): Promise<Resp> => {
    ApiService.setURL();
    ApiService.setHeader();
    const res: Resp = { message: "", status: false };
    await ApiService.update("/setting/customersetting/customertype", "delete", {
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
  const insertCustomertypeById = async (
    params: Customertype
  ): Promise<Resp> => {
    ApiService.setURL();
    ApiService.setHeader();
    const res: Resp = { message: "", status: false };
    await ApiService.post("/setting/customersetting/customertype/insert", { data: [params] })
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
    getValidateCustomerType,
    getCustomerTypeList,
    updateCustomerTypeById,
    insertCustomertypeById,
    deletePrefixSettingById
  };
});
