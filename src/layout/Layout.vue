<template>
  <div id="main">
    <header class="header">
      <NavBar />
    </header>
    <div class="container">
      <n-grid cols="24" :x-gap="20" item-responsive>
        <n-grid-item span="0 400:12 600:15 800:18">
          <!--横幅轮播图-->
          <n-carousel autoplay style="height: 240px">
            <img
              class="carousel-img"
              src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
            />
            <img
              class="carousel-img"
              src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
            />
            <img
              class="carousel-img"
              src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
            />
            <img
              class="carousel-img"
              src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
            />
          </n-carousel>
          <!--文章列表-->

          <router-view></router-view>

          <!--/文章列表-->
        </n-grid-item>
        <n-grid-item span="0 400:12 600:9 800:6">
          <Asidebox type="search" @GetSearchValue="searchCallBack"></Asidebox>

          <Asidebox name="公告" type="announcement"></Asidebox>
          <Asidebox
            name="最新文章"
            type="news"
            :newsData="newDataComp"
          ></Asidebox>
          <Asidebox
            name="热门文章"
            type="news"
            :newsData="hotnewDataComp"
          ></Asidebox>
        </n-grid-item>
      </n-grid>
    </div>

    <footer></footer>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import Asidebox from "../components/Asidebox.vue";
import NavBar from "../components/MyNavBar.vue";
import { newestArticle } from "../api/articleApi";

const newsData = reactive({ arr: [] });
const hotnewsData = reactive([
  {
    title:
      "vue3+webApi开发实战入门evfehbofihesbahfboeiabfihbeiaefhbkajbfabhfhbahyhfbaieb",
  },
  { title: "vue3+webApi开发实战入门" },
  { title: "vue3+webApi开发实战入门" },
  { title: "vue3+webApi开发实战入门" },
  { title: "vue3+webApi开发实战入门" },
]);

const GetnewDataComp = async () => {
  await newestArticle()
    .then((res) => {
      if (res.data.success == true) {
        newsData.arr = res.data.data;
      } else {
        console.log("获取失败");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

GetnewDataComp();

const newDataComp = computed(() => {
  let itemnewsData = [];

  newsData.arr.forEach((item) => {
    if (item.title.length > 33) {
      item.title = item.title.substring(0, 20) + "...";
    }
    itemnewsData.push(item);
  });
  return itemnewsData;
});
const hotnewDataComp = computed(() => {
  let hotitemnewsData = [];
  hotnewsData.forEach((item) => {
    if (item.title.length > 33) {
      item.title = item.title.substring(0, 20) + "...";
    }
    hotitemnewsData.push(item);
  });
  return hotitemnewsData;
});
const searchValue1 = ref("");

const searchCallBack = (Svalue) => {
  searchValue1.value = Svalue;
  console.log("ffff" + Svalue);
};
</script>

<style lang="scss">
@import "bulma/sass/elements/_all.sass";
@import "bulma/sass/utilities/_all.sass";
@import "bulma/sass/components/_all.sass";
@import "bulma/sass/layout/_all.sass";
@import "bulma/sass/grid/_all.sass";
@import "bulma/sass/base/_all.sass";
@import "bulma/sass/helpers/_all.sass";
p {
  word-wrap: break-word;
}
</style>
<style lang="scss" scoped>
.carousel-img {
  width: 100%;
  height: 240px;
  margin-bottom: 0%;
  padding: 0%;
  object-fit: cover;
}

.box-padding {
  padding: 5px 10px 5px 10px;
  margin-bottom: 0px;
  margin-top: 5px;
  border-radius: 10px;
}
</style>
