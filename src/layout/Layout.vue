<template>
  <div id="main">
    <header class="header">
      <NavBar />
    </header>
    <div class="container">
      <n-grid cols="24" :x-gap="20" item-responsive>
        <n-grid-item span="0 400:12 600:15 800:18">
          <!--横幅轮播图-->
          <n-carousel v-if="route.name=='ArticleList'" autoplay style="height: 240px">
           <n-carousel-item v-for="item in headLineRef">
            <a :href="item.descriptionURL">
            <img
              class="carousel-img"
              :src="item.coverURL"
            />
          </a>
            <span class="title is-3  has-text-link-light has-text-left" style=" -webkit-text-stroke:1px rgb(1, 28, 31); float: left; transform: translate(40px,-80px);" >
            {{ item.title }}
            
            </span>
          </n-carousel-item>
          </n-carousel>
          <section  class="hero is-info is-small">
          <div v-if="route.name!='ArticleList'&&route.name!='SearchResult'" class="hero-body container">
        <p class="title is-2">
          {{ Title }}
        </p>
      </div>
    </section>
          <!--文章列表-->

          <router-view></router-view>

          <!--/文章列表-->
        </n-grid-item>
        <n-grid-item span="0 400:12 600:9 800:6">
          <Asidebox type="search" @GetSearchValue="searchCallBack"></Asidebox>

          <Asidebox name="公告" type="announcement" :announcement-data="store.annInfo"></Asidebox>
          <Asidebox
            name="最新文章"
            type="news"
            :newsData="newDataComp"
          ></Asidebox>
          <Asidebox
            name="评论最多文章"
            type="news"
            :newsData="hotnewDataComp"
          ></Asidebox>
        </n-grid-item>
      </n-grid>
    </div>

    <n-layout-footer style="padding: 24px" bordered>
        <MyFooter></MyFooter
      ></n-layout-footer>
  </div>
</template>

<script setup>
import { computed, reactive, ref, onBeforeUpdate ,onMounted} from "vue";
import { useRoute } from "vue-router";
import Asidebox from "../components/asidebox.vue";
import NavBar from "../components/MyNavBar.vue";
import {GetHeadlineList}from "../api/headlineApi"
import { newestArticle ,HotAboutArticle } from "../api/articleApi";
import {ByCategoryName} from "../api/categoryApi";
import {AnnStore} from "../store/StoreAnn"
import MyFooter from "../components/MyFooter.vue";
const store= AnnStore()
const newsData = reactive({ arr: [] });
const hotnewsData = reactive({ arr:[
 
]});



const route=useRoute()

let Title=ref("")
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
const GethotDataComp = async () => {
  await HotAboutArticle()
    .then((res) => {
      if (res.data.success == true) {
        hotnewsData.arr = res.data.data;
      } else {
        console.log("获取失败");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

GethotDataComp();
const newDataComp = computed(() => {
  let itemnewsData = [];

  newsData.arr.forEach((item) => {
    if (item.title.length > 15) {
      item.title = item.title.substring(0, 15) + "...";
    }
    itemnewsData.push(item);
  });
  return itemnewsData;
});
const hotnewDataComp = computed(() => {
  let hotitemnewsData = [];
  hotnewsData.arr.forEach((item) => {
    if (item.title.length > 15) {
      item.title = item.title.substring(0, 15) + "...";
    }
    hotitemnewsData.push(item);
  });
  return hotitemnewsData;
});
const searchValue1 = ref("");
const searchList=ref();

const searchCallBack = (Svalue) => {
  searchValue1.value = Svalue;


  console.log("ffff" + Svalue);
};

const headLineRef=ref({})
const GetHeadline=()=>{
  GetHeadlineList().then (res=>{
    if(res.data.success==true){
      headLineRef.value=res.data.data;
    }
  })

}

onBeforeUpdate(async()=>{
  if (route.name=="ArticleListByCategoryId"){
    let name= (await ByCategoryName(route.params.categoryId)).data.data
    Title.value="分类:"+name
  }
  else if(route.name=="Boutique"){
    Title.value="精品区"
  }
 

})
onMounted(async()=>{
  if (route.name=="ArticleListByCategoryId"){
    let name= (await ByCategoryName(route.params.categoryId)).data.data
    Title.value="分类:"+name
  }
  else if(route.name=="Boutique"){
    Title.value="精品区"
  }
  GetHeadline()
  getInfo()
})  




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
