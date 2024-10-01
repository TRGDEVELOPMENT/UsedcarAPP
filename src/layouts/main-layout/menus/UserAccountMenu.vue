<template>
  <div
    class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold py-4 fs-6 w-275px"
    data-kt-menu="true">
    <div class="menu-item px-3">
      <div class="menu-content d-flex align-items-center px-3">
        <div class="symbol symbol-50px me-5">
          <img alt="Logo"
            :src="miniProfile['image'] ? getAssetPath('media/avatars/' + miniProfile['image']) : getAssetPath('media/avatars/blank.png')" />
        </div>
        <div class="d-flex flex-column">
          <div class="fw-semibold d-flex align-items-center fs-7">
            {{ miniProfile['firstnameTh'] + " " + miniProfile['lastnameTh'] }}
          </div>
          <span class="fw-semibold text-muted text-hover-primary fs-8">{{ miniProfile['email'] ? miniProfile['email'] : "-"
          }}</span>
        </div>
      </div>
    </div>
    <div class="separator my-2"></div>
    <div class="menu-item px-5">
      <a @click="signOut()" class="menu-link px-5"> Sign Out </a>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { accountStore } from "@/stores/account";

export default defineComponent({
  name: "kt-user-menu",
  components: {},
  setup() {
    const router = useRouter();
    const store = useAuthStore();
    const account = accountStore();
    const miniProfile = ref({});

    onMounted(async () => {
      miniProfile.value = await account.getUserProfile();
    });

    const signOut = () => {
      store.logout();
      router.push({ name: "sign-in" });
    };

    return {
      signOut,
      miniProfile,
      getAssetPath,
    };
  },
});
</script>
