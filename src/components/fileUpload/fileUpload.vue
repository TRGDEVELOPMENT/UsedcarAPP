<template>
    <div class="p-0">
    <div v-bind="getRootProps()" class="dropzone mb-10 mt-10" @change="selectFile(state.files)">
      <input v-bind="getInputProps()">
      <div v-if="isDragActive" class="fs-6 fw-semibold">Drop the files here ...</div>
      <div v-else>
          <p class="fs-6 fw-semibold">Drag & Drop file here, or Click to select files</p>
          <div v-if="!state.files['name']">
            <p class="fs-8">รองรับไฟล์นามสกุล .jpg และ .png เท่านั้น</p>
          </div>
      </div>
    </div>
    <div v-if="state.files.length > 0" class="col-12">
        <div class="form-control fs-7 p-1 mb-2 mt-2" v-for="(file, index) in state.files" :key="index">
          <span class="ps-5">{{ file['name'] }}</span>
          <a class="btn btn-icon bg-danger bg-opacity-15 h-20px w-20px m-1" @click="deleteFile(index)"><KTIcon icon-name="trash" icon-class="fs-8 text-danger"/></a>
        </div>
    </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useDropzone } from 'vue3-dropzone';
import type { FileRejectReason } from 'vue3-dropzone';
export default defineComponent({
    name: "dropzone",
    components: {},
    methods: {
        selectFile(value:any) {
            this.$emit('selectFile', { value });
        },
        deleteFile(index:any){
            this.state.files.splice(index,1);
            this.selectFile(this.state.files);
        },
    },
    setup() {
        const state = reactive({
            files: [],
            previewImages: [],
        });
        const options = reactive({ multiple: true, onDrop, accept: 'image/*', maxSize: 5242880, })
        const { getRootProps, getInputProps, isDragActive, isFocused, isDragReject, open } = useDropzone(options)
        function onDrop(acceptedFiles: any, rejectReasons: FileRejectReason[]) {
            state.files = acceptedFiles;
        }
        const resetFile = ()=>{
            state.files = [];
        }
        const saveFiles = () => {
            const files = state.files;
            const formData = new FormData(); // pass data as a form
            for (var x = 0; x < files.length; x++) {
                formData.append("images[]", files[x]);
            }
        };
        return {
            isDragActive,
            isFocused,
            isDragReject,
            state,
            resetFile,
            getRootProps,
            getInputProps,
        };
    },
});
</script>
<style scoped lang="scss">
.dropzone {
    display: flex;
    height: 200px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 2px dashed #a06db1;
    background-color: #f9effa;
    transition: 0.3s ease all;
    input {
        display: none;
    }
}
.active-dropzone {
    border: 2px dashed #a06db1;
    background-color: #f9effa;
}</style>