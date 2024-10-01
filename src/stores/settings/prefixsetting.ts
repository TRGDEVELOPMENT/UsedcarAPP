import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import { useRouter } from 'vue-router';
import { ref } from "vue";
interface PrefixCustomer{
id: number,
no: number,
text: string,
create_id: string,
create_name: string,
modify_id: string,
modify_name: string,
create_date: string,
modify_date: string,
isactive: boolean
}
interface RespList<data = any> {
  totaldata: number;
  data: data;
}
interface Resp{
  message: string,
  status: boolean
}
export type { PrefixCustomer, RespList, Resp };
export const prefixcustomerStore = defineStore("prefixcustomer",() => {
  const router = useRouter();
  function setError() {
    router.push({name:'500'})
  }
  const getValidatePrefixSetting = async (data:PrefixCustomer):Promise<Resp>=>{
    const res = ref<Resp>({message:"",status:false});
    if(data.text == undefined || data.text.trim() == ""){
      res.value.message = "ไม่ได้ใส่คำนำหน้าชื่อ";
    }
    else{
      res.value.message = "";
      res.value.status = true;
    }
    return res.value
  }
  const getPrefixSetting = async (key:string,page:number):Promise<RespList<PrefixCustomer[]>> => {
    ApiService.setURL();
    ApiService.setHeader();
    let res: RespList<PrefixCustomer[]> = { totaldata: 0, data: [] };
    const params = {
      page: page,
      key: key,
    };
    await ApiService.get("/setting/customerprefix/list", { params: params })
      .then((data) => {
        res = data.data[0];
      })
      .catch(() => {
        setError();
      });
    return res;
  }
  const updatePrefixSettingById = async (params: PrefixCustomer):Promise<Resp>=>{
    ApiService.setURL();
    ApiService.setHeader();
    const res: Resp = {message:"",status:false}
    await ApiService.put("/setting/customerprefix","update", { data: [params] })
      .then((data) => {
        console.log(data);
        res.message = "อัพเดตสำเร็จ";
        res.status = true;
      })
      .catch((e) => {
        res.message = e.message;
        res.status = false;
        setError();
      });
    return res
  }
  return {
    getPrefixSetting,getValidatePrefixSetting,updatePrefixSettingById
  };
});
