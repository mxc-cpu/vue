<template>
  <header class="header">
    <NavBar />
  </header>
  <div class="container">
    <n-grid cols="24" :x-gap="20" item-responsive>
      <n-grid-item span="0 400:12 600:15 800:18">
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
        ></UserInfoPlan>
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
</template>

<script setup>
import { ref, reactive, inject, onMounted, onBeforeUpdate, watch } from "vue";
import { ArticleGetDetail, GetUserIDByArticleId } from "../api/articleApi";

import { useRouter, useRoute, RouterView } from "vue-router";
import { loginState } from "../store/StoreLogin";
import NavBar from "../components/MyNavBar.vue";
import Asidebox from "../components/Asidebox.vue";
import UserInfoPlan from "../components/userInfoPlan.vue";
import { GetUserName, GetUserAvatar } from "../api/getUserInfoApi";
const router = useRouter();
const route = useRoute();

const userState = loginState();

let avatar = ref("fff");
let userId = ref(0);
let name = ref();
onMounted(() => {
  getUserId();
});

onBeforeUpdate(() => {
  getUserId();
});

//如果是从文章进的就根据文章获取一下作者id
const getUserId = async () => {
  if (route.params.id != null) {
    await GetUserIDByArticleId(route.params.id)
      .then(async (res) => {
        if (res.data.success == true) {
          userId.value = res.data.data;
          //      const value = await GetUserName(userId.value)
          //      const value2=await GetUserAvatar(userId.value)
          //    avatar.value= await value2.data.data
          //     console.log("头像",avatar.value)
          //      name.value= await value.data
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
  } else if (route.params.userId != null) {
    userId.value = route.params.userId;
    const [avatarOf, nameOf] = await Promise.all([
      GetUserAvatar(userId.value),
      GetUserName(userId.value),
    ]);

    avatar.value = avatarOf.data.data;

    name.value = nameOf.data;
  }
};

/**
 * 读取文章详情
 */
let data = ref({});
const loadDetail = async () => {
  await ArticleGetDetail(route.params.id)
    .then((res) => {
      console.log("xxx");
      if (res.data.success == true) {
        data.value = res.data.data;
        console.log("detail", data.value);
      } else {
        console.log("没有找到");
      }
    })
    .catch((error) => {
      console.log(error);
    });
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
