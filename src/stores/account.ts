import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import { useRouter } from 'vue-router';
interface Accounts {
  id: number;
  firstname: string;
  lastname: string;
  mobile: string;
  email: string;
  createdName: string;
  updatedName: string;
  deletedName: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
export type { Accounts };
export const accountStore = defineStore("accounts", () => {
  const router = useRouter();
  function setError() {
    router.push({name:'500'})
  }
  async function getUserProfile() {
    ApiService.setAuthURL();
    ApiService.setHeader();
    return ApiService.getAll("user","menu/profile")
      .then(({ data }) => {
        return(data);
      })
      .catch(() => {
        setError();
      });
  }
  return {
    getUserProfile,
  };
});
