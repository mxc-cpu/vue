<template>
    <article class="media">
        <div class="media-content">
            <div class="content">
                <p>
                    <strong v-if="props.action!='通知'">
                        <RouterLink :to="userLink">{{ props.userName }}</RouterLink>
                        
                
                        
                        <small v-if="props.action=='点赞'||props.action=='评论'">{{ props.action }}了你的博文:</small>
                        <small v-else-if="props.action=='回复'">在 <RouterLink
                            :to="messageLink">{{ props.actionObject }}</RouterLink>{{ props.action }}了你:</small> 
                        <RouterLink v-if="props.action=='点赞'||props.action=='评论'"
                            :to="messageLink">{{ props.actionObject }}</RouterLink>

                    </strong>

                    <span v-else > <strong > 系统通知： </strong> </span>
                    <br>
                    <slot name="messageDescription">

                        {{ props.messageDetail }}

                    </slot>

                    <br>
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
    :disabled="isRunting"
    @click="remMessage()"
  >
  <span class="has-text-link"> 删除</span>
    
  </n-button>
    </article>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { DelMessage } from '../api/messageApi';
import { useMessage } from 'naive-ui';
import{defineEmits,ref} from 'vue';
const message=useMessage();
const props = defineProps({
    Id:{type:Number,default:0,required:true},
    userName: { type: String, default: "mxc", required: true },
    action: { type: String, default: "评论", required: true },
    actionObject: { type: String, default: '文章' },
    messageTime: { type: Date, default: '2024/1/24 14:22', required: true },
    userLink: { type: String, default: '/' },
    messageLink: { type: String, default: '/' },
    messageDescription: { type: String, default: '' },
})
let timerObject=null;
let isRunting=ref(false)
const remMessage = () => {
isRunting.value=true;
clearInterval(timerObject);
if(isRunting.value){
    timerObject=setInterval(()=>{
       
        DelMessage(props.Id).then((res) => {
    if (res.data.success == true) {
      
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

<style lang="scss" scoped>

</style>