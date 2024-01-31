<template>
  <!--动态列表-->
  <n-tabs
    animated="true"
    type="card"
    tab-style="min-width: 80px;"
    v-model:value="tabValue"
    @update:value="change"
  >
    <n-tab-pane tab="我关注的人" name="/focus/">
      <n-grid :key="index" x-gap="20" y-gap="2" :cols="9">
        <n-gi v-for="(item, index) in focusDataComp.arr">
          <p v-if="item == '没有关注'">{{ item }}</p>

          <router-link v-else :to="`/DynamicsUser/${item.userId}`">
            <div>
              <img class="image is- 1by1" :src="item.avatar" />
              <p class="has-text-centered">{{ item.name }}</p>
            </div>
          </router-link>
        </n-gi>
      </n-grid>
      <div class= "level py-6 ">
        <n-pagination class="level-item has-text-centered" v-model:page="pageinfo.pageIndex" :page-size="pageinfo.pageSize" :page-count="pageCount"
            @update:page="loadfocus" />
    </div>
    </n-tab-pane>
    <n-tab-pane tab="我的粉丝" name="/fan/"> 
        <n-grid :key="index" x-gap="20" y-gap="2" :cols="9">
        <n-gi v-for="(item, index) in fanDataComp.arr">
          <p v-if="item == '没有粉丝'">{{ item }}</p>
          <router-link v-else :to="`/DynamicsUser/${item.userId}`">
            <div>
              <img class="image is- 1by1" :src="item.avatar" />
              <p class="has-text-centered">{{ item.name }}</p>
            </div>
          </router-link>
        </n-gi>
      </n-grid>

      <div class= "level py-6 ">
        <n-pagination class="level-item has-text-centered" v-model:page="pageinfo2.pageIndex" :page-size="pageinfo2.pageSize" :page-count="pageCount2"
            @update:page="loadfan" />
    </div>
    </n-tab-pane>
  </n-tabs>

  <!--/动态列表-->
</template>

<script setup>

import { loginState } from "../store/StoreLogin";
import { onBeforeUpdate, onMounted, reactive, ref } from "vue";
import { FindFocusList, FindFansList,PageFocus,PageFan } from "../api/DynamicsApi";
import { GetUserAvatar, GetUserName } from "../api/getUserInfoApi";
import { useRoute } from "vue-router";
import { router } from '../routes/router.js';

const route=useRoute()
const store = loginState();
const tabValue = ref("/focus/");
const fanDataComp = reactive({ arr: [] });
const focusDataComp = reactive({ arr: [] });
var pageCount = ref(1);
var pageinfo = reactive({
  pageIndex: 1,
  pageSize: 36,

})
var pageCount2 = ref(1);
var pageinfo2 = reactive({
  pageIndex: 1,
  pageSize: 36,

})
const loadfocus = async (page = 0) => {
  if (page != 0) {
    pageinfo.pageIndex = page
  }
  const info = reactive({
      Id: store.userId,
      pageIndex: pageinfo.pageIndex,
      pageSize: pageinfo.pageSize,
    })
  let dataList = { arr: [] };



  PageFocus(info).then(async (res) => {
    focusDataComp.arr.splice(0);
 
    if (res.data.success == true) {
     
      dataList.arr = res.data.data.dataList;
      pageCount.value = parseInt(res.data.data.recordCount / pageinfo.pageSize) + (res.data.data.recordCount % pageinfo.pageSize > 0 ? 1 : 0);

      for (let index in dataList.arr) {
       
       
        const [avatarOf, nameOf] = await Promise.all([
          GetUserAvatar(dataList.arr[index].value),
          GetUserName(dataList.arr[index].value),
        ]);
        let data = {
          userId: dataList.arr[index].value,
          avatar: avatarOf.data.data,
          name: nameOf.data,
        };

        focusDataComp.arr.push(data);
      }
    
    } else {
        fanDataComp.arr = push( res.data.data);
    }
  });
};
const loadfan = async (page = 0) => {
  if (page != 0) {
    pageinfo2.pageIndex = page
  }
  const info = reactive({
      Id: store.userId,
      pageIndex: pageinfo2.pageIndex,
      pageSize: pageinfo2.pageSize,
    })
  let dataList = { arr: [] };

  PageFan(info).then(async (res) => {
    fanDataComp.arr.splice(0);
    console.log("清空", fanDataComp.arr);
    if (res.data.success == true) {
      dataList.arr = res.data.data.dataList;
      pageCount2.value = parseInt(res.data.data.recordCount / pageinfo2.pageSize) + (res.data.data.recordCount % pageinfo2.pageSize > 0 ? 1 : 0);
    

      for (let index in dataList.arr) {
       
        const [avatarOf, nameOf] = await Promise.all([
          GetUserAvatar(dataList.arr[index].value),
          GetUserName(dataList.arr[index].value),
        ]);
        let data = {
          userId: dataList.arr[index].value,
          avatar: avatarOf.data.data,
          name: nameOf.data,
        };

        fanDataComp.arr.push(data);
      }
    
    } else {
      fanDataComp.arr = push( res.data.data);
    }
  });
};
const change=(value)=>{
 router.push(value)
  
}
onMounted(() => {
  loadfan();
  loadfocus();
});
onBeforeUpdate(()=>{
    tabValue.value=route.path
})
</script>

<style lang="scss" scoped></style>
