<template>
    <n-message-provider>

    <TapArticleList :user-id="userId"></TapArticleList>
  <n-space vertical size="large">
   
    <ArticleItem v-if="articleDatas.arr.length!==0" v-for="(item, index) in articleDatas.arr " :key="index" :imageUrl="item.imageUrl" :description="item.description" :id="item.id" :ref="`sm${index}`" 
      :detailLink="`/Detail/${item.id}`" :upvoteSum="item.upvoteSum" :isBoutique="item.isBoutique">

      <template #title> {{ item.title }}</template>
      <template #author>{{ item.authorName }}</template>

      <template #time>{{ item.releaseDate }}</template>
      <template #category>{{ item.categoryName }}</template>
      <template #checkSum>{{ item.checkSum }}</template>
      <template #commentSum>{{ item.commentSum }}</template>
   
     
    </ArticleItem>
    <p v-else> 期待您的博文</p>
    <div class= "level py-6 ">
        <n-pagination class="level-item has-text-centered" v-model:page="pageinfo.pageIndex" :page-size="pageinfo.pageSize" :page-count="pageCount"
            @update:page="loadBlogs" />
    </div>
  </n-space>
</n-message-provider>
</template>

<script setup>
import ArticleItem from '../components/articleitem.vue'

import { onMounted, onBeforeMount,reactive, ref, watch, onBeforeUpdate } from "vue";
import { ArticlePage, ArticlePageByuser ,BoutiquePageQuery} from "../api/articleApi"
import { routes, } from '../routes/router';
import { useRouter, useRoute,  } from 'vue-router'
import { ArticlePageByCategory } from "../api/categoryApi"
import {PageQueryCompilationsArticleById} from "../api/CompilationsApi"
import TapArticleList from '../components/TapArticleList.vue';

const router = useRouter()
const route = useRoute()
//注意这里必须要对象包装arr[]，因为reactive指向的地址改变了，包装后他的对象地址不变注意才可以有响应式，或者直接用ref(),但是就得加value 有点麻烦不过有插件就是了
var articleDatas = reactive({
  arr: [
    {
     
    }

  ]
})



var categoryId = ref(route.params.categoryId);
let userId=ref();
var pageinfo = reactive({
  pageIndex: 1,
  pageSize: 9,

})
var pageCount = ref(1);





const loadBlogs = async (page = 0) => {
  if (page != 0) {
    pageinfo.pageIndex = page
  }
  if (route.name=="ArticleListByCategoryId") {
  
    categoryId.value = route.params.categoryId
    const info = reactive({
      Id: route.params.categoryId,
      pageIndex: pageinfo.pageIndex,
      pageSize: pageinfo.pageSize,
    })
    await ArticlePageByCategory(info).then((res) => {
      if (res.data.success === true) {
        articleDatas.arr = res.data.data.dataList
        pageCount.value = parseInt(res.data.data.recordCount / pageinfo.pageSize) + (res.data.data.recordCount % pageinfo.pageSize > 0 ? 1 : 0);

      }
      else {
        console.log("查询失败");
      }
    }).catch((error) => {
      console.log("分类未知错误，查询失败", error);
    });
  }
  else if (route.name=="ArticleListByuser") {
    const info = reactive({
      Id: route.params.userId,
      pageIndex: pageinfo.pageIndex,
      pageSize: pageinfo.pageSize,
    })
    userId=route.params.userId
    await ArticlePageByuser(info).then((res) => {
      if (res.data.success === true) {
        articleDatas.arr = res.data.data.dataList
      
        pageCount.value = parseInt(res.data.data.recordCount / pageinfo.pageSize) + (res.data.data.recordCount % pageinfo.pageSize > 0 ? 1 : 0);
  
      }
      else {

      }
    }).catch((error) => {
      console.log("未知错误，查询失败");
    });
  } 
  else if(route.name=="Boutique"){
    const info = reactive({
      Id: route.params.CompilationsId,
      pageIndex: pageinfo.pageIndex,
      pageSize: pageinfo.pageSize,
    })
   
    await BoutiquePageQuery(info).then((res) => {
      if (res.data.success === true) {
        articleDatas.arr = res.data.data.dataList
      
        pageCount.value = parseInt(res.data.data.recordCount / pageinfo.pageSize) + (res.data.data.recordCount % pageinfo.pageSize > 0 ? 1 : 0);
  
      }
      else {

      }
    })
  }
  else if (route.name=="CompilationsArticle"){
    const info = reactive({
      Id: route.params.CompilationsId,
      pageIndex: pageinfo.pageIndex,
      pageSize: pageinfo.pageSize,
    })
   
    await PageQueryCompilationsArticleById(info).then((res) => {
      if (res.data.success === true) {
        articleDatas.arr = res.data.data.dataList
      
        pageCount.value = parseInt(res.data.data.recordCount / pageinfo.pageSize) + (res.data.data.recordCount % pageinfo.pageSize > 0 ? 1 : 0);
  
      }
      else {

      }
    })
  }
  else {
    await ArticlePage(pageinfo).then((res) => {
      if (res.data.success === true) {
        articleDatas.arr = res.data.data.dataList
        pageCount.value = parseInt(res.data.data.recordCount / pageinfo.pageSize) + (res.data.data.recordCount % pageinfo.pageSize > 0 ? 1 : 0);
      }
      else {
        console.log("查询失败");
      }
    }).catch((error) => {
      console.log("未知错误，查询失败");
    });
  }
}

onBeforeUpdate(() => {
  
  loadBlogs()
})
onBeforeMount(()=>{
  loadBlogs()
})
</script>

<style lang="scss" scoped>





</style>