<template>
  <div id="kt_app_header" v-if="headerDisplay" class="app-header">
    <div class="app-container d-flex align-items-stretch justify-content-between" :class="{
      'container-fluid': headerWidthFluid,
      'container-xxl': !headerWidthFluid,
    }">
      <div v-if="layout === 'light-header' || layout === 'dark-header'"
        class="d-flex align-items-center flex-grow-1 flex-lg-grow-0 me-lg-15">
        <router-link to="/">
          <img v-if="themeMode === 'light' && layout === 'light-header'" alt="Logo"
            :src="getAssetPath('media/logo/bizcar_l.png')"
            class="h-20px h-lg-30px app-sidebar-logo-default theme-light-show" />
          <img v-if="layout === 'dark-header' ||
            (themeMode === 'dark' && layout === 'light-header')
            " alt="Logo" :src="getAssetPath('media/logo/bizcar_l.png')"
            class="h-20px h-lg-30px app-sidebar-logo-default" />
        </router-link>
      </div>
      <template v-else>
        <div class="d-flex align-items-center d-lg-none ms-n3 me-1 me-md-2" v-tooltip title="Show sidebar menu">
          <div class="btn btn-icon btn-active-color-primary w-35px h-35px" id="kt_app_sidebar_mobile_toggle">
            <KTIcon icon-name="abstract-14" icon-class="fs-2 fs-md-1" />
          </div>
        </div>
        <div class="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
          <router-link to="/" class="d-lg-none">
            <img alt="Logo" :src="getAssetPath('media/logo/bizcar_s.png')" class="h-30px" />
          </router-link>
        </div>
      </template>
      <div class="d-flex align-items-stretch justify-content-between flex-lg-grow-1" id="kt_app_header_wrapper">
        <KTHeaderMenu />
        <KTHeaderNavbar />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";
import KTHeaderMenu from "@/layouts/main-layout/header/menu/Menu.vue";
import KTHeaderNavbar from "@/layouts/main-layout/header/Navbar.vue";
import {
  headerDisplay,
  headerWidthFluid,
  layout,
  themeMode,
} from "@/core/helpers/config";

export default defineComponent({
  name: "layout-header",
  components: {
    KTHeaderMenu,
    KTHeaderNavbar,
  },
  setup() {
    return {
      layout,
      headerWidthFluid,
      headerDisplay,
      themeMode,
      getAssetPath,
    };
  },
});
</script>
