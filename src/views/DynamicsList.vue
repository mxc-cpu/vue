<template>
     <!--个人信息展示-->
     <n-card class="block">
            <div class="columns">
       
              <div class="column is-one-fifth">
                <div class="box py-2 px-2" style="width: 129px; height: 140px">
                  <img
                    class="image is- 128x128"
                    :src= avatar 
                  />
                 
                </div >
                <div class="column ">
                <p  class="title is-4  " >{{name}}</p>
                    <RouterLink v-if="name==store.name1" to="/">编辑个人资料</RouterLink>
                      <RouterLink v-else  :to="`/ArticleListByuser/${route.params.id}`">查看博客--> </RouterLink>
                  </div>
              </div>
              <n-tabs type="line" animated="true" class="column user">
                <n-tab-pane name="个人资料" tab="个人资料">
                 <p>名称:{{name}}</p>
                 <div v-if="userinfo!=null" >
                 <p v-if="userinfo.sex!=''" >性别:{{ userinfo.sex }}</p>
                 <p v-if="userinfo.dateBirth!='0001-01-01'" >出生日期:{{ userinfo.dateBirth }}</p>
                 <p v-if="userinfo.netAge!=0" >园龄:{{ userinfo.netAge }}天</p>
                 <p v-if="userinfo.address!=''">地址:{{userinfo.address}}</p>
                 <p v-if="userinfo.interest!=''">爱好:{{ userinfo.interest }}</p>
                 <p v-if="userinfo.occupation!=''">职业:{{ userinfo.occupation }}</p>
                </div>
                </n-tab-pane>
                <n-tab-pane v-if="name==store.name1" name="发布动态" tab="发布动态">
                  <div class="pp2">
                    <span id="message">
                      <n-input
                        type="textarea"
                        :autosize="{ minRows: 3, maxRows: 5 }"
                        maxlength="50"
                        placeholder="你在做什么？你在想什么？"
                        show-count
                      />

                      <div class="py-2 has-text-right">
                        <n-button placeholder bordered type="primary">
                          发布
                        </n-button>
                      </div>
                    </span>
                  </div>
                </n-tab-pane>
                <span id="last_ing" class="hide"></span>
              </n-tabs>
            </div>
          </n-card>
          <!--/个人信息展示-->
          <!--动态列表-->
          <n-tabs
            animated="true"
            type="card"
            tab-style="min-width: 80px;"
            @close="handleClose"
          >
            <n-tab-pane  v-if="name==store.name1" tab="动态" name="plane1">
              <BlogdynamicsList />
            </n-tab-pane>
            <n-tab-pane tab="我的动态" name="plane2">
              <BlogdynamicsList :user-id="store.userId" />
            </n-tab-pane>
           
          </n-tabs>

          <!--/动态列表-->
</template>

<script setup>
import BlogdynamicsList from "../views/BlogdynamicsList.vue";
import MessageList from "../views/MessageList.vue";
import { loginState } from "../store/StoreLogin";
import { GetUserAvatar, GetUserInfo,GetUserName } from "../api/getUserInfoApi";
import { useRoute } from "vue-router";
import { onBeforeUpdate, onMounted, onUpdated, reactive,ref } from "vue";
const store = loginState();
const route=useRoute();
const   userinfo=ref();
const  avatar=ref();
const  name=ref();
const getInfo= async()=>{
  console.log("slll")


  const [infoOf,avatarOf, nameOf] = await Promise.all([
          GetUserInfo(route.params.id),
          GetUserAvatar(route.params.id),
          GetUserName(route.params.id),
        ]);
   
        userinfo.value=infoOf.data.data
        if(userinfo.value.message!=""){
        store.message=userinfo.value.message
        console.log("ssss",store.message)

      }
        avatar.value= avatarOf.data.data,
        name.value=nameOf.data
   
        
 

 

}
onBeforeUpdate(()=>{
  getInfo();
})
getInfo();
</script>

<style lang="scss" scoped>

</style>