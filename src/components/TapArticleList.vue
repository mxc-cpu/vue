<template>
      <n-message-provider>
  <n-space vertical size="large" class="box "  >

    
    <RouterLink v-for="(item, index) in articleDatas.arr " :key="index" :to="`/Detail/${item.tapArticleId}` ">
        <div  style=" background-color: rgba(57, 186, 98, 0.311); ">
   [置顶] {{ item.title }}
</div>
</RouterLink>


  </n-space>
</n-message-provider>
</template>

<script setup>
import { ref, reactive} from 'vue';
import { RouterLink } from 'vue-router';
import { GetTap } from '../api/tapApi.js';


const articleDatas= reactive({arr:[]})
const props = defineProps({
    userId: { type: String, default: 0, required: true },
   
})
const Tap=async()=>{
    await GetTap(props.userId).then(res=>{
    if(res.data.success==true){
        articleDatas.arr=res.data.data

    }
    else{
        console.log("获取失败")
    }
}).catch(error=>console.log(error))}
//获取置顶文章
Tap()

</script>

<style lang="scss" scoped>

</style>