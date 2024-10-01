import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import { useRouter } from 'vue-router';

interface Menu {
  id: number;
  parentId: string;
  permissionId: string;
  nameTh: string;
  nameEn: string;
  slug: string;
  icon: string;
  description: string;
  no: string;
  isActive: string;
  createdName: string;
  updatedName: string;
  deletedName: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

interface userRole {
  id: number;
  nameTh: string;
  description: string;
}

export type { userRole,Menu };

export const authPermissionStore = defineStore("autPermission", () => {
  const router = useRouter();

  function setError() {
    router.push({name:'500'})
  }

  async function getSideMenu() {
    ApiService.setURL();
    return ApiService.getAll("auth","sideMenu")
      .then(({ data }) => {
        return(data);
      })
      .catch(() => {
        setError();
      });
  }
  async function getSideMenuPermission() {
    ApiService.setURL();
    return ApiService.getAll("auth","sideMenu/permission")
      .then(({ data }) => {
        return(data);
      })
      .catch(() => {
        setError();
      });
  }
  return {
    getSideMenu,getSideMenuPermission
  };
});

// const state = reactive({
//   role: ['superAdmin']
// });

// export default {
//   state: readonly(state),
// };
