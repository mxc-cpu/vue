<template>
  <header class="header">
    <NavBar />
  </header>
  <div class="container">
    <n-grid cols="24" :x-gap="20" item-responsive>
      <n-grid-item span="0 400:12 600:15 800:18">
        <section  class="hero is-info">
      <div class="hero-body container">
        <p class="title is-2">
          {{ Title }}
        </p>
      </div>
    </section>
        <n-message-provider>
          <RouterView />
        </n-message-provider>
      </n-grid-item>
      <n-grid-item span="0 400:12 600:9 800:6">
        <UserInfoPlan
          :userArticleLink="`/ArticleListByuser/${userId}`"
          :userName="name"
          :avatar="avatar"
          :user-id="userId"
          :-article-sum="ArticleCount"
          :upvote-sum="ArticleUpvoteCount"
          :fans="FansSum"
        ></UserInfoPlan>
        <Asidebox name="公告" type="announcement" :announcement-data="Annstore.annInfo"> </Asidebox>
        <Asidebox
          name="我的最新文章"
          type="news"
          :newsData="newDataComp"
          
        ></Asidebox>
        <div >
        <Asidebox
          name="我的合集"
          type="compilations"
          :compilationsData ="compilationsDataComp"
          
        ></Asidebox>
        <n-pagination class="level-item has-text-centered" v-model:page="pageinfo.pageIndex" :page-size="pageinfo.pageSize" :page-count="pageCount"
            @update:page="GetcompilationsDataComp" />
      </div>
      </n-grid-item>
    </n-grid>
  </div>
  <n-layout-footer style="padding: 24px" bordered>
        <MyFooter></MyFooter
      ></n-layout-footer>
</template>

<script setup>
import { ref, reactive,  onMounted, onBeforeUpdate, computed } from "vue";
import { GetUserIDByArticleId,StatisticsUserArticle,newestUserArticle,StatisticsUserArticleUpvoteSum } from "../api/articleApi";
import MyFooter from "../components/MyFooter.vue"; 
import { useRouter, useRoute, RouterView } from "vue-router";
import { loginState } from "../store/StoreLogin";
import NavBar from "../components/MyNavBar.vue";
import Asidebox from "../components/Asidebox.vue";
import UserInfoPlan from "../components/userInfoPlan.vue";
import { GetUserName, GetUserAvatar,QueryFansCount } from "../api/getUserInfoApi";

import {PageQuery} from "../api/CompilationsApi";
import {AnnStore} from "../store/StoreAnn"

const Annstore= AnnStore()

const router = useRouter();
const route = useRoute();
const newsData = reactive({ arr: [] });

let Title=ref("欢迎来到我的博客")
let avatar = ref("fff");
let userId = ref(0);
let name = ref();




onMounted(() => {

  getUserId();
  if (route.name=="ArticleListByuser"){
  Title.value='欢迎来到我的博客'}
  else if (route.name=="CompilationsArticle"){
    Title.value='我的合集'
  }
  //获取用户文章数统计
  
});

onBeforeUpdate(() => {

  getUserId();
 if (route.name=="ArticleListByuser"){
  Title.value='我的文章'}
  else if (route.name=="CompilationsArticle"){
    Title.value='我的合集'
  }
});

const GetnewDataComp = async () => {
  let userid=0;
  if (route.name=="Deail"){
  userid= (await GetUserIDByArticleId(route.params.id)).data.data

  }
  else   if (route.name=='CompilationsArticle'){
    userid=route.params.owningUserId
  }
  
  else{
    userid=route.params.userId
  }
  await newestUserArticle(userid)
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


const FansSum=ref(0);
const ArticleCount=ref(0);
const ArticleUpvoteCount=ref(0);
const count = async()=>{

  const [ArticleCountRef, ArticleUpvoteCountRef,QueryFansCountRef] = await Promise.all([
  StatisticsUserArticle(userId.value),
  StatisticsUserArticleUpvoteSum(userId.value),
  QueryFansCount(userId.value)
    ]);
    ArticleCount.value=ArticleCountRef.data.data
    ArticleUpvoteCount.value=ArticleUpvoteCountRef.data.data
    FansSum.value=QueryFansCountRef.data.data
  
}





var pageinfo = reactive({
  pageIndex: 1,
  pageSize: 9,

})
let id=0
var pageCount = ref(1);
const compilationsData = reactive({ arr: [] });
const GetcompilationsDataComp = async (page = 0) => {
  if (page != 0) {
    pageinfo.pageIndex = page
  }
  if (route.name=="CompilationsArticle"){
    id=route.params.owningUserId
    console.log("ee",id)
  }
  else if (route.params.userId==null){
    console.log("kong",userId.value)
    id=userId.value
  }
  else
  {
    id=route.params.userId
  }
  const info = reactive({
      Id: id,
      pageIndex: pageinfo.pageIndex,
      pageSize: pageinfo.pageSize,
    })

  await PageQuery(info).then((res) => {
      if (res.data.success == true) {
        compilationsData.arr =  res.data.data.dataList;
        console.log("ddxddx",res.data.data.dataList)
      } else {
        console.log("获取失败");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

const compilationsDataComp = computed(() => {
  let itemnewsData = [];
  compilationsData.arr.forEach((item) => {
    if (item.compilationsName.length > 6) {
      item.compilationsName = item.compilationsName.substring(0, 20) + "...";
    }
    itemnewsData.push(item);
  });
  return itemnewsData;
});

//如果是从文章进的就根据文章获取一下作者id
const getUserId = async () => {
  if (route.params.id != null) {
    await GetUserIDByArticleId(route.params.id)
      .then(async (res) => {
        if (res.data.success == true) {
          userId.value = res.data.data;


          
          const [avatarOf, nameOf] = await Promise.all([
            GetUserAvatar(userId.value),
            GetUserName(userId.value),
          ]);
          avatar.value = avatarOf.data.data;
          name.value = nameOf.data;
        } else {
          console.log("失败");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } 
  else if (route.params.userId != null) {
    userId.value = route.params.userId;
    const [avatarOf, nameOf] = await Promise.all([
      GetUserAvatar(userId.value),
      GetUserName(userId.value),
    ]);

    avatar.value = avatarOf.data.data;

    name.value = nameOf.data;
  }
  else if (route.name == "CompilationsArticle"){
    userId.value = route.params.owningUserId;
    const [avatarOf, nameOf] = await Promise.all([
      GetUserAvatar(userId.value),
      GetUserName(userId.value),
    ]);

    avatar.value = avatarOf.data.data;

    name.value = nameOf.data;
  }
  GetnewDataComp();
  GetcompilationsDataComp();
  count();
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

.imge {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

.blog-content img {
  max-width: 100% !important;
}
</style>
