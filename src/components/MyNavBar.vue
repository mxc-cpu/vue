<template>
  <nav
    class="navbar is-spaced has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img 
            src="https://localhost:7112//blogIcon.png"
            width="112"
            height="28"
          />
          <!-- "https://bulma.io/images/bulma-logo.png" -->
        </a>

     
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/"> 主页 </router-link>

          <router-link class="navbar-item" to="/Boutique"> 精品 </router-link>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link"> 分类 </a>

            <div class="navbar-dropdown">
              <router-link
                :to="`/ArticleListByCategoryId/${item.id}`"
                class="navbar-item"
                v-for="(item, index) in categoryList.slice(0, 5)"
                :key="index"
              >
                {{ item.categoryName }}
              </router-link>
              <hr class="navbar-divider" />
              <router-link :to="`/categoryList`" class="navbar-item">
                全部分区
              </router-link>
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <div class="has-text-right">
            <div class="buttons">
              <div v-if="!state">
                <n-space>
                  <router-link to="/Register">
                    <n-button
                      round
                      style="width: 90px; height: 35px"
                      color="#ff69b4"
                    >
                      注 册
                    </n-button>
                  </router-link>
                  <router-link to="/Login">
                    <n-button
                      round
                      ghost
                      style="width: 90px; height: 35px"
                      color="#8a2be2"
                    >
                      登 录
                    </n-button>
                  </router-link>
                </n-space>
              </div>
              <div class="media" v-else>
                <n-dropdown :options="options">
                  <n-avatar
                    round
                    object-fit="cover"
                    :size="50"
                    :src="avatarUrl"
                    fallback-src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
                  ></n-avatar>
                </n-dropdown>
                <div class="media-content">
                  <div class="content">
                    <p>
                      <strong class="title is-3">{{ Name }}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { onMounted, ref, onBeforeUpdate } from "vue";
import { loginState, UserLoginStore } from "../store/StoreLogin";
import { CategoryGetList } from "../api/categoryApi";
import { RouterLink } from "vue-router";
import { CategoryListStore } from "../store/SroreCategory";
import { router } from "../routes/router";

const userLoginstore = UserLoginStore();
const userState = loginState();
const categoryStore = CategoryListStore();

let avatarUrl = ref();
let Name = ref();
let state = ref();
let userId = ref();
onBeforeUpdate(async () => {
  if(!loginState().InLogin){
  await loginState().changeState();
}
  state.value = userState.InLogin;
  Name.value = userState.name1;
  userId.value = userState.userId;
  avatarUrl.value = userState.avatarUrl;
});
onMounted(async () => {
  if(!loginState().InLogin){
  await loginState().changeState();}
  state.value = userState.InLogin;
  Name.value = userState.name1;
  userId.value = userState.userId;
  avatarUrl.value = userState.avatarUrl;
});

const options = [
  {
    label: "我的博客",
    key: "myBlog",
    props: {
      onClick: () => {
        router.push(`/ArticleListByuser/${userId.value}`);
      },
    },
  },
  {
    label: "我的园子",
    key: "personal",
    props: {
      onClick: () => {
        router.push("/Dynamics/"+`${ userId.value}`);
      },
    },
  },
  {
    label: "博客管理",
    key: "editBlog",
    props: {
      onClick: () => {
        router.push("/Editor");
      },
    },
  },
  {
    label: "退出登录",
    key: "logOut",
    props: {
      onClick: () => {
        state.value = false;
        userLoginstore.logOut();
      },
    },
  },
];
const categoryList = ref([]);

const loadDatas = async () => {
  await CategoryGetList()
    .then((res) => {
      if (res.data.success == true) {
        categoryList.value = res.data.data;
        categoryStore.CategoryListData = categoryList.value;
      } else {
        console.log("没找到分类");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
loadDatas();
</script>

<style lang="scss"></style>
