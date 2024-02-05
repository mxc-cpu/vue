<template>
  <div v-if="showCard" class="main-panel">
    <aside class="menusd">
        <ul class="menu-list py-1">
        <li><router-link to="/">退出</router-link></li>
      </ul>
      <p class="hero is-small is-size-3 is-primary has-text-centered py-3">
        博客管理
      </p>
      <ul class="menu-list py-1">
        <li><router-link to="/Editor/articleEditor">文章管理</router-link></li>
      </ul>

      <ul class="menu-list py-1">
        <li>
          
          <router-link    to="/Editor/CompilationsEditor">合集列表
            
          </router-link>
          <!-- <n-button  size="large" text @click="sw">
            <n-icon size="20"  style="transform:translate(30px,5px);" ><ArrowBarDown  /></n-icon>
           
          </n-button>
          <ul v-show="isShowList" v-for="(menu, index) in comStore.CompilationsData">
    
            <router-link :to="`/Editor/CompilationsEditor/${menu.id}`">{{ menu.compilationsName }}</router-link>
          </ul> -->
        </li>
      </ul>
    
    </aside>
    <!-- <div v-for="(menu, index) in menus" @click="toPage(menu)">
                {{ menu.name }}
            </div> -->
    <!-- <n-menu
      class="menus"
      :options="menus"
      :default-expanded-keys="defaultExpandedKeys"
      @update:expanded-keys="handleUpdateExpandedKeys"
    /> -->

    <div style="padding: 20px; width: 100%">
      <n-dialog-provider>
        <n-message-provider>
          <router-view></router-view>
        </n-message-provider>
      </n-dialog-provider>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, inject, h, onBeforeMount, onBeforeUpdate, onMounted, isShallow } from "vue";
import { useRouter, useRoute, RouterLink } from "vue-router";
import { QueryAllUserCompilationsById } from "../../api/CompilationsApi";
import { loginState } from "../../store/StoreLogin";
import{CompilationsListStore} from "../../store/StoreCompilations";
import{ChevronDown,ArrowDown,ArrowNarrowDown,ArrowBarDown} from "@vicons/tabler"
const store = loginState();
const comStore=CompilationsListStore();
const router = useRouter();
const route = useRoute();
const showCard = ref(false);

let isShowList=ref(false)

const sw=()=>{
  console.log(isShowList)
  isShowList.value=!isShowList.value
}

//获得合集
const getCompilations =  () => {

    comStore.QueryCompilations(store.userId);
    showCard.value=true
};
onMounted(()=>{
    getCompilations();
})


</script>

<style lang="scss" scoped>
@import "bulma/sass/elements/_all.sass";
@import "bulma/sass/utilities/_all.sass";
@import "bulma/sass/components/_all.sass";
@import "bulma/sass/layout/_all.sass";
@import "bulma/sass/grid/_all.sass";
@import "bulma/sass/base/_all.sass";
@import "bulma/sass/helpers/_all.sass";
.main-panel {
  display: flex;
  color: #23e630;
  max-width: 1500px;
  margin: 0 0;
}

.menusd {
  padding: 20px 0px;
  box-sizing: border-box;
  line-height: 50px;
  text-align: left;
  width: 180px;
  height: 95vh;
  border-right: 1px solid #dadada;

  div {
    cursor: pointer;

    &:hover {
      color: #fd760e;
    }
  }
}

.title {
  font-size: 65px;
  font-weight: bold;
  text-align: right;
  position: fixed;
  color: rgba(0, 0, 0, 20%);
  right: calc((100vw - 1500px) / 2);
  bottom: 20px;
}
</style>
