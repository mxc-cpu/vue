<template>
    <BlogdynamicsItem v-for="(item, index) in BlogdynamicsListInfo.arr " :key="index" :dynamics-name="item.dynamicsName"
        :dynamics-link="item.dynamicsLink" :user-name="item.userName" :user-link="`/PersonalCenter/${item.id}`"
        :dynamics-time="item.dynamicsTime" :type-name="item.typeName">
        <template #dynamicsDescription>
            {{ item.dynamicsDescription }}
        </template>


    </BlogdynamicsItem>

    <div class= "level py-6 ">
        <n-pagination class="level-item has-text-centered" v-model:page="pageinfo.pageIndex" :page-size="pageinfo.pageSize" :page-count="pageCount"
            @update:page="loadDynamics" />
    </div>
</template>

<script setup>
import { reactive,ref } from "vue";
import BlogdynamicsItem from "../components/BlogdynamicsItem.vue";
import { useRoute } from 'vue-router'



const route = useRoute()
var pageCount = ref(1);
var pageinfo = reactive({
  pageIndex: 1,
  pageSize: 9,

})

var BlogdynamicsListInfo = reactive({
    arr: [
        {

        }
    ]
})

const props = defineProps({
    userId: { type: String, default: 0 ,required: true },
    
})

//加载动态
const loadDynamics=()=>{}
</script>

<style lang="scss" scoped>


</style>