<template>
    <n-card >
    <div class="columns ">
        <div class="column is-two-fifth">
            <n-button text style="font-size: 15px" @click="type='点赞',loadMessage()">
            <n-icon size="40" color="hsl(344, 95%, 61%)">
              <FileLike/>
         </n-icon>
            点赞
        </n-button>
        </div>

        <div class="column">
            <n-button text style="font-size: 15px" @click="type='回复',loadMessage()">
        <n-icon size="40" color="#8a2be2">
              <Messages/>
         </n-icon>
           回复
           </n-button>
        </div>
        <div class="column ">
            <n-button text style="font-size: 15px" @click="type='评论',loadMessage()">
            <n-icon size="40" color="hsl(204, 86%, 53%) ">
              <MessageDots/>
         </n-icon>
            评论
            </n-button>
        </div>
        <div class="column ">
            <n-button text style="font-size: 15px" @click="type='通知',loadMessage()">
            <n-icon size="40" color="hsl(204, 71%, 39%)">
              <Menu2/>
         </n-icon>
            系统
            </n-button>
        </div>
    </div>
    <n-divider style="margin-top: 0px; "></n-divider>
    
    <MessageItem v-for="(item, index) in storeMessage.MessageListInfoMyself " :key="index"  :-id="item.id"  :action="item.typeName"
        :action-object="item.messageName" :user-name="item.userName" :user-link="`/Dynamics/${item.fromUser}`"
        :message-link="`/Detail/${item.articleId}`"  @-get-del-value="DelMessageItem">
        <template #messageDescription>
            {{ item.messageDescription }}
        </template>
        <template #messageTime>
            {{ item.messageTime }}
        </template>

    </MessageItem>

    <div class="level py-5 ">
        <n-pagination class="level-item has-text-centered" v-model:page="pageinfo.pageIndex" :page-size="pageinfo.pageSize" :page-count="pageCount"
            @update:page="loadMessage" />
    </div>
</n-card >
</template>

<script setup>
import { reactive, ref } from "vue";
import MessageItem from "../components/messageItem.vue"
import { useRoute } from 'vue-router'
import{ MessageDots,Messages,FileLike,Menu2} from "@vicons/tabler"
import { pageQueryMessageByMyself } from "../api/messageApi";
import { loginState } from "../store/StoreLogin";
import {MessageListStore} from "../store/storeMessage"
const route = useRoute()
const store=loginState()
const storeMessage=MessageListStore();
const type=ref("点赞")
var pageCount = ref(1);
var pageinfo = reactive({
    pageIndex: 1,
    pageSize: 9,

})



const props = defineProps({


})

//加载消息
const loadMessage = () => { 

console.log("开始")

    const info = reactive({
      Id: store.userId,
      pageIndex: pageinfo.pageIndex,
      pageSize: pageinfo.pageSize,
    });
    pageQueryMessageByMyself(info,type.value).then((res) => {
      if (res.data.success == true) {
        storeMessage.MessageListInfoMyself = res.data.data.dataList;
        pageCount.value = parseInt(res.data.data.recordCount / pageinfo.pageSize) + (res.data.data.recordCount % pageinfo.pageSize > 0 ? 1 : 0);
      }
    });


}
const DelMessageItem=(delId)=>{
  console.log("删除")
 
  
  loadMessage()
  for (let index = 0; index < storeMessage.MessageListInfoMyself.length; index++) {
  
    if(delId== storeMessage.MessageListInfoMyself[index].id){
        storeMessage.MessageListInfoMyself.splice(index,1)
    }
   
  }
  

}




loadMessage();
</script>

<style lang="scss" scoped>


</style>
