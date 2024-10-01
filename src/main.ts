import { createApp } from "vue";
import { createPinia } from "pinia";
import { Tooltip } from "bootstrap";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import i18n from "@/core/plugins/i18n";

//imports for app initialization
import ApiService from "@/core/services/ApiService";
import Vue3EasyDataTable from 'vue3-easy-data-table';
import VueAwesomePaginate from "vue-awesome-paginate";
import Vue3FormWizard from 'vue3-form-wizard';
import VueEasyLightbox from 'vue-easy-lightbox';
import { initApexCharts } from "@/core/plugins/apexcharts";
import { initInlineSvg } from "@/core/plugins/inline-svg";
import { initVeeValidate } from "@/core/plugins/vee-validate";
import { initKtIcon } from "@/core/plugins/keenthemes";

import "@/core/plugins/prismjs";

const app = createApp(App);

app.component('DataTable', Vue3EasyDataTable);
app.use(createPinia());
app.use(router);
app.use(ElementPlus);
app.use(VueAwesomePaginate);
app.use(Vue3FormWizard);
app.use(VueEasyLightbox);

ApiService.init(app);
initApexCharts(app);
initInlineSvg(app);
initKtIcon(app);
initVeeValidate();

app.use(i18n);

app.directive("tooltip", (el) => {
  new Tooltip(el);
});

app.mount("#app");
