<template>
  <div class="w-lg-400px p-10 signin-form">
    <VForm class="form w-100" id="kt_login_signin_form" @submit="onSubmitLogin" :validation-schema="login">
      <div class="text-left mb-10 mt-4">
        <h1 class="text-dark mb-5 fw-medium">เข้าสู่ระบบ</h1>
      </div>
      <div class="fv-row mb-10">
        <label class="form-label fs-5 text-dark">ชื่อผู้ใช้งาน</label>
        <Field tabindex="1" class="form-control form-control-lg form-control-solid" type="text" name="username"
          autocomplete="off" />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="username" />
          </div>
        </div>
      </div>
      <div class="fv-row mb-10">
        <div class="d-flex flex-stack mb-2">
          <label class="form-label text-dark fs-5 mb-0">รหัสผ่าน</label>
        </div>
        <Field tabindex="2" class="form-control form-control-lg form-control-solid" type="password" name="password"
          autocomplete="off" />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="password" />
          </div>
        </div>
      </div>
      <div class="text-center">
        <button tabindex="3" type="submit" ref="submitButton" id="kt_sign_in_submit"
          class="btn btn-lg btn-primary w-100 mb-5">
          <span class="indicator-label"> เข้าสู่ระบบ </span>

          <span class="indicator-progress">
            Please wait...
            <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
          </span>
        </button>
      </div>
    </VForm>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useAuthStore, type User } from "@/stores/auth";
import { useRouter } from "vue-router";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import { number } from "yup/lib/locale";

export default defineComponent({
  name: "sign-in",
  components: {
    Field,
    VForm,
    ErrorMessage,
  },
  setup() {
    const store = useAuthStore();
    const router = useRouter();
    const IsLock = ref();

    const submitButton = ref<HTMLButtonElement | null>(null);
    const login = Yup.object().shape({
      username: Yup.string().min(4).required().label("username"),
      password: Yup.string().min(4).required().label("Password"),
    });

    const onSubmitLogin = async (values: any) => {
      values = values as User;
      values["appname"] = "Used Car";
      store.logout();
      if (submitButton.value) {
        submitButton.value!.disabled = true;
        submitButton.value.setAttribute("data-kt-indicator", "on");
      }
      await store.login(values);
      const error = store.errors["message"];
      const status = store["user"]["status"];
      const level = store["user"]["level"];

      if ((status == "200") && ((level == "user")||(level == "normal")||(level == "admin"))) {
        Swal.fire({
          text: "You have successfully logged in!",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-primary",
          },
        }).then(() => {
          router.push({ name: "dashboard" });
        });
      } else {
        Swal.fire({
          text: level == "" ? "No Permission" : error,
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Try again!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-danger",
          },
        }).then(() => {
          store.errors = {};
        });
      }
      submitButton.value?.removeAttribute("data-kt-indicator");
      submitButton.value!.disabled = false;
    };

    return {
      onSubmitLogin,
      login,
      submitButton,
      getAssetPath,
      IsLock,
    };
  },
});
</script>
