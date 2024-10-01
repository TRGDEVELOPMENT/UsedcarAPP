import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import { useRouter } from 'vue-router';
import { string } from 'yup';
interface CompanyPrefix {
  id: number;
  prefixTh: string;
  prefixEn: string;
  suffixTh: string;
  suffixEn: string;
  abbreviationTh: string;
  abbreviationEn: string;
  createdName: string;
  updatedName: string;
  deletedName: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
interface Region {
  id: number;
  regionNameTh: string;
}
interface AddressType {
  id: number;
  addressTypeNameTha: string;
  addressTypeNameEng: string;
}
interface ContactType {
  id: number;
  customerContactType: string;
}
interface SupplierType {
  id: number;
  supplierTypeName: string;
}
interface ContactPrefix {
  id: number;
  abbreviationTh: string;
  abbreviationEn: string;
}
interface Province {
  id: number;
  regionId: number;
  provinceNameTh: string;
  provinceNameEn: string;
}
interface District {
  id: number;
  provinceId: number;
  districtNameTh: string;
  districtNameEn: string;
}
interface SubDistrict {
  id: number;
  provinceId: number;
  districtId: number;
  subDistrictNameTh: string;
  subDistrictNameEn: string;
}
interface ZipCode {
  id: number;
  subDistrictId: number;
  postalCode: number;
}
interface Country {
  id: number;
  subDistrictId: string;
}
interface Branch {
  id: number;
  branchName: string;
}
export type { CompanyPrefix,AddressType,ContactType,ContactPrefix,SupplierType,Region,Province,District,SubDistrict,ZipCode,Country,Branch };
export const dropdownStore = defineStore("dropdownStore",() => {
  const router = useRouter();
  function setError() {
    router.push({name:'500'})
  }
  async function getCompanyPrefix() {
    ApiService.setURL();
    return ApiService.getAll("settings/dropdown","companyPrefix")
      .then(({ data }) => {
        return(data);
      })
      .catch(() => {
        setError();
      });
  }
  async function getAddressType() {
    ApiService.setURL();
    return ApiService.getAll("settings/dropdown","addressType")
      .then(({ data }) => {
        return(data);
      })
      .catch(() => {
        setError();
      });
  }
  async function getContactType() {
    ApiService.setURL();
    return ApiService.getAll("settings/dropdown","contactType")
      .then(({ data }) => {
        return(data);
      })
      .catch(() => {
        setError();
      });
  }
  async function getContactPrefix() {
    ApiService.setURL();
    return ApiService.getAll("settings/dropdown","contactPrefix")
      .then(({ data }) => {
        return(data);
      })
      .catch(() => {
        setError();
      });
  }
  async function getSupplierType() {
    ApiService.setURL();
    return ApiService.getAll("settings/dropdown","supplierType")
      .then(({ data }) => {
        return(data);
      })
      .catch(() => {
        setError();
      });
  }
  async function getRegion() {
    ApiService.setURL();
    return ApiService.getAll("settings/dropdown","region")
      .then(({ data }) => {
        return(data);
      })
      .catch(() => {
        setError();
      });
  }
  async function getRegionEn() {
    ApiService.setURL();
    return ApiService.getAll("settings/dropdown/region","en")
      .then(({ data }) => {
        return(data);
      })
      .catch(() => {
        setError();
      });
  }
  async function getProvince() {
    ApiService.setURL();
    return ApiService.getAll("settings/dropdown","province")
      .then(({ data }) => {
        return(data);
      })
      .catch(() => {
        setError();
      });
  }
  async function getProvinceEn() {
    ApiService.setURL();
    return ApiService.getAll("settings/dropdown/province","en")
      .then(({ data }) => {
        return(data);
      })
      .catch(() => {
        setError();
      });
  }
  async function getDistrict(id:any) {
    ApiService.setURL();
    ApiService.setHeader();
    const params = { params : {id: id}}
    return ApiService.get("settings/dropdown/district",params)
      .then(({ data }) => {
        return(data);
      })
      .catch(() => {
        setError();
      });
  }
  async function getDistrictEn(id:any) {
    ApiService.setURL();
    ApiService.setHeader();
    const params = { params : {id: id}}
    return ApiService.get("settings/dropdown/district/en",params)
      .then(({ data }) => {
        return(data);
      })
      .catch(() => {
        setError();
      });
  }
  async function getSubDistrict(id:any) {
    ApiService.setURL();
    ApiService.setHeader();
    const params = { params : {id: id}}
    return ApiService.get("settings/dropdown/subdistrict",params)
      .then(({ data }) => {
        return(data);
      })
      .catch(() => {
        setError();
      });
  }
  async function getSubDistrictEn(id:any) {
    ApiService.setURL();
    ApiService.setHeader();
    const params = { params : {id: id}}
    return ApiService.get("settings/dropdown/subdistrict/en",params)
      .then(({ data }) => {
        return(data);
      })
      .catch(() => {
        setError();
      });
  }
  async function getPostalCode(id:any) {
    ApiService.setURL();
    ApiService.setHeader();
    const params = { params : {id: id}}
    return ApiService.get("settings/dropdown/postalCode",params)
      .then(({ data }) => {
        return(data);
      })
      .catch(() => {
        setError();
      });
  }
  async function getCountry() {
    ApiService.setURL();
    return ApiService.getAll("settings/dropdown","country")
      .then(({ data }) => {
        return(data);
      })
      .catch(() => {
        setError();
      });
  }
  async function getCountryEn() {
    ApiService.setURL();
    return ApiService.getAll("settings/dropdown/country","en")
      .then(({ data }) => {
        return(data);
      })
      .catch(() => {
        setError();
      });
  }
  async function getBranch(id:any) {
    ApiService.setURL();
    ApiService.setHeader();
    const params = { params : {id: id}}
    return ApiService.get("settings/dropdown/branch",params)
      .then(({ data }) => {
        return(data);
      })
      .catch(() => {
        setError();
      });
  }
  return {
    getCompanyPrefix,getAddressType,getContactType,getContactPrefix,getSupplierType,
    getRegion,getProvince,getDistrict,getSubDistrict,getPostalCode,getCountry,
    getRegionEn,getProvinceEn,getDistrictEn,getSubDistrictEn,getCountryEn,getBranch
  };
});
