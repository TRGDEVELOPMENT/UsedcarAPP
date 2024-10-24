import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import { useRouter } from "vue-router";
interface Employee {
  id: number;
  no: number;
  empcode: string;
  name: string;
  role: string;
  isactive: boolean;
}
interface EmployeeModule{
  id: number;
  module: string;
  description: string;
  isaccess: string;
  isedit: string;
  isapprove: string;
}
interface UserRoleList {
  id: number,
  username:string,
  grouproleid:number,
  no: string,
  firstnameTh: string,
  lastnameTh: string,
  firstnameEn: string,
  lastnameEn: string,
  email: string,
  companyId: string,
  departmentName: string,
  positionName: string,
}
interface RespList<data = any> {
  totaldata: number;
  data: data;
}
interface Resp {
  message: string;
  status: boolean;
}
export type { Employee, EmployeeModule, RespList, Resp };
export const employeeStore = defineStore(
  "employee",
  () => {
    const router = useRouter();
    function setError() {
      router.push({ name: "500" });
    }
    const getValidateEmployee = async (
      data: Employee
    ): Promise<Resp> => {
      let res: Resp = { message: "", status: false };
      if (data.name == undefined || data.name.trim() == "") {
        res.message += ", ไม่ได้ใส่ชื่อ role";
      } else {
        res.message = "";
        res.status = true;
      }
      return res;
    };
    const getEmployeeList = async (
      key: string,
      page: number
    ): Promise<RespList<Employee[]>> => {
      ApiService.setURL();
      ApiService.setHeader();
      let res: RespList<Employee[]> = { totaldata: 0, data: [] };
      const params = {
        page: page,
        key: key,
      };
      await ApiService.get("/setting/user/employee/list", { params: params })
        .then((data) => {
          res = data.data[0];
        })
        .catch(() => {
          setError();
        });
      return res;
    };
    async function getUserRoleList(key: any): Promise<RespList<UserRoleList[]>> {
      ApiService.setAuthURL();
      ApiService.setHeader();
      let res: RespList<UserRoleList[]> = { totaldata: 0, data: [] };
      const params = { params: { key: key } }
      await ApiService.get("common/user/list", params)
        .then(({ data }) => {
          res = data
          console.log(data);
          
        })
        .catch(() => {
          setError();
        });
      return res;
    }
    const updateEmployeeById = async (
      params: Employee
    ): Promise<Resp> => {
      ApiService.setURL();
      ApiService.setHeader();
      const res: Resp = { message: "", status: false };
      await ApiService.update("/setting/user/role", "update", {
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
    const deleteEmployeeById = async (
      params: Employee
    ): Promise<Resp> => {
      ApiService.setURL();
      ApiService.setHeader();
      const res: Resp = { message: "", status: false };
      await ApiService.update("/setting/user/role", "delete", {
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
    const insertEmployeeById = async (
      params: Employee
    ): Promise<Resp> => {
      ApiService.setURL();
      ApiService.setHeader();
      const res: Resp = { message: "", status: false };
      await ApiService.post("/setting/user/role/insert", { data: [params] })
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
      getValidateEmployee,
      getEmployeeList,
      updateEmployeeById,
      deleteEmployeeById,
      insertEmployeeById,
      getUserRoleList
    };
  }
);
