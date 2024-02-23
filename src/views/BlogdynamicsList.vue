<template>
  <BlogdynamicsItem
    v-if="props.type == 'all'"
    v-for="(item, index) in dynamicsStore.BlogdynamicsListInfo"
    :-id="item.id"
    :user-id="item.userId"
    :key="index"
    :user-url="item.userUrl"
    :dynamics-name="item.dynamicsName"
    :dynamics-link="`/Detail/${item.articleId}`"
    :user-name="item.userName"
    :user-link="`/Dynamics/${item.userId}`"
    :dynamics-time="item.dynamicsTime"
    :type-name="item.typeName"
    @GetDelValue="DelDynamicsItem"
  >
    <template #dynamicsDescription>
        {{ item.dynamicsDescription }}
     
    </template>
  </BlogdynamicsItem>
  <BlogdynamicsItem
    v-else
    v-for="item in dynamicsStore.BlogdynamicsListInfoMyself"
    :-id="item.id"
    :user-url="item.userUrl"
    :user-id="item.userId"
    :dynamics-name="item.dynamicsName"
    :dynamics-link="`/Detail/${item.articleId}`"
    :user-name="item.userName"
    :user-link="`/Dynamics/${item.userId}`"
    :dynamics-time="item.dynamicsTime"
    :type-name="item.typeName"
    @GetDelValue="DelDynamicsItem"
  >
    <template #dynamicsDescription>
    {{ item.dynamicsDescription }}
    </template>
  </BlogdynamicsItem>
  <div class="level py-6">
    <n-pagination
      class="level-item has-text-centered"
      v-model:page="pageinfo.pageIndex"
      :page-size="pageinfo.pageSize"
      :page-count="pageCount"
      @update:page="loadDynamics()"
    />
  </div>
</template>

<script setup>
import { onBeforeUpdate, onMounted, reactive, ref,defineExpose ,watch} from "vue";
import BlogdynamicsItem from "../components/BlogdynamicsItem.vue";
import { useRoute,useRouter,onBeforeRouteLeave } from "vue-router";
import {
  pageQueryDynamicsByMyself,
  pageQueryDynamics,
} from "../api/DynamicsApi";
import { DynamicsListStore } from "../store/storeDynamics";
const dynamicsStore=DynamicsListStore();
const route = useRoute();
const router=useRouter();
var pageCount = ref(1);
var pageinfo = reactive({
  pageIndex: 1,
  pageSize: 4,
});



const props = defineProps({
  userId: { type: Number, default: 0, required: true },
  type: { type: String, default: "all" },
});

//加载动态
const loadDynamics = () => {
 

  if (props.type != "all") {
  
    const info = ({
      Id: props.userId,
      pageIndex: pageinfo.pageIndex,
      pageSize: pageinfo.pageSize,
    });
    console.log("dddc",info)
    pageQueryDynamicsByMyself(info).then((res) => {
      if (res.data.success == true) {
        dynamicsStore.BlogdynamicsListInfoMyself = res.data.data.dataList;
        pageCount.value = parseInt(res.data.data.recordCount / pageinfo.pageSize) + (res.data.data.recordCount % pageinfo.pageSize > 0 ? 1 : 0);
      }
    });
    
  } else if (props.type == "all"){
   
    const info = reactive({
      Id: props.userId,
      pageIndex: pageinfo.pageIndex,
      pageSize: pageinfo.pageSize,
    });
    pageQueryDynamics(info).then((res) => {
      if (res.data.success == true) {
        dynamicsStore.BlogdynamicsListInfo = res.data.data.dataList;
        pageCount.value = parseInt(res.data.data.recordCount / pageinfo.pageSize) + (res.data.data.recordCount % pageinfo.pageSize > 0 ? 1 : 0);
      }
    });
  }else{

  }
};
// const loadDynamicsvalue = (id) => {
 

//  if (props.type != "all") {
 
//    const info = ({
//      Id: id,
//      pageIndex: pageinfo.pageIndex,
//      pageSize: pageinfo.pageSize,
//    });

//    pageQueryDynamicsByMyself(info).then((res) => {
//      if (res.data.success == true) {
//        dynamicsStore.BlogdynamicsListInfoMyself = res.data.data.dataList;
//        pageCount.value = parseInt(res.data.data.recordCount / pageinfo.pageSize) + (res.data.data.recordCount % pageinfo.pageSize > 0 ? 1 : 0);
//      }
//    });
   
//  } else if (props.type == "all"){
  
//    const info = reactive({
//      Id: id,
//      pageIndex: pageinfo.pageIndex,
//      pageSize: pageinfo.pageSize,
//    });
//    pageQueryDynamics(info).then((res) => {
//      if (res.data.success == true) {
//        dynamicsStore.BlogdynamicsListInfo = res.data.data.dataList;
//        pageCount.value = parseInt(res.data.data.recordCount / pageinfo.pageSize) + (res.data.data.recordCount % pageinfo.pageSize > 0 ? 1 : 0);
//      }
//    });
//  }else{

//  }
// };
//暴露给父组件，这样发布说说时才可以调用
defineExpose({ loadDynamics })
const DelDynamicsItem=(delId)=>{
  console.log("删除")
 
  
    loadDynamics()
  for (let index = 0; index < dynamicsStore.BlogdynamicsListInfoMyself.length; index++) {
  
    if(delId== dynamicsStore.BlogdynamicsListInfoMyself[index].id){
      dynamicsStore.BlogdynamicsListInfoMyself.splice(index,1)
    }
   
  }
  
  for (let index = 0; index < dynamicsStore.BlogdynamicsListInfo.length; index++) {
   
    if(delId== dynamicsStore.BlogdynamicsListInfo[index].id){
      dynamicsStore.BlogdynamicsListInfo.splice(index,1)
    }
    
  }
  

}

onMounted(()=>{
  
    loadDynamics();
})







</script>

<style lang="scss" scoped></style>
