import { reactive, readonly } from "vue";

const state = reactive({
  role: ['superAdmin']
});

export default {
  state: readonly(state),
};
