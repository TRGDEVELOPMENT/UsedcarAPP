import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import { useRouter } from "vue-router";
interface Role {
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
interface RoleModule{
  id: number,
  no: number,
  roleid: number,
  emoduleid: number,
  moduleid: number,
  name: string,
  isactive: boolean,
  approve: boolean,
  description: string,
  creatorid: string,
  creatorname: string,
  createddate: string,
  modifiedid: string,
  modifiedname: string,
  modifieddate: string,
  deletedid: string,
  deletedname: string,
  deleteddate: string
}
interface RespList<data = any> {
  totaldata: number;
  data: data;
}
interface Resp {
  message: string;
  status: boolean;
}
export type { Role, RespList, Resp , RoleModule};
export const roleStore = defineStore(
  "role",
  () => {
    const router = useRouter();
    function setError() {
      router.push({ name: "500" });
    }
    const getValidateUserRole = async (
      data: Role
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
    const checkDuplicate = async(
      key:string
    ): Promise<boolean> => {
      let res: boolean = false;let i = 0;let resData: Role[] = [];
      resData = (await getUserRoleList(key,0)).data;
      resData.forEach( (item) => {
        if(item.name == key){
          res = true;
        }
        i++;
      });
      return res;
    }
    const getModuleList = async (
      id: number
    ): Promise<RespList<RoleModule[]>> => {
      ApiService.setURL();
      ApiService.setHeader();
      let res: RespList<RoleModule[]> = { totaldata: 0, data: [] };
      const params = {
        id: id,
      };
      await ApiService.get("/setting/user/module/list", { params: params })
        .then((data) => {
          res = data.data[0];
        })
        .catch(() => {
          setError();
        });
      return res;
    };
    const getUserRoleList = async (
      key: string,
      page: number
    ): Promise<RespList<Role[]>> => {
      ApiService.setURL();
      ApiService.setHeader();
      let res: RespList<Role[]> = { totaldata: 0, data: [] };
      const params = {
        page: page,
        key: key,
      };
      await ApiService.get("/setting/user/role/list", { params: params })
        .then((data) => {
          res = data.data[0];
        })
        .catch(() => {
          setError();
        });
      return res;
    };
    const updateUserRoleById = async (
      params: Role
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
    const deleteUserRoleById = async (
      params: Role
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
    const insertUserRoleById = async (
      params: Role
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
    const inserOrUpdateModuleRole = async (item: RoleModule[]):Promise<boolean> => {
      let res:boolean = false;
      return res;
    }
    return {
      getValidateUserRole,
      getUserRoleList,
      updateUserRoleById,
      deleteUserRoleById,
      insertUserRoleById,
      getModuleList,
      inserOrUpdateModuleRole,
      checkDuplicate
    };
  }
);
