import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import { useRouter } from "vue-router";
interface ParkingLocation {
  id: number;
  no: number;
  masterparkinglocationid: number;
  locationname: string;
  auctionid: number;
  auctionname: string;
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
export type { ParkingLocation, RespList, Resp };
export const remarkStore = defineStore("remark", () => {
  const router = useRouter();
  function setError() {
    router.push({ name: "500" });
  }
  const getValidateParkingLocation = async (
    data: ParkingLocation
  ): Promise<Resp> => {
    let res: Resp = { message: "", status: false };
    if (
      data.masterparkinglocationid == undefined ||
      data.masterparkinglocationid == 0 ||
      data.locationname == undefined ||
      data.locationname.trim() == ""
    ) {
      res.message += ", ไม่ได้ใส่ชื่อLocation";
    if(
      data.auctionid == undefined ||
      data.auctionid == 0 ||
      data.auctionname == undefined ||
      data.auctionname.trim() == ""
    ){
      res.message += ", ไม่ได้ใส่ชื่อลานประมูล";
    }
    } else {
      res.message = "";
      res.status = true;
    }
    return res;
  };
  const getParkingLocationList = async (
    key: string,
    page: number
  ): Promise<RespList<ParkingLocation[]>> => {
    ApiService.setURL();
    ApiService.setHeader();
    let res: RespList<ParkingLocation[]> = { totaldata: 0, data: [] };
    const params = {
      page: page,
      key: key,
    };
    res.data.push({
      id: 1,
      no: 1,
      masterparkinglocationid: 1,
      locationname: "Motto",
      auctionid: 1,
      auctionname: "มอตโต้ อ๊อคชั่น (ประเทศไทย) จำกัด",
      description: "",
      isactive: true,
      creatorid: "111111",
      creatorname: "test",
      createddate: "12/12/2022",
      modifiedid: "1111",
      modifiedname: "test",
      modifieddate: "12/12/2022",
      deletedid: "1111",
      deletedname: "test",
      deleteddate: "12/12/2022",
    });
    // await ApiService.get("/setting/remark/remark/list", { params: params })
    //   .then((data) => {
    //     res = data.data[0];
    //   })
    //   .catch(() => {
    //     setError();
    //   });
    return res;
  };
  const updateParkingLocationById = async (
    params: ParkingLocation
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
  const deleteParkingLocationById = async (
    params: ParkingLocation
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
  const insertParkingLocationById = async (
    params: ParkingLocation
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
    getValidateParkingLocation,
    getParkingLocationList,
    updateParkingLocationById,
    deleteParkingLocationById,
    insertParkingLocationById,
  };
});
