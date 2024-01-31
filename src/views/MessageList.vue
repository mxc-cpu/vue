<template>
    <div class="columns ">
        <div class="column is-two-fifth">
            <n-button text style="font-size: 15px">
            <n-icon size="40" color="hsl(344, 95%, 61%)">
              <FileLike/>
         </n-icon>
            点赞
        </n-button>
        </div>

        <div class="column">
            <n-button text style="font-size: 15px">
        <n-icon size="40" color="#8a2be2">
              <Messages/>
         </n-icon>
           回复
           </n-button>
        </div>
        <div class="column ">
            <n-button text style="font-size: 15px">
            <n-icon size="40" color="hsl(204, 86%, 53%) ">
              <MessageDots/>
         </n-icon>
            评论
            </n-button>
        </div>
        <div class="column ">
            <n-button text style="font-size: 15px">
            <n-icon size="40" color="hsl(204, 71%, 39%)">
              <Menu2/>
         </n-icon>
            全部
            </n-button>
        </div>
    </div>

    <MessageItem v-for="(item, index) in MessageListInfo.arr " :key="index" :action="item.action"
        :action-object="item.actionObject" :user-name="item.userName" :user-link="`/PersonalCenter/${item.id}`"
        :message-link="item.messageLink">
        <template #messageDescription>
            {{ item.messageDescription }}
        </template>
        <template #messageTime>
            {{ item.messageTime }}
        </template>

    </MessageItem>

    <div class="level py-6 ">
        <n-pagination class="level-item has-text-centered" v-model:page="pageinfo.pageIndex" :page-size="pageinfo.pageSize" :page-count="pageCount"
            @update:page="loadDynamics" />
    </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import MessageItem from "../components/messageItem.vue"
import { useRoute } from 'vue-router'
import{ MessageDots,Messages,FileLike,Menu2} from "@vicons/tabler"


const route = useRoute()
var pageCount = ref(1);
var pageinfo = reactive({
    pageIndex: 1,
    pageSize: 9,

})

var MessageListInfo = reactive({
    arr: [
        {

        }
    ]
})

const props = defineProps({
    type: { type: String, default: "评论", required: true },

})

//加载动态
const loadDynamics = () => { }
</script>

<style lang="scss" scoped>


</style>
