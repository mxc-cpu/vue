<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-64x64">
        <img :src="props.userUrl" />
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <p>
          <strong
            ><RouterLink :to="userLink">{{ props.userName }}</RouterLink>
            <small v-if="props.typeName != '说道'">
              {{ props.typeName }}博客：</small
            >
            <small v-else> {{ props.typeName }}:</small
            ><RouterLink
              v-if="props.dynamicsLink != '/Detail/0'"
              :to="dynamicsLink"
              >{{ props.dynamicsName }}</RouterLink
            >
            <span v-else>{{ props.dynamicsName }}</span></strong
          >
          <br />
          <slot name="dynamicsDescription">
            {{ props.dynamicsDetail }}
          </slot>

          <br />
          <small>
            <slot name="messageTime">
              {{ props.messageTime }}
            </slot>
          </small>
        </p>
      </div>
    </div>

    <n-button
    
      type="text"
      :loading="isRunting"
      v-if="props.userId == store.userId"
      :disabled="isRunting"
      @click="remDynamics()"
    >
    <span class="has-text-link"> 删除</span>
      
    </n-button>
  </article>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { DelDynamics } from "../api/DynamicsApi";
import { loginState } from "../store/StoreLogin";
import { defineEmits, ref } from "vue";
import {useMessage} from "naive-ui"
const store = loginState();
const message=useMessage();
const props = defineProps({
  Id: { type: Number, default: 0 },
  userId: { type: Number, default: 0 },
  userName: { type: String, default: "mxc", required: true },
  typeName: { type: String, default: "博客", required: true },
  dynamicsName: { type: String, default: "。。。" },
  dynamicsTime: { type: Date, default: "2024/1/24 14:22", required: true },
  userLink: { type: String, default: "/" },
  dynamicsLink: { type: String, default: "/" },
  dynamicsDescription: { type: String, default: "cscscscscscscscscsc" },
  userUrl: { type: String, default: "" },
});
let timerObject=null;
let isRunting=ref(false)
const remDynamics = () => {
isRunting.value=true;
clearInterval(timerObject);
if(isRunting.value){
    timerObject=setInterval(()=>{
       
        DelDynamics(props.Id).then((res) => {
    if (res.data.success == true) {
        console.log("ddd")
        GetDelValue();
        isRunting.value=false;
      message.success("删除成功");
    }else{
        message.info("删除失败");
    }
  });
     clearInterval(timerObject);
      }
       ,400);}
 
};

const emit = defineEmits(["GetDelValue"]);
//子向父
const delId = ref(props.Id);
const GetDelValue = () => {
  emit("GetDelValue", delId.value);
};
</script>

<style lang="scss" scoped></style>
