<template>
<section class="hero is-primary">
      <div class="hero-body container">
        <p class="title is-2">
          搜索结果
        </p>
      </div>
    </section>
  <n-message-provider>
    <n-space vertical size="large">
      <ArticleItem
        v-for="(item, index) in SearchDatas.arr"
        :key="index"
        :imageUrl="item.imageUrl"
        :description="item.description"
        :id="item.id"
        :detailLink="`/Detail/${item.id}`"
        :upvoteSum="item.upvoteSum"
      >
        {{ item.imageUrl }}
        <template #title>{{ item.title }}</template>
        <template #author>{{ item.authorName }}</template>

        <template #time>{{ item.releaseDate }}</template>
        <template #category>{{ item.categoryName }}</template>
        <template #checkSum>{{ item.checkSum }}</template>
        <template #commentSum>{{ item.commentSum }}</template>
      </ArticleItem>
      <div class="level py-6">
        <n-pagination
          class="level-item has-text-centered"
          v-model:page="pageinfo.pageIndex"
          :page-size="pageinfo.pageSize"
          :page-count="pageCount"
          @update:page="loadSearch"
        />
      </div>
    </n-space>
  </n-message-provider>
</template>

<script setup>
import ArticleItem from "../components/articleitem.vue";

import {
  onMounted,
  reactive,
  ref,
  watch,
  onBeforeUpdate,
onUpdated,
} from "vue";

import { useRouter, useRoute } from "vue-router";
import { SearchListStore } from "../store/StoreSearch";
const SearchStore = SearchListStore();
let SearchDate=ref(SearchStore.SearchResultData)
const router = useRouter();
const route = useRoute();
//注意这里必须要对象包装arr[]，因为reactive指向的地址改变了，包装后他的对象地址不变注意才可以有响应式，或者直接用ref(),但是就得加value 有点麻烦不过有插件就是了
var SearchDatas = reactive({
  arr: [
    {
      id: 1,
      title: "vuefuhfj",
      link: "/",
      description: "njnkjnkjnkjnknkjkejbkbaekjbkaejbkfjbaddddddddd",
      authorName: "mxc",
      categoryName: "vue",
      releaseDate: "2023.11.11",
      imageUrl:
        " https://helpx.adobe.com/content/dam/help/en/animate/using/elements/jcr%3acontent/main-pars/Looping_Graphic-Symbol.png.img.png",
      checkSum: 6,
      commentSum: 500,
      upvoteSum: 600,
      DetailLink: "3",
    },
  ],
});

var pageinfo = reactive({
  pageIndex: 1,
  pageSize: 9,
});
var pageCount = ref(1);

const loadSearch = async (page = 0) => {
  if (page != 0) {
    pageinfo.pageIndex = page;
  }

  //对搜索结果分页,slice(star,end) 返回的结果不带第end个，从0开始
  let star = (pageinfo.pageIndex - 1) * pageinfo.pageSize;
  let end = star + pageinfo.pageSize;

  SearchDatas.arr = SearchStore.SearchResultData.slice(star, end);
  pageCount.value =
    parseInt(SearchStore.SearchResultData.length / pageinfo.pageSize) +
    (SearchStore.SearchResultData.length % pageinfo.pageSize > 0 ? 1 : 0);
};



onBeforeUpdate(() => {
  console.log("jjj")
  loadSearch();
});
onUpdated(() => {
  console.log("jjj")
  loadSearch();
});
onMounted(() => {
  loadSearch();
});
</script>

<style lang="scss" scoped></style>
