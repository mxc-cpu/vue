<!-- 富文本组件 -->
<template>
  <div>
    <Toolbar
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
      style="border-bottom: 1px solid #ccc"
    />
    <Editor 
      :defaultConfig="editorConfig"
      :mode="mode"
      v-model="valueHtml"
      style="height: 400px; overflow-y: hidden"
      @onCreated="handleCreated"
      @onChange="handleChange"
    />
  </div>
</template>

<script setup>
import "@wangeditor/editor/dist/css/style.css";
import {
  ref,
  reactive,
  inject,
  onMounted,
  onBeforeUnmount,
  shallowRef,
} from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import {UploadArticleContentImage} from "../api/articleApi"

// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef();
const toolbarConfig = { excludeKeys: ["uploadVideo"] };
const editorConfig = { placeholder: "请输入内容..." };
editorConfig.MENU_CONF = {};

editorConfig.MENU_CONF['uploadImage'] = {
    // 自定义上传

    async customUpload(file, insertFn) {               
        // file 即选中的文件
        // 自己实现上传，并得到图片 url alt href
        // 最后插入图片
        let image = file;
let formData = new FormData();
  formData.append("wangeditorUploadedImage", image);
    UploadArticleContentImage(formData).then(res=>{
      if(res.data.success==true){
    
      insertFn(res.data.data,'','');
    }else{
      alter("上传图片失败")
    }
    })
       
       
    }


 
   
  
}

editorConfig.MENU_CONF["insertImage"] = {
  parseImageSrc: (src) => {
    if (src.indexOf("http") !== 0) {
      return `${src}`;
    }
    return src;
  },
};

const mode = ref("default");
const valueHtml = ref("");

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:model-value"]);
let initFinished = false;

onMounted(() => {

  setTimeout(() => {
   valueHtml.value = props.modelValue;
    initFinished = true;
  }, 200);
  
});

// 组件销毁时，也及时销毁编辑器，重要！
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

// 编辑器回调函数
const handleCreated = (editor) => {
  console.log("created", editor);
  
  editorRef.value = editor; // 记录 editor 实例，重要！
 
};
const handleChange = (editor) => {
  if (initFinished) {
  
    emit("update:model-value", valueHtml.value);
    
  }
  
};




</script>

<style lang="scss" scoped></style>
